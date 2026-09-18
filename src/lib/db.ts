import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;
let tablesInitialized = false;

export function getSupabase(): SupabaseClient {
  if (supabase) return supabase;

  const url = process.env.SUPABASE_URL || "";
  const key = process.env.SUPABASE_API_KEY || "";

  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_API_KEY must be set in environment variables");
  }

  supabase = createClient(url, key);
  return supabase;
}

export async function initTables(): Promise<void> {
  if (tablesInitialized) return;
  tablesInitialized = true;

  const sb = getSupabase();

  const execSql = async (query: string) => {
    const { error } = await sb.rpc("exec_sql", { query });
    if (error) throw error;
  };

  // Create tables using Supabase SQL editor (RPC)
  // Supabase uses PostgreSQL, so we use PostgreSQL syntax
  try {
    // Users table
    await execSql(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL DEFAULT '',
        role TEXT NOT NULL DEFAULT 'user',
        avatar TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Contests table
    await execSql(`
      CREATE TABLE IF NOT EXISTS contests (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        level TEXT NOT NULL,
        deadline TEXT NOT NULL,
        fee TEXT NOT NULL,
        image TEXT NOT NULL,
        description TEXT,
        guide_url TEXT,
        status TEXT NOT NULL DEFAULT 'open',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Blogs table
    await execSql(`
      CREATE TABLE IF NOT EXISTS blogs (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL,
        category TEXT NOT NULL,
        author TEXT NOT NULL,
        image TEXT NOT NULL,
        excerpt TEXT,
        content TEXT,
        status TEXT NOT NULL DEFAULT 'published',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Partners table
    await execSql(`
      CREATE TABLE IF NOT EXISTS partners (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        logo TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'active',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Contest registrations table
    await execSql(`
      CREATE TABLE IF NOT EXISTS contest_registrations (
        id TEXT PRIMARY KEY,
        contest_id TEXT NOT NULL,
        contest_title TEXT NOT NULL,
        user_id TEXT,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        institution TEXT NOT NULL,
        team_name TEXT,
        file_url TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Programs table
    await execSql(`
      CREATE TABLE IF NOT EXISTS programs (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL,
        category TEXT NOT NULL,
        price TEXT NOT NULL,
        mentor TEXT NOT NULL,
        image TEXT NOT NULL,
        description TEXT,
        link TEXT,
        status TEXT NOT NULL DEFAULT 'active',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Testimonials table
    await execSql(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id TEXT PRIMARY KEY,
        quote TEXT NOT NULL,
        author TEXT NOT NULL,
        title TEXT NOT NULL,
        avatar TEXT NOT NULL,
        rating INT NOT NULL DEFAULT 5,
        status TEXT NOT NULL DEFAULT 'active',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Team members table
    await execSql(`
      CREATE TABLE IF NOT EXISTS team_members (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        description TEXT,
        avatar TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'active',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Email OTPs table
    await execSql(`
      CREATE TABLE IF NOT EXISTS email_otps (
        email TEXT PRIMARY KEY,
        code_hash CHAR(64) NOT NULL,
        expires_at TIMESTAMPTZ NOT NULL,
        attempts SMALLINT NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
  } catch (rpcError) {
    // RPC exec_sql may not exist yet - tables may need manual creation
    // Suppress and continue - the direct table operations will fail with clear errors if tables don't exist
    console.warn("initTables via RPC skipped (exec_sql function may not exist yet):", (rpcError as Error).message);
  }
}
