import { NextResponse } from 'next/server';
import { query, initTables } from '@/lib/db';

export async function GET() {
  try {
    await initTables();
    const teamMembers = await query('SELECT * FROM team_members ORDER BY created_at DESC');
    return NextResponse.json({ success: true, teamMembers });
  } catch (error: any) {
    console.error('GET Admin Team Error:', error);
    return NextResponse.json({ message: 'Gagal mengambil data tim mentor' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await initTables();
    const body = await req.json();
    const { name, role, description, avatar, status } = body;

    if (!name || !role) {
      return NextResponse.json({ message: 'Nama Anggota Tim dan Jabatan/Role wajib diisi' }, { status: 400 });
    }

    const id = 'tm_' + Date.now();

    await query(
      `INSERT INTO team_members (id, name, role, description, avatar, status) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        id,
        name,
        role,
        description || '',
        avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        status || 'active',
      ]
    );

    return NextResponse.json({ success: true, message: 'Anggota tim baru berhasil ditambahkan', memberId: id });
  } catch (error: any) {
    console.error('POST Admin Team Error:', error);
    return NextResponse.json({ message: error.message || 'Gagal menyimpan anggota tim' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await initTables();
    const body = await req.json();
    const { id, name, role, description, avatar, status } = body;

    if (!id) {
      return NextResponse.json({ message: 'ID Anggota Tim tidak ditemukan' }, { status: 400 });
    }

    await query(
      `UPDATE team_members 
       SET name = ?, role = ?, description = ?, avatar = ?, status = ? 
       WHERE id = ?`,
      [name, role, description, avatar, status, id]
    );

    return NextResponse.json({ success: true, message: 'Data anggota tim berhasil diperbarui' });
  } catch (error: any) {
    console.error('PUT Admin Team Error:', error);
    return NextResponse.json({ message: error.message || 'Gagal memperbarui data anggota tim' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await initTables();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID Anggota Tim tidak ditemukan' }, { status: 400 });
    }

    await query('DELETE FROM team_members WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Anggota tim berhasil dihapus' });
  } catch (error: any) {
    console.error('DELETE Admin Team Error:', error);
    return NextResponse.json({ message: 'Gagal menghapus anggota tim' }, { status: 500 });
  }
}
