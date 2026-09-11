import { NextResponse } from 'next/server';
import { query, initTables } from '@/lib/db';

export async function GET() {
  try {
    await initTables();
    const partners = await query('SELECT * FROM partners ORDER BY created_at DESC');
    return NextResponse.json({ success: true, partners });
  } catch (error: any) {
    console.error('GET Admin Partners Error:', error);
    return NextResponse.json({ message: 'Gagal mengambil data partner' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await initTables();
    const body = await req.json();
    const { name, category, logo, status } = body;

    if (!name || !logo) {
      return NextResponse.json({ message: 'Nama Partner dan URL Logo wajib diisi' }, { status: 400 });
    }

    const id = 'p_' + Date.now();
    await query(
      `INSERT INTO partners (id, name, category, logo, status) 
       VALUES (?, ?, ?, ?, ?)`,
      [id, name, category || 'Mitra Kampus', logo, status || 'active']
    );

    return NextResponse.json({ success: true, message: 'Partner baru berhasil ditambahkan', partnerId: id });
  } catch (error: any) {
    console.error('POST Admin Partner Error:', error);
    return NextResponse.json({ message: error.message || 'Gagal menyimpan data partner' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await initTables();
    const body = await req.json();
    const { id, name, category, logo, status } = body;

    if (!id) {
      return NextResponse.json({ message: 'ID Partner tidak ditemukan' }, { status: 400 });
    }

    await query(
      `UPDATE partners 
       SET name = ?, category = ?, logo = ?, status = ? 
       WHERE id = ?`,
      [name, category, logo, status, id]
    );

    return NextResponse.json({ success: true, message: 'Data partner berhasil diperbarui' });
  } catch (error: any) {
    console.error('PUT Admin Partner Error:', error);
    return NextResponse.json({ message: error.message || 'Gagal memperbarui data partner' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await initTables();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID Partner tidak ditemukan' }, { status: 400 });
    }

    await query('DELETE FROM partners WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Partner berhasil dihapus' });
  } catch (error: any) {
    console.error('DELETE Admin Partner Error:', error);
    return NextResponse.json({ message: 'Gagal menghapus partner' }, { status: 500 });
  }
}
