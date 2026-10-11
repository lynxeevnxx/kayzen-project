-- ===================================================
-- KAYZEN ACADEMIA - SUPABASE DATABASE SCHEMA SCRIPT
-- Paste and run this script in your Supabase SQL Editor
-- (Dashboard -> SQL Editor -> New Query -> Run)
-- Aman dijalankan ulang di database yang sudah ada (idempotent).
-- ===================================================

-- 1. Users Table
CREATE TABLE IF NOT EXISTS public.users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'user',
  avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Contests Table
CREATE TABLE IF NOT EXISTS public.contests (
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
);

-- 3. Blogs Table
CREATE TABLE IF NOT EXISTS public.blogs (
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
);

-- 4. Partners Table
CREATE TABLE IF NOT EXISTS public.partners (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  logo TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Contest Registrations Table
CREATE TABLE IF NOT EXISTS public.contest_registrations (
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
);

-- 6. Programs Table
CREATE TABLE IF NOT EXISTS public.programs (
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
);

-- 7. Testimonials Table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id TEXT PRIMARY KEY,
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  title TEXT NOT NULL,
  avatar TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Team Members Table
CREATE TABLE IF NOT EXISTS public.team_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT,
  avatar TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Email OTPs Table
CREATE TABLE IF NOT EXISTS public.email_otps (
  email TEXT PRIMARY KEY,
  code_hash CHAR(64) NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  attempts SMALLINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===================================================
-- KEAMANAN
-- Aplikasi mengakses database HANYA dari server memakai secret key (bypass RLS).
-- RLS diaktifkan TANPA policy, sehingga anon/publishable key tidak bisa membaca/menulis apa pun.
-- ===================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contest_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_otps ENABLE ROW LEVEL SECURITY;

-- Fungsi exec_sql versi lama = eksekusi SQL bebas lewat API. Hapus.
DROP FUNCTION IF EXISTS public.exec_sql(text);

-- Index untuk query yang sering dipakai
CREATE INDEX IF NOT EXISTS blogs_slug_idx ON public.blogs (slug);
CREATE INDEX IF NOT EXISTS programs_slug_idx ON public.programs (slug);
CREATE INDEX IF NOT EXISTS registrations_created_idx ON public.contest_registrations (created_at DESC);
