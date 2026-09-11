import { NextResponse } from 'next/server';
import { query, initTables } from '@/lib/db';

export async function GET() {
  try {
    await initTables();
    const contests = await query('SELECT * FROM contests ORDER BY created_at DESC');
    return NextResponse.json({ success: true, contests });
  } catch (error: any) {
    console.error('GET Admin Contests Error:', error);
    return NextResponse.json({ message: 'Gagal mengambil data lomba' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await initTables();
    const body = await req.json();
    const { title, category, level, deadline, fee, image, description, guide_url, status } = body;

    if (!title || !category || !image) {
      return NextResponse.json({ message: 'Judul, Kategori, dan Gambar wajib diisi' }, { status: 400 });
    }

    const id = 'c_' + Date.now();
    await query(
      `INSERT INTO contests (id, title, category, level, deadline, fee, image, description, guide_url, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        title,
        category || 'Lomba Umum',
        level || 'Nasional',
        deadline || '30 hari',
        fee || 'Gratis',
        image,
        description || '',
        guide_url || '',
        status || 'open'
      ]
    );

    return NextResponse.json({ success: true, message: 'Lomba baru berhasil ditambahkan', contestId: id });
  } catch (error: any) {
    console.error('POST Admin Contest Error:', error);
    return NextResponse.json({ message: error.message || 'Gagal menyimpan lomba' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await initTables();
    const body = await req.json();
    const { id, title, category, level, deadline, fee, image, description, guide_url, status } = body;

    if (!id) {
      return NextResponse.json({ message: 'ID Lomba tidak ditemukan' }, { status: 400 });
    }

    await query(
      `UPDATE contests 
       SET title = ?, category = ?, level = ?, deadline = ?, fee = ?, image = ?, description = ?, guide_url = ?, status = ? 
       WHERE id = ?`,
      [title, category, level, deadline, fee, image, description, guide_url, status, id]
    );

    return NextResponse.json({ success: true, message: 'Data lomba berhasil diperbarui' });
  } catch (error: any) {
    console.error('PUT Admin Contest Error:', error);
    return NextResponse.json({ message: error.message || 'Gagal memperbarui lomba' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await initTables();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID Lomba tidak ditemukan' }, { status: 400 });
    }

    await query('DELETE FROM contests WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Lomba berhasil dihapus' });
  } catch (error: any) {
    console.error('DELETE Admin Contest Error:', error);
    return NextResponse.json({ message: 'Gagal menghapus lomba' }, { status: 500 });
  }
}
