import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Semua kolom wajib diisi' }, { status: 400 });
    }

    // Check if user already exists
    const existingUsers = (await query('SELECT id FROM users WHERE email = ?', [email])) as any[];
    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json({ message: 'Email sudah terdaftar. Silakan login.' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = 'usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);

    // Insert user into database
    await query(
      'INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)',
      [userId, name, email, hashedPassword, 'user']
    );

    return NextResponse.json({
      success: true,
      message: 'Pendaftaran berhasil! Silakan masuk.',
      user: { id: userId, name, email }
    });
  } catch (error: any) {
    console.error('Register API Error:', error);
    return NextResponse.json({ message: error.message || 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}
