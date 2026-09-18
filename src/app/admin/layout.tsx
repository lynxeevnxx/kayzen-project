import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string })?.role;

  // Jika belum login -> Redirect ke /masuk
  if (!session) {
    redirect("/masuk");
  }

  // Jika bukan admin -> Paksa redirect ke beranda
  if (role !== "admin") {
    redirect("/");
  }

  return children;
}
