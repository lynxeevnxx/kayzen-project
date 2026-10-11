import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";

export async function GET() {
  try {
    const { data: partners, error } = await getSupabase()
      .from("partners")
      .select("*")
      .or("status.eq.active,status.eq.open,status.eq.published,status.is.null")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ success: true, partners: partners || [] }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("GET Public Partners Error:", error);
    return NextResponse.json({ message: "Gagal mengambil data partner" }, { status: 500 });
  }
}
