import { NextResponse } from 'next/server';
import { query, initTables } from '@/lib/db';

export async function GET() {
  try {
    await initTables();
    const testimonials = await query('SELECT * FROM testimonials ORDER BY created_at DESC');
    return NextResponse.json({ success: true, testimonials });
  } catch (error: any) {
    console.error('GET Admin Testimonials Error:', error);
    return NextResponse.json({ message: 'Gagal mengambil data testimonial' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await initTables();
    const body = await req.json();
    const { quote, author, title, avatar, rating, status } = body;

    if (!quote || !author) {
      return NextResponse.json({ message: 'Isi Kutipan Testimonial dan Nama Alumni wajib diisi' }, { status: 400 });
    }

    const id = 'testi_' + Date.now();

    await query(
      `INSERT INTO testimonials (id, quote, author, title, avatar, rating, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        quote,
        author,
        title || 'Alumni Kayzen Academia',
        avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
        rating || 5,
        status || 'active',
      ]
    );

    return NextResponse.json({ success: true, message: 'Testimonial baru berhasil ditambahkan', testimonialId: id });
  } catch (error: any) {
    console.error('POST Admin Testimonial Error:', error);
    return NextResponse.json({ message: error.message || 'Gagal menyimpan testimonial' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await initTables();
    const body = await req.json();
    const { id, quote, author, title, avatar, rating, status } = body;

    if (!id) {
      return NextResponse.json({ message: 'ID Testimonial tidak ditemukan' }, { status: 400 });
    }

    await query(
      `UPDATE testimonials 
       SET quote = ?, author = ?, title = ?, avatar = ?, rating = ?, status = ? 
       WHERE id = ?`,
      [quote, author, title, avatar, rating, status, id]
    );

    return NextResponse.json({ success: true, message: 'Testimonial berhasil diperbarui' });
  } catch (error: any) {
    console.error('PUT Admin Testimonial Error:', error);
    return NextResponse.json({ message: error.message || 'Gagal memperbarui testimonial' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await initTables();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID Testimonial tidak ditemukan' }, { status: 400 });
    }

    await query('DELETE FROM testimonials WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Testimonial berhasil dihapus' });
  } catch (error: any) {
    console.error('DELETE Admin Testimonial Error:', error);
    return NextResponse.json({ message: 'Gagal menghapus testimonial' }, { status: 500 });
  }
}
