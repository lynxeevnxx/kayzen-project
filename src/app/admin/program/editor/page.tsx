"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

function ProgramEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);

  const [programForm, setProgramForm] = useState({
    id: "",
    title: "",
    category: "Bootcamp & Mentoring",
    price: "Rp 150.000",
    mentor: "Tim Mentor Kayzen Academia",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    description: "",
    link: "",
    status: "active",
  });

  useEffect(() => {
    if (editId) {
      const fetchItem = async () => {
        setLoading(true);
        try {
          const res = await fetch("/api/admin/programs");
          const data = await res.json();
          if (data.programs) {
            const found = data.programs.find((p: any) => p.id === editId);
            if (found) setProgramForm(found);
          }
        } catch (e) {
          console.error("Fetch program editor error:", e);
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
      const res = await fetch("/api/admin/programs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editId ? { ...programForm, id: editId } : programForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert(data.message || "Program Academy berhasil disimpan!");
      router.push("/admin");
    } catch (err: any) {
      alert(err.message || "Gagal menyimpan program academy");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-[#04060f] text-gray-100" : "bg-gray-50 text-gray-900"} font-sans antialiased`}>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} activeTab="admin" />

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <Link href="/admin" className="text-xs font-bold text-brand-purple hover:underline mb-2 block">
              &larr; Kembali ke Panel Admin CMS
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {editId ? "Edit Program Academy" : "Tambah Program Academy Baru (Full Editor Page)"}
            </h1>
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-3 bg-brand-primary hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-lg cursor-pointer"
          >
            {loading ? "Menyimpan..." : "💾 Simpan Program Academy"}
          </button>
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className={`p-6 rounded-2xl border space-y-4 ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-gray-200"}`}>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-brand-muted block mb-1">Judul Program / Bootcamp</label>
                <input
                  type="text"
                  required
                  placeholder="misal: Intensive Mentoring LKTI Juara 1 Nasional 2026"
                  value={programForm.title}
                  onChange={(e) => setProgramForm({ ...programForm, title: e.target.value })}
                  className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-sm font-bold focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-muted block mb-1">Kategori Program</label>
                  <input
                    type="text"
                    required
                    placeholder="Bootcamp / Mentoring / Masterclass"
                    value={programForm.category}
                    onChange={(e) => setProgramForm({ ...programForm, category: e.target.value })}
                    className="w-full p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-muted block mb-1">Biaya / Harga Program</label>
                  <input
                    type="text"
                    required
                    placeholder="Rp 150.000 / Gratis"
                    value={programForm.price}
                    onChange={(e) => setProgramForm({ ...programForm, price: e.target.value })}
                    className="w-full p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-brand-muted block mb-1">Nama Mentor / Lead Instructor</label>
                <input
                  type="text"
                  required
                  placeholder="Dr. Aris Setiawan, M.Sc. & Tim Mentor"
                  value={programForm.mentor}
                  onChange={(e) => setProgramForm({ ...programForm, mentor: e.target.value })}
                  className="w-full p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-brand-primary block mb-1">🔗 Link Pendaftaran Program (WhatsApp / Google Form)</label>
                <input
                  type="text"
                  placeholder="https://wa.me/... atau https://forms.gle/..."
                  value={programForm.link}
                  onChange={(e) => setProgramForm({ ...programForm, link: e.target.value })}
                  className="w-full p-4 rounded-xl border border-brand-primary/30 bg-brand-primary/5 text-xs font-mono focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-brand-muted block mb-1">Deskripsi Lengkap Program</label>
                <textarea
                  rows={6}
                  placeholder="Penjelasan fasilitas, kurikulum, silabus, dan manfaat mengikuti program ini..."
                  value={programForm.description}
                  onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })}
                  className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-xs leading-relaxed focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className={`p-6 rounded-2xl border space-y-4 ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-gray-200"}`}>
              <h3 className="text-sm font-bold border-b border-white/10 pb-3">🖼️ Cover Image Program</h3>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">URL Cover Image</label>
                <input
                  type="text"
                  required
                  value={programForm.image}
                  onChange={(e) => setProgramForm({ ...programForm, image: e.target.value })}
                  className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-brand-primary"
                />
              </div>

              {programForm.image && (
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider opacity-60 block mb-1">Preview Cover</label>
                  <div className="relative w-full h-52 rounded-xl overflow-hidden border border-white/10">
                    <Image unoptimized src={programForm.image} alt="Preview program" fill className="object-cover" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default function ProgramEditorPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-white">Memuat Editor Program...</div>}>
      <ProgramEditorContent />
    </Suspense>
  );
}
