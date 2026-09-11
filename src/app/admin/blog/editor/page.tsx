"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

function BlogEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);

  const [blogForm, setBlogForm] = useState({
    id: "",
    title: "",
    category: "Teknologi & AI",
    author: "Tim Kayzen Academia",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    excerpt: "",
    content: "",
    status: "published",
  });

  useEffect(() => {
    if (editId) {
      const fetchItem = async () => {
        setLoading(true);
        try {
          const res = await fetch("/api/admin/blogs");
          const data = await res.json();
          if (data.blogs) {
            const found = data.blogs.find((b: any) => b.id === editId);
            if (found) setBlogForm(found);
          }
        } catch (e) {
          console.error("Fetch blog editor error:", e);
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
      const res = await fetch("/api/admin/blogs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editId ? { ...blogForm, id: editId } : blogForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert(data.message || "Artikel blog berhasil disimpan!");
      router.push("/admin");
    } catch (err: any) {
      alert(err.message || "Gagal menyimpan artikel blog");
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
              {editId ? "Edit Artikel Blog" : "Tulis Artikel Blog Baru (Full Editor Page)"}
            </h1>
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-3 bg-brand-purple hover:bg-purple-600 text-white font-bold text-xs rounded-xl shadow-lg cursor-pointer"
          >
            {loading ? "Menyimpan..." : "💾 Simpan & Publikasikan"}
          </button>
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT FORM COLUMN */}
          <div className="lg:col-span-8 space-y-6">
            <div className={`p-6 rounded-2xl border space-y-4 ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-gray-200"}`}>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-brand-muted block mb-1">Judul Artikel Blog</label>
                <input
                  type="text"
                  required
                  placeholder="Ketik judul artikel yang menarik di sini..."
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-sm font-bold focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-brand-muted block mb-1">Ringkasan Artikel (Excerpt)</label>
                <textarea
                  rows={3}
                  placeholder="Ringkasan 2-3 kalimat mengenai isi artikel untuk preview di kartu blog..."
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-brand-muted">Isi Konten Artikel</label>
                  <span className="text-[10px] text-brand-purple font-semibold">Toolbar Pengolah Teks</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-t-xl bg-white/10 border border-white/10 border-b-0 text-xs font-bold">
                  <button type="button" onClick={() => setBlogForm({ ...blogForm, content: blogForm.content + "<h3>Judul Bagian</h3>\n" })} className="px-3 py-1.5 bg-brand-purple/40 rounded hover:bg-brand-purple/60">+ H3 Sub-Judul</button>
                  <button type="button" onClick={() => setBlogForm({ ...blogForm, content: blogForm.content + "<p>Tulis paragraf di sini...</p>\n" })} className="px-3 py-1.5 bg-brand-primary/40 rounded hover:bg-brand-primary/60">+ Paragraf</button>
                  <button type="button" onClick={() => setBlogForm({ ...blogForm, content: blogForm.content + "<strong>Teks Tebal</strong>" })} className="px-3 py-1.5 bg-white/20 rounded font-black">B</button>
                  <button type="button" onClick={() => setBlogForm({ ...blogForm, content: blogForm.content + "<em>Teks Miring</em>" })} className="px-3 py-1.5 bg-white/20 rounded italic">I</button>
                  <button type="button" onClick={() => setBlogForm({ ...blogForm, content: blogForm.content + "<blockquote>Kutipan penting...</blockquote>\n" })} className="px-3 py-1.5 bg-amber-500/40 rounded">+ Quote</button>
                  <button type="button" onClick={() => setBlogForm({ ...blogForm, content: blogForm.content + "<ul>\n  <li>Poin 1</li>\n  <li>Poin 2</li>\n</ul>\n" })} className="px-3 py-1.5 bg-emerald-500/40 rounded">+ List Poin</button>
                </div>

                <textarea
                  rows={14}
                  required
                  placeholder="Ketik isi artikel blog lengkap di sini. Gunakan tombol toolbar di atas untuk menambahkan sub-judul, paragraf, dan poin..."
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  className="w-full p-4 rounded-b-xl border border-white/10 bg-white/5 text-xs font-mono leading-relaxed focus:outline-none focus:border-brand-purple"
                />
              </div>
            </div>
          </div>

          {/* RIGHT METADATA COLUMN */}
          <div className="lg:col-span-4 space-y-6">
            <div className={`p-6 rounded-2xl border space-y-4 ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-gray-200"}`}>
              <h3 className="text-sm font-bold border-b border-white/10 pb-3">⚙️ Metadata Artikel</h3>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Kategori Artikel</label>
                <select
                  value={blogForm.category}
                  onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                  className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-[#0c0e17] text-xs focus:outline-none focus:border-brand-purple"
                >
                  <option value="Teknologi & AI">Teknologi & AI</option>
                  <option value="Tips Lomba">Tips Lomba</option>
                  <option value="KTI">KTI</option>
                  <option value="Esai">Esai</option>
                  <option value="Riset">Riset</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Penulis (Author)</label>
                <input
                  type="text"
                  required
                  value={blogForm.author}
                  onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                  className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">URL Gambar Cover</label>
                <input
                  type="text"
                  required
                  value={blogForm.image}
                  onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                  className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-brand-purple"
                />
              </div>

              {/* COVER PREVIEW */}
              {blogForm.image && (
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider opacity-60 block mb-1">Preview Cover</label>
                  <div className="relative w-full h-40 rounded-xl overflow-hidden border border-white/10">
                    <Image unoptimized src={blogForm.image} alt="Preview cover" fill className="object-cover" />
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

export default function BlogEditorPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-white">Memuat Editor Blog...</div>}>
      <BlogEditorContent />
    </Suspense>
  );
}
