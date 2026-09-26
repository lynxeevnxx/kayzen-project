import { NextResponse } from 'next/server';
import { getSupabase, initTables } from '@/lib/db';
import { getAdminOrPenulisSession } from '@/lib/auth-guard';

export async function GET() {
  try {
    if (!await getAdminOrPenulisSession()) return NextResponse.json({ message: 'Akses admin atau penulis diperlukan' }, { status: 401 });
    await initTables();
    const { data: blogs, error } = await getSupabase().from('blogs').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return NextResponse.json({ success: true, blogs: blogs || [] });
  } catch (error: any) {
    console.error('GET Admin Blogs Error:', error);
    return NextResponse.json({ message: 'Gagal mengambil data artikel blog' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!await getAdminOrPenulisSession()) return NextResponse.json({ message: 'Akses admin atau penulis diperlukan' }, { status: 401 });
    await initTables();
    const body = await req.json();
    const { title, category, author, image, excerpt, content, status } = body;

    if (!title || !category || !image) {
      return NextResponse.json({ message: 'Judul, Kategori, dan Gambar Cover wajib diisi' }, { status: 400 });
    }

    const id = 'b_' + Date.now();
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const { error } = await getSupabase().from('blogs').insert({
      id, title, slug, category: category || 'Artikel',
      author: author || 'Tim Kayzen Academia', image,
      excerpt: excerpt || '', content: content || '', status: status || 'published'
    });
    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Artikel blog berhasil dipublikasikan', blogId: id });
  } catch (error: any) {
    console.error('POST Admin Blog Error:', error);
    return NextResponse.json({ message: error.message || 'Gagal menyimpan artikel blog' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    if (!await getAdminOrPenulisSession()) return NextResponse.json({ message: 'Akses admin atau penulis diperlukan' }, { status: 401 });
    await initTables();
    const body = await req.json();
    const { id, title, category, author, image, excerpt, content, status } = body;

    if (!id) {
      return NextResponse.json({ message: 'ID Artikel tidak ditemukan' }, { status: 400 });
    }

    const slug = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : 'artikel';

    const { error } = await getSupabase().from('blogs').update({
      title, slug, category, author, image, excerpt, content, status
    }).eq('id', id);
    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Artikel blog berhasil diperbarui' });
  } catch (error: any) {
    console.error('PUT Admin Blog Error:', error);
    return NextResponse.json({ message: error.message || 'Gagal memperbarui artikel blog' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    if (!await getAdminOrPenulisSession()) return NextResponse.json({ message: 'Akses admin atau penulis diperlukan' }, { status: 401 });
    await initTables();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID Artikel tidak ditemukan' }, { status: 400 });
    }

    const { error } = await getSupabase().from('blogs').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true, message: 'Artikel blog berhasil dihapus' });
  } catch (error: any) {
    console.error('DELETE Admin Blog Error:', error);
    return NextResponse.json({ message: 'Gagal menghapus artikel blog' }, { status: 500 });
  }
}
