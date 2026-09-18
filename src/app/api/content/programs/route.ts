import { NextResponse } from "next/server";
import { getSupabase, initTables } from "@/lib/db";

export async function GET() {
  try {
    await initTables();
    const { data: programs, error } = await getSupabase().from("programs").select("*").eq("status", "active").order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ success: true, programs: programs || [] }, { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" } });
  } catch (error) {
    console.error("GET Public Programs Error:", error);
    return NextResponse.json({ message: "Gagal mengambil data program" }, { status: 500 });
  }
}
