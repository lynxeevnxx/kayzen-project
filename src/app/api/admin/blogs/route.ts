import { NextResponse } from 'next/server';
import { query, initTables } from '@/lib/db';

export async function GET() {
  try {
    await initTables();
    const blogs = await query('SELECT * FROM blogs ORDER BY created_at DESC');
    return NextResponse.json({ success: true, blogs });
  } catch (error: any) {
    console.error('GET Admin Blogs Error:', error);
    return NextResponse.json({ message: 'Gagal mengambil data artikel blog' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await initTables();
    const body = await req.json();
    const { title, category, author, image, excerpt, content, status } = body;

    if (!title || !category || !image) {
      return NextResponse.json({ message: 'Judul, Kategori, dan Gambar Cover wajib diisi' }, { status: 400 });
    }

    const id = 'b_' + Date.now();
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    await query(
      `INSERT INTO blogs (id, title, slug, category, author, image, excerpt, content, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        title,
        slug,
        category || 'Artikel',
        author || 'Tim Kayzen Academia',
        image,
        excerpt || '',
        content || '',
        status || 'published'
      ]
    );

    return NextResponse.json({ success: true, message: 'Artikel blog berhasil dipublikasikan', blogId: id });
  } catch (error: any) {
    console.error('POST Admin Blog Error:', error);
    return NextResponse.json({ message: error.message || 'Gagal menyimpan artikel blog' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await initTables();
    const body = await req.json();
    const { id, title, category, author, image, excerpt, content, status } = body;

    if (!id) {
      return NextResponse.json({ message: 'ID Artikel tidak ditemukan' }, { status: 400 });
    }

    const slug = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : 'artikel';

    await query(
      `UPDATE blogs 
       SET title = ?, slug = ?, category = ?, author = ?, image = ?, excerpt = ?, content = ?, status = ? 
       WHERE id = ?`,
      [title, slug, category, author, image, excerpt, content, status, id]
    );

    return NextResponse.json({ success: true, message: 'Artikel blog berhasil diperbarui' });
  } catch (error: any) {
    console.error('PUT Admin Blog Error:', error);
    return NextResponse.json({ message: error.message || 'Gagal memperbarui artikel blog' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await initTables();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID Artikel tidak ditemukan' }, { status: 400 });
    }

    await query('DELETE FROM blogs WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Artikel blog berhasil dihapus' });
  } catch (error: any) {
    console.error('DELETE Admin Blog Error:', error);
    return NextResponse.json({ message: 'Gagal menghapus artikel blog' }, { status: 500 });
  }
}
