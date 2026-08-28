"use client";

import { useState } from "react";
import Image from "next/image";

type Tab = "beranda" | "program" | "mentor" | "kemitraan" | "info-lomba" | "blog" | "tentang-kami";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("blog"); // Defaulting to "blog" for immediate view of the new tab
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to Dark Mode as per premium dark aesthetic
  const [activeTestimonialPage, setActiveTestimonialPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [activeBlogCategory, setActiveBlogCategory] = useState("Semua");
  const [filterTingkat, setFilterTingkat] = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [filterBatas, setFilterBatas] = useState("Semua");
  const [filterPeserta, setFilterPeserta] = useState("Semua");
  const [sortOrder, setSortOrder] = useState("Terbaru");

  // Navigation handlers
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const testimonials = [
    [
      {
        quote: `"Essay Bootcamp membantu saya lolos beasiswa impian! Materinya praktis dan mentornya sangat suportif."`,
        author: "Nabila A.",
        title: "Awardee LPDP 2024",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
      },
      {
        quote: `"KTI Bootcamp memberikan saya fondasi kuat untuk penelitian saya. Highly recommended!"`,
        author: "Raihan P.",
        title: "Mahasiswa S2",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80"
      },
      {
        quote: `"Bisnis Plan Bootcamp membuka cara pandang baru dalam menyusun rencana bisnis yang solid."`,
        author: "Dinda S.",
        title: "Founder, Startup Edu",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
      }
    ],
    [
      {
        quote: `"Materi yang diajarkan sangat sistematis. Saya berhasil menjuarai LKTI Nasional berkat bimbingan di sini."`,
        author: "Arif M.",
        title: "Juara 1 LKTI Nasional",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
      },
      {
        quote: `"Sangat membantu dalam menstrukturkan ide bisnis saya. Penyampaian mentor sangat detail dan aplikatif."`,
        author: "Sarah W.",
        title: "Juara Business Plan UI",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
      },
      {
        quote: `"Komunitasnya sangat aktif. Saya mendapat banyak rekan kolaborasi riset yang satu frekuensi."`,
        author: "Kevin L.",
        title: "Riset Partner",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
      }
    ]
  ];

  const categories = [
    { name: "Semua", icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    )},
    { name: "Karya Tulis Ilmiah", icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )},
    { name: "Esai", icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )},
    { name: "Inovasi & Teknologi", icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )},
    { name: "Bisnis & Kewirausahaan", icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4.67 12.89a4 4 0 11-5.34 0M18 16a2 2 0 012 2v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3a2 2 0 012-2h12z" />
      </svg>
    )},
    { name: "Desain & Media", icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )},
    { name: "Lingkungan & Sosial", icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2a2.5 2.5 0 002.5-2.5V8.145m-1.5 10.3A12.042 12.042 0 1112 21c-4.756 0-8.879-2.738-10.945-6.755" />
      </svg>
    )},
    { name: "Lainnya", icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
      </svg>
    )}
  ];

  const contests = [
    {
      title: "National Essay Competition 2024",
      category: "Esai",
      status: "Pendaftaran Dibuka",
      statusColor: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      image: "/lomba_essay.png",
      level: "Tingkat Nasional",
      description: "Kompetisi esai nasional untuk pelajar dan mahasiswa dengan tema keberlanjutan dan masa depan Indonesia.",
      deadline: "30 Juni 2024",
      target: "Pelajar SMA, Mahasiswa",
      prize: "Rp 25.000.000",
      tags: ["Esai", "Nasional"]
    },
    {
      title: "Indonesia Student Innovation Award 2024",
      category: "Inovasi & Teknologi",
      status: "Pendaftaran Dibuka",
      statusColor: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
      image: "/lomba_inovasi.png",
      level: "Tingkat Nasional",
      description: "Ajang inovasi dan teknologi bagi mahasiswa untuk menciptakan solusi nyata bagi masyarakat.",
      deadline: "15 Juli 2024",
      target: "Mahasiswa (D3, S1)",
      prize: "Rp 50.000.000",
      tags: ["Inovasi", "Teknologi"]
    },
    {
      title: "Business Plan Competition 2024",
      category: "Bisnis & Kewirausahaan",
      status: "Segera Ditutup",
      statusColor: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
      image: "/lomba_bisnis.png",
      level: "Tingkat Nasional",
      description: "Kompetisi rencana bisnis untuk pelajar dan mahasiswa yang memiliki ide bisnis kreatif dan berdampak.",
      deadline: "25 Mei 2024",
      target: "Pelajar SMA, Mahasiswa",
      prize: "Rp 30.000.000",
      tags: ["Bisnis", "Kewirausahaan"]
    },
    {
      title: "National Design Challenge 2024",
      category: "Desain & Media",
      status: "Pendaftaran Dibuka",
      statusColor: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=400&q=80",
      level: "Tingkat Nasional",
      description: "Tantangan desain grafis dan multimedia untuk pelajar dan mahasiswa berbakat dari seluruh Indonesia.",
      deadline: "10 Juli 2024",
      target: "Pelajar SMA, Mahasiswa",
      prize: "Rp 20.000.000",
      tags: ["Desain", "Media"]
    }
  ];

  const teamMembers = [
    {
      name: "Ghifari Haidar",
      role: "Founder & CEO",
      roleColor: "text-brand-primary",
      desc: "Peneliti dan educator dengan fokus pada inovasi pendidikan dan pengembangan talenta.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Nabilah Azzahra",
      role: "Head of Program",
      roleColor: "text-brand-purple",
      desc: "Mengembangkan kurikulum berbasis riset dan kebutuhan industri masa depan.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Raihan Putra",
      role: "Head of Mentorship",
      roleColor: "text-brand-primary",
      desc: "Memimpin program mentorship dan pengembangan mentor di Kayzen Academia.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Aulia Rahma",
      role: "Head of Community",
      roleColor: "text-brand-purple",
      desc: "Membangun komunitas belajar yang suportif dan berdaya bagi seluruh anggota.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Fadly Akbar",
      role: "Head of Partnership",
      roleColor: "text-brand-primary",
      desc: "Menjalin kemitraan strategis dengan institusi pendidikan dan industri.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Dinda Safitri",
      role: "Head of Marketing",
      roleColor: "text-brand-purple",
      desc: "Merancang strategi komunikasi dan pertumbuhan Kayzen Academia.",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "M. Farrel A.",
      role: "Program Specialist",
      roleColor: "text-brand-primary",
      desc: "Merancang dan memastikan program pembelajaran berjalan optimal.",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Salma Nur F.",
      role: "Content & Research",
      roleColor: "text-brand-purple",
      desc: "Mengembangkan konten edukatif berbasis riset terpercaya.",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Alif D. Saputra",
      role: "Tech & Product",
      roleColor: "text-brand-primary",
      desc: "Mengembangkan platform dan teknologi untuk pengalaman belajar terbaik.",
      avatar: "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Rizky Aulia",
      role: "Community Manager",
      roleColor: "text-brand-purple",
      desc: "Mengelola komunitas dan membangun engagement yang bermakna.",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Hasan Basri",
      role: "Design Lead",
      roleColor: "text-brand-primary",
      desc: "Merancang identitas visual dan pengalaman belajar yang inspiratif.",
      avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Nadya Putri",
      role: "Operations Manager",
      roleColor: "text-brand-purple",
      desc: "Memastikan operasional internal berjalan efisien dan terstruktur.",
      avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=150&q=80"
    }
  ];

  // Dynamic filtering of contests
  const filteredContests = contests.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Semua" || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      isDarkMode ? "bg-brand-dark text-white" : "bg-[#FAFBFD] text-gray-800"
    } selection:bg-brand-purple selection:text-white`}>
      {/* HEADER / NAVBAR */}
      <header className={`sticky top-0 z-50 px-6 lg:px-16 py-4 transition-all duration-300 border-b ${
        isDarkMode 
          ? "bg-[#03040b]/95 backdrop-blur-md border-white/5 text-white" 
          : "bg-white/95 backdrop-blur-md border-black/5 text-gray-800"
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleTabChange("beranda")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-lg shadow-brand-primary/20">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <span className={`font-display font-bold text-xl tracking-wider block ${isDarkMode ? "text-white" : "text-[#0e1726]"}`}>KAYZEN</span>
              <span className="text-[10px] tracking-[0.25em] text-brand-primary font-bold block -mt-1">ACADEMIA</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8">
            {[
              { id: "beranda", label: "Beranda" },
              { id: "program", label: "Program" },
              { id: "kemitraan", label: "Kemitraan" },
              { id: "info-lomba", label: "Info Lomba" },
              { id: "blog", label: "Blog" },
              { id: "tentang-kami", label: "Tentang Kami" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as Tab)}
                className={`relative py-2 text-xs lg:text-sm font-medium transition-colors hover:text-brand-primary cursor-pointer ${
                  activeTab === tab.id 
                    ? `${isDarkMode ? "text-white font-semibold" : "text-brand-purple font-semibold"}` 
                    : `${isDarkMode ? "text-brand-muted" : "text-gray-500"}`
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-brand rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Action Buttons & Theme Switcher */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-xl transition-all border cursor-pointer active:scale-95 ${
                isDarkMode 
                  ? "text-yellow-400 border-white/10 hover:bg-white/5 bg-white/[0.02]" 
                  : "text-brand-purple border-gray-200 hover:bg-gray-100 bg-gray-50"
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                // Sun Icon (light mode transition)
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707-.707m2.828 0l-.707.707M17.657 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
                </svg>
              ) : (
                // Moon Icon (dark mode transition)
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646" />
                </svg>
              )}
            </button>

            <button className={`hidden sm:inline-block px-5 py-2 text-sm font-semibold rounded-xl transition-all ${
              isDarkMode 
                ? "text-white border border-white/10 hover:bg-white/5" 
                : "text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}>
              Masuk
            </button>
            <button className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-brand rounded-xl shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Daftar Gratis
            </button>
          </div>
        </div>
      </header>

      {/* DYNAMIC CONTENT */}
      <main className="flex-grow">
        
        {/* ==================== TAB 1: BERANDA ==================== */}
        {activeTab === "beranda" && (
          <div className="space-y-24 pb-24">
            {/* HERO SECTION */}
            <section className="relative pt-12 md:pt-20 px-6 lg:px-16 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Text Content */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-primary/15 text-brand-primary border border-brand-primary/30 tracking-wider">
                    BELAJAR HARI INI, BERINOVASI UNTUK ESOK
                  </span>
                  
                  <h1 className={`font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    Tulis Ide.<br />
                    Riset Solusi.<br />
                    <span className="text-gradient">Ciptakan Inovasi.</span>
                  </h1>

                  <p className={`text-base sm:text-lg max-w-xl leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                    Kayzen Academia memberdayakan pelajar dan mahasiswa melalui kepenulisan ilmiah dan inovasi untuk menghasilkan karya berkualitas yang memberi dampak nyata.
                  </p>

                  {/* Trust indicator */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
                    <div className="flex -space-x-3">
                      {[
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                      ].map((src, i) => (
                        <div key={i} className={`relative w-10 h-10 rounded-full border-2 overflow-hidden ${isDarkMode ? "border-brand-dark" : "border-white"}`}>
                          <Image src={src} alt="Student avatar" fill className="object-cover" />
                        </div>
                      ))}
                      <div className="w-10 h-10 rounded-full border-2 border-brand-dark bg-gradient-purple flex items-center justify-center text-xs font-bold text-white">
                        2K+
                      </div>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                        Ribuan pelajar dan mahasiswa
                      </p>
                      <p className={`text-xs ${isDarkMode ? "text-brand-muted" : "text-gray-400"}`}>
                        telah berkembang bersama Kayzen Academia.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Image Graphic */}
                <div className="lg:col-span-5 relative w-full aspect-square sm:max-w-md lg:max-w-none mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-brand-purple/20 rounded-3xl blur-2xl opacity-50" />
                  <div className={`relative w-full h-full border rounded-3xl overflow-hidden shadow-2xl ${isDarkMode ? "border-white/10 shadow-black/60 bg-brand-card" : "border-gray-200/60 shadow-gray-200 bg-white"}`}>
                    <Image
                      src="/hero_students.png"
                      alt="Kayzen Academia Students holding trophy"
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* HIGHLIGHTS SECTION */}
            <section className="px-6 lg:px-16">
              <div className="max-w-7xl mx-auto">
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-2xl border ${
                  isDarkMode 
                    ? "glassmorphism border-white/5" 
                    : "bg-white border-gray-100 shadow-sm shadow-gray-100/50"
                }`}>
                  {[
                    {
                      title: "Kepemimpinan Riset",
                      desc: "Belajar menyusun ide, merancang riset, dan menulis ilmiah.",
                      icon: (
                        <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" />
                        </svg>
                      )
                    },
                    {
                      title: "Belajar Fleksibel",
                      desc: "Belajar kapan saja, di mana saja sesuai waktumu.",
                      icon: (
                        <svg className="w-6 h-6 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )
                    },
                    {
                      title: "Sertifikat",
                      desc: "Dapatkan sertifikat untuk meningkatkan portofolio dan kariermu.",
                      icon: (
                        <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      )
                    },
                    {
                      title: "Komunitas Aktif",
                      desc: "Bergabung dengan komunitas pelajar dan bertumbuh bersama.",
                      icon: (
                        <svg className="w-6 h-6 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 025.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      )
                    }
                  ].map((hl, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-black/[0.02] transition-colors">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center ${
                        isDarkMode ? "bg-white/[0.04] border-white/5" : "bg-gray-50 border-gray-100"
                      }`}>
                        {hl.icon}
                      </div>
                      <div className="space-y-1 text-left">
                        <h4 className={`font-semibold text-sm ${isDarkMode ? "text-white" : "text-gray-800"}`}>{hl.title}</h4>
                        <p className={`text-xs leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>{hl.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* POPULAR PROGRAMS SECTION */}
            <section className="px-6 lg:px-16">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-3">
                  <h2 className={`font-display text-3xl font-extrabold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Program Populer</h2>
                  <p className={`max-w-xl mx-auto text-sm ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                    Temukan program favorit kami dan mulai perjalanan kepenulisanmu sekarang.
                  </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Essay Bootcamp */}
                  <div className={`rounded-2xl overflow-hidden flex flex-col group border ${
                    isDarkMode ? "glassmorphism-card border-white/5" : "bg-white border-gray-100 shadow-sm"
                  }`}>
                    <div className="relative aspect-video w-full overflow-hidden bg-brand-card">
                      <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[10px] font-bold bg-brand-primary text-white uppercase tracking-wider">
                        Terlaris
                      </span>
                      <Image
                        src="/essay_program.png"
                        alt="Essay Bootcamp"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-2 text-left">
                        <h3 className={`font-display font-bold text-base leading-snug group-hover:text-brand-primary transition-colors ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                          Essay Bootcamp
                        </h3>
                        <p className={`text-xs leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                          Pelajari teknik menulis esai yang kuat, kritis, dan persuasif untuk kompetisi, beasiswa, dan publikasi.
                        </p>
                      </div>
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between text-xs border-b border-white/5 pb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full relative overflow-hidden bg-brand-dark">
                              <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" alt="Jane Cooper" fill className="object-cover" />
                            </div>
                            <span className="text-brand-muted font-medium text-[11px]">Jane Cooper</span>
                          </div>
                          <div className="flex items-center gap-1 text-amber-400">
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                            <span className={`font-bold text-[11px] ${isDarkMode ? "text-white" : "text-gray-700"}`}>4.8 <span className="text-brand-muted font-normal">(120)</span></span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-brand-muted">12 Materi</span>
                          <span className={`font-bold text-sm ${isDarkMode ? "text-white" : "text-brand-purple"}`}>Rp49.000</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* KTI Bootcamp */}
                  <div className={`rounded-2xl overflow-hidden flex flex-col group border ${
                    isDarkMode ? "glassmorphism-card border-white/5" : "bg-white border-gray-100 shadow-sm"
                  }`}>
                    <div className="relative aspect-video w-full overflow-hidden bg-brand-card">
                      <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[10px] font-bold bg-brand-purple text-white uppercase tracking-wider">
                        Populer
                      </span>
                      <Image
                        src="/kti_program.png"
                        alt="KTI Bootcamp"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-2 text-left">
                        <h3 className={`font-display font-bold text-base leading-snug group-hover:text-brand-purple transition-colors ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                          KTI Bootcamp
                        </h3>
                        <p className={`text-xs leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                          Kuasai metodologi penelitian dan penulisan KTI dari awal hingga siap dipresentasikan.
                        </p>
                      </div>
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between text-xs border-b border-white/5 pb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full relative overflow-hidden bg-brand-dark">
                              <Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="Robert Fox" fill className="object-cover" />
                            </div>
                            <span className="text-brand-muted font-medium text-[11px]">Robert Fox</span>
                          </div>
                          <div className="flex items-center gap-1 text-amber-400">
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                            <span className={`font-bold text-[11px] ${isDarkMode ? "text-white" : "text-gray-700"}`}>4.7 <span className="text-brand-muted font-normal">(210)</span></span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-brand-muted">24 Materi</span>
                          <span className={`font-bold text-sm ${isDarkMode ? "text-white" : "text-brand-purple"}`}>Rp59.000</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bisnis Plan */}
                  <div className={`rounded-2xl overflow-hidden flex flex-col group border ${
                    isDarkMode ? "glassmorphism-card border-white/5" : "bg-white border-gray-100 shadow-sm"
                  }`}>
                    <div className="relative aspect-video w-full overflow-hidden bg-brand-card">
                      <Image
                        src="/bisnis_plan.png"
                        alt="Bisnis Plan"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-2 text-left">
                        <h3 className={`font-display font-bold text-base leading-snug group-hover:text-brand-primary transition-colors ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                          Bisnis Plan
                        </h3>
                        <p className={`text-xs leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                          Susun rencana bisnis yang solid, inovatif, dan siap menarik investor atau pendanaan.
                        </p>
                      </div>
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between text-xs border-b border-white/5 pb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full relative overflow-hidden bg-brand-dark">
                              <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Brooklyn Simmons" fill className="object-cover" />
                            </div>
                            <span className="text-brand-muted font-medium text-[11px]">Brooklyn Simmons</span>
                          </div>
                          <div className="flex items-center gap-1 text-amber-400">
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                            <span className={`font-bold text-[11px] ${isDarkMode ? "text-white" : "text-gray-700"}`}>4.6 <span className="text-brand-muted font-normal">(90)</span></span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-brand-muted">18 Materi</span>
                          <span className={`font-bold text-sm ${isDarkMode ? "text-white" : "text-brand-purple"}`}>Rp49.000</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Startup Builder */}
                  <div className={`rounded-2xl overflow-hidden flex flex-col opacity-80 hover:opacity-100 transition-opacity border ${
                    isDarkMode ? "glassmorphism-card border-white/5" : "bg-white border-gray-100 shadow-sm"
                  }`}>
                    <div className="relative aspect-video w-full overflow-hidden bg-brand-card">
                      <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[10px] font-bold bg-white/10 text-white uppercase tracking-wider">
                        Coming Soon
                      </span>
                      <Image
                        src="/startup_builder.png"
                        alt="Startup Builder"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-2 text-left">
                        <h3 className={`font-display font-bold text-base leading-snug ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                          Startup Builder
                        </h3>
                        <p className={`text-xs leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                          Bangun dan kembangkan ide startup-mu dari nol hingga siap diluncurkan.
                        </p>
                      </div>
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-2 text-xs text-brand-muted border-t border-white/5 pt-3">
                          <svg className="w-4 h-4 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Segera Hadir</span>
                        </div>
                        <button disabled className="w-full py-2.5 text-xs text-center font-bold text-white/50 bg-white/5 rounded-xl cursor-not-allowed">
                          Coming Soon
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* View All Button */}
                <div className="flex justify-center pt-4">
                  <button
                    onClick={() => handleTabChange("program")}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-semibold transition-all group cursor-pointer ${
                      isDarkMode ? "bg-white/5 hover:bg-white/10 border-white/10 text-white" : "bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-800"
                    }`}
                  >
                    Lihat Semua Program
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </section>

            {/* ABOUT SECTION */}
            <section className="px-6 lg:px-16 relative">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                {/* Left Side: Stats and Info */}
                <div className="lg:col-span-6 space-y-8">
                  <div className="space-y-4 text-left">
                    <span className="text-xs font-semibold text-brand-primary tracking-widest uppercase block">
                      Tentang Kayzen Academia
                    </span>
                    <h2 className={`font-display text-3xl sm:text-4xl font-extrabold leading-tight ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                      Mendorong Kepenulisan Ilmiah dan Inovasi untuk Perubahan
                    </h2>
                    <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                      Kami percaya setiap ide yang ditulis dengan baik dapat menjadi awal dari inovasi besar. Kayzen Academia hadir untuk membekali pelajar dan mahasiswa dengan kompetensi riset, penulisan ilmiah, dan inovasi yang relevan dengan tantangan dunia nyata.
                    </p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 text-left">
                    {[
                      { num: "2K+", label: "Pelajar Aktif" },
                      { num: "50+", label: "Mentor Ahli" },
                      { num: "30+", label: "Program" },
                      { num: "95%", label: "Tingkat Kepuasan" }
                    ].map((stat, i) => (
                      <div key={i} className="space-y-1">
                        <div className="font-display font-extrabold text-2xl sm:text-3xl text-gradient">{stat.num}</div>
                        <div className={`text-[10px] uppercase tracking-wider font-bold ${isDarkMode ? "text-brand-muted" : "text-gray-400"}`}>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: Visual */}
                <div className="lg:col-span-6 relative flex flex-col gap-6">
                  <div className={`relative w-full aspect-[4/3] rounded-3xl overflow-hidden border ${isDarkMode ? "border-white/5 bg-brand-card" : "border-gray-100 bg-gray-50"}`}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark to-transparent z-10 opacity-30" />
                    <Image
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                      alt="Students collaborating"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Quote block */}
                  <div className={`p-6 rounded-2xl border relative -mt-12 sm:-mt-16 mx-4 z-20 shadow-xl ${
                    isDarkMode ? "glassmorphism border-white/10 text-white" : "bg-white border-gray-200 text-gray-800"
                  }`}>
                    <svg className="w-8 h-8 text-brand-primary opacity-30 absolute top-4 left-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.85h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.85h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-xs sm:text-sm italic relative pl-8 leading-relaxed text-left">
                      Kayzen Academia membekali saya dengan keterampilan menulis ilmiah dan berinovasi untuk mewujudkan ide menjadi solusi nyata.
                    </p>
                    <div className="text-[10px] text-brand-muted font-semibold mt-4 text-right">
                      — Alif D., Mahasiswa
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CALL TO ACTION (CTA) SECTION */}
            <section className="px-6 lg:px-16">
              <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-brand p-8 sm:p-12 relative overflow-hidden shadow-2xl shadow-brand-primary/20">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-purple/20 rounded-full blur-2xl" />

                <div className="relative z-10 text-center space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 mx-auto flex items-center justify-center border border-white/20">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-4-9 4 9 5zm0 0l-9-4.243V17a4 4 0 004 4h10a4 4 0 004-4v-6.243L12 14z" />
                    </svg>
                  </div>
                  
                  <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight max-w-xl mx-auto">
                    Mulai Perjalananmu Sekarang
                  </h2>
                  
                  <p className="text-white/80 max-w-lg mx-auto text-sm leading-relaxed">
                    Akses kelas berkualitas dan kembangkan kemampuan menulismu untuk masa depan yang lebih baik.
                  </p>

                  <div className="space-y-3 pt-2">
                    <button className="px-8 py-4 bg-white text-brand-primary font-bold text-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all inline-flex items-center gap-2 group cursor-pointer">
                      Mulai Gratis Sekarang
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                    <p className="text-xs text-white/60">Tidak perlu kartu kredit</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================== TAB 2: PROGRAM ==================== */}
        {activeTab === "program" && (
          <div className="space-y-20 pb-24">
            
            {/* HERO SECTION */}
            <section className="relative pt-12 md:pt-16 px-6 lg:px-16 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="max-w-7xl mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-purple uppercase tracking-wider mb-6">
                  <span className="cursor-pointer hover:text-brand-primary text-left" onClick={() => handleTabChange("beranda")}>Program</span>
                  <span className="text-gray-400">&gt;</span>
                  <span className="text-brand-muted">Bootcamp</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Text Content */}
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <h1 className={`font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                      Bootcamp Intensif untuk<br />
                      Upgrade Skill, Bangun Portofolio,<br />
                      <span className="text-gradient">dan Siap Berkarya</span>
                    </h1>

                    <p className={`text-sm sm:text-base max-w-2xl leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                      Program pembelajaran intensif dan terstruktur yang dirancang bersama mentor ahli industri untuk membantumu menguasai skill relevan dan siap menghadapi dunia nyata.
                    </p>

                    {/* Highlights horizontal bar */}
                    <div className="grid grid-cols-2 gap-6 pt-4 sm:flex sm:flex-wrap">
                      {[
                        { title: "Belajar Praktis", desc: "Proyek nyata dan studi kasus relevan." },
                        { title: "Mentor Ahli", desc: "Dibimbing langsung oleh praktisi." },
                        { title: "Sertifikat", desc: "Dapatkan sertifikat portofolio." },
                        { title: "Komunitas Aktif", desc: "Komunitas belajar suportif." }
                      ].map((hl, i) => (
                        <div key={i} className="flex gap-3 max-w-[200px]">
                          <div className="flex-shrink-0 mt-1">
                            <span className="flex w-2.5 h-2.5 rounded-full bg-gradient-brand" />
                          </div>
                          <div>
                            <h4 className={`text-xs font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{hl.title}</h4>
                            <p className={`text-[10px] leading-snug mt-0.5 ${isDarkMode ? "text-brand-muted" : "text-gray-400"}`}>{hl.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Graphic Image */}
                  <div className="lg:col-span-5 relative w-full aspect-video sm:max-w-md lg:max-w-none mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 to-brand-purple/10 rounded-3xl blur-2xl opacity-50" />
                    <div className={`relative w-full h-full border rounded-3xl overflow-hidden shadow-2xl ${isDarkMode ? "border-white/10 bg-brand-card shadow-black/60" : "border-gray-200 bg-white shadow-gray-200"}`}>
                      <Image
                        src="/program_hero_students.png"
                        alt="Students collaborating on laptop"
                        fill
                        priority
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* PROGRAM BOOTCAMP KAMI */}
            <section className="px-6 lg:px-16">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-3">
                  <h2 className={`font-display text-3xl font-extrabold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Program Bootcamp Kami</h2>
                  <div className="w-16 h-[3px] bg-gradient-brand mx-auto rounded-full" />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* Essay Bootcamp */}
                  <div className={`rounded-2xl overflow-hidden flex flex-col group border ${
                    isDarkMode ? "glassmorphism-card border-white/5 hover:border-brand-purple/30" : "bg-white border-gray-100 shadow-sm"
                  }`}>
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-card">
                      <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[10px] font-bold bg-brand-purple text-white uppercase tracking-wider">
                        Popular
                      </span>
                      <Image
                        src="/essay_vector.png"
                        alt="Essay Bootcamp"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between space-y-5">
                      <div className="space-y-2 text-left">
                        <h3 className={`font-display font-bold text-base leading-snug group-hover:text-brand-purple transition-colors ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                          Essay Bootcamp
                        </h3>
                        <p className={`text-xs leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                          Kuasai teknik menulis essay yang terstruktur, argumentatif, dan berdampak untuk beasiswa, kompetisi, dan publikasi.
                        </p>
                      </div>
                      
                      {/* Specs */}
                      <div className="space-y-2.5 pt-2 text-xs border-t border-white/5 text-left">
                        <div className="flex items-center gap-2.5 text-brand-muted">
                          <svg className="w-4 h-4 text-brand-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>8 Modul</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-brand-muted">
                          <svg className="w-4 h-4 text-brand-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>4 Minggu</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-brand-muted">
                          <svg className="w-4 h-4 text-brand-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <span>Sertifikat Kelulusan</span>
                        </div>
                      </div>

                      <button className="w-full py-2.5 text-xs text-center font-bold text-white border border-brand-purple/40 hover:bg-brand-purple/10 bg-brand-purple/5 rounded-xl transition-all inline-flex items-center justify-center gap-1.5 group/btn cursor-pointer">
                        Learn more
                        <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* KTI Bootcamp */}
                  <div className={`rounded-2xl overflow-hidden flex flex-col group border ${
                    isDarkMode ? "glassmorphism-card border-white/5 hover:border-brand-primary/30" : "bg-white border-gray-100 shadow-sm"
                  }`}>
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-card">
                      <Image
                        src="/kti_vector.png"
                        alt="KTI Bootcamp"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between space-y-5">
                      <div className="space-y-2 text-left">
                        <h3 className={`font-display font-bold text-base leading-snug group-hover:text-brand-primary transition-colors ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                          KTI Bootcamp
                        </h3>
                        <p className={`text-xs leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                          Pelajari metodologi penelitian, penulisan karya tulis ilmiah, hingga publikasi yang sistematis dan sesuai standar akademik.
                        </p>
                      </div>
                      
                      {/* Specs */}
                      <div className="space-y-2.5 pt-2 text-xs border-t border-white/5 text-left">
                        <div className="flex items-center gap-2.5 text-brand-muted">
                          <svg className="w-4 h-4 text-brand-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>10 Modul</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-brand-muted">
                          <svg className="w-4 h-4 text-brand-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>5 Minggu</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-brand-muted">
                          <svg className="w-4 h-4 text-brand-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <span>Sertifikat Kelulusan</span>
                        </div>
                      </div>

                      <button className="w-full py-2.5 text-xs text-center font-bold text-white border border-brand-primary/40 hover:bg-brand-primary/10 bg-brand-primary/5 rounded-xl transition-all inline-flex items-center justify-center gap-1.5 group/btn cursor-pointer">
                        Learn more
                        <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Bisnis Plan */}
                  <div className={`rounded-2xl overflow-hidden flex flex-col group border ${
                    isDarkMode ? "glassmorphism-card border-white/5 hover:border-brand-purple/30" : "bg-white border-gray-100 shadow-sm"
                  }`}>
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-card">
                      <Image
                        src="/bisnis_vector.png"
                        alt="Bisnis Plan Bootcamp"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between space-y-5">
                      <div className="space-y-2 text-left">
                        <h3 className={`font-display font-bold text-base leading-snug group-hover:text-brand-purple transition-colors ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                          Bisnis Plan Bootcamp
                        </h3>
                        <p className={`text-xs leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                          Bangun ide bisnis menjadi rencana yang terstruktur, strategic, dan menarik bagi investor.
                        </p>
                      </div>
                      
                      {/* Specs */}
                      <div className="space-y-2.5 pt-2 text-xs border-t border-white/5 text-left">
                        <div className="flex items-center gap-2.5 text-brand-muted">
                          <svg className="w-4 h-4 text-brand-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>8 Modul</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-brand-muted">
                          <svg className="w-4 h-4 text-brand-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>4 Minggu</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-brand-muted">
                          <svg className="w-4 h-4 text-brand-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <span>Sertifikat Kelulusan</span>
                        </div>
                      </div>

                      <button className="w-full py-2.5 text-xs text-center font-bold text-white border border-brand-purple/40 hover:bg-brand-purple/10 bg-brand-purple/5 rounded-xl transition-all inline-flex items-center justify-center gap-1.5 group/btn cursor-pointer">
                        Learn more
                        <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Startup Builder */}
                  <div className={`rounded-2xl overflow-hidden flex flex-col opacity-85 hover:opacity-100 transition-opacity border ${
                    isDarkMode ? "glassmorphism-card border-white/5" : "bg-white border-gray-100 shadow-sm"
                  }`}>
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-card">
                      <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[10px] font-bold bg-white/10 text-white uppercase tracking-wider">
                        Coming Soon
                      </span>
                      <Image
                        src="/startup_vector.png"
                        alt="Startup Builder"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between space-y-5">
                      <div className="space-y-2 text-left">
                        <h3 className={`font-display font-bold text-base leading-snug ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                          Startup Builder
                        </h3>
                        <p className={`text-xs leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                          Persiapkan dan bangun startup-mu dari ide, validasi, hingga strategi growth yang berkelanjutan.
                        </p>
                      </div>
                      
                      {/* Specs */}
                      <div className="space-y-2.5 pt-2 text-xs border-t border-white/5 text-left">
                        <div className="flex items-center gap-2.5 text-brand-muted">
                          <svg className="w-4 h-4 text-brand-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Segera Hadir</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-brand-muted">
                          <svg className="w-4 h-4 text-brand-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Coming Soon</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-brand-muted">
                          <svg className="w-4 h-4 text-brand-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <span>Sertifikat Kelulusan</span>
                        </div>
                      </div>

                      <button disabled className="w-full py-2.5 text-xs text-center font-bold text-white/50 bg-white/5 border border-white/5 rounded-xl cursor-not-allowed inline-flex items-center justify-center gap-1.5">
                        Learn more
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* TESTIMONIAL CAROUSEL */}
            <section className="px-6 lg:px-16">
              <div className="max-w-7xl mx-auto space-y-10">
                <div className="text-center space-y-3">
                  <h2 className={`font-display text-3xl font-extrabold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Apa Kata Mereka?</h2>
                  <div className="w-12 h-[3px] bg-gradient-brand mx-auto rounded-full" />
                </div>

                {/* Box */}
                <div className="flex items-center gap-4 relative">
                  <button 
                    onClick={() => setActiveTestimonialPage(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer active:scale-95 transition-all flex-shrink-0 ${
                      isDarkMode ? "border-white/10 text-white hover:bg-brand-primary/20 hover:border-brand-primary" : "border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300"
                    }`}
                  >
                    &lt;
                  </button>

                  <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 w-full p-8 rounded-2xl border ${
                    isDarkMode ? "glassmorphism border-white/5" : "bg-white border-gray-100 shadow-sm"
                  }`}>
                    {testimonials[activeTestimonialPage].map((t, idx) => (
                      <div key={idx} className={`border p-6 rounded-2xl space-y-5 flex flex-col justify-between shadow-xl ${
                        isDarkMode ? "bg-brand-card/50 border-white/5 text-white" : "bg-gray-50/50 border-gray-100 text-gray-700"
                      }`}>
                        <p className="text-xs leading-relaxed italic">
                          {t.quote}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full relative overflow-hidden bg-brand-dark">
                            <Image src={t.avatar} alt={t.author} fill className="object-cover" />
                          </div>
                          <div className="text-left">
                            <h4 className={`text-xs font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{t.author}</h4>
                            <p className="text-[10px] text-brand-muted">{t.title}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setActiveTestimonialPage(prev => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer active:scale-95 transition-all flex-shrink-0 ${
                      isDarkMode ? "border-white/10 text-white hover:bg-brand-primary/20 hover:border-brand-primary" : "border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300"
                    }`}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </section>

            {/* UPGRADE SKILL CTA BANNER */}
            <section className="px-6 lg:px-16">
              <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-brand p-8 sm:p-12 relative overflow-hidden shadow-2xl shadow-brand-primary/20">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-purple/20 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                  <div className="space-y-4 max-w-xl text-left">
                    <h2 className="font-display text-3xl font-extrabold text-white tracking-tight">
                      Siap Upgrade Skill dan Raih Versi Terbaikmu?
                    </h2>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Bergabunglah dengan ribuan pembelajar lainnya di Kayzen Academia Bootcamp.
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    <button className="px-8 py-4 bg-brand-purple text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all inline-flex items-center gap-2 group cursor-pointer">
                      Daftar Sekarang
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ==================== TAB 3: INFO LOMBA ==================== */}
        {activeTab === "info-lomba" && (
          <div className="space-y-20 pb-24">
            
            {/* HERO SECTION */}
            <section className="relative pt-12 md:pt-16 px-6 lg:px-16 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  {/* Text Content */}
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <h1 className={`font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                      Temukan Lomba Terbaik,<br />
                      Wujudkan <span className="text-gradient">Ide Jadi Prestasi</span>
                    </h1>

                    <p className={`text-sm sm:text-base max-w-2xl leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                      Dapatkan informasi lomba terbaru untuk pelajar dan mahasiswa di berbagai bidang. Pilih lomba yang sesuai dengan minatmu, kembangkan potensimu, dan raih pencapaian terbaik.
                    </p>

                    {/* Stats horizontal bar */}
                    <div className="grid grid-cols-3 gap-6 pt-4 max-w-lg">
                      {[
                        { num: "200+", title: "Lomba Aktif", desc: "Diperbarui setiap minggu" },
                        { num: "10.000+", title: "Peserta Terdaftar", desc: "Dari berbagai universitas" },
                        { num: "95%", title: "Peluang Berkembang", desc: "Tingkatkan skill & portofolio" }
                      ].map((stat, i) => (
                        <div key={i} className="space-y-1">
                          <div className="font-display font-extrabold text-2xl text-gradient">{stat.num}</div>
                          <div className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? "text-white" : "text-gray-700"}`}>{stat.title}</div>
                          <p className={`text-[9px] leading-tight ${isDarkMode ? "text-brand-muted" : "text-gray-400"}`}>{stat.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Graphic Image */}
                  <div className="lg:col-span-5 relative w-full aspect-video sm:max-w-md lg:max-w-none mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 to-brand-purple/10 rounded-3xl blur-2xl opacity-50 pointer-events-none" />
                    <div className={`relative w-full h-full border rounded-3xl overflow-hidden shadow-2xl ${isDarkMode ? "border-white/10 bg-brand-card shadow-black/60" : "border-gray-200 bg-white shadow-gray-200"}`}>
                      <Image
                        src="/hero_students.png"
                        alt="Students celebrating with trophy"
                        fill
                        priority
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CATEGORY & FILTERS */}
            <section className="px-6 lg:px-16">
              <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Section Header with Search Bar */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-white/5 pb-6">
                  <div className="space-y-1 text-left">
                    <h2 className={`font-display text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Kategori Lomba</h2>
                  </div>
                  {/* Search Bar */}
                  <div className="relative max-w-md w-full">
                    <input
                      type="text"
                      placeholder="Cari lomba atau kata kunci..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full border px-4 py-3 pl-11 rounded-xl text-xs focus:outline-none focus:ring-1 transition-all ${
                        isDarkMode 
                          ? "bg-brand-card border-white/10 text-white focus:border-brand-primary focus:ring-brand-primary/30 placeholder-brand-muted" 
                          : "bg-white border-gray-200 text-gray-800 focus:border-brand-purple focus:ring-brand-purple/30 placeholder-gray-400"
                      }`}
                    />
                    <svg className="w-4 h-4 text-brand-muted absolute left-4 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Horizontal Category Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                  {categories.map((cat, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveCategory(cat.name)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all cursor-pointer ${
                        activeCategory === cat.name
                          ? isDarkMode 
                            ? "bg-brand-primary/10 border-brand-primary text-brand-primary font-bold shadow-lg shadow-brand-primary/10 scale-[1.03]"
                            : "bg-brand-purple/10 border-brand-purple text-brand-purple font-bold shadow-lg shadow-brand-purple/10 scale-[1.03]"
                          : isDarkMode
                            ? "bg-brand-card/30 border-white/5 text-brand-muted hover:text-white hover:bg-brand-card/50 hover:border-white/10"
                            : "bg-white border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300"
                      }`}
                    >
                      <div className={`p-2.5 rounded-lg mb-2.5 ${activeCategory === cat.name ? "bg-brand-primary text-white" : "bg-white/[0.03]"}`}>
                        {cat.icon}
                      </div>
                      <span className="text-[10px] font-semibold tracking-wide leading-tight">{cat.name}</span>
                    </button>
                  ))}
                </div>

              </div>
            </section>

            {/* LOMBA TERBARU GRID */}
            <section className="px-6 lg:px-16">
              <div className="max-w-7xl mx-auto space-y-8">
                
                <div className="flex items-center justify-between">
                  <h3 className={`font-display text-xl font-bold text-left ${isDarkMode ? "text-white" : "text-gray-800"}`}>Lomba Terbaru</h3>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredContests.length > 0 ? (
                    filteredContests.map((c, i) => (
                      <div key={i} className={`rounded-2xl overflow-hidden flex flex-col group border ${
                        isDarkMode ? "glassmorphism-card border-white/5" : "bg-white border-gray-100 shadow-sm"
                      }`}>
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-card">
                          <span className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider ${c.statusColor}`}>
                            {c.status}
                          </span>
                          <Image
                            src={c.image}
                            alt={c.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                          <div className="space-y-2 text-left">
                            <span className="text-[10px] font-bold text-brand-purple tracking-wide">{c.level}</span>
                            <h4 className={`font-display font-bold text-sm leading-snug group-hover:text-brand-purple transition-colors min-h-[40px] ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                              {c.title}
                            </h4>
                            <p className={`text-[11px] leading-relaxed line-clamp-3 ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                              {c.description}
                            </p>
                          </div>

                          {/* Specifics */}
                          <div className="space-y-2 pt-3 text-[11px] border-t border-white/5 text-left text-brand-muted">
                            <div className="flex items-center gap-2">
                              <svg className="w-3.5 h-3.5 text-brand-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>Batas Daftar: {c.deadline}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <svg className="w-3.5 h-3.5 text-brand-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span>{c.target}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <svg className="w-3.5 h-3.5 text-brand-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                              </svg>
                              <span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Total Hadiah: {c.prize}</span>
                            </div>
                          </div>

                          {/* Tags & Action Button */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex gap-1.5">
                              {c.tags.map((tag, idx) => (
                                <span key={idx} className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-white/[0.04] text-brand-muted border border-white/5">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <button className="px-3.5 py-1.5 rounded-lg border border-brand-purple/40 text-[10px] font-bold text-white hover:bg-brand-purple/10 transition-all inline-flex items-center gap-1 group/btn cursor-pointer">
                              Learn more
                              <svg className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-4 py-16 text-center space-y-3">
                      <p className="text-brand-muted text-sm">Tidak ada info lomba yang cocok.</p>
                    </div>
                  )}
                </div>

              </div>
            </section>

          </div>
        )}

        {/* ==================== TAB 4: TENTANG KAMI ==================== */}
        {activeTab === "tentang-kami" && (
          <div className="space-y-20 pb-24">
            
            {/* HERO SECTION */}
            <section className="relative pt-12 md:pt-16 px-6 lg:px-16 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  {/* Text Content */}
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <h1 className={`font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                      Tim di Balik<br />
                      <span className="text-gradient">Kayzen Academia</span>
                    </h1>

                    <p className={`text-sm sm:text-base max-w-2xl leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                      Kami adalah pendidik, peneliti, dan praktisi yang percaya bahwa pengetahuan dan inovasi dapat mengubah dunia. Bersama, kami berkomitmen mendampingi setiap ide menjadi karya berdampak nyata.
                    </p>

                    {/* Stats horizontal bar */}
                    <div className="grid grid-cols-4 gap-4 pt-4 max-w-xl">
                      {[
                        { num: "50+", label: "Member Tim" },
                        { num: "20+", label: "Mentor Ahli" },
                        { num: "5+", label: "Tahun Pengalaman" },
                        { num: "1 Tujuan", label: "Menciptakan Inovasi Berdampak", isHighlight: true }
                      ].map((stat, i) => (
                        <div key={i} className="space-y-1">
                          <div className={`font-display font-extrabold text-xl sm:text-2xl ${stat.isHighlight ? "text-brand-primary" : isDarkMode ? "text-white" : "text-gray-800"}`}>
                            {stat.num}
                          </div>
                          <div className="text-[9px] uppercase tracking-wider text-brand-muted font-bold leading-tight">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Graphic Image */}
                  <div className="lg:col-span-5 relative w-full aspect-video sm:max-w-md lg:max-w-none mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 to-brand-purple/10 rounded-3xl blur-2xl opacity-50 pointer-events-none" />
                    <div className={`relative w-full h-full border rounded-3xl overflow-hidden shadow-2xl ${isDarkMode ? "border-white/10 bg-brand-card shadow-black/60" : "border-gray-200 bg-white shadow-gray-200"}`}>
                      <Image
                        src="/program_hero_students.png"
                        alt="Kayzen Academia Team working"
                        fill
                        priority
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* VALUES SECTION ("Nilai yang Kami Pegang") */}
            <section className="px-6 lg:px-16">
              <div className="max-w-7xl mx-auto space-y-10">
                <div className="text-center space-y-3">
                  <h2 className={`font-display text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Nilai yang Kami Pegang</h2>
                  <div className="w-12 h-[3px] bg-gradient-brand mx-auto rounded-full" />
                </div>

                {/* Horizontal row of 5 value cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                  {[
                    {
                      title: "Inovatif",
                      desc: "Selalu mencari cara baru untuk menciptakan solusi dan peluang.",
                      icon: (
                        <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      )
                    },
                    {
                      title: "Ilmiah",
                      desc: "Mengutamakan pendekatan ilmiah dalam setiap program, materi, dan pendampingan.",
                      icon: (
                        <svg className="w-5 h-5 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" />
                        </svg>
                      )
                    },
                    {
                      title: "Kolaboratif",
                      desc: "Bersinergi dan saling mendukung untuk mencapai tujuan bersama.",
                      icon: (
                        <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      )
                    },
                    {
                      title: "Integritas",
                      desc: "Menjunjung tinggi kejujuran, etika, dan tanggung jawab dalam setiap langkah.",
                      icon: (
                        <svg className="w-5 h-5 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                        </svg>
                      )
                    },
                    {
                      title: "Berdampak",
                      desc: "Berkomitmen menghasilkan karya dan inovasi yang bermanfaat luas.",
                      icon: (
                        <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )
                    }
                  ].map((val, i) => (
                    <div key={i} className={`border p-6 rounded-2xl text-center space-y-3.5 hover:bg-brand-card/5 transition-all flex flex-col items-center justify-start ${
                      isDarkMode ? "bg-brand-card/20 border-white/5 text-brand-muted" : "bg-white border-gray-100 text-gray-500 shadow-sm"
                    }`}>
                      <div className="w-10 h-10 rounded-lg bg-white/[0.03] flex items-center justify-center border border-white/5">
                        {val.icon}
                      </div>
                      <div className="space-y-1">
                        <h4 className={`font-semibold text-xs ${isDarkMode ? "text-white" : "text-gray-800"}`}>{val.title}</h4>
                        <p className="text-[10px] leading-relaxed">{val.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* TEAM GRID */}
            <section className="px-6 lg:px-16">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-3">
                  <h2 className={`font-display text-3xl font-extrabold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Tim Kami</h2>
                  <div className="w-16 h-[3px] bg-gradient-brand mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                  {teamMembers.map((member, i) => (
                    <div key={i} className={`rounded-2xl p-5 text-center flex flex-col justify-between items-center space-y-4 border hover:border-brand-primary/20 ${
                      isDarkMode ? "glassmorphism-card border-white/5 text-white" : "bg-white border-gray-100 text-gray-800 shadow-sm"
                    }`}>
                      <div className="relative w-20 h-20 rounded-full overflow-hidden bg-brand-card border border-white/10">
                        <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                      </div>

                      <div className="space-y-1">
                        <h4 className={`font-bold text-xs leading-tight min-h-[32px] flex items-center justify-center ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                          {member.name}
                        </h4>
                        <span className={`text-[10px] font-bold block ${member.roleColor}`}>
                          {member.role}
                        </span>
                        <p className={`text-[10px] leading-relaxed line-clamp-3 pt-1 ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                          {member.desc}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <a href="#" className="text-brand-muted hover:text-brand-primary transition-colors">
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                        <a href="#" className="text-brand-muted hover:text-brand-purple transition-colors">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 00-2-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ==================== TAB 5: KEMITRAAN ==================== */}
        {activeTab === "kemitraan" && (
          <div className="space-y-20 pb-24">
            
            {/* HERO SECTION */}
            <section className="relative pt-12 md:pt-16 px-6 lg:px-16 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  {/* Text Content */}
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <h1 className={`font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                      Bersama, Menciptakan<br />
                      <span className="text-gradient">Dampak yang Lebih Luas</span>
                    </h1>

                    <p className={`text-sm sm:text-base max-w-2xl leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                      Kayzen Academia membuka peluang kemitraan dengan berbagai pihak untuk menghadirkan program, event, dan inisiatif yang bermanfaat bagi pelajar, mahasiswa, dan komunitas akademik.
                    </p>

                    {/* Stats horizontal bar */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 max-w-xl">
                      {[
                        { num: "100+", label: "Mitra Berkolaborasi" },
                        { num: "50+", label: "Program & Event Bersama" },
                        { num: "10.000+", label: "Peserta Terdampak" },
                        { num: "Seluruh Indonesia", label: "Jangkauan Nasional", isHighlight: true }
                      ].map((stat, i) => (
                        <div key={i} className="space-y-1">
                          <div className={`font-display font-extrabold text-lg sm:text-xl ${stat.isHighlight ? "text-brand-primary" : isDarkMode ? "text-white" : "text-gray-800"}`}>
                            {stat.num}
                          </div>
                          <div className="text-[9px] uppercase tracking-wider text-brand-muted font-bold leading-tight">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Graphic Image */}
                  <div className="lg:col-span-5 relative w-full aspect-video sm:max-w-md lg:max-w-none mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 to-brand-purple/10 rounded-3xl blur-2xl opacity-50 pointer-events-none" />
                    <div className={`relative w-full h-full border rounded-3xl overflow-hidden shadow-2xl ${isDarkMode ? "border-white/10 bg-brand-card shadow-black/60" : "border-gray-200 bg-white shadow-gray-200"}`}>
                      <Image
                        src="https://images.unsplash.com/photo-1516880711640-ef7db81be3e1?auto=format&fit=crop&w=800&q=80"
                        alt="Partnership handshake"
                        fill
                        priority
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* PARTNERSHIP TYPES SECTION */}
            <section className="px-6 lg:px-16">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-3">
                  <h2 className={`font-display text-3xl font-extrabold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Sistem Kemitraan Kami</h2>
                  <div className="w-16 h-[3px] bg-gradient-brand mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Card 1 */}
                  <div className={`rounded-3xl p-8 border flex flex-col justify-between space-y-6 text-left ${
                    isDarkMode ? "glassmorphism-card border-white/5 text-white" : "bg-white border-gray-100 shadow-sm"
                  }`}>
                    <div className="space-y-5">
                      <div className="w-14 h-14 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
                        ✉️
                      </div>
                      <div className="space-y-2.5">
                        <h3 className="font-display font-extrabold text-xl">Social Media Partnership</h3>
                        <p className={`text-xs leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                          Bentuk kerja sama antara Kayzen Academia dengan universitas, organisasi, komunitas, atau penyelenggara program untuk memperluas jangkauan informasi dan meningkatkan exposure suatu program melalui media sosial.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider">Cocok untuk:</span>
                        <div className="flex flex-wrap gap-2">
                          {["Universitas", "Organisasi", "Komunitas", "Penyelenggara Program"].map((tag, i) => (
                            <span key={i} className="px-2.5 py-0.5 rounded-md text-[9px] font-bold bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-white/5">
                        <span className="text-[10px] font-bold uppercase tracking-wider">Benefit untuk Partner:</span>
                        <ul className="space-y-2">
                          {[
                            "Meningkatkan exposure dan jangkauan informasi program",
                            "Konten promosi yang kreatif dan relevan",
                            "Menjangkau audiens pelajar dan mahasiswa lebih luas",
                            "Kolaborasi yang fleksibel sesuai kebutuhan"
                          ].map((bf, i) => (
                            <li key={i} className="flex items-center gap-2.5 text-xs">
                              <svg className="w-4 h-4 text-brand-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{bf}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className={`rounded-3xl p-8 border flex flex-col justify-between space-y-6 text-left ${
                    isDarkMode ? "glassmorphism-card border-white/5 text-white" : "bg-white border-gray-100 shadow-sm"
                  }`}>
                    <div className="space-y-5">
                      <div className="w-14 h-14 rounded-full bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple">
                        👥
                      </div>
                      <div className="space-y-2.5">
                        <h3 className="font-display font-extrabold text-xl">Mentorship Partnership</h3>
                        <p className={`text-xs leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                          Bentuk kerja sama untuk menghadirkan program pendampingan yang membantu peserta mengembangkan kompetensi dan mempersiapkan diri menghadapi tujuan akademik.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider">Cocok untuk:</span>
                        <div className="flex flex-wrap gap-2">
                          {["Universitas", "Organisasi", "Komunitas", "Penyelenggara Program"].map((tag, i) => (
                            <span key={i} className="px-2.5 py-0.5 rounded-md text-[9px] font-bold bg-brand-purple/10 text-brand-purple border border-brand-purple/20">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-white/5">
                        <span className="text-[10px] font-bold uppercase tracking-wider">Benefit untuk Partner:</span>
                        <ul className="space-y-2">
                          {[
                            "Program pendampingan berkualitas bersama mentor ahli",
                            "Meningkatkan kompetensi dan daya saing peserta",
                            "Hasil karya dan output yang lebih berdampak",
                            "Reputasi positif melalui program yang bernilai nyata"
                          ].map((bf, i) => (
                            <li key={i} className="flex items-center gap-2.5 text-xs">
                              <svg className="w-4 h-4 text-brand-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{bf}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* COLLABORATION FLOW SECTION */}
            <section className="px-6 lg:px-16">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-3">
                  <h2 className={`font-display text-3xl font-extrabold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Alur Kolaborasi</h2>
                  <div className="w-16 h-[3px] bg-gradient-brand mx-auto rounded-full" />
                </div>

                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 lg:gap-4">
                  {[
                    { num: "1. Konsultasi Awal", desc: "Sampaikan tujuan dan kebutuhan kerja sama." },
                    { num: "2. Perencanaan", desc: "Merancang konsep dan strategi bersama." },
                    { num: "3. Kesepakatan", desc: "Menetapkan ruang lingkup dan peran." },
                    { num: "4. Pelaksanaan", desc: "Menjalankan program sesuai rencana." },
                    { num: "5. Evaluasi & Dampak", desc: "Mengukur dampak kolaborasi." }
                  ].map((step, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center text-center space-y-3 relative group w-full max-w-[200px]">
                      {i < 4 && (
                        <div className={`hidden lg:block absolute top-6 -right-[50%] w-[100%] border-t-2 border-dashed z-0 transition-colors ${
                          isDarkMode ? "border-white/10" : "border-gray-200"
                        }`} />
                      )}
                      
                      <div className={`w-12 h-12 rounded-full border flex items-center justify-center font-bold text-xs relative z-10 transition-all shadow-md ${
                        isDarkMode ? "bg-brand-card border-white/10 text-white" : "bg-white border-gray-200 text-gray-800"
                      }`}>
                        {i + 1}
                      </div>

                      <div className="space-y-1 relative z-10 text-center">
                        <h4 className={`font-bold text-xs leading-tight ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                          {step.num}
                        </h4>
                        <p className={`text-[10px] leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ==================== TAB 6: BLOG ==================== */}
        {activeTab === "blog" && (
          <div className={`space-y-16 pb-24 transition-colors duration-300 ${
            isDarkMode ? "bg-brand-dark text-white" : "bg-[#FAFBFD] text-gray-800"
          }`}>
            
            {/* HERO SECTION */}
            <section className={`relative pt-12 md:pt-16 px-6 lg:px-16 overflow-hidden ${
              isDarkMode 
                ? "bg-gradient-to-b from-brand-purple/5 to-transparent" 
                : "bg-gradient-to-b from-purple-50/40 via-white to-transparent"
            }`}>
              <div className="max-w-7xl mx-auto space-y-12">
                
                {/* Header text */}
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                  <h1 className={`font-display text-4xl sm:text-5xl font-extrabold leading-tight ${
                    isDarkMode ? "text-white" : "text-[#0e1726]"
                  }`}>
                    Wawasan. Inspirasi. Inovasi.<br />
                    <span className="text-gradient">Tanpa Batas.</span>
                  </h1>
                  <p className={`text-xs sm:text-sm max-w-xl mx-auto leading-relaxed ${
                    isDarkMode ? "text-brand-muted" : "text-gray-500"
                  }`}>
                    Temukan artikel seputar pendidikan, riset, pengembangan diri, kompetisi, dan inovasi untuk mendukung perjalanan belajarmu.
                  </p>
                </div>

                {/* 3 Featured Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1 */}
                  <div className={`border rounded-2xl overflow-hidden flex flex-col justify-between group transition-all ${
                    isDarkMode 
                      ? "bg-brand-card/40 border-white/5 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-0.5" 
                      : "bg-white border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-0.5"
                  }`}>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                      <Image
                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80"
                        alt="5 Strategi Belajar"
                        fill
                        className="object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between space-y-4 text-left">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-bold text-gray-400">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">Lifestyle</span>
                            <span>•</span>
                            <span>12 Mei 2024</span>
                          </div>
                          <span>6 min read</span>
                        </div>
                        <h3 className={`font-display font-bold text-sm leading-snug group-hover:text-brand-purple transition-colors ${
                          isDarkMode ? "text-white" : "text-gray-800"
                        }`}>
                          5 Strategi Belajar Efektif untuk Mahasiswa
                        </h3>
                        <p className={`text-[11px] leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                          Tips praktis untuk meningkatkan fokus, manajemen waktu, dan produktivitas.
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-100/10">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full relative overflow-hidden bg-gray-100">
                            <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Jane Cooper" fill className="object-cover" />
                          </div>
                          <span className={`font-semibold text-[10px] ${isDarkMode ? "text-brand-muted" : "text-gray-600"}`}>Jane Cooper</span>
                        </div>
                        <span className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-brand-purple group-hover:text-white transition-colors">
                          &rarr;
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className={`border rounded-2xl overflow-hidden flex flex-col justify-between group transition-all ${
                    isDarkMode 
                      ? "bg-brand-card/40 border-white/5 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-0.5" 
                      : "bg-white border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-0.5"
                  }`}>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                      <Image
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
                        alt="Peran AI"
                        fill
                        className="object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between space-y-4 text-left">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-bold text-gray-400">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-600 border border-purple-100">Riset & Inovasi</span>
                            <span>•</span>
                            <span>8 Mei 2024</span>
                          </div>
                          <span>5 min read</span>
                        </div>
                        <h3 className={`font-display font-bold text-sm leading-snug group-hover:text-brand-purple transition-colors ${
                          isDarkMode ? "text-white" : "text-gray-800"
                        }`}>
                          Peran AI dalam Mengubah Cara Kita Belajar dan Berinovasi
                        </h3>
                        <p className={`text-[11px] leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                          AI bukan hanya tentang teknologi, tapi tentang bagaimana kita memanfaatkannya untuk menciptakan solusi.
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-100/10">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full relative overflow-hidden bg-gray-100">
                            <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Alif D." fill className="object-cover" />
                          </div>
                          <span className={`font-semibold text-[10px] ${isDarkMode ? "text-brand-muted" : "text-gray-600"}`}>Alif D. Saputra</span>
                        </div>
                        <span className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-brand-purple group-hover:text-white transition-colors">
                          &rarr;
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className={`border rounded-2xl overflow-hidden flex flex-col justify-between group transition-all ${
                    isDarkMode 
                      ? "bg-brand-card/40 border-white/5 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-0.5" 
                      : "bg-white border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-0.5"
                  }`}>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                      <Image
                        src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80"
                        alt="Skill yang Dibutuhkan"
                        fill
                        className="object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between space-y-4 text-left">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px] font-bold text-gray-400">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-100">Karier</span>
                            <span>•</span>
                            <span>5 Mei 2024</span>
                          </div>
                          <span>4 min read</span>
                        </div>
                        <h3 className={`font-display font-bold text-sm leading-snug group-hover:text-brand-purple transition-colors ${
                          isDarkMode ? "text-white" : "text-gray-800"
                        }`}>
                          Skill yang Dibutuhkan di Dunia Kerja 2024
                        </h3>
                        <p className={`text-[11px] leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                          Daftar skill penting yang harus kamu kuasai untuk siap menghadapi dunia kerja.
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-100/10">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full relative overflow-hidden bg-gray-100">
                            <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Dinda S." fill className="object-cover" />
                          </div>
                          <span className={`font-semibold text-[10px] ${isDarkMode ? "text-brand-muted" : "text-gray-600"}`}>Dinda Safitri</span>
                        </div>
                        <span className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-brand-purple group-hover:text-white transition-colors">
                          &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* CATEGORIES HORIZONTAL BAR */}
            <section className="px-6 lg:px-16">
              <div className={`max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto pb-4 border-b ${
                isDarkMode ? "border-white/5" : "border-gray-100"
              }`}>
                {["Semua", "Edukasi", "Riset & Inovasi", "Karier", "Kompetisi", "Pengembangan Diri", "Technology"].map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveBlogCategory(cat)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      activeBlogCategory === cat
                        ? "bg-brand-purple text-white shadow-md shadow-brand-purple/10"
                        : isDarkMode
                          ? "bg-white/[0.03] text-brand-muted hover:bg-white/[0.08]"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </section>

            {/* TWO-COLUMN GRID CONTENT */}
            <section className="px-6 lg:px-16">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Left Column: Artikel Terbaru */}
                <div className="lg:col-span-8 space-y-8">
                  <h2 className={`font-display text-xl font-bold text-left ${isDarkMode ? "text-white" : "text-gray-800"}`}>Artikel Terbaru</h2>

                  {/* Main Large Card */}
                  <div className={`border rounded-3xl overflow-hidden group transition-all text-left ${
                    isDarkMode ? "bg-brand-card/30 border-white/5 hover:shadow-black/20" : "bg-white border-gray-100 hover:shadow-xl hover:shadow-gray-200/50"
                  }`}>
                    <div className="relative aspect-[21/9] w-full bg-gray-100 overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80"
                        alt="Canvas & Couture"
                        fill
                        className="object-cover group-hover:scale-102 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400">
                        <span className="px-2.5 py-0.5 rounded bg-purple-50 text-purple-600 border border-purple-100">Fashion</span>
                        <span>•</span>
                        <span>12 Mei 2024</span>
                        <span>•</span>
                        <span>6 min read</span>
                      </div>

                      <div className="space-y-2">
                        <h3 className={`font-display font-extrabold text-xl leading-snug group-hover:text-brand-purple transition-colors ${
                          isDarkMode ? "text-white" : "text-gray-800"
                        }`}>
                          Canvas & Couture: Art-Inspired Runways 2025
                        </h3>
                        <p className={`text-xs leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                          Menggali tren fashion terkini yang terinspirasi dari seni kontemporer dan kreativitas tanpa batas. Temukan bagaimana para desainer terkemuka mengintegrasikan elemen visual lukisan ke dalam mahakarya busana mereka.
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100/10 text-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full relative overflow-hidden bg-gray-100">
                            <Image src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" alt="Ellena Rose" fill className="object-cover" />
                          </div>
                          <div>
                            <h4 className={`font-bold ${isDarkMode ? "text-white" : "text-gray-700"}`}>Ellena Rose</h4>
                            <p className="text-[10px] text-gray-400">Penulis Seni & Mode</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-gray-400 font-medium text-[11px]">
                          <span className="flex items-center gap-1">
                            💬 18
                          </span>
                          <span className="flex items-center gap-1">
                            👁️ 162
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* List of 3 Horizontal Cards */}
                  <div className="space-y-6">
                    {[
                      {
                        title: "Palette & Pattern: Art's Role in Fashion",
                        tag: "Art",
                        tagBg: "bg-blue-50 text-blue-600 border-blue-100",
                        date: "10 Mei 2024",
                        read: "5 min read",
                        comments: 98,
                        views: 162,
                        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80"
                      },
                      {
                        title: "Panduan Lengkap Mengikuti Kompetisi Nasional",
                        tag: "Kompetisi",
                        tagBg: "bg-amber-50 text-amber-600 border-amber-100",
                        date: "9 Mei 2024",
                        read: "4 min read",
                        comments: 98,
                        views: 162,
                        image: "/lomba_inovasi.png"
                      },
                      {
                        title: "Mindset Juara: Kunci Konsistensi dan Disiplin",
                        tag: "Pengembangan Diri",
                        tagBg: "bg-purple-50 text-purple-600 border-purple-100",
                        date: "7 Mei 2024",
                        read: "4 min read",
                        comments: 98,
                        views: 162,
                        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=400&q=80"
                      }
                    ].map((item, i) => (
                      <div key={i} className={`border p-4 rounded-2xl flex gap-4 sm:gap-6 items-center group transition-all text-left ${
                        isDarkMode 
                          ? "bg-brand-card/30 border-white/5 hover:shadow-black/20" 
                          : "bg-white border-gray-100 hover:shadow-lg"
                      }`}>
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-103 transition-transform" />
                        </div>
                        <div className="flex-grow space-y-2">
                          <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400">
                            <span className={`px-2 py-0.5 rounded border ${item.tagBg}`}>{item.tag}</span>
                            <span>•</span>
                            <span>{item.date}</span>
                            <span>•</span>
                            <span>{item.read}</span>
                          </div>
                          <h4 className={`font-display font-bold text-xs sm:text-sm group-hover:text-brand-purple transition-colors leading-snug ${
                            isDarkMode ? "text-white" : "text-gray-800"
                          }`}>
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-3 text-[10px] text-gray-400 font-semibold pt-1">
                            <span>💬 {item.comments}</span>
                            <span>👁️ {item.views}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Grid of Two Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    {/* Card 1 */}
                    <div className={`border rounded-2xl overflow-hidden flex flex-col justify-between group transition-all text-left ${
                      isDarkMode ? "bg-brand-card/30 border-white/5" : "bg-white border-gray-100 hover:shadow-xl"
                    }`}>
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                        <Image
                          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80"
                          alt="Gallery to Garment"
                          fill
                          className="object-cover group-hover:scale-103 transition-transform"
                        />
                      </div>
                      <div className="p-5 space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400">
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">Lifestyle</span>
                            <span>•</span>
                            <span>6 Mei 2024</span>
                          </div>
                          <h4 className={`font-display font-bold text-xs sm:text-sm group-hover:text-brand-purple transition-colors leading-snug ${
                            isDarkMode ? "text-white" : "text-gray-800"
                          }`}>
                            Gallery to Garment: Art Meets Design
                          </h4>
                        </div>
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className={`border rounded-2xl overflow-hidden flex flex-col justify-between group transition-all text-left ${
                      isDarkMode ? "bg-brand-card/30 border-white/5" : "bg-white border-gray-100 hover:shadow-xl"
                    }`}>
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                        <Image
                          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80"
                          alt="Sustainable Eating"
                          fill
                          className="object-cover group-hover:scale-103 transition-transform"
                        />
                      </div>
                      <div className="p-5 space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400">
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-100">Health</span>
                            <span>•</span>
                            <span>5 Mei 2024</span>
                          </div>
                          <h4 className={`font-display font-bold text-xs sm:text-sm group-hover:text-brand-purple transition-colors leading-snug ${
                            isDarkMode ? "text-white" : "text-gray-800"
                          }`}>
                            Sustainable Eating in a Climate-Conscious World
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Column: Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                  
                  {/* Kategori List */}
                  <div className={`border p-6 rounded-3xl space-y-4 shadow-sm text-left ${
                    isDarkMode ? "bg-brand-card/30 border-white/5" : "bg-white border-gray-100"
                  }`}>
                    <h3 className={`font-display text-sm font-extrabold uppercase tracking-wider pb-2 border-b ${
                      isDarkMode ? "text-white border-white/5" : "text-gray-800 border-gray-100"
                    }`}>
                      Kategori
                    </h3>
                    <ul className="space-y-1">
                      {[
                        { name: "Semua Artikel", count: 48 },
                        { name: "Edukasi", count: 12 },
                        { name: "Riset & Inovasi", count: 10 },
                        { name: "Karier", count: 9 },
                        { name: "Kompetisi", count: 9 },
                        { name: "Pengembangan Diri", count: 7 },
                        { name: "Technology", count: 6 },
                        { name: "Lifestyle", count: 5 }
                      ].map((item, i) => (
                        <li key={i}>
                          <button
                            onClick={() => setActiveBlogCategory(item.name === "Semua Artikel" ? "Semua" : item.name)}
                            className="w-full flex items-center justify-between py-2 text-xs font-bold text-gray-500 hover:text-brand-purple transition-all text-left cursor-pointer"
                          >
                            <span>{item.name}</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] ${
                              isDarkMode ? "bg-white/5 border border-white/10 text-white" : "bg-gray-50 border border-gray-100 text-gray-400"
                            }`}>
                              {item.count}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Newsletter Signup widget (Dark Purple Gradient bg) */}
                  <div className="bg-gradient-to-br from-[#120B2F] via-[#2B1B62] to-[#120B2F] text-white p-6 sm:p-8 rounded-3xl space-y-5 text-left relative overflow-hidden shadow-xl shadow-brand-purple/20">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8 blur-xl pointer-events-none" />
                    
                    <div className="space-y-3 relative z-10">
                      <h3 className="font-display font-extrabold text-white text-base leading-snug">
                        Dapatkan Artikel Terbaru
                      </h3>
                      <p className="text-[11px] text-white/80 leading-relaxed">
                        Bergabunglah dengan newsletter kami dan dapatkan artikel inspiratif langsung di email kamu.
                      </p>
                    </div>

                    <div className="space-y-3 relative z-10">
                      <input
                        type="email"
                        placeholder="Masukkan email kamu"
                        className="w-full bg-white/10 border border-white/10 px-4 py-2.5 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none"
                      />
                      <button className="w-full py-2.5 bg-brand-purple hover:bg-purple-600 text-white font-bold text-xs rounded-xl shadow-lg transition-colors cursor-pointer">
                        Berlangganan
                      </button>
                    </div>
                  </div>

                  {/* Populer Minggu Ini widget */}
                  <div className={`border p-6 rounded-3xl space-y-4 shadow-sm text-left ${
                    isDarkMode ? "bg-brand-card/30 border-white/5" : "bg-white border-gray-100"
                  }`}>
                    <h3 className={`font-display text-sm font-extrabold uppercase tracking-wider pb-2 border-b ${
                      isDarkMode ? "text-white border-white/5" : "text-gray-800 border-gray-100"
                    }`}>
                      Populer Minggu Ini
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          num: 1,
                          title: "Bagaimana AI Mengubah Cara Kita Belajar dan Berinovasi",
                          read: "5 min read",
                          image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80"
                        },
                        {
                          num: 2,
                          title: "Panduan Lengkap Mengikuti Kompetisi Nasional",
                          read: "6 min read",
                          image: "/lomba_inovasi.png"
                        },
                        {
                          num: 3,
                          title: "5 Strategi Belajar Efektif untuk Mahasiswa",
                          read: "4 min read",
                          image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=150&q=80"
                        }
                      ].map((item, i) => (
                        <div key={i} className="flex gap-3 group items-center cursor-pointer">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                            <span className="absolute top-0 left-0 bg-brand-purple text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-br-lg">
                              {item.num}
                            </span>
                          </div>
                          <div className="space-y-0.5">
                            <h4 className="font-bold text-gray-700 text-[11px] group-hover:text-brand-purple transition-colors leading-snug line-clamp-2">
                              {item.title}
                            </h4>
                            <span className="text-[9px] text-gray-400 block font-medium">{item.read}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </section>

          </div>
        )}

        {/* TAB PLACEHOLDERS */}
        {activeTab !== "beranda" && activeTab !== "program" && activeTab !== "info-lomba" && activeTab !== "tentang-kami" && activeTab !== "kemitraan" && activeTab !== "blog" && (
          <div className="max-w-7xl mx-auto py-24 px-6 text-center space-y-6">
            <h2 className="font-display text-3xl font-extrabold capitalize">
              Halaman {activeTab.replace("-", " ")}
            </h2>
            <button
              onClick={() => handleTabChange("beranda")}
              className="px-6 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-xl shadow-md hover:bg-blue-600 transition-colors cursor-pointer"
            >
              Kembali ke Beranda
            </button>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#020308] border-t border-white/5 pt-16 pb-8 px-6 lg:px-16 text-xs text-brand-muted">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/5">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="font-display font-bold text-base tracking-wider text-white">KAYZEN ACADEMIA</span>
            </div>
            <p className="leading-relaxed">
              Memberdayakan pelajar dan mahasiswa melalui kepenulisan ilmiah dan inovasi untuk menciptakan karya berkualitas yang memberi dampak nyata.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {["instagram", "linkedin", "youtube", "twitter"].map((soc, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-brand-primary hover:border-brand-primary transition-all">
                  <span className="capitalize text-[10px] font-bold">{soc[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Cols */}
          <div className="md:col-span-2 space-y-4 text-left">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Eksplorasi</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => handleTabChange("program")} className="hover:text-white transition-colors cursor-pointer text-left">Program</button></li>
              <li><button onClick={() => handleTabChange("kemitraan")} className="hover:text-white transition-colors cursor-pointer text-left">Kemitraan</button></li>
              <li><button onClick={() => handleTabChange("blog")} className="hover:text-white transition-colors cursor-pointer text-left">Blog</button></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4 text-left">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Perusahaan</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => handleTabChange("tentang-kami")} className="hover:text-white transition-colors cursor-pointer text-left">Tentang Kami</button></li>
              <li><a href="#" className="hover:text-white transition-colors">Karier</a></li>
              <li><button onClick={() => handleTabChange("blog")} className="hover:text-white transition-colors cursor-pointer text-left">Blog</button></li>
              <li><a href="#" className="hover:text-white transition-colors">Kontak</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-4 text-left">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Bantuan</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:text-white transition-colors">Pusat Bantuan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Langganan Col */}
          <div className="md:col-span-2 space-y-4 text-left">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Langganan</h4>
            <p className="leading-relaxed">Dapatkan tips kepenulisan ilmiah dan inovasi terbaru.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email Anda" className="bg-white/5 border border-white/10 px-3 py-2 rounded-lg text-white focus:outline-none focus:border-brand-primary w-full text-xs" />
              <button className="px-3 bg-brand-primary text-white rounded-lg hover:bg-blue-600 transition-colors">
                &rarr;
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-brand-muted text-left">
          <div>
            &copy; 2026 Kayzen Academia. Semua hak dilindungi.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
