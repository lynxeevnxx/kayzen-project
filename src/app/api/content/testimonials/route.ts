import { NextResponse } from "next/server";
import { getSupabase, initTables } from "@/lib/db";

export async function GET() {
  try {
    await initTables();
    const { data: testimonials, error } = await getSupabase().from("testimonials").select("*").eq("status", "active").order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ success: true, testimonials: testimonials || [] }, { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" } });
  } catch (error) {
    console.error("GET Public Testimonials Error:", error);
    return NextResponse.json({ message: "Gagal mengambil data testimonial" }, { status: 500 });
  }
}
