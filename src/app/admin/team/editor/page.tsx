"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

function TeamEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    id: "",
    name: "",
    role: "Head of Mentorship",
    description: "",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    status: "active",
  });

  useEffect(() => {
    if (editId) {
      const fetchItem = async () => {
        setLoading(true);
        try {
          const res = await fetch("/api/admin/team");
          const data = await res.json();
          if (data.teamMembers) {
            const found = data.teamMembers.find((t: any) => t.id === editId);
            if (found) setForm(found);
          }
        } catch (e) {
          console.error("Fetch team editor error:", e);
        } finally {
          setLoading(false);
        }
      };
      fetchItem();
    }
  }, [editId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = editId ? "PUT" : "POST";
      const res = await fetch("/api/admin/team", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editId ? { ...form, id: editId } : form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert(data.message || "Profil mentor berhasil disimpan!");
      router.push("/admin");
    } catch (err: any) {
      alert(err.message || "Gagal menyimpan profil mentor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-[#04060f] text-gray-100" : "bg-gray-50 text-gray-900"} font-sans antialiased`}>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} activeTab="admin" />

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <Link href="/admin" className="text-xs font-bold text-brand-purple hover:underline mb-2 block">
              &larr; Kembali ke Panel Admin CMS
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {editId ? "Edit Profil Mentor / Tim" : "Tambah Profil Mentor Baru"}
            </h1>
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-3 bg-brand-purple hover:bg-purple-600 text-white font-bold text-xs rounded-xl shadow-lg cursor-pointer"
          >
            {loading ? "Menyimpan..." : "💾 Simpan Profil Mentor"}
          </button>
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className={`p-6 rounded-2xl border space-y-4 ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  required
                  placeholder="misal: Dr. Aris Setiawan, M.Sc."
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`w-full p-3.5 rounded-xl border text-xs outline-none ${isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"}`}
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Jabatan / Spesialisasi Mentor</label>
                <input
                  type="text"
                  required
                  placeholder="misal: Lead Mentor Karya Tulis Ilmiah & Penelitian"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className={`w-full p-3.5 rounded-xl border text-xs outline-none ${isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"}`}
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">URL Foto Profil</label>
                <input
                  type="text"
                  required
                  placeholder="https://..."
                  value={form.avatar}
                  onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                  className={`w-full p-3.5 rounded-xl border text-xs outline-none ${isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"}`}
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Bio / Deskripsi Pengalaman</label>
                <textarea
                  rows={4}
                  placeholder="Deskripsi latar belakang akademik dan keahlian mentor..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className={`w-full p-3.5 rounded-xl border text-xs outline-none ${isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"}`}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className={`p-6 rounded-2xl border ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-4">Preview Profile Mentor</h3>
              <div className="p-4 rounded-xl border border-white/10 bg-white/5 text-center space-y-3">
                <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto bg-gray-700">
                  {form.avatar && <Image src={form.avatar} alt="Mentor Avatar" fill className="object-cover" />}
                </div>
                <h4 className="font-bold text-sm">{form.name || "Nama Mentor"}</h4>
                <p className="text-xs text-brand-purple font-semibold">{form.role || "Lead Mentor"}</p>
                <p className="text-xs text-gray-400 line-clamp-3">{form.description || "Bio mentor..."}</p>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default function TeamEditorPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-white">Memuat Editor Mentor...</div>}>
      <TeamEditorContent />
    </Suspense>
  );
}
