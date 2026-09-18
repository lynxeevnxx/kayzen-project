import { NextResponse } from 'next/server';
import { getSupabase, initTables } from '@/lib/db';
import { getAdminSession } from '@/lib/auth-guard';

export async function GET() {
  try {
    if (!await getAdminSession()) return NextResponse.json({ message: 'Akses admin diperlukan' }, { status: 401 });
    await initTables();
    const { data: teamMembers, error } = await getSupabase().from('team_members').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ success: true, teamMembers: teamMembers || [] });
  } catch (error: any) {
    console.error('GET Admin Team Error:', error);
    return NextResponse.json({ message: 'Gagal mengambil data tim mentor' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!await getAdminSession()) return NextResponse.json({ message: 'Akses admin diperlukan' }, { status: 401 });
    await initTables();
    const body = await req.json();
    const { name, role, description, avatar, status } = body;

    if (!name || !role) {
      return NextResponse.json({ message: 'Nama Anggota Tim dan Jabatan/Role wajib diisi' }, { status: 400 });
    }

    const id = 'tm_' + Date.now();
    const { error } = await getSupabase().from('team_members').insert({
      id, name, role, description: description || '',
      avatar: avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      status: status || 'active'
    });
    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Anggota tim baru berhasil ditambahkan', memberId: id });
  } catch (error: any) {
    console.error('POST Admin Team Error:', error);
    return NextResponse.json({ message: error.message || 'Gagal menyimpan anggota tim' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    if (!await getAdminSession()) return NextResponse.json({ message: 'Akses admin diperlukan' }, { status: 401 });
    await initTables();
    const body = await req.json();
    const { id, name, role, description, avatar, status } = body;

    if (!id) {
      return NextResponse.json({ message: 'ID Anggota Tim tidak ditemukan' }, { status: 400 });
    }

    const { error } = await getSupabase().from('team_members').update({
      name, role, description, avatar, status
    }).eq('id', id);
    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Data anggota tim berhasil diperbarui' });
  } catch (error: any) {
    console.error('PUT Admin Team Error:', error);
    return NextResponse.json({ message: error.message || 'Gagal memperbarui data anggota tim' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    if (!await getAdminSession()) return NextResponse.json({ message: 'Akses admin diperlukan' }, { status: 401 });
    await initTables();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID Anggota Tim tidak ditemukan' }, { status: 400 });
    }

    const { error } = await getSupabase().from('team_members').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true, message: 'Anggota tim berhasil dihapus' });
  } catch (error: any) {
    console.error('DELETE Admin Team Error:', error);
    return NextResponse.json({ message: 'Gagal menghapus anggota tim' }, { status: 500 });
  }
}
