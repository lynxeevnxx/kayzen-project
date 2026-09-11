"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [blog, setBlog] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("kayzen_theme");
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === "dark");
      } else {
        setIsDarkMode(false);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSetIsDarkMode = (val: boolean) => {
    setIsDarkMode(val);
    try {
      localStorage.setItem("kayzen_theme", val ? "dark" : "light");
    } catch (e) {
      console.error(e);
    }
  };

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
      authorRole: "Founder Kayzen Academia",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      image: "/kti_vector.png",
      readTime: "6 min read",
      excerpt: "Tips praktis merumuskan latar belakang masalah, urgensi riset, dan rumusan masalah yang tajam agar langsung memikat penguji di 3 halaman pertama.",
      content: `
        <p class="lead">Bab Pendahuluan adalah pintu gerbang karya tulis Anda. Dewan juri sering kali menentukan impresi pertama karya ilmiah hanya dari 3 halaman pertama ini.</p>

        <h2>1. Latar Belakang yang Kontekstual & Berbasis Data</h2>
        <p>Hindari pembukaan yang terlalu umum seperti <em>"Indonesia adalah negara kepulauan..."</em>. Mulailah langsung dengan fakta numerik aktual, data BPS/UNESCO, dan urgensi masalah spesifik yang relevan dengan Isu Global & SDGs.</p>

        <h2>2. Identifikasi Gap Penelitian (Research Gap)</h2>
        <p>Tunjukkan secara eksplisit perbedaan antara riset Anda dengan penelitian terdahulu. Jelaskan solusi baru (novelty) atau inovasi teknologi yang Anda tawarkan untuk mengisi celah tersebut.</p>

        <h2>3. Rumusan Masalah yang Spesifik & Terukur</h2>
        <p>Gunakan kata kerja operasional yang tajam seperti <em>menganalisis, menguji efektivitas, atau merancang prototype inovatif</em> agar arah penelitian terukur dengan jelas.</p>

        <h2>4. Manfaat Praktis bagi Masyarakat & Industri</h2>
        <p>Jelaskan secara pragmatis dampak penerapan karya Anda bagi pemangku kepentingan (stakeholder), pemerintah, atau masyarakat sasaran.</p>

        <h2>5. Kesimpulan Bab Pendahuluan & Orisinalitas Gagasan</h2>
        <p>Tutup bab pertama ini dengan rangkuman hipotesis awal dan keunggulan kompetitif inovasi Anda dibanding metode konvensional.</p>
      `,
      created_at: "2024-05-12T00:00:00.000Z"
    },
    "panduan-menyusun-hook-dan-argumentasi-esai": {
      id: "2",
      slug: "panduan-menyusun-hook-dan-argumentasi-esai",
      title: "Panduan Menyusun Hook & Argumentasi Tajam dalam Esai Nasional",
      category: "Esai",
      author: "Nabilah Azzahra",
      authorRole: "Head of Program Kayzen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      image: "/essay_vector.png",
      readTime: "5 min read",
      excerpt: "Cara menyusun gagasan yang terstruktur, persuasif, dan didukung data empiris aktual untuk kompetisi esai nasional.",
      content: `
        <p class="lead">Dalam kompetisi esai, kalimat pertama menentukan apakah esai Anda akan dibaca sampai akhir atau diabaikan juri.</p>

        <h2>1. Membangun Hook yang Berkesan</h2>
        <p>Gunakan statistik mengejutkan, anekdot singkat, atau kontradiksi logis untuk langsung menarik minat pembaca di paragraf pertama.</p>

        <h2>2. Struktur Paragraf Argumentasi (PEEL Method)</h2>
        <p>Terapkan formula <strong>Point</strong> (gagasan utama), <strong>Explanation</strong> (penjelasan logis), <strong>Evidence</strong> (bukti empiris), dan <strong>Link</strong> (kesimpulan paragraf) di setiap argumen inti.</p>

        <h2>3. Penutup yang Persuasif & Call-to-Action</h2>
        <p>Rangkum argumen utama dan berikan refleksi kritis mengenai solusi masa depan yang Anda gagaskan bagi kemajuan bangsa.</p>
      `,
      created_at: "2024-05-10T00:00:00.000Z"
    },
    "pitch-deck-and-financial-model-business-plan": {
      id: "3",
      slug: "pitch-deck-and-financial-model-business-plan",
      title: "Pitch Deck & Financial Model: Struktur Proposal Business Plan",
      category: "Business Plan",
      author: "Raihan Putra",
      authorRole: "Head of Mentorship",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      image: "/bisnis_vector.png",
      readTime: "7 min read",
      excerpt: "Langkah praktis merancang analisis pasar, proyeksi keuangan 3 tahun, dan strategi go-to-market yang investable.",
      content: `
        <p class="lead">Proposal bisnis plan yang berhasil memenangkan kompetisi adalah gabungan dari riset pasar yang realistis dan model keuangan yang logis.</p>

        <h2>1. Validasi Masalah & Target Market (TAM/SAM/SOM)</h2>
        <p>Hitung potensi pasar potensial secara realistis dan bedah persona konsumen utama Anda berdasarkan data lapangan.</p>

        <h2>2. Business Model Canvas (BMC)</h2>
        <p>Petakan sumber pendapatan (revenue stream), struktur biaya (cost structure), value proposition, dan mitra strategis secara komprehensif.</p>

        <h2>3. Proyeksi Keuangan 3 Tahun</h2>
        <p>Sajikan Cash Flow, Break-Even Point (BEP), dan Payback Period dengan rasionalitas tinggi untuk meyakinkan juri dan investor.</p>
      `,
      created_at: "2024-05-08T00:00:00.000Z"
    },
    "panduan-komprehensif-lolos-pendanaan-lkti": {
      id: "4",
      slug: "panduan-komprehensif-lolos-pendanaan-lkti",
      title: "Panduan Komprehensif Lolos Pendanaan & Juara LKTI Tingkat Nasional 2024",
      category: "Karya Tulis Ilmiah",
      author: "Ghifari Haidar",
      authorRole: "Founder Kayzen Academia",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80",
      readTime: "8 min read",
      excerpt: "Pelajari metodologi penelitian kuantitatif/kualitatif, penulisan sitasi akademik yang benar menggunakan Mendeley, hingga tips presentasi memukau.",
      content: `
        <p class="lead">Menjuarai kompetisi LKTI tingkat nasional membutuhkan strategi menyeluruh dari tahap perancangan proposal hingga teknik menjawab pertanyaan juri.</p>

        <h2>1. Memilih Topik Sesuai Subtema Lomba</h2>
        <p>Pastikan karya Anda menjawab salah satu subtema yang ditawarkan panitia dengan pendekatan interdisipliner yang solutif.</p>

        <h2>2. Penggunaan Reference Manager</h2>
        <p>Gunakan Mendeley atau Zotero untuk memastikan manajemen sitasi dan daftar pustaka 100% konsisten sesuai format APA/IEEE.</p>

        <h2>3. Teknik Presentasi & Pembuatan Poster Ilmiah</h2>
        <p>Buat slide presentasi yang visual dan latihan pitching 10 menit bersama tim hingga lancar dan tepat waktu.</p>
      `,
      created_at: "2024-05-12T00:00:00.000Z"
    },
    "cara-efektif-review-literatur-mendeley": {
      id: "5",
      slug: "cara-efektif-review-literatur-mendeley",
      title: "Cara Efektif Review Literatur & Penggunaan Reference Manager (Mendeley/Zotero)",
      category: "Riset & Metodologi",
      author: "Dinda Salsabila",
      authorRole: "Senior Research Mentor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=400&q=80",
      readTime: "5 min read",
      excerpt: "Teknik kompilasi jurnal bereputasi Scopus/Sinta dan pembuatan sitasi otomatis tanpa risiko salah format.",
      content: `
        <p class="lead">Tinjauan pustaka yang kuat dibangun dari jurnal-jurnal bereputasi Scopus/Sinta. Pelajari cara efisien mengelola puluhan referensi dengan alat modern.</p>

        <h2>1. Pencarian Jurnal Terindeks</h2>
        <p>Gunakan Google Scholar, ScienceDirect, dan IEEE Xplore dengan kata kunci Boolean (AND/OR/NOT) untuk hasil yang presisi.</p>

        <h2>2. Pembuatan Matrix Synthesis</h2>
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
      authorRole: "Startup & Innovation Mentor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      image: "/lomba_inovasi.png",
      readTime: "4 min read",
      excerpt: "Cara membagi tugas penulisan, analisis data, dan persiapan berkas pendaftaran secara efisien bagi tim mahasiswa.",
      content: `
        <p class="lead">Kolaborasi tim yang solid adalah kunci utama keberhasilan menyelesaikan karya ilmiah berkualitas tepat sebelum deadline.</p>

        <h2>1. Pembagian Peran Berdasarkan Keahlian</h2>
        <p>Bagi peran antara Ketua (koordinator & penulis utama), Peneliti Data (olah data), dan Designer (formatting & poster).</p>

        <h2>2. Timeline Kerja dengan Kanban Board</h2>
        <p>Gunakan Trello atau Notion untuk memantau progres tiap bab secara real-time dan menghindari penumpukan di menit akhir.</p>
      `,
      created_at: "2024-05-09T00:00:00.000Z"
    },
    "mindset-juara-mengatasi-writers-block": {
      id: "7",
      slug: "mindset-juara-mengatasi-writers-block",
      title: "Mindset Juara: Mengatasi Writer's Block saat Menyusun Executive Summary",
      category: "Esai",
      author: "Nabilah Azzahra",
      authorRole: "Head of Program Kayzen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80",
      readTime: "4 min read",
      excerpt: "Langkah taktis keluar dari kemacetan ide dan menyelesaikan draf pertama karya tulis karya ilmiah.",
      content: `
        <p class="lead">Writer's block sering melanda saat hendak menuliskan kesimpulan atau ringkasan eksekutif. Berikut teknik melewatinya secara efektif.</p>

        <h2>1. Metode Free Writing 15 Menit</h2>
        <p>Tulis semua pikiran tanpa mengedit tata bahasa terlebih dahulu. Pengeditan dilakukan pada sesi terpisah.</p>

        <h2>2. Diskusi & Brainstorming Berpasangan</h2>
        <p>Jelaskan ide Anda secara lisan kepada teman, lalu catat poin penting hasil obrolan tersebut untuk dijadikan draf.</p>
      `,
      created_at: "2024-05-07T00:00:00.000Z"
    },
    "checklist-validasi-ide-inovasi": {
      id: "8",
      slug: "checklist-validasi-ide-inovasi",
      title: "Checklist Validasi Ide Inovasi Sebelum Submit File Lomba",
      category: "Karya Tulis Ilmiah",
      author: "Raihan Putra",
      authorRole: "Head of Mentorship",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80",
      readTime: "6 min read",
      excerpt: "Pastikan karya Anda memenuhi seluruh syarat administrasi dan substansi teknis panitia sebelum diunggah.",
      content: `
        <p class="lead">Banyak tim gugur di babak awal hanya karena kesalahan administrasi sepele. Gunakan checklist ini sebelum klik submit.</p>

        <h2>1. Syarat Formatting & Lembar Pengesahan</h2>
        <p>Cek margin, jenis font, ukuran spasi, dan kelengkapan tanda tangan pembimbing serta stempel kampus.</p>

        <h2>2. Cek Plagiarisme & Similarity Index</h2>
        <p>Pastikan skor Turnitin di bawah 20% sebelum mengunggah naskah final ke portal panitia.</p>
      `,
      created_at: "2024-05-06T00:00:00.000Z"
    },
    "tips-wawancara-finalis-presentasi": {
      id: "9",
      slug: "tips-wawancara-finalis-presentasi",
      title: "Tips Wawancara Finalis & Presentasi Slide Deck yang Interaktif",
      category: "Tips Lomba",
      author: "Dinda Salsabila",
      authorRole: "Senior Research Mentor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=400&q=80",
      readTime: "5 min read",
      excerpt: "Teknik menjawab pertanyaan kritis juri dan membuat slide presentasi yang memukau di panggung final.",
      content: `
        <p class="lead">Babak final adalah ajang membuktikan keaslian dan kedalaman penguasaan materi karya Anda di hadapan dewan penguji.</p>

        <h2>1. Struktur Slide 10-20-30 Rule</h2>
        <p>Maksimal 10 slide, durasi 20 menit, dan ukuran font minimal 30pt agar nyaman dibaca oleh juri.</p>

        <h2>2. Teknik STAR dalam Menjawab Pertanyaan</h2>
        <p>Jawab pertanyaan juri dengan struktur <strong>Situation</strong>, <strong>Task</strong>, <strong>Action</strong>, dan <strong>Result</strong>.</p>
      `,
      created_at: "2024-05-05T00:00:00.000Z"
    }
  };

  // Target active blog detail
  const displayBlog = blog || demoBlogs[slug] || {
    id: "demo",
    slug: "panduan-lengkap-menggunakan-ai-dalam-lkti",
    title: "Panduan Lengkap Menggunakan AI dalam Kepenulisan Karya Tulis Ilmiah (LKTI)",
    category: "Teknologi & AI",
    author: "Dr. Aris Setiawan, M.Sc.",
    authorRole: "Tim Riset Kayzen Academia",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    readTime: "7 min read",
    excerpt: "Bagaimana memanfaatkan Artificial Intelligence secara etis dan efektif untuk riset, literatur review, dan formulasi ide karya ilmiah yang inovatif.",
    content: `
      <p class="lead">Pemanfaatan kecerdasan buatan (Artificial Intelligence) dalam dunia akademis dan riset ilmiah berkembang sangat pesat. Bagi mahasiswa dan pelajar yang ingin menembus kompetisi Karya Tulis Ilmiah (LKTI) nasional maupun internasional, memahami cara kerja AI secara etis dan efisien adalah kunci akselerasi riset.</p>

      <h2>1. Formulasi Ide & Identifikasi Rumusan Masalah</h2>
      <p>Langkah pertama dalam penulisan LKTI adalah menemukan ide yang solutif. AI dapat membantu memetakan isu-isu global terbaru berdasarkan kriteria SDG (Sustainable Development Goals). Gunakan prompt yang spesifik untuk mengeksplorasi gap penelitian (research gap) pada studi terdahulu.</p>

      <h2>2. Studi Literatur & Synthesis Matrix</h2>
      <p>Melakukan pencarian puluhan jurnal internasional sering memakan waktu lama. Dengan alat bantu AI modern, Anda dapat melakukan kategorisasi sitasi, mengekstraksi metodologi penelitian, dan membandingkan hasil temuan antar jurnal secara cepat tanpa kehilangan esensi akademik.</p>

      <h2>3. Etika Akademik & Pencegahan Plagiarisme</h2>
      <p>Pastikan selalu melakukan verifikasi ulang terhadap data, kutipan, dan referensi yang dihasilkan oleh AI. Selalu cantumkan sumber primer dan lakukan pengecekan Turnitin atau Grammarly untuk menjamin keaslian karya tulis Anda.</p>

      <h2>Kesimpulan</h2>
      <p>Integrasi AI yang tepat dapat memangkas waktu riset hingga 50% sekaligus meningkatkan kedalaman analisis ilmiah. Mari jadikan teknologi ini sebagai sarana menciptakan inovasi yang berdampak nyata bagi masyarakat!</p>
    `,
    created_at: new Date().toISOString(),
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${
      isDarkMode ? "bg-[#03040b] text-gray-100" : "bg-[#fcfcfd] text-gray-900"
    }`}>
      <Header isDarkMode={isDarkMode} setIsDarkMode={handleSetIsDarkMode} activeTab="blog" />

      <main className="max-w-4xl mx-auto px-6 py-10 sm:py-14 space-y-10">
        
        {/* TOP NAVIGATION & BREADCRUMB */}
        <div className="flex items-center justify-between">
          <Link
            href="/blog"
            className={`inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl border transition-all cursor-pointer ${
              isDarkMode
                ? "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-brand-purple/40"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-purple-300 shadow-sm"
            }`}
          >
            <span>&larr;</span>
            <span>Kembali ke Artikel Blog</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
              isDarkMode
                ? "bg-brand-purple/20 text-brand-purple border-brand-purple/30"
                : "bg-purple-100 text-purple-700 border-purple-200"
            }`}>
              {displayBlog.category}
            </span>
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
              isDarkMode ? "bg-white/5 border-white/10 text-brand-muted" : "bg-gray-100 border-gray-200 text-gray-500"
            }`}>
              ⏱️ {displayBlog.readTime || "5 min read"}
            </span>
          </div>
        </div>

        {/* HEADER SECTION: TITLE & METADATA */}
        <header className="space-y-6 text-left">
          <h1 className={`font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.2] ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            {displayBlog.title}
          </h1>

          {/* AUTHOR & DATE TOOLBAR */}
          <div className={`flex flex-wrap items-center justify-between gap-4 py-4 px-6 rounded-2xl border ${
            isDarkMode ? "bg-white/[0.02] border-white/10" : "bg-white border-gray-200 shadow-sm"
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden relative border-2 border-brand-purple/40 shadow-md">
                <Image
                  unoptimized
                  src={displayBlog.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                  alt={displayBlog.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className={`text-xs font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{displayBlog.author}</h4>
                <p className={`text-[10px] ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>{displayBlog.authorRole || "Penulis Kayzen Academia"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium">
              <span className={isDarkMode ? "text-brand-muted" : "text-gray-500"}>
                📅 {new Date(displayBlog.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
              </span>

              {/* QUICK SHARE ACTIONS */}
              <div className="flex items-center gap-2 border-l pl-4 border-gray-200/20">
                <button
                  onClick={handleCopyLink}
                  title="Salin Tautan"
                  className={`p-2 rounded-lg border transition-all cursor-pointer text-xs ${
                    copied
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : isDarkMode
                        ? "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {copied ? "✓ Tersalin!" : "🔗 Salin Tautan"}
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${displayBlog.title} - Read more on Kayzen: ${typeof window !== "undefined" ? window.location.href : ""}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all text-xs font-bold"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* HERO COVER IMAGE */}
        <div className={`relative w-full aspect-[16/9] max-h-[480px] rounded-3xl overflow-hidden border shadow-2xl ${
          isDarkMode ? "border-white/10 shadow-black/40" : "border-gray-200 shadow-gray-200/80"
        }`}>
          <Image
            unoptimized
            src={displayBlog.image}
            alt={displayBlog.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* EXCERPT CALLOUT BOX */}
        {displayBlog.excerpt && (
          <div className={`p-6 sm:p-8 rounded-2xl border text-sm sm:text-base leading-relaxed text-left ${
            isDarkMode 
              ? "bg-gradient-to-r from-brand-purple/15 to-brand-primary/10 border-brand-purple/30 text-purple-200" 
              : "bg-purple-50/80 border-purple-200 text-purple-950 font-medium shadow-sm"
          }`}>
            <span className="font-extrabold uppercase tracking-wider text-[11px] block mb-1 opacity-80">💡 Ringkasan Utama:</span>
            <p className="italic font-serif leading-relaxed">&quot;{displayBlog.excerpt}&quot;</p>
          </div>
        )}

        {/* MAIN ARTICLE BODY CONTENT */}
        <article className={`text-left space-y-6 text-base sm:text-lg leading-relaxed ${
          isDarkMode ? "text-gray-200" : "text-gray-800"
        }`}>
          <style jsx global>{`
            .blog-prose h2 {
              font-family: var(--font-display, sans-serif);
              font-weight: 800;
              font-size: 1.35rem;
              line-height: 1.35;
              margin-top: 2rem;
              margin-bottom: 0.75rem;
              color: ${isDarkMode ? "#ffffff" : "#0f172a"};
              border-left: 4px solid #8b5cf6;
              padding-left: 0.75rem;
            }
            .blog-prose h3 {
              font-weight: 700;
              font-size: 1.15rem;
              margin-top: 1.5rem;
              margin-bottom: 0.5rem;
              color: ${isDarkMode ? "#f1f5f9" : "#1e293b"};
            }
            .blog-prose p {
              margin-bottom: 1.25rem;
              line-height: 1.75;
              font-size: 0.95rem;
              color: ${isDarkMode ? "#cbd5e1" : "#334155"};
            }
            .blog-prose p.lead {
              font-size: 1.1rem;
              font-weight: 500;
              line-height: 1.7;
              color: ${isDarkMode ? "#e2e8f0" : "#1e293b"};
            }
            .blog-prose blockquote {
              border-left: 4px solid #3b82f6;
              padding: 1rem 1.25rem;
              margin: 1.5rem 0;
              font-style: italic;
              background-color: ${isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(241,245,249,0.8)"};
              border-radius: 0 0.75rem 0.75rem 0;
              color: ${isDarkMode ? "#e2e8f0" : "#1e293b"};
            }
            .blog-prose ul {
              list-style-type: disc;
              padding-left: 1.5rem;
              margin-bottom: 1.25rem;
            }
            .blog-prose li {
              margin-bottom: 0.5rem;
              font-size: 0.95rem;
            }
          `}</style>
          
          <div className="blog-prose" dangerouslySetInnerHTML={{ __html: displayBlog.content }} />
        </article>

        {/* FOOTER & AUTHOR BIO BANNER */}
        <div className={`p-8 rounded-3xl border text-left space-y-6 ${
          isDarkMode ? "bg-white/[0.02] border-white/10" : "bg-white border-gray-200 shadow-md"
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden relative border-2 border-brand-purple/40 shadow-lg flex-shrink-0">
                <Image
                  unoptimized
                  src={displayBlog.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                  alt={displayBlog.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <h3 className={`font-bold text-sm sm:text-base ${isDarkMode ? "text-white" : "text-gray-900"}`}>{displayBlog.author}</h3>
                <p className={`text-xs ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>{displayBlog.authorRole || "Tim Peneliti & Mentor Kayzen Academia"}</p>
                <p className={`text-[11px] ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Berpengalaman mendampingi ratusan talenta muda menjuarai lomba riset & karya ilmiah.</p>
              </div>
            </div>

            <Link
              href="/program"
              className="px-5 py-3 rounded-xl bg-gradient-brand text-white font-bold text-xs shadow-lg shadow-brand-primary/20 hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
            >
              🚀 Ikuti Bootcamp Kepenulisan
            </Link>
          </div>
        </div>

        {/* RELATED BLOGS RECOMMENDATION */}
        <section className="pt-8 border-t border-gray-200/10 space-y-6 text-left">
          <h3 className={`font-display text-xl font-extrabold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Artikel Terkait Lainnya
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                slug: "5-kunci-utama-menulis-bab-pendahuluan-lkti",
                title: "5 Kunci Utama Menulis Bab Pendahuluan LKTI yang Memikat Dewan Juri",
                category: "Karya Tulis Ilmiah",
                image: "/kti_vector.png",
                date: "12 Mei 2024"
              },
              {
                slug: "panduan-menyusun-hook-dan-argumentasi-esai",
                title: "Panduan Menyusun Hook & Argumentasi Tajam dalam Esai Nasional",
                category: "Esai",
                image: "/essay_vector.png",
                date: "10 Mei 2024"
              },
              {
                slug: "pitch-deck-and-financial-model-business-plan",
                title: "Pitch Deck & Financial Model: Struktur Proposal Business Plan",
                category: "Business Plan",
                image: "/bisnis_vector.png",
                date: "8 Mei 2024"
              }
            ].filter((item) => item.slug !== slug).slice(0, 3).map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className={`group p-4 rounded-2xl border transition-all cursor-pointer ${
                  isDarkMode 
                    ? "bg-brand-card/40 border-white/5 hover:border-brand-purple/40 hover:-translate-y-1" 
                    : "bg-white border-gray-200 hover:border-purple-300 shadow-sm hover:shadow-md hover:-translate-y-1"
                }`}
              >
                <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3 bg-gray-100">
                  <Image unoptimized src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <span className="text-[9px] font-extrabold text-brand-primary uppercase tracking-wider">{item.category}</span>
                <h4 className={`font-bold text-xs mt-1 line-clamp-2 transition-colors ${
                  isDarkMode ? "text-white group-hover:text-brand-purple" : "text-gray-800 group-hover:text-purple-600"
                }`}>
                  {item.title}
                </h4>
                <p className={`text-[10px] mt-2 ${isDarkMode ? "text-brand-muted" : "text-gray-400"}`}>📅 {item.date}</p>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
