import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/db";

export async function GET() {
  try {
    const { data: teamMembers, error } = await getSupabase()
      .from("team_members")
      .select("*")
      .or("status.eq.active,status.eq.open,status.eq.published,status.is.null")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ success: true, teamMembers: teamMembers || [] }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("GET Public Team Error:", error);
    return NextResponse.json({ message: "Gagal mengambil data tim mentor" }, { status: 500 });
  }
}
