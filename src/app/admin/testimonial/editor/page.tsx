"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

function TestimonialEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    id: "",
    quote: "",
    author: "",
    title: "Juara 1 LKTI Nasional",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    status: "active",
  });

  useEffect(() => {
    if (editId) {
      const fetchItem = async () => {
        setLoading(true);
        try {
          const res = await fetch("/api/admin/testimonials");
          const data = await res.json();
          if (data.testimonials) {
            const found = data.testimonials.find((t: any) => t.id === editId);
            if (found) setForm(found);
          }
        } catch (e) {
          console.error("Fetch testimonial editor error:", e);
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
      const res = await fetch("/api/admin/testimonials", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editId ? { ...form, id: editId } : form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert(data.message || "Testimonial berhasil disimpan!");
      router.push("/admin");
    } catch (err: any) {
      alert(err.message || "Gagal menyimpan testimonial");
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
              {editId ? "Edit Testimonial Mahasiswa" : "Tambah Testimonial Mahasiswa Baru"}
            </h1>
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-3 bg-brand-purple hover:bg-purple-600 text-white font-bold text-xs rounded-xl shadow-lg cursor-pointer"
          >
            {loading ? "Menyimpan..." : "💾 Simpan Testimonial"}
          </button>
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className={`p-6 rounded-2xl border space-y-4 ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Nama Mahasiswa / Alumni</label>
                <input
                  type="text"
                  required
                  placeholder="misal: Ghifari Haidar"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className={`w-full p-3.5 rounded-xl border text-xs outline-none ${isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"}`}
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Pencapaian / Prestasi</label>
                <input
                  type="text"
                  required
                  placeholder="misal: Juara 1 LKTI Nasional 2026"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={`w-full p-3.5 rounded-xl border text-xs outline-none ${isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"}`}
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">URL Foto Avatar</label>
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
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Kutipan Testimonial</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Pengalaman selama bimbingan di Kayzen Academia..."
                  value={form.quote}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  className={`w-full p-3.5 rounded-xl border text-xs outline-none ${isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"}`}
                ></textarea>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">Rating (1 - 5 Bintang)</label>
                <select
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                  className={`w-full p-3.5 rounded-xl border text-xs outline-none ${isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-slate-50 border-slate-200 text-black"}`}
                >
                  <option value={5}>5 Bintang (Sangat Memuaskan)</option>
                  <option value={4}>4 Bintang (Sangat Bagus)</option>
                  <option value={3}>3 Bintang (Cukup)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className={`p-6 rounded-2xl border ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-4">Preview Live Testimonial</h3>
              <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-700">
                    {form.avatar && <Image src={form.avatar} alt="Avatar Preview" fill className="object-cover" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{form.author || "Nama Mahasiswa"}</h4>
                    <p className="text-xs text-brand-purple font-medium">{form.title || "Juara LKTI"}</p>
                  </div>
                </div>
                <p className="text-xs italic text-gray-300">"{form.quote || "Kutipan testimoni akan muncul di sini..."}"</p>
                <div className="text-amber-400 text-sm">{"★".repeat(form.rating || 5)}</div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default function TestimonialEditorPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-white">Memuat Editor Testimonial...</div>}>
      <TestimonialEditorContent />
    </Suspense>
  );
}
