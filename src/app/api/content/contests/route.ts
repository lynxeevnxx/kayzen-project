import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";

export async function GET() {
  try {
    const { data: contests, error } = await getSupabase()
      .from("contests")
      .select("*")
      .or("status.eq.open,status.eq.active,status.eq.published,status.is.null")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ success: true, contests: contests || [] }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("GET Public Contests Error:", error);
    return NextResponse.json({ message: "Gagal mengambil data lomba" }, { status: 500 });
  }
}
