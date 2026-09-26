"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { programDetails } from "@/data/programs";
import Header from "@/components/Header";

export default function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const savedTheme = localStorage.getItem("kayzen_theme");
        if (savedTheme !== null) {
          return savedTheme === "dark";
        }
      } catch (e) {
        console.error(e);
      }
    }
    return false;
  });

  const handleSetIsDarkMode = (val: boolean) => {
    setIsDarkMode(val);
    try {
      localStorage.setItem("kayzen_theme", val ? "dark" : "light");
    } catch (e) {
      console.error(e);
    }
  };

  const [dbProgram, setDbProgram] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/content/programs")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.programs || [];
        const found = list.find((p: any) => p.slug === slug || p.id === slug);
        if (found) {
          const staticDefault = programDetails[slug];
          setDbProgram({
            id: found.id,
            title: found.title || staticDefault?.title,
            badge: (found.category || staticDefault?.badge || "Bootcamp").toUpperCase(),
            badgeColor: staticDefault?.badgeColor || "bg-brand-purple text-white border-brand-purple/40",
            tagline: found.description || staticDefault?.tagline || "Program bootcamp komprehensif di Kayzen Academia.",
            description: found.description || staticDefault?.description || "Program intensif terstruktur bersama mentor ahli.",
            price: found.price || staticDefault?.price || "Gratis",
            rating: staticDefault?.rating || 5.0,
            reviewsCount: staticDefault?.reviewsCount || 1,
            studentsCount: staticDefault?.studentsCount || "10+",
            duration: staticDefault?.duration || "4 Minggu",
            modulesCount: staticDefault?.modulesCount || "8 Modul",
            certificate: staticDefault?.certificate ?? true,
            image: found.image || staticDefault?.image || "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80",
            instructor: {
              name: found.mentor || staticDefault?.instructor?.name || "Tim Mentor Kayzen",
              role: staticDefault?.instructor?.role || "Mentor Expert",
              avatar: staticDefault?.instructor?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
              bio: staticDefault?.instructor?.bio || "Praktisi & mentor ahli di bidangnya."
            },
            benefits: staticDefault?.benefits || [
              "Akses Modul & Materi Pembelajaran HD",
              "Sesi Mentoring & Bedah Proyek",
              "Sertifikat Kelulusan Resmi Kayzen Academia"
            ],
            syllabus: staticDefault?.syllabus || [
              { week: "Minggu 1", title: "Pengenalan & Kerangka Kerja", desc: "Pemahaman fundamental dan teori pendukung." },
              { week: "Minggu 2-3", title: "Praktik & Pendampingan", desc: "Pengerjaan studi kasus dan bimbingan mentor." },
              { week: "Minggu 4", title: "Review & Final Project", desc: "Evaluasi hasil karya dan pemberian sertifikat." }
            ]
          });
        }
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [slug]);

  const program = dbProgram || programDetails[slug];

  if (loading) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center space-y-4 px-6 ${
        isDarkMode ? "bg-brand-dark text-white" : "bg-gray-50 text-gray-900"
      }`}>
        <p className="text-sm font-semibold text-brand-muted">Memuat detail program...</p>
      </div>
    );
  }

  if (!program) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center space-y-6 px-6 ${
        isDarkMode ? "bg-brand-dark text-white" : "bg-gray-50 text-gray-900"
      }`}>
        <h1 className="text-3xl font-bold font-display">Program Tidak Ditemukan</h1>
        <p className={`text-sm max-w-md text-center ${isDarkMode ? "text-brand-muted" : "text-gray-600"}`}>
          Maaf, program bootcamp yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <Link href="/program" className="px-6 py-3 bg-gradient-brand text-white font-bold text-xs rounded-xl shadow-lg">
          ← Kembali ke Daftar Program
        </Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-300 ${
      isDarkMode ? "bg-brand-dark text-white" : "bg-gray-50 text-gray-900"
    }`}>
      {/* HEADER NAVBAR */}
      <Header isDarkMode={isDarkMode} setIsDarkMode={handleSetIsDarkMode} activeTab="program" />

      {/* MAIN CONTENT */}
      <main className="flex-grow pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-8 space-y-12">
          
          {/* Breadcrumb & Back */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <Link
              href="/program"
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                isDarkMode ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-white border-gray-300 text-gray-800 shadow-sm hover:bg-gray-100"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Kembali ke Daftar Program</span>
            </Link>

            <div className={`flex items-center gap-2 text-xs ${isDarkMode ? "text-brand-muted" : "text-gray-600"}`}>
              <Link href="/program" className="hover:text-brand-primary transition-colors">Program</Link>
              <span>&gt;</span>
              <span className="text-brand-purple font-semibold">{program.badge}</span>
            </div>
          </div>

          {/* Hero Detail Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-10 text-left">
              
              <div className="space-y-4">
                <span className={`px-3.5 py-1 rounded-full text-xs font-bold border inline-block ${program.badgeColor}`}>
                  ✨ {program.badge}
                </span>
                
                <h1 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {program.title}
                </h1>

                <p className={`text-base sm:text-lg leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-600"}`}>
                  {program.tagline}
                </p>

                {/* Metrics Bar */}
                <div className={`flex flex-wrap items-center gap-6 text-xs border-y py-4 ${
                  isDarkMode ? "border-white/10 text-brand-muted" : "border-gray-200 text-gray-600"
                }`}>
                  <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                    <span className="text-base">★</span>
                    <span>{program.rating}</span>
                    <span className={isDarkMode ? "text-brand-muted font-normal" : "text-gray-500 font-normal"}>({program.reviewsCount} ulasan)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    <span>{program.studentsCount} Peserta Alumni</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{program.duration}</span>
                  </div>
                </div>
              </div>

              {/* Instructor Card */}
              <div className={`p-6 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center gap-5 ${
                isDarkMode ? "bg-[#090d18] border-white/10" : "bg-white border-gray-200 shadow-md"
              }`}>
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-brand-purple flex-shrink-0">
                  <Image src={program.instructor.avatar} alt={program.instructor.name} fill className="object-cover" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-brand-purple tracking-wider">MENTOR UTAMA PROGRAM</span>
                  <h3 className={`text-base font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{program.instructor.name}</h3>
                  <p className="text-xs text-brand-primary font-semibold">{program.instructor.role}</p>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-600"}`}>{program.instructor.bio}</p>
                </div>
              </div>

              {/* Description & Benefits */}
              <div className="space-y-4">
                <h3 className={`font-display text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Deskripsi & Gambaran Program</h3>
                <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {program.description}
                </p>

                <div className="pt-4">
                  <h4 className={`font-display text-base font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Fasilitas & Manfaat yang Didapatkan:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(program.benefits || []).map((benefit: string, idx: number) => (
                      <div key={idx} className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs font-semibold ${
                        isDarkMode ? "bg-white/5 border-white/5 text-gray-200" : "bg-white border-gray-200 text-gray-800 shadow-sm"
                      }`}>
                        <span className="text-emerald-500 font-bold text-base leading-none">✓</span>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Syllabus Accordion */}
              <div className="space-y-6 pt-4">
                <div className="space-y-1">
                  <h3 className={`font-display text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Silabus & Modul Pembelajaran</h3>
                  <p className={`text-xs ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>Struktur materi terarah untuk memastikan pemahaman maksimal.</p>
                </div>

                <div className="space-y-4">
                  {(program.syllabus || []).map((item: any, idx: number) => (
                    <div key={idx} className={`p-5 rounded-2xl border ${
                      isDarkMode ? "bg-[#090d18] border-white/10" : "bg-white border-gray-200 shadow-sm"
                    }`}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-brand-primary/20 text-brand-primary border border-brand-primary/30 uppercase">
                          {item.week}
                        </span>
                        <h4 className={`font-bold text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>{item.title}</h4>
                      </div>
                      <p className={`text-xs leading-relaxed pl-1 ${isDarkMode ? "text-brand-muted" : "text-gray-600"}`}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Sticky Pricing Card */}
            <div className="lg:col-span-4 sticky top-24 space-y-6">
              <div className={`p-6 rounded-3xl border shadow-2xl space-y-6 ${
                isDarkMode ? "bg-[#090d18] border-white/15 shadow-black/80" : "bg-white border-gray-200 shadow-xl"
              }`}>
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-brand-card border border-white/10">
                  <Image src={program.image} alt={program.title} fill className="object-cover" />
                </div>

                <div className="space-y-1 text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Harga Spesial Batch Terbaru</span>
                  <div className="flex items-baseline gap-3">
                    <span className={`text-3xl font-extrabold font-display ${isDarkMode ? "text-white" : "text-gray-900"}`}>{program.price}</span>
                    {program.originalPrice && (
                      <span className={`text-sm line-through ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{program.originalPrice}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => alert(`Pendaftaran untuk ${program.title} berhasil dipilih!`)}
                    className="w-full py-3.5 text-xs sm:text-sm font-bold text-white bg-gradient-brand rounded-xl shadow-lg shadow-brand-primary/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Daftar Bootcamp Sekarang</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>

                  <button
                    onClick={() => alert("Silakan hubungi admin kami via WhatsApp/Live Chat untuk konsultasi gratis!")}
                    className={`w-full py-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      isDarkMode ? "text-white border-white/15 hover:bg-white/5" : "text-gray-700 border-gray-300 bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    Konsultasi dengan Admin
                  </button>
                </div>

                <div className={`space-y-2 pt-2 border-t text-left text-[11px] ${
                  isDarkMode ? "border-white/10 text-brand-muted" : "border-gray-200 text-gray-600"
                }`}>
                  <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>✓ Garansi Rekaman Pembelajaran HD</div>
                  <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>✓ Sertifikat Berkode QR Resmi</div>
                  <div className={`flex items-center gap-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>✓ Komunitas Diskusi Alumni Selamanya</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#020308] border-t border-white/5 pt-16 pb-8 px-6 lg:px-16 text-xs text-brand-muted">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Kayzen Academia. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <Link href="/program" className="hover:text-white transition-colors">Program</Link>
            <Link href="/daftar" className="hover:text-white transition-colors">Daftar</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
