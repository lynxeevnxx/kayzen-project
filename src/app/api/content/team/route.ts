import { NextResponse } from "next/server";
import { getSupabase, initTables } from "@/lib/db";

export async function GET() {
  try {
    await initTables();
    const { data: teamMembers, error } = await getSupabase().from("team_members").select("*").eq("status", "active").order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ success: true, teamMembers: teamMembers || [] }, { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" } });
  } catch (error) {
    console.error("GET Public Team Error:", error);
    return NextResponse.json({ message: "Gagal mengambil data tim mentor" }, { status: 500 });
  }
}
