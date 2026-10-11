import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";

export async function GET() {
  try {
    const { data: testimonials, error } = await getSupabase()
      .from("testimonials")
      .select("*")
      .or("status.eq.active,status.eq.open,status.eq.published,status.is.null")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ success: true, testimonials: testimonials || [] }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("GET Public Testimonials Error:", error);
    return NextResponse.json({ message: "Gagal mengambil data testimonial" }, { status: 500 });
  }
}
