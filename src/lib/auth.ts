import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { initTables, getSupabase } from "@/lib/db";

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

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Email dan Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email || "").trim().toLowerCase();
        const password = String(credentials?.password || "");
        if (!email || !password) return null;

        await initTables();
        const { data: users } = await getSupabase().from("users").select("*").eq("email", email).limit(1);
        const user = users?.[0] as DbUser | undefined;
        if (!user || !(await bcrypt.compare(password, user.password))) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.avatar || undefined,
        };
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
          await initTables();
          const sb = getSupabase();
          const userEmail = user.email.toLowerCase();
          const { data: existing } = await sb.from("users").select("id, role").eq("email", userEmail).limit(1);
          
          if (!existing || existing.length === 0) {
            const role = MASTER_ADMIN_EMAILS.includes(userEmail) ? "admin" : "user";
            await sb.from("users").insert({
              id: `usr_g_${Date.now()}`,
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
      if (token.email) {
        try {
          const { data: users } = await getSupabase()
            .from("users")
            .select("id, role")
            .eq("email", token.email.toLowerCase())
            .limit(1);
          if (users?.[0]) {
            token.id = users[0].id;
            token.role = users[0].role || "user";
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
