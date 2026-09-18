# Kayzen Academia

Portal edukasi Kayzen Academia untuk program bootcamp, informasi lomba, artikel, autentikasi pengguna, pendaftaran peserta, dan CMS admin.

## Menjalankan lokal

1. Salin `.env.example` menjadi `.env.local` dan isi MySQL, NextAuth, serta SMTP.
2. Pasang dependensi dengan `npm ci`.
3. Jalankan `npm run dev` lalu buka `http://localhost:3000`.

Tabel MySQL dibuat otomatis saat fitur yang membutuhkan database pertama kali dipanggil. Untuk akses CMS, akun harus memiliki `role = 'admin'` di tabel `users`.

## Validasi produksi

```bash
npm run lint
npm run build
```

OTP disimpan di MySQL dengan hash, memiliki masa berlaku 10 menit, dan dibatasi lima percobaan. Untuk deployment multi-instance, gunakan database terkelola dan rahasia environment yang berbeda dari development.
