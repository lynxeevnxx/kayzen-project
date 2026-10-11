# Kayzen Academia

Portal edukasi Kayzen Academia: program bootcamp, info lomba, artikel, autentikasi (password, OTP email, Google), dan CMS admin.

Stack: Next.js 15 (App Router) · NextAuth · Supabase (Postgres + Storage) · Tailwind CSS 4.

## Menjalankan lokal

1. Salin `.env.example` menjadi `.env.local`, lalu isi Supabase, NextAuth, dan SMTP.
2. Jalankan `schema.sql` sekali di Supabase → SQL Editor (aman dijalankan ulang).
3. `npm ci`
4. `npm run dev` → buka `http://localhost:3000`.

Data contoh + akun admin awal: `SEED_ADMIN_PASSWORD='password-kuat-min-12' node scripts/seed.mjs`.
Akses CMS membutuhkan `role = 'admin'` (atau `'penulis'` untuk blog) di tabel `users`.

## Checklist produksi

- [ ] Semua variabel di `.env.example` terisi di server produksi (`NEXTAUTH_URL` = domain https).
- [ ] `schema.sql` versi terbaru sudah dijalankan (RLS aktif, fungsi `exec_sql` terhapus).
- [ ] `SUPABASE_API_KEY` adalah secret key dan tidak pernah dipakai di kode client.
- [ ] Redirect URI Google OAuth sudah mengarah ke domain produksi.
- [ ] `npm run lint` dan `npm run build` lolos.

## Catatan keamanan

- Gambar CMS diupload ke Supabase Storage (bucket publik `uploads`, dibuat otomatis).
- OTP disimpan sebagai hash, berlaku 10 menit, maksimal 5 percobaan, dengan rate limit per IP/email.
- Isi artikel blog disanitasi (anti-XSS) saat disimpan dan saat ditampilkan.
- Rate limit saat ini in-memory (cukup untuk satu server). Untuk multi-instance, pindahkan ke Redis/Upstash.
