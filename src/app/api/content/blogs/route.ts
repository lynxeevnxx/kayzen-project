import { NextResponse } from "next/server";
import { getSupabase, initTables } from "@/lib/db";

export async function GET() {
  try {
    await initTables();
    const { data: blogs, error } = await getSupabase()
      .from("blogs")
      .select("id, title, slug, category, author, image, excerpt, content, created_at")
      .or("status.eq.published,status.eq.active,status.eq.open,status.is.null")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ success: true, blogs: blogs || [] }, { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" } });
  } catch (error) {
    console.error("GET Public Blogs Error:", error);
    return NextResponse.json({ message: "Gagal mengambil artikel" }, { status: 500 });
  }
}
