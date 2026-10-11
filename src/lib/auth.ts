import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { getSupabase } from "@/lib/db";
import { isValidEmail, normalizeEmail, verifyOtp } from "@/lib/otp";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

type DbUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  avatar?: string | null;
};

const MASTER_ADMIN_EMAILS = [
  "admin@kayzenacademia.com",
  "tegardm@gmail.com",
];

// Password bawaan versi lama (seed "admin123" & akun OTP "VERIFIED_USER_123") diketahui publik.
// Login dengan password ini selalu ditolak; pemilik akun harus login via OTP/Google lalu ganti password.
const BLOCKED_PASSWORDS = new Set(["admin123", "VERIFIED_USER_123"]);

const FIFTEEN_MINUTES = 15 * 60 * 1000;

function toSessionUser(user: DbUser) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    image: user.avatar || undefined,
  };
}

async function findUserByEmail(email: string): Promise<DbUser | undefined> {
  const { data, error } = await getSupabase().from("users").select("*").eq("email", email).limit(1);
  if (error) throw new Error("Terjadi kesalahan pada server. Coba lagi.");
  return data?.[0] as DbUser | undefined;
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/masuk" },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Email dan Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = normalizeEmail(String(credentials?.email || ""));
        const password = String(credentials?.password || "");
        if (!email || !password) throw new Error("Email dan password wajib diisi");

        const ip = getClientIp(req?.headers);
        if (!rateLimit(`login:${ip}`, 30, FIFTEEN_MINUTES) || !rateLimit(`login:${email}`, 10, FIFTEEN_MINUTES)) {
          throw new Error("Terlalu banyak percobaan login. Coba lagi dalam 15 menit.");
        }
        if (BLOCKED_PASSWORDS.has(password)) throw new Error("Email atau password salah");

        const user = await findUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password || ""))) {
          throw new Error("Email atau password salah");
        }

        return toSessionUser(user);
      },
    }),
    CredentialsProvider({
      id: "otp",
      name: "Kode OTP Email",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "Kode OTP", type: "text" },
        name: { label: "Nama", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = normalizeEmail(String(credentials?.email || ""));
        const otp = String(credentials?.otp || "");
        const name = String(credentials?.name || "").trim().slice(0, 100);
        const password = String(credentials?.password || "");

        if (!isValidEmail(email) || !otp) throw new Error("Email dan Kode OTP wajib diisi");
        if (password && password.length < 8) throw new Error("Password minimal 8 karakter");
        if (password && BLOCKED_PASSWORDS.has(password)) throw new Error("Password terlalu lemah, gunakan password lain");

        const ip = getClientIp(req?.headers);
        if (!rateLimit(`otp-verify:${ip}`, 30, FIFTEEN_MINUTES)) {
          throw new Error("Terlalu banyak percobaan. Coba lagi dalam 15 menit.");
        }

        await verifyOtp(email, otp);

        const existing = await findUserByEmail(email);
        if (existing) return toSessionUser(existing);

        // Akun baru terverifikasi. Tanpa password = hanya bisa login via OTP/Google (tidak ada password bawaan).
        const newUser: DbUser = {
          id: `usr_v_${randomUUID()}`,
          name: name || email.split("@")[0],
          email,
          password: password ? await bcrypt.hash(password, 10) : "",
          role: "user",
        };
        const { error } = await getSupabase().from("users").insert(newUser);
        if (error) throw new Error("Gagal membuat akun. Coba lagi.");

        return toSessionUser(newUser);
      },
    }),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        try {
          const sb = getSupabase();
          const userEmail = normalizeEmail(user.email);
          const { data: existing } = await sb.from("users").select("id").eq("email", userEmail).limit(1);

          if (!existing || existing.length === 0) {
            const role = MASTER_ADMIN_EMAILS.includes(userEmail) ? "admin" : "user";
            await sb.from("users").insert({
              id: `usr_g_${randomUUID()}`,
              name: user.name || "Google User",
              email: userEmail,
              password: "GOOGLE_AUTH",
              role,
              avatar: user.image || "",
            });
          }
        } catch (dbErr) {
          console.error("Google Auth DB sync warning:", dbErr);
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role || "user";
      }
      // Role selalu dibaca ulang dari DB supaya pencabutan akses admin/penulis langsung berlaku.
      if (token.email) {
        try {
          const { data: users, error } = await getSupabase()
            .from("users")
            .select("id, role")
            .eq("email", token.email.toLowerCase())
            .limit(1);
          if (!error && users?.[0]) {
            token.id = users[0].id;
            token.role = users[0].role || "user";
          } else if (!error) {
            // Akun sudah dihapus admin → cabut semua hak akses.
            token.role = "user";
          }
        } catch (dbErr) {
          console.error("JWT DB role lookup warning:", dbErr);
        }
      }
      if (!token.role) {
        token.role = "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string; role?: string }).id = token.id as string | undefined;
        (session.user as { id?: string; role?: string }).role = (token.role as string | undefined) || "user";
      }
      return session;
    },
  },
};
