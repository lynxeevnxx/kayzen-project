import { NextResponse } from 'next/server';
import { initTables, getSupabase } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Semua kolom wajib diisi' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ message: 'Password minimal 8 karakter' }, { status: 400 });
    }

    await initTables();
    const sb = getSupabase();

    // Check if user already exists
    const { data: existingUsers } = await sb.from('users').select('id').eq('email', email).limit(1);
    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json({ message: 'Email sudah terdaftar. Silakan login.' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = 'usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);

    // Insert user into database
    const { error } = await sb.from('users').insert({
      id: userId, name, email, password: hashedPassword, role: 'user'
    });
    if (error) throw error;

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
