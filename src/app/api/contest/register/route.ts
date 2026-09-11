import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { userId, contestTitle, teamName, leaderName, whatsapp } = await req.json();

    if (!userId || !contestTitle || !leaderName || !whatsapp) {
      return NextResponse.json({ message: 'Semua data pendaftaran lomba wajib diisi' }, { status: 400 });
    }

    const regId = 'reg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);

    await query(
      'INSERT INTO contest_registrations (id, user_id, contest_title, team_name, leader_name, whatsapp, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [regId, userId, contestTitle, teamName || '', leaderName, whatsapp, 'pending']
    );

    return NextResponse.json({
      success: true,
      message: 'Pendaftaran lomba berhasil disimpan!',
      registrationId: regId
    });
  } catch (error: any) {
    console.error('Contest Register API Error:', error);
    return NextResponse.json({ message: error.message || 'Terjadi kesalahan server' }, { status: 500 });
  }
}
