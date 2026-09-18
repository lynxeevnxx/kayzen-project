import { NextResponse } from 'next/server';
import { initTables, getSupabase } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email dan password wajib diisi' }, { status: 400 });
    }

    await initTables();
    const sb = getSupabase();

    // Find user by email
    const { data: users } = await sb.from('users').select('*').eq('email', email).limit(1);
    if (!users || users.length === 0) {
      return NextResponse.json({ message: 'Email atau password salah' }, { status: 401 });
    }

    const user = users[0];

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Email atau password salah' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      message: 'Berhasil masuk!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error: any) {
    console.error('Login API Error:', error);
    return NextResponse.json({ message: error.message || 'Terjadi kesalahan pada server' }, { status: 500 });
  }
}
