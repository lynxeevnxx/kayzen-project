import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Temporary memory store for OTP verification (in production stored in DB/Redis)
export const otpStore = new Map<string, { code: string; expires: number }>();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ message: 'Alamat email tidak valid' }, { status: 400 });
    }

    // Generate 6-digit OTP verification code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    otpStore.set(email.toLowerCase(), { code: otpCode, expires });

    console.log(`[OTP GENERATED] Email: ${email} | Code: ${otpCode}`);

    // If SMTP credentials exist (Hostinger Webmail / Gmail App Password)
    const smtpHost = process.env.SMTP_HOST || 'smtp.hostinger.com';
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpPort = Number(process.env.SMTP_PORT) || 465;

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"Kayzen Academia" <${smtpUser}>`,
          to: email,
          subject: `${otpCode} adalah Kode Verifikasi OTP Kayzen Academia Anda`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; rounded: 12px;">
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
        console.log(`[SMTP] Verification email sent successfully to ${email}`);
      } catch (mailError) {
        console.error('[SMTP ERROR] Failed to send email via SMTP:', mailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Kode verifikasi OTP (6 digit) telah dikirimkan ke email ${email}. Silakan cek Inbox atau folder Spam Anda.`,
    });
  } catch (error: any) {
    console.error('Send OTP Error:', error);
    return NextResponse.json({ message: 'Gagal mengirim kode verifikasi' }, { status: 500 });
  }
}

