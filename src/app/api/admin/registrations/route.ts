import { NextResponse } from 'next/server';
import { getSupabase, initTables } from '@/lib/db';
import { getAdminSession } from '@/lib/auth-guard';

export async function GET() {
  try {
    if (!await getAdminSession()) return NextResponse.json({ message: 'Akses admin diperlukan' }, { status: 401 });
    await initTables();
    const sb = getSupabase();
    const { data: registrations, error: regError } = await sb.from('contest_registrations').select('*').order('created_at', { ascending: false });
    if (regError) throw regError;
    const { data: users, error: usrError } = await sb.from('users').select('id, name, email, role, created_at').order('created_at', { ascending: false });
    if (usrError) throw usrError;
    return NextResponse.json({ success: true, registrations: registrations || [], users: users || [] });
  } catch (error: any) {
    console.error('GET Admin Registrations Error:', error);
    return NextResponse.json({ message: 'Gagal mengambil data pendaftaran' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    if (!await getAdminSession()) return NextResponse.json({ message: 'Akses admin diperlukan' }, { status: 401 });
    await initTables();
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ message: 'ID dan Status wajib diisi' }, { status: 400 });
    }

    const { error } = await getSupabase().from('contest_registrations').update({ status }).eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true, message: 'Status pendaftaran berhasil diperbarui' });
  } catch (error: any) {
    console.error('PUT Admin Registration Error:', error);
    return NextResponse.json({ message: 'Gagal memperbarui status pendaftaran' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    if (!await getAdminSession()) return NextResponse.json({ message: 'Akses admin diperlukan' }, { status: 401 });
    await initTables();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID Pendaftaran tidak ditemukan' }, { status: 400 });
    }

    const { error } = await getSupabase().from('contest_registrations').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true, message: 'Data pendaftaran berhasil dihapus' });
  } catch (error: any) {
    console.error('DELETE Admin Registration Error:', error);
    return NextResponse.json({ message: 'Gagal menghapus pendaftaran' }, { status: 500 });
  }
}
