import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getAdminSession() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string })?.role;
  if (!session?.user || role !== "admin") {
    return null;
  }
  return session;
}

export async function getAdminOrPenulisSession() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string })?.role;
  if (!session?.user || (role !== "admin" && role !== "penulis")) {
    return null;
  }
  return session;
}

