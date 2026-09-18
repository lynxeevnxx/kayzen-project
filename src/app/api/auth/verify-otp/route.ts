import { NextResponse } from 'next/server';
import { initTables, getSupabase } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { hashOtp, normalizeEmail } from '@/lib/otp';

export async function POST(req: Request) {
  try {
    const { email, name, password, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ message: 'Email dan Kode OTP wajib diisi' }, { status: 400 });
    }

    const normalizedEmail = normalizeEmail(email);
    await initTables();
    const sb = getSupabase();

    const { data: records } = await sb.from('email_otps').select('code_hash, expires_at, attempts').eq('email', normalizedEmail).limit(1);
    const stored = records?.[0];
    if (!stored) {
      return NextResponse.json({ message: 'Kode OTP tidak ditemukan atau sudah kadaluarsa. Silakan kirim ulang OTP.' }, { status: 400 });
    }

    if (stored.attempts >= 5) {
      await sb.from('email_otps').delete().eq('email', normalizedEmail);
      return NextResponse.json({ message: 'Terlalu banyak percobaan. Silakan kirim OTP baru.' }, { status: 429 });
    }

    if (new Date(stored.expires_at).getTime() < Date.now()) {
      await sb.from('email_otps').delete().eq('email', normalizedEmail);
      return NextResponse.json({ message: 'Kode OTP telah kadaluarsa (lebih dari 10 menit).' }, { status: 400 });
    }

    if (stored.code_hash !== hashOtp(normalizedEmail, otp.toString().trim())) {
      await sb.from('email_otps').update({ attempts: stored.attempts + 1 }).eq('email', normalizedEmail);
      return NextResponse.json({ message: 'Kode OTP 6-digit yang Anda masukkan salah.' }, { status: 400 });
    }

    await sb.from('email_otps').delete().eq('email', normalizedEmail);

    // Check if user exists in database
    const { data: existingUsers } = await sb.from('users').select('*').eq('email', normalizedEmail).limit(1);

    let user;

    if (existingUsers && existingUsers.length > 0) {
      // User exists -> Login after valid OTP
      user = existingUsers[0];
    } else {
      // User doesn't exist -> Create verified user
      const userId = 'usr_v_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
      const userName = name || normalizedEmail.split('@')[0];
      const hashedPassword = await bcrypt.hash(password || 'VERIFIED_USER_123', 10);

      await sb.from('users').insert({
        id: userId, name: userName, email: normalizedEmail, password: hashedPassword, role: 'user'
      });

      user = { id: userId, name: userName, email: normalizedEmail, role: 'user' };
    }

    return NextResponse.json({
      success: true,
      message: 'Email berhasil diverifikasi!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || 'user'
      }
    });
  } catch (error: any) {
    console.error('Verify OTP Error:', error);
    return NextResponse.json({ message: error.message || 'Gagal memverifikasi OTP' }, { status: 500 });
  }
}
