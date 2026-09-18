import { NextResponse } from 'next/server';
import { getSupabase, initTables } from '@/lib/db';
import { getAdminSession } from '@/lib/auth-guard';

export async function GET() {
  try {
    if (!await getAdminSession()) return NextResponse.json({ message: 'Akses admin diperlukan' }, { status: 401 });
    await initTables();
    const { data: programs, error } = await getSupabase().from('programs').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ success: true, programs: programs || [] });
  } catch (error: any) {
    console.error('GET Admin Programs Error:', error);
    return NextResponse.json({ message: 'Gagal mengambil data program' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!await getAdminSession()) return NextResponse.json({ message: 'Akses admin diperlukan' }, { status: 401 });
    await initTables();
    const body = await req.json();
    const { title, category, price, mentor, image, description, link, status } = body;

    if (!title || !image) {
      return NextResponse.json({ message: 'Judul Program dan Cover Image wajib diisi' }, { status: 400 });
    }

    const id = 'prg_' + Date.now();
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const { error } = await getSupabase().from('programs').insert({
      id, title, slug, category: category || 'Bootcamp', price: price || 'Gratis',
      mentor: mentor || 'Tim Mentor Kayzen', image, description: description || '',
      link: link || '', status: status || 'active'
    });
    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Program baru berhasil ditambahkan', programId: id });
  } catch (error: any) {
    console.error('POST Admin Program Error:', error);
    return NextResponse.json({ message: error.message || 'Gagal menyimpan program' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    if (!await getAdminSession()) return NextResponse.json({ message: 'Akses admin diperlukan' }, { status: 401 });
    await initTables();
    const body = await req.json();
    const { id, title, category, price, mentor, image, description, link, status } = body;

    if (!id) {
      return NextResponse.json({ message: 'ID Program tidak ditemukan' }, { status: 400 });
    }

    const slug = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : undefined;

    const { error } = await getSupabase().from('programs').update({
      title, slug, category, price, mentor, image, description, link, status
    }).eq('id', id);
    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Data program berhasil diperbarui' });
  } catch (error: any) {
    console.error('PUT Admin Program Error:', error);
    return NextResponse.json({ message: error.message || 'Gagal memperbarui program' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    if (!await getAdminSession()) return NextResponse.json({ message: 'Akses admin diperlukan' }, { status: 401 });
    await initTables();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID Program tidak ditemukan' }, { status: 400 });
    }

    const { error } = await getSupabase().from('programs').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true, message: 'Program berhasil dihapus' });
  } catch (error: any) {
    console.error('DELETE Admin Program Error:', error);
    return NextResponse.json({ message: 'Gagal menghapus program' }, { status: 500 });
  }
}
