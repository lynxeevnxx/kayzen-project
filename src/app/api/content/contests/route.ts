import { NextResponse } from "next/server";
import { getSupabase, initTables } from "@/lib/db";

export async function GET() {
  try {
    await initTables();
    const { data: contests, error } = await getSupabase()
      .from("contests")
      .select("*")
      .or("status.eq.open,status.eq.active,status.eq.published,status.is.null")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ success: true, contests: contests || [] }, { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" } });
  } catch (error) {
    console.error("GET Public Contests Error:", error);
    return NextResponse.json({ message: "Gagal mengambil data lomba" }, { status: 500 });
  }
}
