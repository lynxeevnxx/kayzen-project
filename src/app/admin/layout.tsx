import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  // Jika belum login -> Redirect ke /masuk
  if (!session) {
    redirect("/masuk");
  }

  return children;
}
