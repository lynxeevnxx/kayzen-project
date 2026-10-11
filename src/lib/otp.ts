import { createHash, timingSafeEqual } from "node:crypto";
import { getSupabase } from "@/lib/db";

const MAX_ATTEMPTS = 5;

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

export function hashOtp(email: string, code: string) {
  const pepper = process.env.OTP_PEPPER || process.env.NEXTAUTH_SECRET;
  if (!pepper) throw new Error("OTP_PEPPER or NEXTAUTH_SECRET must be configured");
  return createHash("sha256").update(`${normalizeEmail(email)}:${code}:${pepper}`).digest("hex");
}

/**
 * Memverifikasi & mengonsumsi OTP. Melempar Error berisi pesan untuk user bila gagal.
 * Dipakai oleh provider NextAuth "otp" sehingga login OTP membuat session yang sah.
 */
export async function verifyOtp(rawEmail: string, rawCode: string): Promise<void> {
  const email = normalizeEmail(rawEmail);
  const code = rawCode.trim();
  if (!/^\d{6}$/.test(code)) {
    throw new Error("Kode OTP harus 6 digit angka.");
  }

  const sb = getSupabase();
  const { data: records, error } = await sb
    .from("email_otps")
    .select("code_hash, expires_at, attempts")
    .eq("email", email)
    .limit(1);
  if (error) throw new Error("Gagal memverifikasi OTP. Coba lagi.");

  const stored = records?.[0];
  if (!stored) {
    throw new Error("Kode OTP tidak ditemukan atau sudah kadaluarsa. Silakan kirim ulang OTP.");
  }

  if (stored.attempts >= MAX_ATTEMPTS) {
    await sb.from("email_otps").delete().eq("email", email);
    throw new Error("Terlalu banyak percobaan. Silakan kirim OTP baru.");
  }

  if (new Date(stored.expires_at).getTime() < Date.now()) {
    await sb.from("email_otps").delete().eq("email", email);
    throw new Error("Kode OTP telah kadaluarsa (lebih dari 10 menit).");
  }

  const expected = Buffer.from(String(stored.code_hash), "hex");
  const actual = Buffer.from(hashOtp(email, code), "hex");
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    await sb.from("email_otps").update({ attempts: stored.attempts + 1 }).eq("email", email);
    throw new Error("Kode OTP 6-digit yang Anda masukkan salah.");
  }

  await sb.from("email_otps").delete().eq("email", email);
}
