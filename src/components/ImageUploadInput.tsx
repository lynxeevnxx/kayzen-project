"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface ImageUploadInputProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  maxSizeMB?: number;
  isDarkMode?: boolean;
}

export default function ImageUploadInput({
  value,
  onChange,
  label = "Gambar / Logo",
  maxSizeMB = 10,
  isDarkMode = true,
}: ImageUploadInputProps) {
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_BYTES = maxSizeMB * 1024 * 1024;

  const handleFile = async (file: File) => {
    setErrorMsg("");

    if (file.size > MAX_BYTES) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setErrorMsg(`❌ Ukuran file (${sizeMB} MB) melebihi batas maksimal ${maxSizeMB} MB!`);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrorMsg("❌ File harus berupa format gambar (JPG, PNG, WEBP, GIF, SVG).");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Gagal mengupload gambar");
      }

      onChange(data.url);
    } catch (err: any) {
      setErrorMsg(err.message || "Gagal mengupload gambar");
    } finally {
      setUploading(false);
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
          {label}
        </label>
        <div className="flex items-center gap-1 text-[10px] font-bold">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              mode === "upload"
                ? "bg-brand-purple text-white"
                : isDarkMode
                ? "bg-white/5 text-gray-400 hover:text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            📁 Upload File
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              mode === "url"
                ? "bg-brand-purple text-white"
                : isDarkMode
                ? "bg-white/5 text-gray-400 hover:text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            🔗 URL Link
          </button>
        </div>
      </div>

      {mode === "upload" ? (
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileInputChange}
            accept="image/*"
            className="hidden"
          />

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`p-5 rounded-xl border-2 border-dashed transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-2 ${
              dragOver
                ? "border-brand-purple bg-brand-purple/10"
                : isDarkMode
                ? "border-white/15 bg-white/5 hover:border-brand-purple/50 hover:bg-white/[0.08]"
                : "border-gray-300 bg-gray-50 hover:border-purple-500 hover:bg-purple-50"
            }`}
          >
            {uploading ? (
              <div className="py-3 flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-brand-purple border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs font-bold text-brand-purple">Mengupload gambar...</span>
              </div>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-brand-purple/20 text-brand-purple flex items-center justify-center font-bold text-lg">
                  📷
                </div>
                <div>
                  <p className="text-xs font-bold">
                    Klik atau tarik file gambar ke sini
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    Maksimal file: <strong>{maxSizeMB} MB</strong> (JPG, PNG, WEBP, GIF, SVG)
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="https://example.com/gambar.jpg"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full p-3 rounded-xl border text-xs outline-none focus:border-brand-purple ${
              isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>
      )}

      {errorMsg && (
        <div className="p-2.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      {/* IMAGE PREVIEW */}
      {value && (
        <div className={`p-3 rounded-xl border flex items-center gap-3 ${
          isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-100 border-slate-200"
        }`}>
          <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-black/40">
            <Image unoptimized src={value} alt="Preview" fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold text-emerald-400 uppercase">Gambar Terpasang</div>
            <div className="text-xs font-medium truncate opacity-80">{value}</div>
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="px-2.5 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-bold transition-all cursor-pointer"
          >
            Hapus
          </button>
        </div>
      )}
    </div>
  );
}
