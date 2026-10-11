import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Klien Supabase khusus server. SUPABASE_API_KEY adalah secret key (bypass RLS),
// jadi file ini tidak boleh diimpor dari komponen client.
// Skema database dikelola lewat schema.sql (jalankan sekali di Supabase SQL Editor),
// bukan dibuat otomatis saat runtime.
let supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (supabase) return supabase;

  const url = process.env.SUPABASE_URL || "";
  const key = process.env.SUPABASE_API_KEY || "";

  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_API_KEY must be set in environment variables");
  }

  supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return supabase;
}
