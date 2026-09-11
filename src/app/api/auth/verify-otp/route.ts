import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { otpStore } from '../send-otp/route';

export async function POST(req: Request) {
  try {
    const { email, name, password, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ message: 'Email dan Kode OTP wajib diisi' }, { status: 400 });
    }

    // Verify OTP code against memory store
    const stored = otpStore.get(email.toLowerCase());
    if (!stored) {
      return NextResponse.json({ message: 'Kode OTP tidak ditemukan atau sudah kadaluarsa. Silakan kirim ulang OTP.' }, { status: 400 });
    }

    if (stored.code !== otp.toString().trim()) {
      return NextResponse.json({ message: 'Kode OTP 6-digit yang Anda masukkan salah.' }, { status: 400 });
    }

    if (Date.now() > stored.expires) {
      otpStore.delete(email.toLowerCase());
      return NextResponse.json({ message: 'Kode OTP telah kadaluarsa (lebih dari 10 menit).' }, { status: 400 });
    }

    // Clear used OTP code
    otpStore.delete(email.toLowerCase());

    // Check if user exists in database
    const existingUsers = (await query('SELECT * FROM users WHERE email = ?', [email])) as any[];

    let user;

    if (existingUsers && existingUsers.length > 0) {
      // User exists -> Login after valid OTP
      user = existingUsers[0];
    } else {
      // User doesn't exist -> Create verified user in MySQL
      const userId = 'usr_v_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
      const userName = name || email.split('@')[0];
      const hashedPassword = await bcrypt.hash(password || 'VERIFIED_USER_123', 10);

      await query(
        'INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)',
        [userId, userName, email, hashedPassword, 'user']
      );

      user = { id: userId, name: userName, email, role: 'user' };
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
