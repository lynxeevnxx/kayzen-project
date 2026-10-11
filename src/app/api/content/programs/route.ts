import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";

export async function GET() {
  try {
    const { data: programs, error } = await getSupabase()
      .from("programs")
      .select("*")
      .or("status.eq.active,status.eq.open,status.eq.published,status.is.null")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ success: true, programs: programs || [] }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("GET Public Programs Error:", error);
    return NextResponse.json({ message: "Gagal mengambil data program" }, { status: 500 });
  }
}
