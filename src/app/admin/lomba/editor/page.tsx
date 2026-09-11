"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

function ContestEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);

  const [contestForm, setContestForm] = useState({
    id: "",
    title: "",
    category: "Karya Tulis Ilmiah",
    level: "Tingkat Nasional",
    deadline: "30 Hari",
    fee: "Gratis",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    description: "",
    guide_url: "",
    status: "open",
  });

  useEffect(() => {
    if (editId) {
      const fetchItem = async () => {
        setLoading(true);
        try {
          const res = await fetch("/api/admin/contests");
          const data = await res.json();
          if (data.contests) {
            const found = data.contests.find((c: any) => c.id === editId);
            if (found) setContestForm(found);
          }
        } catch (e) {
          console.error("Fetch contest editor error:", e);
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
      const res = await fetch("/api/admin/contests", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editId ? { ...contestForm, id: editId } : contestForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert(data.message || "Data lomba berhasil disimpan!");
      router.push("/admin");
    } catch (err: any) {
      alert(err.message || "Gagal menyimpan data lomba");
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
              {editId ? "Edit Informasi Lomba" : "Tambah Info Lomba Baru (Full Editor Page)"}
            </h1>
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-3 bg-brand-purple hover:bg-purple-600 text-white font-bold text-xs rounded-xl shadow-lg cursor-pointer"
          >
            {loading ? "Menyimpan..." : "Simpan Informasi Lomba"}
          </button>
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className={`p-6 rounded-2xl border space-y-4 ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-gray-200"}`}>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-brand-muted block mb-1">Judul Lomba / Kompetisi</label>
                <input
                  type="text"
                  required
                  placeholder="misal: Lomba Karya Tulis Ilmiah Nasional (LKTI) 2026"
                  value={contestForm.title}
                  onChange={(e) => setContestForm({ ...contestForm, title: e.target.value })}
                  className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-sm font-bold focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-muted block mb-1">Kategori Lomba</label>
                  <input
                    type="text"
                    required
                    placeholder="KTI / Esai / Business Plan / AI"
                    value={contestForm.category}
                    onChange={(e) => setContestForm({ ...contestForm, category: e.target.value })}
                    className="w-full p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-brand-purple"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-muted block mb-1">Tingkat Lomba</label>
                  <input
                    type="text"
                    required
                    placeholder="Tingkat Nasional / Internasional"
                    value={contestForm.level}
                    onChange={(e) => setContestForm({ ...contestForm, level: e.target.value })}
                    className="w-full p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-brand-purple"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-muted block mb-1">Biaya Pendaftaran</label>
                  <input
                    type="text"
                    required
                    placeholder="Gratis / Rp 35.000"
                    value={contestForm.fee}
                    onChange={(e) => setContestForm({ ...contestForm, fee: e.target.value })}
                    className="w-full p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-brand-purple"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-muted block mb-1">Deadline Pendaftaran</label>
                  <input
                    type="text"
                    required
                    placeholder="misal: 30 Oktober 2026"
                    value={contestForm.deadline}
                    onChange={(e) => setContestForm({ ...contestForm, deadline: e.target.value })}
                    className="w-full p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-brand-purple"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-brand-purple block mb-1">🔗 Link Form Pendaftaran Eksternal (Mitra / Google Form)</label>
                <input
                  type="text"
                  placeholder="https://forms.google.com/... atau https://partner.com/register"
                  value={contestForm.guide_url}
                  onChange={(e) => setContestForm({ ...contestForm, guide_url: e.target.value })}
                  className="w-full p-4 rounded-xl border border-brand-purple/30 bg-brand-purple/5 text-xs font-mono focus:outline-none focus:border-brand-purple"
                />
                <p className="text-[10px] text-brand-muted mt-1">Pengunjung yang klik &quot;Daftar Sekarang&quot; akan langsung diarahkan ke link eksternal ini di tab baru.</p>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-brand-muted block mb-1">Deskripsi Ringkas Lomba</label>
                <textarea
                  rows={5}
                  placeholder="Penjelasan ringkas mengenai topik, syarat, dan benefit lomba..."
                  value={contestForm.description}
                  onChange={(e) => setContestForm({ ...contestForm, description: e.target.value })}
                  className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-xs leading-relaxed focus:outline-none focus:border-brand-purple"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className={`p-6 rounded-2xl border space-y-4 ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-gray-200"}`}>
              <h3 className="text-sm font-bold border-b border-white/10 pb-3">🖼️ Poster Image Lomba</h3>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">URL Image / Poster</label>
                <input
                  type="text"
                  required
                  value={contestForm.image}
                  onChange={(e) => setContestForm({ ...contestForm, image: e.target.value })}
                  className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-brand-purple"
                />
              </div>

              {contestForm.image && (
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider opacity-60 block mb-1">Preview Poster</label>
                  <div className="relative w-full h-52 rounded-xl overflow-hidden border border-white/10">
                    <Image unoptimized src={contestForm.image} alt="Preview poster" fill className="object-cover" />
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

export default function ContestEditorPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-white">Memuat Editor Lomba...</div>}>
      <ContestEditorContent />
    </Suspense>
  );
}
