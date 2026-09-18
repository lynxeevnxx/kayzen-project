import { createHash } from "node:crypto";

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function hashOtp(email: string, code: string) {
  const pepper = process.env.OTP_PEPPER || process.env.NEXTAUTH_SECRET;
  if (!pepper) throw new Error("OTP_PEPPER or NEXTAUTH_SECRET must be configured");
  return createHash("sha256").update(`${normalizeEmail(email)}:${code}:${pepper}`).digest("hex");
}
