import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { randomInt } from 'node:crypto';
import { getSupabase } from '@/lib/db';
import { hashOtp, isValidEmail, normalizeEmail } from '@/lib/otp';
import { getClientIp, rateLimit } from '@/lib/rate-limit';

const ONE_HOUR = 60 * 60 * 1000;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const normalizedEmail = normalizeEmail(String(body?.email || ''));

    if (!isValidEmail(normalizedEmail)) {
      return NextResponse.json({ message: 'Alamat email tidak valid' }, { status: 400 });
    }

    // Cegah spam email: per IP & per alamat email.
    const ip = getClientIp(req.headers);
    if (!rateLimit(`otp-send:${ip}`, 10, ONE_HOUR) || !rateLimit(`otp-send:${normalizedEmail}`, 5, ONE_HOUR)) {
      return NextResponse.json({ message: 'Terlalu banyak permintaan kode. Coba lagi nanti.' }, { status: 429 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error('[SMTP] SMTP_HOST/SMTP_USER/SMTP_PASS belum dikonfigurasi');
      return NextResponse.json({ message: 'Layanan email belum dikonfigurasi' }, { status: 503 });
    }

    const sb = getSupabase();
    const { data: existing } = await sb.from('email_otps').select('created_at').eq('email', normalizedEmail).limit(1);
    if (existing?.[0] && Date.now() - new Date(existing[0].created_at).getTime() < 60_000) {
      return NextResponse.json({ message: 'Tunggu satu menit sebelum meminta kode baru' }, { status: 429 });
    }

    const otpCode = randomInt(100000, 1000000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    const { error: upsertError } = await sb.from('email_otps').upsert({
      email: normalizedEmail,
      code_hash: hashOtp(normalizedEmail, otpCode),
      expires_at: expiresAt,
      attempts: 0,
      created_at: new Date().toISOString(),
    }, { onConflict: 'email' });
    if (upsertError) throw upsertError;

    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    try {
      await transporter.sendMail({
        from: `"Kayzen Academia" <${process.env.SMTP_FROM || smtpUser}>`,
        to: normalizedEmail,
        subject: `${otpCode} adalah Kode Verifikasi OTP Kayzen Academia Anda`,
        text: `Kode verifikasi OTP Kayzen Academia Anda: ${otpCode}\nBerlaku 10 menit. Jangan bagikan kode ini kepada siapa pun.`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px;">
            <h2 style="color: #6d28d9; text-align: center;">Kayzen Academia</h2>
            <hr style="border: 0; border-top: 1px solid #eee;" />
            <p>Halo,</p>
            <p>Berikut adalah 6-digit kode verifikasi OTP Anda untuk masuk/mendaftar di Kayzen Academia:</p>
            <div style="background-color: #f3e8ff; color: #6d28d9; font-size: 28px; font-weight: bold; text-align: center; letter-spacing: 6px; padding: 15px; border-radius: 8px; margin: 20px 0;">
              ${otpCode}
            </div>
            <p style="font-size: 12px; color: #666;">Kode verifikasi ini berlaku selama 10 menit. Jangan bagikan kode ini kepada siapa pun.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin-top: 30px;" />
            <p style="font-size: 11px; color: #999; text-align: center;">&copy; ${new Date().getFullYear()} Kayzen Academia. Hak Cipta Dilindungi.</p>
          </div>
        `,
      });
    } catch (mailError) {
      console.error('[SMTP ERROR] Failed to send email via SMTP:', mailError);
      // Hapus OTP supaya user bisa langsung minta ulang tanpa menunggu cooldown.
      await sb.from('email_otps').delete().eq('email', normalizedEmail);
      return NextResponse.json({ message: 'Gagal mengirim email verifikasi. Coba lagi beberapa saat.' }, { status: 502 });
    }

    return NextResponse.json({
      success: true,
      message: `Kode verifikasi OTP (6 digit) telah dikirimkan ke email ${normalizedEmail}. Silakan cek Inbox atau folder Spam Anda.`,
    });
  } catch (error) {
    console.error('Send OTP Error:', error);
    return NextResponse.json({ message: 'Gagal mengirim kode verifikasi' }, { status: 500 });
  }
}
