import { NextResponse } from "next/server";
import { getAdminOrPenulisSession } from "@/lib/auth-guard";
import { getSupabase } from "@/lib/db";

// Gambar disimpan di Supabase Storage, bukan di folder public/.
// File yang ditulis ke public/ saat runtime tidak disajikan oleh `next start`/standalone,
// dan di Vercel filesystem-nya read-only — itulah penyebab cover rusak/error.
const BUCKET = "uploads";
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

// Ekstensi ditentukan dari MIME (bukan dari nama file) supaya file non-gambar tidak bisa menyamar.
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
  "image/svg+xml": "svg",
};

let bucketReady = false;

async function ensureBucket() {
  if (bucketReady) return;
  const storage = getSupabase().storage;
  const { data } = await storage.getBucket(BUCKET);
  if (!data) {
    const { error } = await storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: MAX_SIZE,
      allowedMimeTypes: Object.keys(ALLOWED_TYPES),
    });
    if (error && !/already exists/i.test(error.message)) throw error;
  }
  bucketReady = true;
}

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
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "File gambar tidak ditemukan" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      return NextResponse.json(
        { message: `Ukuran file (${sizeInMB} MB) melebihi batas maksimal 10 MB` },
        { status: 400 }
      );
    }

    const ext = ALLOWED_TYPES[file.type];
    if (!ext) {
      return NextResponse.json(
        { message: "File harus berupa format gambar (JPG, PNG, WEBP, GIF, AVIF, SVG)" },
        { status: 400 }
      );
    }

    await ensureBucket();

    const baseName = file.name.replace(/\.[^.]*$/, "");
    const safeBaseName = baseName.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 30) || "gambar";
    const filePath = `img_${Date.now()}_${Math.random().toString(36).slice(2, 7)}_${safeBaseName}.${ext}`;

    const storage = getSupabase().storage.from(BUCKET);
    const { error: uploadError } = await storage.upload(filePath, Buffer.from(await file.arrayBuffer()), {
      contentType: file.type,
      cacheControl: "31536000",
      upsert: false,
    });
    if (uploadError) throw uploadError;

    const { data } = storage.getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      message: "Gambar berhasil diupload",
      url: data.publicUrl,
      size: file.size,
      filename: filePath,
    });
  } catch (error: unknown) {
    console.error("Upload Error:", error);
    const message = error instanceof Error ? error.message : "Gagal mengupload gambar";
    return NextResponse.json({ message: `Gagal mengupload gambar: ${message}` }, { status: 500 });
  }
}
