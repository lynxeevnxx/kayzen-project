import { NextResponse } from "next/server";
import { getAdminOrPenulisSession } from "@/lib/auth-guard";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    const session = await getAdminOrPenulisSession();
    if (!session) {
      return NextResponse.json(
        { message: "Akses admin atau penulis diperlukan untuk mengupload gambar" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ message: "File gambar tidak ditemukan" }, { status: 400 });
    }

    // 10 MB limit check
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      return NextResponse.json(
        { message: `Ukuran file (${sizeInMB} MB) melebihi batas maksimal 10 MB` },
        { status: 400 }
      );
    }

    // MIME type check
    if (!file.type || !file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "File harus berupa format gambar (JPG, PNG, WEBP, GIF, SVG)" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Ensure uploads directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Sanitize filename & create unique name
    const ext = path.extname(file.name) || ".jpg";
    const safeBaseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 30);
    const fileName = `img_${Date.now()}_${safeBaseName}${ext}`;
    const filePath = path.join(uploadDir, fileName);

    // Save file
    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${fileName}`;

    return NextResponse.json({
      success: true,
      message: "Gambar berhasil diupload",
      url: publicUrl,
      size: file.size,
      filename: fileName,
    });
  } catch (error: any) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      { message: error.message || "Gagal mengupload gambar" },
      { status: 500 }
    );
  }
}
