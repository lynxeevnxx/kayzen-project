import { NextResponse } from 'next/server';
import { getSupabase, initTables } from '@/lib/db';
import { getAdminSession } from '@/lib/auth-guard';

export async function GET() {
  try {
    if (!await getAdminSession()) return NextResponse.json({ message: 'Akses admin diperlukan' }, { status: 401 });
    await initTables();
    const { data: contests, error } = await getSupabase().from('contests').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ success: true, contests: contests || [] });
  } catch (error: any) {
    console.error('GET Admin Contests Error:', error);
    return NextResponse.json({ message: 'Gagal mengambil data lomba' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!await getAdminSession()) return NextResponse.json({ message: 'Akses admin diperlukan' }, { status: 401 });
    await initTables();
    const body = await req.json();
    const { title, category, level, deadline, fee, image, description, guide_url, status } = body;

    if (!title || !category || !image) {
      return NextResponse.json({ message: 'Judul, Kategori, dan Gambar wajib diisi' }, { status: 400 });
    }

    const id = 'c_' + Date.now();
    const { error } = await getSupabase().from('contests').insert({
      id, title, category: category || 'Lomba Umum', level: level || 'Nasional',
      deadline: deadline || '30 hari', fee: fee || 'Gratis', image,
      description: description || '', guide_url: guide_url || '', status: status || 'open'
    });
    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Lomba baru berhasil ditambahkan', contestId: id });
  } catch (error: any) {
    console.error('POST Admin Contest Error:', error);
    return NextResponse.json({ message: error.message || 'Gagal menyimpan lomba' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    if (!await getAdminSession()) return NextResponse.json({ message: 'Akses admin diperlukan' }, { status: 401 });
    await initTables();
    const body = await req.json();
    const { id, title, category, level, deadline, fee, image, description, guide_url, status } = body;

    if (!id) {
      return NextResponse.json({ message: 'ID Lomba tidak ditemukan' }, { status: 400 });
    }

    const { error } = await getSupabase().from('contests').update({
      title, category, level, deadline, fee, image, description, guide_url, status
    }).eq('id', id);
    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Data lomba berhasil diperbarui' });
  } catch (error: any) {
    console.error('PUT Admin Contest Error:', error);
    return NextResponse.json({ message: error.message || 'Gagal memperbarui lomba' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    if (!await getAdminSession()) return NextResponse.json({ message: 'Akses admin diperlukan' }, { status: 401 });
    await initTables();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID Lomba tidak ditemukan' }, { status: 400 });
    }

    const { error } = await getSupabase().from('contests').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true, message: 'Lomba berhasil dihapus' });
  } catch (error: any) {
    console.error('DELETE Admin Contest Error:', error);
    return NextResponse.json({ message: 'Gagal menghapus lomba' }, { status: 500 });
  }
}
