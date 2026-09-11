import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { query } from "@/lib/db";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "GOOGLE_CLIENT_ID_PLACEHOLDER",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "GOOGLE_CLIENT_SECRET_PLACEHOLDER",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "kayzen_secret_key_2026_super_secure",
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        try {
          const existing = (await query("SELECT id FROM users WHERE email = ?", [user.email])) as any[];
          if (!existing || existing.length === 0) {
            const userId = "usr_g_" + Date.now();
            await query(
              "INSERT INTO users (id, name, email, password, role, avatar) VALUES (?, ?, ?, ?, ?, ?)",
              [userId, user.name || "Google User", user.email, "GOOGLE_AUTH", "user", user.image || ""]
            );
          }
        } catch (err) {
          console.error("Google Auth MySQL Sync Error:", err);
        }
      }
      return true;
    },
    async session({ session }) {
      if (session?.user?.email) {
        try {
          const dbUsers = (await query("SELECT id, name, email, role, avatar FROM users WHERE email = ?", [session.user.email])) as any[];
          if (dbUsers && dbUsers.length > 0) {
            (session.user as any).id = dbUsers[0].id;
            (session.user as any).role = dbUsers[0].role;
          }
        } catch (e) {
          console.error("Session sync error:", e);
        }
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
