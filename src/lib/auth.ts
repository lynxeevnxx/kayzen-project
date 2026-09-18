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
          const { data: existing } = await sb.from("users").select("id, role").eq("email", user.email).limit(1);
          if (!existing || existing.length === 0) {
            // Google logins on this site are granted admin access by default
            await sb.from("users").insert({
              id: `usr_g_${Date.now()}`,
              name: user.name || "Google User",
              email: user.email,
              password: "GOOGLE_AUTH",
              role: "admin",
              avatar: user.image || "",
            });
          } else if (existing[0].role !== "admin") {
            await sb.from("users").update({ role: "admin" }).eq("email", user.email);
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
        token.role = (user as { role?: string }).role || "admin";
      }
      if (token.email) {
        try {
          const { data: users } = await getSupabase()
            .from("users")
            .select("id, role")
            .eq("email", token.email)
            .limit(1);
          if (users?.[0]) {
            token.id = users[0].id;
            token.role = users[0].role || "admin";
          }
        } catch (dbErr) {
          console.error("JWT DB role lookup warning:", dbErr);
        }
      }
      if (!token.role) {
        token.role = "admin";
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
