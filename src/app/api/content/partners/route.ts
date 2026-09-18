import { NextResponse } from "next/server";
import { getSupabase, initTables } from "@/lib/db";

export async function GET() {
  try {
    await initTables();
    const { data: partners, error } = await getSupabase().from("partners").select("*").eq("status", "active").order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ success: true, partners: partners || [] }, { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" } });
  } catch (error) {
    console.error("GET Public Partners Error:", error);
    return NextResponse.json({ message: "Gagal mengambil data partner" }, { status: 500 });
  }
}
