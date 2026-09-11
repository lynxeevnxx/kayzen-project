import { NextResponse } from 'next/server';
import { query, initTables } from '@/lib/db';

export async function GET() {
  try {
    await initTables();
    const registrations = await query('SELECT * FROM contest_registrations ORDER BY created_at DESC');
    const users = await query('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC');
    return NextResponse.json({ success: true, registrations, users });
  } catch (error: any) {
    console.error('GET Admin Registrations Error:', error);
    return NextResponse.json({ message: 'Gagal mengambil data pendaftaran' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await initTables();
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ message: 'ID dan Status wajib diisi' }, { status: 400 });
    }

    await query('UPDATE contest_registrations SET status = ? WHERE id = ?', [status, id]);
    return NextResponse.json({ success: true, message: 'Status pendaftaran berhasil diperbarui' });
  } catch (error: any) {
    console.error('PUT Admin Registration Error:', error);
    return NextResponse.json({ message: 'Gagal memperbarui status pendaftaran' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await initTables();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID Pendaftaran tidak ditemukan' }, { status: 400 });
    }

    await query('DELETE FROM contest_registrations WHERE id = ?', [id]);
    return NextResponse.json({ success: true, message: 'Data pendaftaran berhasil dihapus' });
  } catch (error: any) {
    console.error('DELETE Admin Registration Error:', error);
    return NextResponse.json({ message: 'Gagal menghapus pendaftaran' }, { status: 500 });
  }
}
