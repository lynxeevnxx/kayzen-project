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

  // Fallback demo blogs dictionary
  const demoBlogs: Record<string, any> = {
    "5-kunci-utama-menulis-bab-pendahuluan-lkti": {
      id: "1",
      slug: "5-kunci-utama-menulis-bab-pendahuluan-lkti",
      title: "5 Kunci Utama Menulis Bab Pendahuluan LKTI yang Memikat Dewan Juri",
      category: "Karya Tulis Ilmiah",
      author: "Ghifari Haidar",
      image: "/kti_vector.png",
      excerpt: "Tips praktis merumuskan latar belakang masalah, urgensi riset, dan rumusan masalah yang tajam.",
      content: `
        <p className="lead">Bab Pendahuluan adalah pintu gerbang karya tulis Anda. Dewan juri sering kali menentukan impresi pertama karya hanya dari 3 halaman pertama ini.</p>
        <h3>1. Latar Belakang yang Kontekstual & Berbasis Data</h3>
        <p>Hindari pembukaan yang terlalu umum seperti "Indonesia adalah negara kepulauan". Mulailah langsung dengan fakta numerik aktual, data BPS/UNESCO, dan urgensi masalah spesifik.</p>
        <h3>2. Identifikasi Gap Penelitian (Research Gap)</h3>
        <p>Tunjukkan perbedaan antara riset Anda dengan penelitian sebelumnya. Jelaskan solusi baru atau novelty yang Anda tawarkan.</p>
        <h3>3. Rumusan Masalah yang Spesifik & Terukur</h3>
        <p>Gunakan kata kerja operasional seperti menganalisis, menguji, atau merancang produk inovatif.</p>
        <h3>4. Manfaat Praktis bagi Masyarakat</h3>
        <p>Jelaskan secara tajam kontribusi karya Anda terhadap Sustainable Development Goals (SDGs) atau industri nasional.</p>
        <h3>5. Kebaruan & Solusi Inovatif</h3>
        <p>Sampaikan gagasan utama Anda secara eksplisit di penutup Bab Pendahuluan.</p>
      `,
      created_at: "2024-05-12T00:00:00.000Z"
    },
    "panduan-menyusun-hook-dan-argumentasi-esai": {
      id: "2",
      slug: "panduan-menyusun-hook-dan-argumentasi-esai",
      title: "Panduan Menyusun Hook & Argumentasi Tajam dalam Esai Nasional",
      category: "Esai",
      author: "Nabilah Azzahra",
      image: "/essay_vector.png",
      excerpt: "Cara menyusun gagasan yang terstruktur, persuasif, dan didukung data empiris aktual.",
      content: `
        <p className="lead">Dalam kompetisi esai, kalimat pertama menentukan apakah esai Anda akan dibaca sampai akhir atau diabaikan juri.</p>
        <h3>1. Membangun Hook yang Berkesan</h3>
        <p>Gunakan stasistik mengejutkan, anekdot singkat, atau kontradiksi logis untuk langsung menarik minat pembaca di paragraf pertama.</p>
        <h3>2. Struktur Paragraf Argumentasi (PEEL Method)</h3>
        <p>Terapkan formula Point (gagasan utama), Explanation (penjelasan logis), Evidence (bukti empiris), dan Link (kesimpulan paragraf).</p>
        <h3>3. Penutup yang Persuasif & Call-to-Action</h3>
        <p>Rangkum argumen utama dan berikan refleksi kritis mengenai solusi masa depan yang Anda gagaskan.</p>
      `,
      created_at: "2024-05-10T00:00:00.000Z"
    },
    "pitch-deck-and-financial-model-business-plan": {
      id: "3",
      slug: "pitch-deck-and-financial-model-business-plan",
      title: "Pitch Deck & Financial Model: Struktur Proposal Business Plan",
      category: "Business Plan",
      author: "Raihan Putra",
      image: "/bisnis_vector.png",
      excerpt: "Langkah merancang analisis pasar, proyeksi keuangan 3 tahun, dan strategi go-to-market.",
      content: `
        <p className="lead">Proposal bisnis plan yang berhasil memenangkan kompetisi adalah gabungan dari riset pasar yang realistis dan model keuangan yang logis.</p>
        <h3>1. Validasi Masalah & Target Market (TAM/SAM/SOM)</h3>
        <p>Hitung potensi pasar potensial secara realistis dan bedah persona konsumen utama Anda.</p>
        <h3>2. Business Model Canvas (BMC)</h3>
        <p>Petakan sumber pendapatan (revenue stream), struktur biaya (cost structure), dan mitra strategis.</p>
        <h3>3. Proyeksi Keuangan 3 Tahun</h3>
        <p>Sajikan Cash Flow, Break-Even Point (BEP), dan Payback Period dengan rasionalitas tinggi.</p>
      `,
      created_at: "2024-05-08T00:00:00.000Z"
    },
    "panduan-komprehensif-lolos-pendanaan-lkti": {
      id: "4",
      slug: "panduan-komprehensif-lolos-pendanaan-lkti",
      title: "Panduan Komprehensif Lolos Pendanaan & Juara LKTI Tingkat Nasional 2024",
      category: "Karya Tulis Ilmiah",
      author: "Ghifari Haidar",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80",
      excerpt: "Pelajari metodologi penelitian kuantitatif/kualitatif, penulisan sitasi akademik yang benar menggunakan Mendeley, hingga tips presentasi memukau.",
      content: `
        <p className="lead">Menjuarai kompetisi LKTI tingkat nasional membutuhkan strategi menyeluruh dari tahap perancangan proposal hingga teknik menjawab pertanyaan juri.</p>
        <h3>1. Memilih Topik Sesuai Subtema Lomba</h3>
        <p>Pastikan karya Anda menjawab salah satu subtema yang ditawarkan panitia dengan pendekatan interdisipliner.</p>
        <h3>2. Penggunaan Reference Manager</h3>
        <p>Gunakan Mendeley atau Zotero untuk memastikan manajemen sitasi dan daftar pustaka 100% konsisten sesuai format APA/IEEE.</p>
        <h3>3. Teknik Presentasi & Pembuatan Poster</h3>
        <p>Buat slide presentasi yang visual dan latihan pitching 10 menit bersama tim hingga lancar.</p>
      `,
      created_at: "2024-05-12T00:00:00.000Z"
    },
    "cara-efektif-review-literatur-mendeley": {
      id: "5",
      slug: "cara-efektif-review-literatur-mendeley",
      title: "Cara Efektif Review Literatur & Penggunaan Reference Manager (Mendeley/Zotero)",
      category: "Riset & Metodologi",
      author: "Dinda Salsabila",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=400&q=80",
      excerpt: "Teknik kompilasi jurnal bereputasi dan pembuatan sitasi otomatis tanpa ribet.",
      content: `
        <p className="lead">Tinjauan pustaka yang kuat dibangun dari jurnal-jurnal bereputasi Scopus/Sinta. Pelajari cara efisien mengelola puluhan referensi dengan alat modern.</p>
        <h3>1. Pencarian Jurnal Terindeks</h3>
        <p>Gunakan Google Scholar, ScienceDirect, dan IEEE Xplore dengan kata kunci Boolean (AND/OR/NOT).</p>
        <h3>2. Pembuatan Matrix Synthesis</h3>
        <p>Rangkum metode, hasil, dan keterbatasan setiap artikel dalam tabel perbandingan untuk memudahkan penulisan Bab 2.</p>
      `,
      created_at: "2024-05-10T00:00:00.000Z"
    },
    "manajemen-waktu-dan-strategi-tim-lomba": {
      id: "6",
      slug: "manajemen-waktu-dan-strategi-tim-lomba",
      title: "Manajemen Waktu & Strategi Pembagian Peran Tim Lomba Mahasiswa",
      category: "Tips Lomba",
      author: "Muhammad Farhan",
      image: "/lomba_inovasi.png",
      excerpt: "Cara membagi tugas penulisan, analisis data, dan persiapan berkas pendaftaran secara efisien.",
      content: `
        <p className="lead">Kolaborasi tim yang solid adalah kunci utama keberhasilan menyelesaikan karya ilmiah berkualitas tepat sebelum deadline.</p>
        <h3>1. Pembagian Peran Berdasarkan Keahlian</h3>
        <p>Bagi peran antara Ketua (koordinator & penulis utama), Peneliti Data (olah data), dan Designer (formatting & poster).</p>
        <h3>2. Timeline Kerja dengan Kanban Board</h3>
        <p>Gunakan Trello atau Notion untuk memantau progres tiap bab secara real-time.</p>
      `,
      created_at: "2024-05-09T00:00:00.000Z"
    },
    "mindset-juara-mengatasi-writers-block": {
      id: "7",
      slug: "mindset-juara-mengatasi-writers-block",
      title: "Mindset Juara: Mengatasi Writer's Block saat Menyusun Executive Summary",
      category: "Esai",
      author: "Nabilah Azzahra",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80",
      excerpt: "Langkah keluar dari kemacetan ide dan menyelesaikan draf pertama karya tulis.",
      content: `
        <p className="lead">Writer's block sering melanda saat hendak menuliskan kesimpulan atau ringkasan eksekutif. Berikut teknik melewatinya.</p>
        <h3>1. Metode Free Writing 15 Menit</h3>
        <p>Tulis semua pikiran tanpa mengedit tata bahasa terlebih dahulu. Pengeditan dilakukan pada sesi terpisah.</p>
        <h3>2. Diskusi & Brainstorming Berpasangan</h3>
        <p>Jelaskan ide Anda secara lisan kepada teman, lalu catat poin penting hasil obrolan tersebut.</p>
      `,
      created_at: "2024-05-07T00:00:00.000Z"
    },
    "checklist-validasi-ide-inovasi": {
      id: "8",
      slug: "checklist-validasi-ide-inovasi",
      title: "Checklist Validasi Ide Inovasi Sebelum Submit File Lomba",
      category: "Karya Tulis Ilmiah",
      author: "Raihan Putra",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80",
      excerpt: "Pastikan karya Anda memenuhi seluruh syarat administrasi dan substansi teknis panitia.",
      content: `
        <p className="lead">Banyak tim gugur di babak awal hanya karena kesalahan administrasi sepele. Gunakan checklist ini sebelum klik submit.</p>
        <h3>1. Syarat Formating & Lembar Pengesahan</h3>
        <p>Cek margin, jenis font, ukuran spasi, dan kelengkapan tanda tangan pembimbing serta stempel kampus.</p>
        <h3>2. Cek Plagiarisme & Similarity Index</h3>
        <p>Pastikan skor Turnitin di bawah 20% sebelum mengunggah naskah final.</p>
      `,
      created_at: "2024-05-06T00:00:00.000Z"
    },
    "tips-wawancara-finalis-presentasi": {
      id: "9",
      slug: "tips-wawancara-finalis-presentasi",
      title: "Tips Wawancara Finalis & Presentasi Slide Deck yang Interaktif",
      category: "Tips Lomba",
      author: "Dinda Salsabila",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=400&q=80",
      excerpt: "Teknik menjawab pertanyaan kritis juri dan membuat slide presentasi yang memukau.",
      content: `
        <p className="lead">Babak final adalah ajang membuktikan keaslian dan kedalaman penguasaan materi karya Anda di hadapan dewan penguji.</p>
        <h3>1. Struktur Slide 10-20-30 Rule</h3>
        <p>Maksimal 10 slide, durasi 20 menit, dan ukuran font minimal 30pt agar nyaman dibaca.</p>
        <h3>2. Teknik STAR dalam Menjawab Pertanyaan</h3>
        <p>Jawab pertanyaan juri dengan struktur Situation, Task, Action, dan Result.</p>
      `,
      created_at: "2024-05-05T00:00:00.000Z"
    }
  };

  // Fallback demo blog if not found in DB
  const displayBlog = blog || demoBlogs[slug] || {
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
