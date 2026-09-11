"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [blog, setBlog] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/blogs");
        const data = await res.json();
        if (data.blogs && data.blogs.length > 0) {
          const found = data.blogs.find((b: any) => b.slug === slug || b.id === slug);
          if (found) {
            setBlog(found);
            setRelatedBlogs(data.blogs.filter((b: any) => b.id !== found.id).slice(0, 3));
          }
        }
      } catch (e) {
        console.error("Fetch blog detail error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  // Fallback demo blog if not found in DB
  const displayBlog = blog || {
    id: "demo",
    title: "Panduan Lengkap Menggunakan AI dalam Kepenulisan Karya Tulis Ilmiah (LKTI)",
    category: "Teknologi & AI",
    author: "Dr. Aris Setiawan, M.Sc.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Bagaimana memanfaatkan Artificial Intelligence secara etis dan efektif untuk riset, literatur review, dan formulasi ide karya ilmiah yang inovatif.",
    content: `
      <p className="lead">Pemanfaatan kecerdasan buatan (Artificial Intelligence) dalam dunia akademis dan riset ilmiah berkembang sangat pesat. Bagi mahasiswa dan pelajar yang ingin menembus kompetisi Karya Tulis Ilmiah (LKTI) nasional maupun internasional, memahami cara kerja AI secara etis dan efisien adalah kunci akselerasi riset.</p>

      <h3>1. Formulasi Ide & Identifikasi Rumusan Masalah</h3>
      <p>Langkah pertama dalam penulisan LKTI adalah menemukan ide yang solutif. AI dapat membantu memetakan isu-isu global terbaru berdasarkan kriteria SDG (Sustainable Development Goals). Gunakan prompt yang spesifik untuk mengeksplorasi gap penelitian (research gap) pada studi terdahulu.</p>

      <blockquote>"Penggunaan AI dalam riset bukanlah untuk menggantikan nalar kritis peneliti, melainkan sebagai asisten akselerator dalam mengolah big data dan menyusun struktur argumen yang lebih sistematis."</blockquote>

      <h3>2. Studi Literatur & Synthesis Matrix</h3>
      <p>Melakukan pencarian puluhan jurnal internasional sering memakan waktu lama. Dengan alat bantu AI modern, Anda dapat melakukan kategorisasi sitasi, mengekstraksi metodologi penelitian, dan membandingkan hasil temuan antar jurnal secara cepat tanpa kehilangan esensi akademik.</p>

      <h3>3. Etika Akademik & Pencegahan Plagiarisme</h3>
      <p>Pastikan selalu melakukan verifikasi ulang terhadap data, kutipan, dan referensi yang dihasilkan oleh AI. Selalu cantumkan sumber primer dan lakukan pengecekan Turnitin atau Grammarly untuk menjamin keaslian karya tulis Anda.</p>

      <h3>Kesimpulan</h3>
      <p>Integrasi AI yang tepat dapat memangkas waktu riset hingga 50% sekaligus meningkatkan kedalaman analisis ilmiah. Mari jadikan teknologi ini sebagai sarana menciptakan inovasi yang berdampak nyata bagi masyarakat!</p>
    `,
    created_at: new Date().toISOString(),
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-[#03040b] text-gray-100" : "bg-gray-50 text-gray-900"} font-sans antialiased`}>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} activeTab="blog" />

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* BREADCRUMB & BACK LINK */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-primary hover:underline transition-all"
          >
            &larr; Kembali ke Daftar Blog
          </Link>
        </div>

        {/* HEADER ARTIKEL */}
        <article className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-brand-purple/20 text-brand-purple font-bold text-xs uppercase tracking-wider">
              {displayBlog.category}
            </span>
            <span className="text-xs text-brand-muted">
              📅 {new Date(displayBlog.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {displayBlog.title}
          </h1>

          {/* AUTHOR INFO */}
          <div className="flex items-center gap-4 py-4 border-y border-white/10">
            <div className="w-10 h-10 rounded-full overflow-hidden relative border border-brand-purple/40">
              <Image unoptimized src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" alt={displayBlog.author} fill className="object-cover" />
            </div>
            <div>
              <p className="text-xs font-bold">{displayBlog.author}</p>
              <p className="text-[10px] text-brand-muted">Tim Riset & Mentoring Kayzen Academia</p>
            </div>
          </div>

          {/* FEATURED COVER IMAGE */}
          <div className="relative w-full h-[320px] sm:h-[450px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image unoptimized src={displayBlog.image} alt={displayBlog.title} fill className="object-cover" priority />
          </div>

          {/* EXCERPT RINGKASAN */}
          {displayBlog.excerpt && (
            <div className={`p-6 rounded-2xl border italic text-sm leading-relaxed ${isDarkMode ? "bg-white/5 border-white/10 text-white/90" : "bg-purple-50 border-purple-200 text-gray-800"}`}>
              💡 &quot;{displayBlog.excerpt}&quot;
            </div>
          )}

          {/* BODY KONTEN ARTIKEL */}
          <div className={`prose prose-lg max-w-none space-y-6 text-sm sm:text-base leading-relaxed ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
            <div dangerouslySetInnerHTML={{ __html: displayBlog.content }} />
          </div>

          {/* SHARE & FOOTER ARTIKEL */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-brand-muted">Bagikan Artikel Ini:</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link artikel berhasil disalin ke clipboard!");
                }}
                className="px-4 py-2 rounded-xl bg-brand-purple hover:bg-purple-600 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                📋 Salin Tautan Artikel
              </button>
            </div>
          </div>
        </article>

        {/* ARTIKEL TERKAIT */}
        {relatedBlogs.length > 0 && (
          <div className="mt-16 pt-12 border-t border-white/10 space-y-6">
            <h3 className="text-xl font-bold">Artikel Terkait Lainnya</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedBlogs.map((item) => (
                <Link key={item.id} href={`/blog/${item.slug || item.id}`} className={`group p-4 rounded-2xl border transition-all ${isDarkMode ? "bg-brand-card border-white/10 hover:border-brand-purple/40" : "bg-white border-gray-200 hover:border-purple-300"}`}>
                  <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3">
                    <Image unoptimized src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <span className="text-[10px] font-bold text-brand-primary uppercase">{item.category}</span>
                  <h4 className="font-bold text-xs mt-1 line-clamp-2 group-hover:text-brand-purple transition-colors">{item.title}</h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
