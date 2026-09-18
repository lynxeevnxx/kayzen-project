import { NextResponse } from 'next/server';
import { initTables, getSupabase } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { userId, contestId, contestTitle, teamName, leaderName, whatsapp, institution } = await req.json();

    if (!userId || !contestTitle || !leaderName || !whatsapp) {
      return NextResponse.json({ message: 'Semua data pendaftaran lomba wajib diisi' }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    const sessionUserId = (session?.user as { id?: string } | undefined)?.id;
    if (!session || sessionUserId !== userId) {
      return NextResponse.json({ message: 'Silakan masuk kembali sebelum mendaftar' }, { status: 401 });
    }

    await initTables();

    const { data: user, error: userErr } = await getSupabase()
      .from('users')
      .select('id, name, email')
      .eq('id', userId)
      .maybeSingle();

    if (userErr || !user) return NextResponse.json({ message: 'Sesi pengguna tidak valid' }, { status: 401 });

    const regId = 'reg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);

    const { error: insertErr } = await getSupabase()
      .from('contest_registrations')
      .insert({
        id: regId,
        contest_id: contestId || contestTitle,
        contest_title: contestTitle,
        user_id: user.id,
        full_name: leaderName,
        email: user.email,
        phone: whatsapp,
        institution: institution || '-',
        team_name: teamName || '',
        status: 'pending'
      });

    if (insertErr) {
      console.error('Contest insert error:', insertErr);
      return NextResponse.json({ message: 'Gagal menyimpan pendaftaran lomba' }, { status: 500 });
    }

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
