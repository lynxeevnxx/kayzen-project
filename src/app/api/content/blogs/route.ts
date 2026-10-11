import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";
import { sanitizeBlogHtml } from "@/lib/sanitize";

export async function GET() {
  try {
    const { data: blogs, error } = await getSupabase()
      .from("blogs")
      .select("id, title, slug, category, author, image, excerpt, content, created_at")
      .or("status.eq.published,status.eq.active,status.eq.open,status.is.null")
      .order("created_at", { ascending: false });
    if (error) throw error;
    // Disanitasi saat dibaca juga, supaya artikel lama yang tersimpan sebelum perbaikan ikut aman.
    const safeBlogs = (blogs || []).map((b: { content?: string | null }) => ({ ...b, content: sanitizeBlogHtml(b.content) }));
    return NextResponse.json({ success: true, blogs: safeBlogs }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("GET Public Blogs Error:", error);
    return NextResponse.json({ message: "Gagal mengambil artikel" }, { status: 500 });
  }
}
