import { NextResponse } from 'next/server';
import { query, initTables } from '@/lib/db';

export async function GET() {
  try {
    await initTables();
    const programs = await query('SELECT * FROM programs ORDER BY created_at DESC');
    return NextResponse.json({ success: true, programs });
  } catch (error: any) {
    console.error('GET Admin Programs Error:', error);
    return NextResponse.json({ message: 'Gagal mengambil data program' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await initTables();
    const body = await req.json();
    const { title, category, price, mentor, image, description, link, status } = body;

    if (!title || !image) {
      return NextResponse.json({ message: 'Judul Program dan Cover Image wajib diisi' }, { status: 400 });
    }

    const id = 'prg_' + Date.now();
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    await query(
      `INSERT INTO programs (id, title, slug, category, price, mentor, image, description, link, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        title,
        slug,
        category || 'Bootcamp',
        price || 'Gratis',
        mentor || 'Tim Mentor Kayzen',
        image,
        description || '',
        link || '',
        status || 'active',
      ]
    );

    return NextResponse.json({ success: true, message: 'Program baru berhasil ditambahkan', programId: id });
  } catch (error: any) {
    console.error('POST Admin Program Error:', error);
    return NextResponse.json({ message: error.message || 'Gagal menyimpan program' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await initTables();
    const body = await req.json();
    const { id, title, category, price, mentor, image, description, link, status } = body;

    if (!id) {
      return NextResponse.json({ message: 'ID Program tidak ditemukan' }, { status: 400 });
    }

    const slug = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : undefined;

    await query(
      `UPDATE programs 
       SET title = ?, slug = ?, category = ?, price = ?, mentor = ?, image = ?, description = ?, link = ?, status = ? 
       WHERE id = ?`,
      [title, slug, category, price, mentor, image, description, link, status, id]
    );

    return NextResponse.json({ success: true, message: 'Data program berhasil diperbarui' });
  } catch (error: any) {
    console.error('PUT Admin Program Error:', error);
    return NextResponse.json({ message: error.message || 'Gagal memperbarui program' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await initTables();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID Program tidak ditemukan' }, { status: 400 });
    }

    await query('DELETE FROM programs WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Program berhasil dihapus' });
  } catch (error: any) {
    console.error('DELETE Admin Program Error:', error);
    return NextResponse.json({ message: 'Gagal menghapus program' }, { status: 500 });
  }
}
