import { NextResponse } from 'next/server';
import { getSupabase, initTables } from '@/lib/db';
import { getAdminSession } from '@/lib/auth-guard';

export async function GET() {
  try {
    if (!await getAdminSession()) return NextResponse.json({ message: 'Akses admin diperlukan' }, { status: 401 });
    await initTables();
    const { data: testimonials, error } = await getSupabase().from('testimonials').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ success: true, testimonials: testimonials || [] });
  } catch (error: any) {
    console.error('GET Admin Testimonials Error:', error);
    return NextResponse.json({ message: 'Gagal mengambil data testimonial' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!await getAdminSession()) return NextResponse.json({ message: 'Akses admin diperlukan' }, { status: 401 });
    await initTables();
    const body = await req.json();
    const { quote, author, title, avatar, rating, status } = body;

    if (!quote || !author) {
      return NextResponse.json({ message: 'Isi Kutipan Testimonial dan Nama Alumni wajib diisi' }, { status: 400 });
    }

    const id = 'testi_' + Date.now();
    const { error } = await getSupabase().from('testimonials').insert({
      id, quote, author, title: title || 'Alumni Kayzen Academia',
      avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      rating: rating || 5, status: status || 'active'
    });
    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Testimonial baru berhasil ditambahkan', testimonialId: id });
  } catch (error: any) {
    console.error('POST Admin Testimonial Error:', error);
    return NextResponse.json({ message: error.message || 'Gagal menyimpan testimonial' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    if (!await getAdminSession()) return NextResponse.json({ message: 'Akses admin diperlukan' }, { status: 401 });
    await initTables();
    const body = await req.json();
    const { id, quote, author, title, avatar, rating, status } = body;

    if (!id) {
      return NextResponse.json({ message: 'ID Testimonial tidak ditemukan' }, { status: 400 });
    }

    const { error } = await getSupabase().from('testimonials').update({
      quote, author, title, avatar, rating, status
    }).eq('id', id);
    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Testimonial berhasil diperbarui' });
  } catch (error: any) {
    console.error('PUT Admin Testimonial Error:', error);
    return NextResponse.json({ message: error.message || 'Gagal memperbarui testimonial' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    if (!await getAdminSession()) return NextResponse.json({ message: 'Akses admin diperlukan' }, { status: 401 });
    await initTables();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID Testimonial tidak ditemukan' }, { status: 400 });
    }

    const { error } = await getSupabase().from('testimonials').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true, message: 'Testimonial berhasil dihapus' });
  } catch (error: any) {
    console.error('DELETE Admin Testimonial Error:', error);
    return NextResponse.json({ message: 'Gagal menghapus testimonial' }, { status: 500 });
  }
}
