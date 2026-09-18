import { NextResponse } from 'next/server';
import { getSupabase, initTables } from '@/lib/db';
import { getAdminSession } from '@/lib/auth-guard';

export async function GET() {
  try {
    if (!await getAdminSession()) return NextResponse.json({ message: 'Akses admin diperlukan' }, { status: 401 });
    await initTables();
    const { data: partners, error } = await getSupabase().from('partners').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ success: true, partners: partners || [] });
  } catch (error: any) {
    console.error('GET Admin Partners Error:', error);
    return NextResponse.json({ message: 'Gagal mengambil data partner' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!await getAdminSession()) return NextResponse.json({ message: 'Akses admin diperlukan' }, { status: 401 });
    await initTables();
    const body = await req.json();
    const { name, category, logo, status } = body;

    if (!name || !logo) {
      return NextResponse.json({ message: 'Nama Partner dan URL Logo wajib diisi' }, { status: 400 });
    }

    const id = 'p_' + Date.now();
    const { error } = await getSupabase().from('partners').insert({
      id, name, category: category || 'Mitra Kampus', logo, status: status || 'active'
    });
    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Partner baru berhasil ditambahkan', partnerId: id });
  } catch (error: any) {
    console.error('POST Admin Partner Error:', error);
    return NextResponse.json({ message: error.message || 'Gagal menyimpan data partner' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    if (!await getAdminSession()) return NextResponse.json({ message: 'Akses admin diperlukan' }, { status: 401 });
    await initTables();
    const body = await req.json();
    const { id, name, category, logo, status } = body;

    if (!id) {
      return NextResponse.json({ message: 'ID Partner tidak ditemukan' }, { status: 400 });
    }

    const { error } = await getSupabase().from('partners').update({
      name, category, logo, status
    }).eq('id', id);
    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Data partner berhasil diperbarui' });
  } catch (error: any) {
    console.error('PUT Admin Partner Error:', error);
    return NextResponse.json({ message: error.message || 'Gagal memperbarui data partner' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    if (!await getAdminSession()) return NextResponse.json({ message: 'Akses admin diperlukan' }, { status: 401 });
    await initTables();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID Partner tidak ditemukan' }, { status: 400 });
    }

    const { error } = await getSupabase().from('partners').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true, message: 'Partner berhasil dihapus' });
  } catch (error: any) {
    console.error('DELETE Admin Partner Error:', error);
    return NextResponse.json({ message: 'Gagal menghapus partner' }, { status: 500 });
  }
}
