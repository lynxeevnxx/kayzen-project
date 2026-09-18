import { NextResponse } from "next/server";
import { getSupabase, initTables } from "@/lib/db";
import { getAdminSession } from "@/lib/auth-guard";

export async function GET() {
  try {
    if (!await getAdminSession()) return NextResponse.json({ message: "Akses admin diperlukan" }, { status: 401 });
    await initTables();
    const { data: users, error } = await getSupabase().from("users").select("id, name, email, role, avatar, created_at").order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ success: true, users: users || [] });
  } catch (error: any) {
    console.error("GET Admin Users Error:", error);
    return NextResponse.json({ message: "Gagal mengambil data pengguna" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ message: "Akses admin diperlukan" }, { status: 401 });
    await initTables();

    const body = await req.json();
    const { id, role } = body;

    if (!id || !role) {
      return NextResponse.json({ message: "ID User dan Role wajib diisi" }, { status: 400 });
    }

    if (role !== "user" && role !== "admin") {
      return NextResponse.json({ message: "Role harus 'user' atau 'admin'" }, { status: 400 });
    }

    const currentUserId = (session.user as { id?: string }).id;
    if (currentUserId === id && role !== "admin") {
      return NextResponse.json({ message: "Anda tidak dapat melepaskan akses admin pada akun Anda sendiri." }, { status: 400 });
    }

    const { error } = await getSupabase().from("users").update({ role }).eq("id", id);
    if (error) throw error;
    return NextResponse.json({ success: true, message: `Role pengguna berhasil diperbarui menjadi ${role}` });
  } catch (error: any) {
    console.error("PUT Admin Users Error:", error);
    return NextResponse.json({ message: error.message || "Gagal memperbarui role pengguna" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ message: "Akses admin diperlukan" }, { status: 401 });
    await initTables();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "ID User tidak ditemukan" }, { status: 400 });
    }

    const currentUserId = (session.user as { id?: string }).id;
    if (currentUserId === id) {
      return NextResponse.json({ message: "Anda tidak dapat menghapus akun Anda sendiri." }, { status: 400 });
    }

    const { error } = await getSupabase().from("users").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ success: true, message: "Pengguna berhasil dihapus" });
  } catch (error: any) {
    console.error("DELETE Admin Users Error:", error);
    return NextResponse.json({ message: "Gagal menghapus pengguna" }, { status: 500 });
  }
}
