"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

type Tab = "beranda" | "program" | "kemitraan" | "info-lomba" | "blog" | "tentang-kami";

interface UserProfile {
  name?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
}

export default function Home({ initialTab }: { initialTab?: Tab }) {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab || "beranda");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("kayzen_theme");
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === "dark");
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
    const timer = setTimeout(() => {
      try {
        const savedUser = localStorage.getItem("kayzen_user");
        if (savedUser) {
          const parsed = JSON.parse(savedUser) as UserProfile;
          setCurrentUser(parsed);
        }
      } catch (e) {
        console.error(e);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("kayzen_user");
    setCurrentUser(null);
    setShowUserDropdown(false);
  };
  const [activeTestimonialPage, setActiveTestimonialPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [activeBlogCategory, setActiveBlogCategory] = useState("Semua");
  const [filterTingkat, setFilterTingkat] = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [filterBatas, setFilterBatas] = useState("Semua");
  const [filterPeserta, setFilterPeserta] = useState("Semua");
  const [sortOrder, setSortOrder] = useState("Terbaru");

  const [selectedContest, setSelectedContest] = useState<any | null>(null);
  const [currentHeroImg, setCurrentHeroImg] = useState(0);
  const [isHeroImgPaused, setIsHeroImgPaused] = useState(false);

  // Live Database Content States
  const [dbContests, setDbContests] = useState<any[]>([]);
  const [dbPrograms, setDbPrograms] = useState<any[]>([]);
  const [dbBlogs, setDbBlogs] = useState<any[]>([]);
  const [dbPartners, setDbPartners] = useState<any[]>([]);
  const [dbTestimonials, setDbTestimonials] = useState<any[]>([]);
  const [dbTeam, setDbTeam] = useState<any[]>([]);

  useEffect(() => {
    const fetchLiveContent = async () => {
      try {
        const [cRes, prgRes, bRes, pRes, tRes, tmRes] = await Promise.all([
          fetch("/api/content/contests"),
          fetch("/api/content/programs"),
          fetch("/api/content/blogs"),
          fetch("/api/content/partners"),
          fetch("/api/content/testimonials"),
          fetch("/api/content/team"),
        ]);

        const cData = await cRes.json();
        const prgData = await prgRes.json();
        const bData = await bRes.json();
        const pData = await pRes.json();
        const tData = await tRes.json();
        const tmData = await tmRes.json();

        if (cData.contests) setDbContests(cData.contests);
        if (prgData.programs) setDbPrograms(prgData.programs);
        if (bData.blogs) setDbBlogs(bData.blogs);
        if (pData.partners) setDbPartners(pData.partners);
        if (tData.testimonials) setDbTestimonials(tData.testimonials);
        if (tmData.teamMembers) setDbTeam(tmData.teamMembers);
      } catch (err) {
        console.error("Fetch live content error:", err);
      }
    };
    fetchLiveContent();
  }, []);

  const heroImages = [
    {
      src: "/hero_students.png",
      alt: "Kayzen Academia Students holding trophy",
      caption: "Prestasi Alumni & Juara Kompetisi"
    },
    {
      src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80",
      alt: "Kolaborasi & Mentorship Riset",
      caption: "Pendampingan Riset 1-on-1"
    },
    {
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80",
      alt: "Diskusi Proposal & Paper Scientific",
      caption: "Publikasi Jurnal & HKI"
    },
    {
      src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80",
      alt: "Workshop & Seminar Interaktif",
      caption: "Bootcamp Kepenulisan Ilmiah"
    }
  ];

  useEffect(() => {
    if (isHeroImgPaused) return;
    const timer = setInterval(() => {
      setCurrentHeroImg((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isHeroImgPaused, heroImages.length]);

  // Program Detail State & Dummy Data
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);

  const programDetails: Record<string, {
    id: string;
    title: string;
    badge: string;
    badgeColor: string;
    tagline: string;
    description: string;
    price: string;
    originalPrice?: string;
    rating: number;
    reviewsCount: number;
    studentsCount: string;
    duration: string;
    modulesCount: string;
    certificate: boolean;
    image: string;
    instructor: {
      name: string;
      role: string;
      avatar: string;
      bio: string;
    };
    benefits: string[];
    syllabus: { week: string; title: string; desc: string; }[];
  }> = {
    "essay-bootcamp": {
      id: "essay-bootcamp",
      title: "Essay Bootcamp: Masterclass Kepenulisan Esai Beasiswa & Lomba",
      badge: "POPULAR BOOTCAMP",
      badgeColor: "bg-brand-purple text-white border-brand-purple/40",
      tagline: "Kuasai teknik menulis essay yang terstruktur, argumentatif, dan persuasif untuk menembus beasiswa dan juara kompetisi nasional.",
      description: "Program bootcamp 4 minggu yang dirancang khusus untuk membantu pelajar dan mahasiswa memahami struktur penulisan esai kritis, teknik menyusun argumen yang logis, hingga trik lolos seleksi beasiswa top dunia.",
      price: "Rp 39.000",
      originalPrice: "Rp 149.000",
      rating: 4.9,
      reviewsCount: 128,
      studentsCount: "850+",
      duration: "4 Minggu (8 Sesi Live)",
      modulesCount: "8 Modul Lengkap",
      certificate: true,
      image: "/essay_vector.png",
      instructor: {
        name: "Dinda Salsabila, M.Sc.",
        role: "Awardee LPDP & Senior Research Mentor",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        bio: "Peneliti dan penerima beasiswa LPDP di University of Edinburgh dengan pengalaman lebih dari 5 tahun membimbing 500+ mahasiswa menjuarai kompetisi esai nasional."
      },
      benefits: [
        "Akses 8 Modul Pembelajaran Video HD & Template Esai",
        "2x Sesi Live Mentoring & Bedah Draf 1-on-1 bersama Mentor",
        "Review & Proofreading Draf Esai hingga Siap Submit",
        "Grup Komunitas Eksklusif Telegram Alumni Bootcamp",
        "Sertifikat Kelulusan Resmi Terverifikasi Kayzen Academia"
      ],
      syllabus: [
        { week: "Minggu 1", title: "Fondasi & Structuring Ide Esai", desc: "Memahami pola pikir juri, menentukan topik kuat, dan membuat outline esai yang sistematis." },
        { week: "Minggu 2", title: "Teknik Argumentasi & Data Synthesis", desc: "Menyusun klaim argumentatif berbasis data ilmiah dan menyintesis referensi tepercaya." },
        { week: "Minggu 3", title: "Hooking Intro & Powerful Conclusion", desc: "Merancang pembuka esai yang memikat (hook) dan penutup yang meninggalkan kesan mendalam." },
        { week: "Minggu 4", title: "Editing, Proofreading & Mock Interview", desc: "Simulasi bedah draf akhir, teknik formatting standar internasional, dan konsultasi siap submit." }
      ]
    },
    "kti-bootcamp": {
      id: "kti-bootcamp",
      title: "KTI Bootcamp: Panduan Lengkap Karya Tulis Ilmiah & Penelitian",
      badge: "MENTORSHIP EXPERT",
      badgeColor: "bg-brand-primary text-white border-brand-primary/40",
      tagline: "Pelajari metodologi penelitian, perancangan proposal riset, hingga teknik publikasi ilmiah terstruktur.",
      description: "Bootcamp intensif 5 minggu untuk membimbing Anda dari tahap perumusan ide riset, peninjauan pustaka (literature review), metodologi kuantitatif/kualitatif, hingga penulisan pembahasan ilmiah yang akurat.",
      price: "Rp 39.000",
      originalPrice: "Rp 199.000",
      rating: 4.8,
      reviewsCount: 94,
      studentsCount: "620+",
      duration: "5 Minggu (10 Sesi Live)",
      modulesCount: "10 Modul Lengkap",
      certificate: true,
      image: "/kti_vector.png",
      instructor: {
        name: "Raihan Putra, S.T., M.Eng.",
        role: "Juara 1 LKTI Nasional & Researcher",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
        bio: "Juara 1 LKTI Nasional UI & Peneliti Terpublikasi Scopus. Berpengalaman membimbing puluhan tim meraih medali PIMNAS dan LKTIN."
      },
      benefits: [
        "Akses 10 Modul Pembelajaran Video HD & Template KTI Standar PIMNAS",
        "Bedah Bab 1 sampai Bab 5 secara berkala tiap minggu",
        "Panduan Olah Data SPSS & Software Reference (Mendeley/Zotero)",
        "Simulasi Presentasi Final & Tanya Jawab Juri",
        "Sertifikat Kelulusan Resmi Terverifikasi Kayzen Academia"
      ],
      syllabus: [
        { week: "Minggu 1", title: "Perumusan Latar Belakang & Novelty Riset", desc: "Menemukan gap penelitian dan merumuskan ide riset yang inovatif serta realistis." },
        { week: "Minggu 2", title: "Tinjauan Pustaka & Sitasi Otomatis", desc: "Teknik kompilasi jurnal dan penggunaan Reference Manager (Mendeley/Zotero)." },
        { week: "Minggu 3", title: "Metodologi Penelitian & Olah Data", desc: "Menentukan metode pengumpulan data dan analisis statistik/kualitatif secara akurat." },
        { week: "Minggu 4", title: "Pembahasan Hasil & Analisis Kritis", desc: "Menyusun bab pembahasan yang tajam dan menghubungkan hasil riset dengan teori pendukung." },
        { week: "Minggu 5", title: "Poster Presentation & Pitching Juri", desc: "Merancang poster ilmiah menarik dan teknik menjawab pertanyaan kritis juri." }
      ]
    },
    "bisnis-plan": {
      id: "bisnis-plan",
      title: "Bisnis Plan Bootcamp: Merancang Proposal Bisnis Inovatif & Investable",
      badge: "STARTUP & PIMNAS",
      badgeColor: "bg-brand-purple text-white border-brand-purple/40",
      tagline: "Susun rencana bisnis yang terstruktur, rasional secara finansial, dan menarik minat juri kompetisi maupun investor.",
      description: "Program bootcamp 4 minggu fokus pada pemetaan ide bisnis (Business Model Canvas), analisis pasar (TAM/SAM/SOM), rencana operasional, serta proyeksi keuangan (financial projection).",
      price: "Rp 39.000",
      originalPrice: "Rp 169.000",
      rating: 4.7,
      reviewsCount: 76,
      studentsCount: "480+",
      duration: "4 Minggu (8 Sesi Live)",
      modulesCount: "8 Modul Lengkap",
      certificate: true,
      image: "/bisnis_vector.png",
      instructor: {
        name: "Muhammad Farhan, S.E.",
        role: "Startup Founder & Awardee Business Plan",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        bio: "Founder EduTech Startup & Winner Business Plan Competition ITB dengan pengalaman pendanaan hibah WMM & Kemendikbud."
      },
      benefits: [
        "Akses Template Business Model Canvas (BMC) & Pitch Deck Pro",
        "Sheet Formula Excel Otomatis untuk Proyeksi Keuangan 3-5 Tahun",
        "Review Proposal Bisnis & Pitch Deck oleh Practitioner Mentor",
        "Sertifikat Kelulusan Resmi Terverifikasi Kayzen Academia"
      ],
      syllabus: [
        { week: "Minggu 1", title: "Validasi Ide & Business Model Canvas", desc: "Merumuskan Value Proposition dan memvalidasi ide bisnis sesuai problem konsumen." },
        { week: "Minggu 2", title: "Market Research & Competitor Analysis", desc: "Menghitung estimasi pasar (TAM, SAM, SOM) dan strategi analisis kompetitor." },
        { week: "Minggu 3", title: "Financial Modeling & Unit Economics", desc: "Penyusunan Cash Flow, COGS, Break-Even Point (BEP), dan proyeksi laba-rugi." },
        { week: "Minggu 4", title: "Pitch Deck Design & Investor Pitching", desc: "Membuat slide presentasi yang memikat dan teknik penyampaian pitching 3 menit." }
      ]
    },
    "startup-builder": {
      id: "startup-builder",
      title: "Startup Builder Cohort: Dari Validasi Ide hingga Initial Growth",
      badge: "INCUBATION PROGRAM",
      badgeColor: "bg-emerald-500 text-white border-emerald-400/40",
      tagline: "Program inkubasi awal untuk membawa prototype produkmu menuju pasar yang sesungguhnya.",
      description: "Program intensif 6 minggu untuk merancang MVP (Minimum Viable Product), uji coba pasar (go-to-market strategy), hingga siap melakukan fundraising awal.",
      price: "Rp 39.000",
      originalPrice: "Rp 249.000",
      rating: 4.9,
      reviewsCount: 42,
      studentsCount: "210+",
      duration: "6 Minggu (12 Sesi Live)",
      modulesCount: "12 Modul Lengkap",
      certificate: true,
      image: "/startup_vector.png",
      instructor: {
        name: "Brooklyn Simmons, M.B.A.",
        role: "Venture Builder & Mentor Startup",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        bio: "Mentor Inkubator Startup dengan portofolio mendampingi 20+ tim binaan mendapatkan pendanaan seed funding."
      },
      benefits: [
        "Pendampingan Inkubasi Startup 1-on-1 mingguan",
        "Akses Network Investor & Demo Day akhir program",
        "Template Legalitas & Go-to-Market Strategy",
        "Sertifikat Kelulusan Resmi Terverifikasi Kayzen Academia"
      ],
      syllabus: [
        { week: "Minggu 1-2", title: "Customer Discovery & Prototyping", desc: "Wawancara konsumen mendalam dan membuat prototype MVP cepat." },
        { week: "Minggu 3-4", title: "Go-to-Market & Acquisition Channel", desc: "Menentukan channel pemasaran digital paling efisien untuk meluncurkan produk." },
        { week: "Minggu 5-6", title: "Fundraising & Demo Day Presentation", desc: "Persiapan sesi presentasi di depan angel investor dan juri juri inkubator." }
      ]
    }
  };

  // Navigation handlers
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSelectedProgramId(null);
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
    { name: "Business Plan", icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )},
    { name: "Hackathon", icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )},
    { name: "Lainnya", icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
      </svg>
    )}
  ];

  const contests = dbContests.map((c) => ({
    title: c.title,
    category: c.category || "Karya Tulis Ilmiah",
    status: c.status === "open" ? "Pendaftaran Dibuka" : (c.status || "Pendaftaran Dibuka"),
    statusColor: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    image: c.image || "/lomba_inovasi.png",
    level: c.level || "Tingkat Nasional",
    description: c.description || "",
    deadline: c.deadline || "30 hari",
    target: "Mahasiswa (D3, S1, S2)",
    fee: c.fee || "Gratis",
    prize: "Penghargaan & Sertifikat",
    tags: [c.category || "Lomba", c.level || "Nasional"],
    link: c.guide_url || "https://google.com"
  }));

  const defaultTeam = [
    {
      name: "Dr. Alamsyah Putra, M.Sc.",
      role: "Chief Executive Officer & Founder",
      roleColor: "text-brand-primary",
      desc: "Peneliti & Akademisi di bidang Riset & Inovasi",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Dinda Salsabila, M.Sc.",
      role: "Chief Academic Officer",
      roleColor: "text-brand-purple",
      desc: "Awardee LPDP & Head of Scientific Writing",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Muhammad Farhan, S.E.",
      role: "Head of Business & Innovation",
      roleColor: "text-brand-primary",
      desc: "Startup Founder & Awardee Business Plan",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    }
  ];

  const teamMembers = dbTeam && dbTeam.length > 0
    ? dbTeam.map((t, idx) => ({
        name: t.name,
        role: t.role,
        roleColor: idx % 2 === 0 ? "text-brand-primary" : "text-brand-purple",
        desc: t.description || "",
        avatar: t.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
      }))
    : defaultTeam;

  const displayTestimonials = dbTestimonials && dbTestimonials.length > 0
    ? Array.from({ length: Math.ceil(dbTestimonials.length / 3) }, (_, i) =>
        dbTestimonials.slice(i * 3, i * 3 + 3).map((t) => ({
          quote: `"${t.quote}"`,
          author: t.author,
          title: t.title,
          avatar: t.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
        }))
      )
    : testimonials;

  // Dynamic filtering of contests
  const filteredContests = contests.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Semua" || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });


  return (
    <div 
      suppressHydrationWarning
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        isDarkMode ? "bg-[#03040b] text-white" : "bg-[#FAFBFD] text-gray-800"
      } selection:bg-brand-purple selection:text-white`}
    >
      
      {/* HEADER / NAVBAR */}
      <Header isDarkMode={isDarkMode} setIsDarkMode={handleSetIsDarkMode} activeTab={activeTab} />

      {/* MAIN CONTENT WRAPPER */}
      <main className="flex-grow">

{activeTab === "beranda" && (
          <div className="space-y-24 pb-24">
            {/* HERO SECTION WITH SMOOTH IMAGE CAROUSEL */}
            <section className="relative pt-12 md:pt-20 px-6 lg:px-16 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Side: Clean Text Content */}
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

                </div>

                {/* Right Side: Smooth Image-Only Carousel */}
                <div 
                  className="lg:col-span-5 relative w-full aspect-square sm:max-w-md lg:max-w-none mx-auto group"
                  onMouseEnter={() => setIsHeroImgPaused(true)}
                  onMouseLeave={() => setIsHeroImgPaused(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/30 to-brand-purple/30 rounded-3xl blur-2xl opacity-60" />
                  
                  <div className={`relative w-full h-full border rounded-3xl overflow-hidden shadow-2xl transition-all ${
                    isDarkMode ? "border-white/10 shadow-black/70 bg-brand-card" : "border-gray-200 shadow-gray-200 bg-white"
                  }`}>
                    {/* Images Stack with Smooth Cross-Fade */}
                    {heroImages.map((img, idx) => (
                      <div
                        key={idx}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                          currentHeroImg === idx ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105 pointer-events-none"
                        }`}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          priority={idx === 0}
                          className="object-cover transition-transform duration-1000 ease-out hover:scale-105"
                        />
                      </div>
                    ))}

                    {/* Bottom Overlay & Caption */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-between transition-opacity duration-300">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-primary bg-brand-primary/20 px-2 py-0.5 rounded border border-brand-primary/30 inline-block mb-1">
                          Kayzen Showcase
                        </span>
                        <p className="text-xs font-semibold text-white truncate max-w-[200px] sm:max-w-[240px]">
                          {heroImages[currentHeroImg].caption}
                        </p>
                      </div>

                      {/* Navigation Dots */}
                      <div className="flex items-center gap-1.5 pb-1">
                        {heroImages.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentHeroImg(idx)}
                            className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                              currentHeroImg === idx
                                ? "w-6 bg-brand-primary"
                                : "w-2 bg-white/40 hover:bg-white/70"
                            }`}
                            title={`Slide ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Left / Right Floating Arrows (Appear on Hover) */}
                    <button
                      onClick={() => setCurrentHeroImg((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer"
                      title="Gambar Sebelumnya"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    <button
                      onClick={() => setCurrentHeroImg((prev) => (prev + 1) % heroImages.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer"
                      title="Gambar Selanjutnya"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
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

                {dbPrograms.length === 0 ? (
                  <div className="text-center py-12 border rounded-2xl border-dashed border-gray-500/20">
                    <p className="text-sm font-semibold text-gray-500">Belum ada program populer yang tersedia.</p>
                    <p className="text-xs text-gray-400 mt-1">Data baru akan muncul setelah Anda menambahkannya dari Admin Dashboard.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dbPrograms.map((prog) => (
                      <Link
                        key={prog.id}
                        href={`/program/${prog.slug || prog.id}`}
                        className={`rounded-2xl overflow-hidden flex flex-col group border cursor-pointer transition-all ${
                          isDarkMode ? "glassmorphism-card border-white/5 hover:border-brand-purple/40 hover:-translate-y-1" : "bg-white border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1"
                        }`}
                      >
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-card">
                          <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-purple/20 text-brand-purple border border-brand-purple/30 backdrop-blur-md">
                            {prog.category || "Bootcamp"}
                          </span>
                          <Image
                            src={prog.image || "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80"}
                            alt={prog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-5 flex-grow flex flex-col justify-between space-y-4 text-left">
                          <div className="space-y-2">
                            <h3 className={`font-display font-bold text-base leading-snug group-hover:text-brand-purple transition-colors ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                              {prog.title}
                            </h3>
                            <p className={`text-xs leading-relaxed line-clamp-2 ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                              {prog.description || ""}
                            </p>
                          </div>

                          <div className="space-y-3 pt-2">
                            <div className="flex items-center justify-between text-xs border-b border-white/5 pb-3">
                              <span className="text-brand-muted font-medium text-[11px]">Mentor: {prog.mentor}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-brand-muted">Status: {prog.status || "Aktif"}</span>
                              <span className={`font-bold text-sm ${isDarkMode ? "text-white" : "text-brand-purple"}`}>{prog.price}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

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

            {/* ANIMATED HORIZONTAL SCROLLING TESTIMONIALS MARQUEE SECTION */}
            <section className="py-12 relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-6 lg:px-16 mb-10 text-center space-y-3">
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-brand-purple/15 text-brand-purple border border-brand-purple/30 tracking-wider uppercase">
                  APA KATA MEREKA
                </span>
                <h2 className={`font-display text-3xl sm:text-4xl font-extrabold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                  Testimoni Alumni & Peserta Kayzen
                </h2>
                <p className={`max-w-xl mx-auto text-sm ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                  Dengarkan cerita jujur dari ribuan pelajar dan mahasiswa yang telah bertumbuh bersama bimbingan Kayzen Academia.
                </p>
              </div>

              {/* Infinite Horizontal Scrolling Tracks */}
              <div className="space-y-6 pause-on-hover relative">
                {/* Left/Right Fade Gradient Overlays for Seamless Edge Fade */}
                <div className={`absolute top-0 bottom-0 left-0 w-24 sm:w-40 z-20 pointer-events-none ${
                  isDarkMode 
                    ? "bg-gradient-to-r from-[#03040b] via-[#03040b]/80 to-transparent" 
                    : "bg-gradient-to-r from-[#FAFBFD] via-[#FAFBFD]/80 to-transparent"
                }`} />
                <div className={`absolute top-0 bottom-0 right-0 w-24 sm:w-40 z-20 pointer-events-none ${
                  isDarkMode 
                    ? "bg-gradient-to-l from-[#03040b] via-[#03040b]/80 to-transparent" 
                    : "bg-gradient-to-l from-[#FAFBFD] via-[#FAFBFD]/80 to-transparent"
                }`} />

                {dbTestimonials.length === 0 ? (
                  <div className="text-center py-8 text-xs text-brand-muted border rounded-xl border-dashed border-white/10 mx-6">
                    Belum ada testimoni. Data akan otomatis muncul setelah ditambahkan melalui Admin Dashboard.
                  </div>
                ) : (
                  <>
                    {/* Marquee Row 1 (Moves Left) */}
                    <div className="flex overflow-hidden">
                      <div className="animate-marquee-left gap-6 px-3 flex">
                        {dbTestimonials.concat(dbTestimonials).map((item, idx) => (
                          <div
                            key={idx}
                            className={`w-[320px] sm:w-[380px] p-6 rounded-2xl border flex flex-col justify-between space-y-4 flex-shrink-0 transition-all ${
                              isDarkMode
                                ? "bg-[#0a0d1a]/90 border-white/10 hover:border-brand-primary/40 shadow-lg hover:shadow-brand-primary/10"
                                : "bg-white border-gray-200/80 hover:border-brand-primary/40 shadow-sm hover:shadow-md"
                            }`}
                          >
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-brand-primary bg-brand-primary/15 border border-brand-primary/30 px-2.5 py-1 rounded-md">
                                  {item.title}
                                </span>
                                <div className="flex items-center gap-1 text-amber-400 text-xs">
                                  {"★".repeat(item.rating || 5)}
                                </div>
                              </div>
                              <p className={`text-xs sm:text-sm leading-relaxed text-left italic ${
                                isDarkMode ? "text-gray-200" : "text-gray-700"
                              }`}>
                                &quot;{item.quote}&quot;
                              </p>
                            </div>

                            <div className="flex items-center gap-3 pt-3 border-t border-white/10 text-left">
                              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-brand-purple/40 flex-shrink-0">
                                <Image src={item.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"} alt={item.author} fill className="object-cover" />
                              </div>
                              <div className="overflow-hidden">
                                <h4 className={`text-xs font-bold truncate ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                  {item.author}
                                </h4>
                                <p className={`text-[11px] truncate ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                                  {item.title}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

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
{activeTab === "program" && (
          <div className="space-y-20 pb-24 text-white">
            {selectedProgramId && programDetails[selectedProgramId] ? (
              /* PROGRAM DETAIL VIEW */
              <div className="space-y-12 pb-24">
              <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-6">
                
                {/* Top Navigation & Breadcrumb */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                  <button
                    onClick={() => setSelectedProgramId(null)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      isDarkMode ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-gray-100 border-gray-200 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Kembali ke Daftar Program</span>
                  </button>

                  <div className="flex items-center gap-2 text-xs text-brand-muted">
                    <span className="cursor-pointer hover:text-white" onClick={() => setSelectedProgramId(null)}>Program</span>
                    <span>&gt;</span>
                    <span className="text-brand-purple font-semibold">{programDetails[selectedProgramId].badge}</span>
                  </div>
                </div>

                {/* Hero Detail Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  
                  {/* Left Content */}
                  <div className="lg:col-span-8 space-y-10 text-left">
                    
                    <div className="space-y-4">
                      <span className={`px-3.5 py-1 rounded-full text-xs font-bold border inline-block ${programDetails[selectedProgramId].badgeColor}`}>
                        ✨ {programDetails[selectedProgramId].badge}
                      </span>
                      
                      <h1 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {programDetails[selectedProgramId].title}
                      </h1>

                      <p className={`text-base sm:text-lg leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-600"}`}>
                        {programDetails[selectedProgramId].tagline}
                      </p>

                      {/* Metrics Bar */}
                      <div className="flex flex-wrap items-center gap-6 text-xs border-y border-white/10 py-4">
                        <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                          <span className="text-base">★</span>
                          <span>{programDetails[selectedProgramId].rating}</span>
                          <span className="text-brand-muted font-normal">({programDetails[selectedProgramId].reviewsCount} ulasan)</span>
                        </div>
                        <div className="flex items-center gap-2 text-brand-muted">
                          <svg className="w-4 h-4 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                          <span>{programDetails[selectedProgramId].studentsCount} Peserta Alumni</span>
                        </div>
                        <div className="flex items-center gap-2 text-brand-muted">
                          <svg className="w-4 h-4 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <span>{programDetails[selectedProgramId].duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Instructor Card */}
                    <div className={`p-6 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center gap-5 ${
                      isDarkMode ? "bg-[#090d18] border-white/10" : "bg-white border-gray-200 shadow-sm"
                    }`}>
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-brand-purple flex-shrink-0">
                        <Image src={programDetails[selectedProgramId].instructor.avatar} alt={programDetails[selectedProgramId].instructor.name} fill className="object-cover" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-brand-purple tracking-wider">MENTOR UTAMA PROGRAM</span>
                        <h3 className={`text-base font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{programDetails[selectedProgramId].instructor.name}</h3>
                        <p className="text-xs text-brand-primary font-semibold">{programDetails[selectedProgramId].instructor.role}</p>
                        <p className={`text-xs leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-600"}`}>{programDetails[selectedProgramId].instructor.bio}</p>
                      </div>
                    </div>

                    {/* Description & Benefits */}
                    <div className="space-y-4">
                      <h3 className={`font-display text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Deskripsi & Gambaran Program</h3>
                      <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {programDetails[selectedProgramId].description}
                      </p>

                      <div className="pt-4">
                        <h4 className={`font-display text-base font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Fasilitas & Manfaat yang Didapatkan:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {programDetails[selectedProgramId].benefits.map((benefit, idx) => (
                            <div key={idx} className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs font-semibold ${
                              isDarkMode ? "bg-white/5 border-white/5 text-gray-200" : "bg-gray-50 border-gray-200 text-gray-800"
                            }`}>
                              <span className="text-emerald-400 font-bold text-base leading-none">✓</span>
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
                        {programDetails[selectedProgramId].syllabus.map((item, idx) => (
                          <div key={idx} className={`p-5 rounded-2xl border ${
                            isDarkMode ? "bg-[#090d18] border-white/10" : "bg-white border-gray-200"
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

                  {/* Right Sticky Card */}
                  <div className="lg:col-span-4 sticky top-24 space-y-6">
                    <div className={`p-6 rounded-3xl border shadow-2xl space-y-6 ${
                      isDarkMode ? "bg-[#090d18] border-white/15 shadow-black/80" : "bg-white border-gray-200 shadow-xl"
                    }`}>
                      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-brand-card border border-white/10">
                        <Image src={programDetails[selectedProgramId].image} alt={programDetails[selectedProgramId].title} fill className="object-cover" />
                      </div>

                      <div className="space-y-1 text-left">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Harga Spesial Batch Terbaru</span>
                        <div className="flex items-baseline gap-3">
                          <span className="text-3xl font-extrabold font-display text-white">{programDetails[selectedProgramId].price}</span>
                          {programDetails[selectedProgramId].originalPrice && (
                            <span className="text-sm line-through text-gray-400">{programDetails[selectedProgramId].originalPrice}</span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3 pt-2">
                        <button
                          onClick={() => alert(`Pendaftaran untuk ${programDetails[selectedProgramId].title} berhasil dipilih!`)}
                          className="w-full py-3.5 text-xs sm:text-sm font-bold text-white bg-gradient-brand rounded-xl shadow-lg shadow-brand-primary/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          <span>Daftar Bootcamp Sekarang</span>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </button>

                        <button
                          onClick={() => alert("Silakan hubungi admin kami via WhatsApp/Live Chat untuk konsultasi gratis!")}
                          className={`w-full py-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                            isDarkMode ? "text-white border-white/15 hover:bg-white/5" : "text-gray-700 border-gray-300 hover:bg-gray-100"
                          }`}
                        >
                          Konsultasi dengan Admin
                        </button>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-white/10 text-left text-[11px] text-brand-muted">
                        <div className="flex items-center gap-2 text-gray-300">✓ Garansi Rekaman Pembelajaran HD</div>
                        <div className="flex items-center gap-2 text-gray-300">✓ Sertifikat Berkode QR Resmi</div>
                        <div className="flex items-center gap-2 text-gray-300">✓ Komunitas Diskusi Alumni Selamanya</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ) : (
            /* PROGRAM LIST VIEW */
            <>
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
                    {dbPrograms && dbPrograms.length > 0 ? (
                      dbPrograms.map((prog) => (
                        <Link 
                          key={prog.id}
                          href={`/program/${prog.slug || prog.id}`}
                          className={`rounded-2xl overflow-hidden flex flex-col group border cursor-pointer ${
                            isDarkMode ? "glassmorphism-card border-white/5 hover:border-brand-purple/40" : "bg-white border-gray-100 shadow-sm"
                          }`}
                        >
                          <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-card">
                            <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[10px] font-bold bg-brand-purple text-white uppercase tracking-wider">
                              {prog.category || "Bootcamp"}
                            </span>
                            <Image
                              src={prog.image || "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80"}
                              alt={prog.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-5 flex-grow flex flex-col justify-between space-y-5">
                            <div className="space-y-2 text-left">
                              <h3 className={`font-display font-bold text-base leading-snug group-hover:text-brand-purple transition-colors ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                                {prog.title}
                              </h3>
                              <p className={`text-xs leading-relaxed line-clamp-2 ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                                {prog.description || "Program bootcamp komprehensif."}
                              </p>
                            </div>
                            
                            <div className={`space-y-2.5 pt-2 text-xs border-t text-left ${isDarkMode ? "border-white/5 text-brand-muted" : "border-gray-200 text-gray-600"}`}>
                              <div className="flex items-center gap-2.5">
                                <span className="font-semibold text-brand-purple">Mentor:</span>
                                <span>{prog.mentor || "Tim Mentor Kayzen"}</span>
                              </div>
                              <div className="flex items-center gap-2.5">
                                <span className="font-semibold text-brand-purple">Harga:</span>
                                <span className="font-bold text-emerald-400">{prog.price || "Gratis"}</span>
                              </div>
                            </div>

                            <div className={`w-full py-2.5 text-xs text-center font-bold rounded-xl transition-all inline-flex items-center justify-center gap-1.5 group/btn ${
                              isDarkMode
                                ? "text-white border border-brand-purple/40 bg-brand-purple/10 hover:bg-brand-purple/20"
                                : "text-brand-purple border border-brand-purple/30 bg-brand-purple/10 hover:bg-brand-purple/20"
                            }`}>
                              Lihat Detail Program
                              <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <>
                    {/* Essay Bootcamp */}
                    <Link 
                      href="/program/essay-bootcamp"
                      className={`rounded-2xl overflow-hidden flex flex-col group border cursor-pointer ${
                        isDarkMode ? "glassmorphism-card border-white/5 hover:border-brand-purple/40" : "bg-white border-gray-100 shadow-sm"
                      }`}
                    >
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
                        <div className={`space-y-2.5 pt-2 text-xs border-t text-left ${isDarkMode ? "border-white/5 text-brand-muted" : "border-gray-200 text-gray-600"}`}>
                          <div className="flex items-center gap-2.5">
                            <svg className="w-4 h-4 text-brand-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>8 Modul</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <svg className="w-4 h-4 text-brand-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>4 Minggu</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <svg className="w-4 h-4 text-brand-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span>Sertifikat Kelulusan</span>
                          </div>
                        </div>

                        <div className={`w-full py-2.5 text-xs text-center font-bold rounded-xl transition-all inline-flex items-center justify-center gap-1.5 group/btn ${
                          isDarkMode
                            ? "text-white border border-brand-purple/40 bg-brand-purple/10 hover:bg-brand-purple/20"
                            : "text-brand-purple border border-brand-purple/30 bg-brand-purple/10 hover:bg-brand-purple/20"
                        }`}>
                          Learn more
                          <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </Link>

                    {/* KTI Bootcamp */}
                    <Link 
                      href="/program/kti-bootcamp"
                      className={`rounded-2xl overflow-hidden flex flex-col group border cursor-pointer ${
                        isDarkMode ? "glassmorphism-card border-white/5 hover:border-brand-primary/40" : "bg-white border-gray-100 shadow-sm"
                      }`}
                    >
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
                        <div className={`space-y-2.5 pt-2 text-xs border-t text-left ${isDarkMode ? "border-white/5 text-brand-muted" : "border-gray-200 text-gray-600"}`}>
                          <div className="flex items-center gap-2.5">
                            <svg className="w-4 h-4 text-brand-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>10 Modul</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <svg className="w-4 h-4 text-brand-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>5 Minggu</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <svg className="w-4 h-4 text-brand-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span>Sertifikat Kelulusan</span>
                          </div>
                        </div>

                        <div className={`w-full py-2.5 text-xs text-center font-bold rounded-xl transition-all inline-flex items-center justify-center gap-1.5 group/btn ${
                          isDarkMode
                            ? "text-white border border-brand-primary/40 bg-brand-primary/10 hover:bg-brand-primary/20"
                            : "text-brand-primary border border-brand-primary/30 bg-brand-primary/10 hover:bg-brand-primary/20"
                        }`}>
                          Learn more
                          <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </Link>

                    {/* Bisnis Plan */}
                    <Link 
                      href="/program/bisnis-plan"
                      className={`rounded-2xl overflow-hidden flex flex-col group border cursor-pointer ${
                        isDarkMode ? "glassmorphism-card border-white/5 hover:border-brand-purple/40" : "bg-white border-gray-100 shadow-sm"
                      }`}
                    >
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
                        <div className={`space-y-2.5 pt-2 text-xs border-t text-left ${isDarkMode ? "border-white/5 text-brand-muted" : "border-gray-200 text-gray-600"}`}>
                          <div className="flex items-center gap-2.5">
                            <svg className="w-4 h-4 text-brand-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>8 Modul</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <svg className="w-4 h-4 text-brand-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>4 Minggu</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <svg className="w-4 h-4 text-brand-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span>Sertifikat Kelulusan</span>
                          </div>
                        </div>

                        <div className={`w-full py-2.5 text-xs text-center font-bold rounded-xl transition-all inline-flex items-center justify-center gap-1.5 group/btn ${
                          isDarkMode
                            ? "text-white border border-brand-purple/40 bg-brand-purple/10 hover:bg-brand-purple/20"
                            : "text-brand-purple border border-brand-purple/30 bg-brand-purple/10 hover:bg-brand-purple/20"
                        }`}>
                          Learn more
                          <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </Link>

                    {/* Startup Builder */}
                    <Link 
                      href="/program/startup-builder"
                      className={`rounded-2xl overflow-hidden flex flex-col group border cursor-pointer ${
                        isDarkMode ? "glassmorphism-card border-white/5 hover:border-emerald-500/40" : "bg-white border-gray-100 shadow-sm"
                      }`}
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-card">
                        <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-500 text-white uppercase tracking-wider">
                          Incubation
                        </span>
                        <Image
                          src="/startup_vector.png"
                          alt="Startup Builder"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5 flex-grow flex flex-col justify-between space-y-5">
                        <div className="space-y-2 text-left">
                          <h3 className={`font-display font-bold text-base leading-snug group-hover:text-emerald-400 transition-colors ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                            Startup Builder
                          </h3>
                          <p className={`text-xs leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                            Persiapkan dan bangun startup-mu dari ide, validasi, hingga strategi growth yang berkelanjutan.
                          </p>
                        </div>
                        
                        {/* Specs */}
                        <div className={`space-y-2.5 pt-2 text-xs border-t text-left ${isDarkMode ? "border-white/5 text-brand-muted" : "border-gray-200 text-gray-600"}`}>
                          <div className="flex items-center gap-2.5">
                            <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>12 Modul</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>6 Minggu</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span>Sertifikat Inkubasi</span>
                          </div>
                        </div>

                        <div className={`w-full py-2.5 text-xs text-center font-bold rounded-xl transition-all inline-flex items-center justify-center gap-1.5 group/btn ${
                          isDarkMode
                            ? "text-white border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20"
                            : "text-emerald-600 border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20"
                        }`}>
                          Learn more
                          <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                      </>
                    )}
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
                    onClick={() => setActiveTestimonialPage(prev => (prev === 0 ? Math.max(0, displayTestimonials.length - 1) : prev - 1))}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer active:scale-95 transition-all flex-shrink-0 ${
                      isDarkMode ? "border-white/10 text-white hover:bg-brand-primary/20 hover:border-brand-primary" : "border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300"
                    }`}
                  >
                    &lt;
                  </button>

                  <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 w-full p-8 rounded-2xl border ${
                    isDarkMode ? "glassmorphism border-white/5" : "bg-white border-gray-100 shadow-sm"
                  }`}>
                    {(displayTestimonials[activeTestimonialPage] || displayTestimonials[0] || []).map((t: any, idx: number) => (
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
                    onClick={() => setActiveTestimonialPage(prev => (prev >= displayTestimonials.length - 1 ? 0 : prev + 1))}
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

            </>
          )}
        </div>
      )}

      {activeTab === "kemitraan" && (
          <div className={`space-y-20 pb-24 transition-colors duration-300 ${
            isDarkMode ? "bg-brand-dark text-white" : "bg-gray-50 text-gray-900"
          }`}>
            
            {/* HERO SECTION */}
            <section className="relative pt-12 md:pt-16 px-6 lg:px-16 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="max-w-7xl mx-auto">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-purple uppercase tracking-wider mb-6">
                  <span>Kemitraan</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  {/* Text Content */}
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <h1 className={`font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}>
                      Bersama, Menciptakan<br />
                      <span className="text-gradient">Dampak yang Lebih Luas</span>
                    </h1>

                    <p className={`text-sm sm:text-base max-w-2xl leading-relaxed ${
                      isDarkMode ? "text-brand-muted" : "text-gray-600"
                    }`}>
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
                          <div className={`font-display font-extrabold text-lg sm:text-xl ${
                            stat.isHighlight ? "text-brand-primary" : (isDarkMode ? "text-white" : "text-gray-900")
                          }`}>
                            {stat.num}
                          </div>
                          <div className={`text-[9px] uppercase tracking-wider font-bold leading-tight ${
                            isDarkMode ? "text-brand-muted" : "text-gray-500"
                          }`}>
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Graphic Image */}
                  <div className="lg:col-span-5 relative w-full aspect-video sm:max-w-md lg:max-w-none mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 to-brand-purple/10 rounded-3xl blur-2xl opacity-50 pointer-events-none" />
                    <div className={`relative w-full h-full border rounded-3xl overflow-hidden shadow-2xl ${
                      isDarkMode ? "border-white/10 bg-brand-card shadow-black/60" : "border-gray-200 bg-white shadow-gray-200"
                    }`}>
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
                  <h2 className={`font-display text-3xl font-extrabold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Sistem Kemitraan Kami</h2>
                  <div className="w-16 h-[3px] bg-gradient-brand mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Card 1 */}
                  <div className={`rounded-3xl p-8 border flex flex-col justify-between space-y-6 text-left ${
                    isDarkMode ? "glassmorphism-card border-white/5 hover:border-brand-primary/30" : "bg-white border-gray-200 shadow-md shadow-gray-200/50 hover:shadow-lg"
                  }`}>
                    <div className="space-y-5">
                      <div className="w-14 h-14 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary shadow-lg shadow-brand-primary/10">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      </div>
                      <div className="space-y-2.5">
                        <h3 className={`font-display font-extrabold text-xl ${isDarkMode ? "text-white" : "text-gray-900"}`}>Social Media Partnership</h3>
                        <p className={`text-xs leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-600"}`}>
                          Bentuk kerja sama antara Kayzen Academia dengan universitas, organisasi, komunitas, atau penyelenggara program untuk memperluas jangkauan informasi dan meningkatkan exposure suatu program melalui media sosial.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? "text-white" : "text-gray-800"}`}>Cocok untuk:</span>
                        <div className="flex flex-wrap gap-2">
                          {["Universitas", "Organisasi", "Komunitas", "Penyelenggara Program"].map((tag, i) => (
                            <span key={i} className="px-2.5 py-0.5 rounded-md text-[9px] font-bold bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={`space-y-2 pt-2 border-t ${isDarkMode ? "border-white/5" : "border-gray-100"}`}>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? "text-white" : "text-gray-800"}`}>Benefit untuk Partner:</span>
                        <ul className="space-y-2">
                          {[
                            "Meningkatkan exposure dan jangkauan informasi program",
                            "Konten promosi yang kreatif dan relevan",
                            "Menjangkau audiens pelajar dan mahasiswa lebih luas",
                            "Kolaborasi yang fleksibel sesuai kebutuhan"
                          ].map((bf, i) => (
                            <li key={i} className={`flex items-center gap-2.5 text-xs ${isDarkMode ? "text-brand-muted" : "text-gray-600"}`}>
                              <svg className="w-4 h-4 text-brand-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{bf}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <a
                        href="https://wa.me/6281234567890?text=Halo%20Kayzen%20Academia,%20saya%20tertarik%20dengan%20Social%20Media%20Partnership"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full mt-4 py-3 text-xs text-center font-bold border rounded-xl transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer ${
                          isDarkMode ? "text-white border-brand-primary/45 hover:bg-brand-primary/10" : "text-brand-primary border-brand-primary/40 bg-brand-primary/5 hover:bg-brand-primary/10"
                        }`}
                      >
                        <span>Hubungi Kami</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </a>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className={`rounded-3xl p-8 border flex flex-col justify-between space-y-6 text-left ${
                    isDarkMode ? "glassmorphism-card border-white/5 hover:border-brand-purple/30" : "bg-white border-gray-200 shadow-md shadow-gray-200/50 hover:shadow-lg"
                  }`}>
                    <div className="space-y-5">
                      <div className="w-14 h-14 rounded-full bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple shadow-lg shadow-brand-purple/10">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div className="space-y-2.5">
                        <h3 className={`font-display font-extrabold text-xl ${isDarkMode ? "text-white" : "text-gray-900"}`}>Mentorship Partnership</h3>
                        <p className={`text-xs leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-600"}`}>
                          Bentuk kerja sama antara Kayzen Academia dengan universitas, organisasi, komunitas, atau penyelenggara program untuk menghadirkan program pendampingan.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? "text-white" : "text-gray-800"}`}>Cocok untuk:</span>
                        <div className="flex flex-wrap gap-2">
                          {["Universitas", "Organisasi", "Komunitas", "Penyelenggara Program"].map((tag, i) => (
                            <span key={i} className="px-2.5 py-0.5 rounded-md text-[9px] font-bold bg-brand-purple/10 text-brand-purple border border-brand-purple/20">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={`space-y-2 pt-2 border-t ${isDarkMode ? "border-white/5" : "border-gray-100"}`}>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? "text-white" : "text-gray-800"}`}>Benefit untuk Partner:</span>
                        <ul className="space-y-2">
                          {[
                            "Program pendampingan berkualitas bersama mentor ahli",
                            "Meningkatkan kompetensi dan daya saing peserta",
                            "Hasil karya dan output yang lebih berdampak",
                            "Reputasi positif melalui program yang bernilai nyata"
                          ].map((bf, i) => (
                            <li key={i} className={`flex items-center gap-2.5 text-xs ${isDarkMode ? "text-brand-muted" : "text-gray-600"}`}>
                              <svg className="w-4 h-4 text-brand-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{bf}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <a
                        href="https://wa.me/6281234567890?text=Halo%20Kayzen%20Academia,%20saya%20tertarik%20dengan%20Mentorship%20Partnership"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full mt-4 py-3 text-xs text-center font-bold border rounded-xl transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer ${
                          isDarkMode ? "text-white border-brand-purple/45 hover:bg-brand-purple/10" : "text-brand-purple border-brand-purple/40 bg-brand-purple/5 hover:bg-brand-purple/10"
                        }`}
                      >
                        <span>Hubungi Kami</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>



            {/* COLLABORATION FLOW SECTION ("Alur Kolaborasi") */}
            <section className="px-6 lg:px-16">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-3">
                  <h2 className={`font-display text-3xl font-extrabold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Alur Kolaborasi</h2>
                  <div className="w-16 h-[3px] bg-gradient-brand mx-auto rounded-full" />
                </div>

                {/* 5-step horizontal flow layout */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 lg:gap-4">
                  {[
                    {
                      num: "1. Konsultasi Awal",
                      desc: "Sampaikan tujuan dan kebutuhan kerja sama kepada tim Kayzen Academia.",
                      icon: (
                        <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      )
                    },
                    {
                      num: "2. Perencanaan",
                      desc: "Bersama-sama merancang konsep, program, dan strategi kolaborasi yang sesuai.",
                      icon: (
                        <svg className="w-5 h-5 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                      )
                    },
                    {
                      num: "3. Kesepakatan",
                      desc: "Menetapkan ruang lingkup kerja sama, peran, dan timeline kolaborasi.",
                      icon: (
                        <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      )
                    },
                    {
                      num: "4. Pelaksanaan",
                      desc: "Menjalankan program atau aktivitas sesuai rencana dengan dukungan tim Kayzen Academia.",
                      icon: (
                        <svg className="w-5 h-5 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      )
                    },
                    {
                      num: "5. Evaluasi & Dampak",
                      desc: "Melakukan evaluasi dan mengukur dampak untuk kolaborasi yang lebih baik ke depannya.",
                      icon: (
                        <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                        </svg>
                      )
                    }
                  ].map((step, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center text-center space-y-3 relative group w-full max-w-[200px]">
                      {/* Connection arrow (except for last element) */}
                      {i < 4 && (
                        <div className={`hidden lg:block absolute top-6 -right-[50%] w-[100%] border-t-2 border-dashed z-0 transition-colors ${
                          isDarkMode ? "border-white/10 group-hover:border-brand-primary/30" : "border-gray-300 group-hover:border-brand-primary/40"
                        }`} />
                      )}
                      
                      {/* Number circle icon */}
                      <div className={`w-12 h-12 rounded-full border flex items-center justify-center font-bold text-xs relative z-10 transition-all shadow-md ${
                        isDarkMode 
                          ? "bg-brand-card border-white/10 text-white group-hover:border-brand-primary/50 group-hover:bg-brand-primary/5" 
                          : "bg-white border-gray-200 text-gray-800 shadow-gray-200/60 group-hover:border-brand-primary group-hover:bg-blue-50/50"
                      }`}>
                        {step.icon}
                      </div>

                      <div className="space-y-1 relative z-10 text-center">
                        <h4 className={`font-bold text-xs leading-tight ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}>
                          {step.num}
                        </h4>
                        <p className={`text-[10px] leading-relaxed ${
                          isDarkMode ? "text-brand-muted" : "text-gray-600"
                        }`}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* COLLABORATED BRANDS ANIMATED MARQUEE SECTION */}
            <section className="py-8 overflow-hidden relative">
              <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-8 text-center">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-purple">
                    Mitra &amp; Kolaborator
                  </span>
                  <h3 className={`font-display text-xl sm:text-2xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    Telah Berkolaborasi dengan 30+ Institusi &amp; Komunitas Terkemuka
                  </h3>
                </div>

                {/* Marquee Wrapper with edge fade overlay */}
                <div className="relative w-full overflow-hidden pause-on-hover py-4">
                  {/* Left gradient shadow mask */}
                  <div className={`absolute top-0 bottom-0 left-0 w-24 sm:w-40 z-10 pointer-events-none ${
                    isDarkMode 
                      ? "bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent" 
                      : "bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent"
                  }`} />
                  
                  {/* Right gradient shadow mask */}
                  <div className={`absolute top-0 bottom-0 right-0 w-24 sm:w-40 z-10 pointer-events-none ${
                    isDarkMode 
                      ? "bg-gradient-to-l from-brand-dark via-brand-dark/80 to-transparent" 
                      : "bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent"
                  }`} />

                  {/* Marquee track - GUARANTEED PURE VECTOR SVG BRAND LOGOS */}
                  <div className="animate-marquee-left flex gap-12 sm:gap-16 items-center">
                    {[
                      {
                        name: "Google",
                        svg: (
                          <svg className="h-7 sm:h-9 w-auto fill-current" viewBox="0 0 24 24">
                            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 15.96 0 12.48 0 5.8 0 0 5.8 0 12.48s5.8 12.48 12.48 12.48c3.6 0 6.64-1.187 8.88-3.52 2.32-2.32 3.04-5.56 3.04-8.16 0-.8-.08-1.547-.2-2.36H12.48z"/>
                          </svg>
                        )
                      },
                      {
                        name: "Microsoft",
                        svg: (
                          <svg className="h-7 sm:h-9 w-auto fill-current" viewBox="0 0 24 24">
                            <path d="M0 0h11.379v11.379H0zM12.621 0H24v11.379H12.621zM0 12.621h11.379V24H0zM12.621 12.621H24V24H12.621z"/>
                          </svg>
                        )
                      },
                      {
                        name: "Meta",
                        svg: (
                          <svg className="h-7 sm:h-9 w-auto fill-current" viewBox="0 0 24 24">
                            <path d="M24 11.6c-1.3-2.6-3.6-4.4-6.5-4.4-4.4 0-7.8 3.5-7.8 7.8 0 2.9 1.6 5.4 4 6.7 1.2.6 2.5.9 3.8.9 2.9 0 5.2-1.8 6.5-4.4 1.3 2.6 3.6 4.4 6.5 4.4 4.4 0 7.8-3.5 7.8-7.8 0-2.9-1.6-5.4-4-6.7-1.2-.6-2.5-.9-3.8-.9-2.9 0-5.2 1.8-6.5 4.4zm-6.5 8c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3c2.4 0 4.3 1.9 4.3 4.3s-1.9 4.3-4.3 4.3zm13 0c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3c2.4 0 4.3 1.9 4.3 4.3s-1.9 4.3-4.3 4.3z"/>
                          </svg>
                        )
                      },
                      {
                        name: "Amazon",
                        svg: (
                          <svg className="h-7 sm:h-9 w-auto fill-current" viewBox="0 0 24 24">
                            <path d="M13.92 10.02c-1.84 0-3.32.74-3.32 2.62 0 1.68 1.1 2.36 2.44 2.36 1.1 0 2.06-.52 2.66-1.36v1.18h2.08V8.66h-2.08v1.36zm-1.12 3.42c-.74 0-1.44-.32-1.44-1.16 0-.96.88-1.26 1.76-1.26.46 0 .9.08 1.28.24v.94c-.44.78-1.04 1.24-1.6 1.24zM1.84 17.8c5.44 3.74 13.12 3.74 18.56 0 .34-.24.08-.54-.26-.34-4.8 2.82-12.72 2.82-17.52 0-.34-.2-.6.1-.78.34zM22.5 15.8c.2-.28.1-.56-.16-.48-1.18.36-2.52.48-3.76.24-.26-.06-.32.18-.08.34 1.18.8 2.64 1.04 4 0z"/>
                          </svg>
                        )
                      },
                      {
                        name: "Figma",
                        svg: (
                          <svg className="h-7 sm:h-9 w-auto fill-current" viewBox="0 0 24 24">
                            <path d="M12 12A4 4 0 1 1 16 8a4 4 0 0 1-4 4Zm0 0a4 4 0 1 1-4-4 4 4 0 0 1 4 4Zm0 0v4a4 4 0 1 1-4-4h4Zm4-8A4 4 0 1 0 12 8a4 4 0 0 0 4-4ZM8 0a4 4 0 1 0 4 4A4 4 0 0 0 8 0Z"/>
                          </svg>
                        )
                      },
                      {
                        name: "Notion",
                        svg: (
                          <svg className="h-7 sm:h-9 w-auto fill-current" viewBox="0 0 24 24">
                            <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.734-.7c.42-.047.886-.42.886-.887 0-.7-.466-1.12-1.307-1.027l-13.6.84c-.84.047-1.167.56-1.167 1.027 0 .56.28.98 1.026 1.281zm.607 2.802v13.535c0 .933.42 1.493 1.447 1.493l1.867-.094V8.408L5.066 7.01zm4.854 14.887l10.828-.607c.887-.047 1.213-.607 1.213-1.447V6.541l-2.893 2.194v11.714l-9.148.514V8.782l-2.094.14v13.882zm10.781-1.074V7.521l1.727-1.28v12.28c0 .84-.374 1.307-1.727 1.493z"/>
                          </svg>
                        )
                      },
                      {
                        name: "Slack",
                        svg: (
                          <svg className="h-7 sm:h-9 w-auto fill-current" viewBox="0 0 24 24">
                            <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                          </svg>
                        )
                      },
                      {
                        name: "GitHub",
                        svg: (
                          <svg className="h-7 sm:h-9 w-auto fill-current" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                          </svg>
                        )
                      },
                      {
                        name: "Spotify",
                        svg: (
                          <svg className="h-7 sm:h-9 w-auto fill-current" viewBox="0 0 24 24">
                            <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.899 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.019zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.62.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                          </svg>
                        )
                      },
                      {
                        name: "Intel",
                        svg: (
                          <svg className="h-7 sm:h-9 w-auto fill-current" viewBox="0 0 24 24">
                            <path d="M6.634 16.536H4.218V8.673h2.416v7.863zm-1.208-9.07c-.805 0-1.41-.605-1.41-1.41 0-.806.605-1.41 1.41-1.41.806 0 1.41.604 1.41 1.41 0 .805-.604 1.41-1.41 1.41zm9.87 9.07h-2.416V12.18c0-1.208-.403-1.813-1.41-1.813-.805 0-1.41.605-1.41 1.612v4.557H7.644V8.673h2.417v1.208c.604-.805 1.611-1.41 2.82-1.41 2.215 0 3.625 1.41 3.625 3.827v4.238zm6.043 0h-2.417V8.673h2.417v7.863z"/>
                          </svg>
                        )
                      }
                    ].concat([
                      {
                        name: "Google",
                        svg: (
                          <svg className="h-7 sm:h-9 w-auto fill-current" viewBox="0 0 24 24">
                            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 15.96 0 12.48 0 5.8 0 0 5.8 0 12.48s5.8 12.48 12.48 12.48c3.6 0 6.64-1.187 8.88-3.52 2.32-2.32 3.04-5.56 3.04-8.16 0-.8-.08-1.547-.2-2.36H12.48z"/>
                          </svg>
                        )
                      },
                      {
                        name: "Microsoft",
                        svg: (
                          <svg className="h-7 sm:h-9 w-auto fill-current" viewBox="0 0 24 24">
                            <path d="M0 0h11.379v11.379H0zM12.621 0H24v11.379H12.621zM0 12.621h11.379V24H0zM12.621 12.621H24V24H12.621z"/>
                          </svg>
                        )
                      },
                      {
                        name: "Meta",
                        svg: (
                          <svg className="h-7 sm:h-9 w-auto fill-current" viewBox="0 0 24 24">
                            <path d="M24 11.6c-1.3-2.6-3.6-4.4-6.5-4.4-4.4 0-7.8 3.5-7.8 7.8 0 2.9 1.6 5.4 4 6.7 1.2.6 2.5.9 3.8.9 2.9 0 5.2-1.8 6.5-4.4 1.3 2.6 3.6 4.4 6.5 4.4 4.4 0 7.8-3.5 7.8-7.8 0-2.9-1.6-5.4-4-6.7-1.2-.6-2.5-.9-3.8-.9-2.9 0-5.2 1.8-6.5 4.4zm-6.5 8c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3c2.4 0 4.3 1.9 4.3 4.3s-1.9 4.3-4.3 4.3zm13 0c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3c2.4 0 4.3 1.9 4.3 4.3s-1.9 4.3-4.3 4.3z"/>
                          </svg>
                        )
                      },
                      {
                        name: "Amazon",
                        svg: (
                          <svg className="h-7 sm:h-9 w-auto fill-current" viewBox="0 0 24 24">
                            <path d="M13.92 10.02c-1.84 0-3.32.74-3.32 2.62 0 1.68 1.1 2.36 2.44 2.36 1.1 0 2.06-.52 2.66-1.36v1.18h2.08V8.66h-2.08v1.36zm-1.12 3.42c-.74 0-1.44-.32-1.44-1.16 0-.96.88-1.26 1.76-1.26.46 0 .9.08 1.28.24v.94c-.44.78-1.04 1.24-1.6 1.24zM1.84 17.8c5.44 3.74 13.12 3.74 18.56 0 .34-.24.08-.54-.26-.34-4.8 2.82-12.72 2.82-17.52 0-.34-.2-.6.1-.78.34zM22.5 15.8c.2-.28.1-.56-.16-.48-1.18.36-2.52.48-3.76.24-.26-.06-.32.18-.08.34 1.18.8 2.64 1.04 4 0z"/>
                          </svg>
                        )
                      },
                      {
                        name: "Figma",
                        svg: (
                          <svg className="h-7 sm:h-9 w-auto fill-current" viewBox="0 0 24 24">
                            <path d="M12 12A4 4 0 1 1 16 8a4 4 0 0 1-4 4Zm0 0a4 4 0 1 1-4-4 4 4 0 0 1 4 4Zm0 0v4a4 4 0 1 1-4-4h4Zm4-8A4 4 0 1 0 12 8a4 4 0 0 0 4-4ZM8 0a4 4 0 1 0 4 4A4 4 0 0 0 8 0Z"/>
                          </svg>
                        )
                      },
                      {
                        name: "Notion",
                        svg: (
                          <svg className="h-7 sm:h-9 w-auto fill-current" viewBox="0 0 24 24">
                            <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.734-.7c.42-.047.886-.42.886-.887 0-.7-.466-1.12-1.307-1.027l-13.6.84c-.84.047-1.167.56-1.167 1.027 0 .56.28.98 1.026 1.281zm.607 2.802v13.535c0 .933.42 1.493 1.447 1.493l1.867-.094V8.408L5.066 7.01zm4.854 14.887l10.828-.607c.887-.047 1.213-.607 1.213-1.447V6.541l-2.893 2.194v11.714l-9.148.514V8.782l-2.094.14v13.882zm10.781-1.074V7.521l1.727-1.28v12.28c0 .84-.374 1.307-1.727 1.493z"/>
                          </svg>
                        )
                      },
                      {
                        name: "Slack",
                        svg: (
                          <svg className="h-7 sm:h-9 w-auto fill-current" viewBox="0 0 24 24">
                            <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                          </svg>
                        )
                      },
                      {
                        name: "GitHub",
                        svg: (
                          <svg className="h-7 sm:h-9 w-auto fill-current" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                          </svg>
                        )
                      },
                      {
                        name: "Spotify",
                        svg: (
                          <svg className="h-7 sm:h-9 w-auto fill-current" viewBox="0 0 24 24">
                            <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.899 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.019zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.62.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                          </svg>
                        )
                      },
                      {
                        name: "Intel",
                        svg: (
                          <svg className="h-7 sm:h-9 w-auto fill-current" viewBox="0 0 24 24">
                            <path d="M6.634 16.536H4.218V8.673h2.416v7.863zm-1.208-9.07c-.805 0-1.41-.605-1.41-1.41 0-.806.605-1.41 1.41-1.41.806 0 1.41.604 1.41 1.41 0 .805-.604 1.41-1.41 1.41zm9.87 9.07h-2.416V12.18c0-1.208-.403-1.813-1.41-1.813-.805 0-1.41.605-1.41 1.612v4.557H7.644V8.673h2.417v1.208c.604-.805 1.611-1.41 2.82-1.41 2.215 0 3.625 1.41 3.625 3.827v4.238zm6.043 0h-2.417V8.673h2.417v7.863z"/>
                          </svg>
                        )
                      }
                    ]).map((brand, i) => (
                      <div 
                        key={i} 
                        className={`flex items-center justify-center transition-all flex-shrink-0 cursor-pointer opacity-60 hover:opacity-100 hover:scale-115 p-3 rounded-2xl ${
                          isDarkMode 
                            ? "text-white/90 hover:text-white hover:bg-white/[0.06]" 
                            : "text-gray-800 hover:text-gray-900 hover:bg-gray-200/60"
                        }`}
                        title={brand.name}
                      >
                        {brand.svg}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* CTA BANNER */}
            <section className="px-6 lg:px-16">
              <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-brand p-8 sm:p-12 relative overflow-hidden shadow-2xl shadow-brand-primary/20">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-purple/20 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                  <div className="space-y-4 max-w-xl text-left">
                    <h2 className="font-display text-3xl font-extrabold text-white tracking-tight">
                      Mari Berkolaborasi!
                    </h2>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Punya ide program atau ingin bekerja sama dengan Kayzen Academia? Kami siap menjadi partner terbaik Anda.
                    </p>
                  </div>

                  <div className="flex-shrink-0 text-left">
                    <button className="px-8 py-4 bg-brand-purple text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all inline-flex items-center gap-2 group cursor-pointer">
                      Hubungi Kami
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
{activeTab === "info-lomba" && (
          <div className={`space-y-20 pb-24 transition-colors duration-300 ${
            isDarkMode ? "bg-brand-dark text-white" : "bg-gray-50 text-gray-900"
          }`}>
            
            {/* HERO SECTION */}
            <section className="relative pt-12 md:pt-16 px-6 lg:px-16 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-purple uppercase tracking-wider mb-6">
                  <span className="cursor-pointer hover:underline" onClick={() => handleTabChange("beranda")}>Info Lomba</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <h1 className={`font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}>
                      Temukan Lomba Terbaik,<br />
                      Wujudkan <span className="text-gradient">Ide Jadi Prestasi</span>
                    </h1>

                    <p className={`text-sm sm:text-base max-w-2xl leading-relaxed ${
                      isDarkMode ? "text-brand-muted" : "text-gray-600"
                    }`}>
                      Dapatkan informasi lomba terbaru untuk pelajar dan mahasiswa di berbagai bidang. Pilih lomba yang sesuai dengan minatmu, kembangkan potensimu, dan raih pencapaian terbaik.
                    </p>

                    <div className="grid grid-cols-3 gap-6 pt-4 max-w-lg">
                      {[
                        { num: "200+", title: "Lomba Aktif", desc: "Diperbarui setiap minggu" },
                        { num: "10.000+", title: "Peserta Terdaftar", desc: "Dari berbagai universitas" },
                        { num: "95%", title: "Peluang Berkembang", desc: "Tingkatkan skill & portofolio" }
                      ].map((stat, i) => (
                        <div key={i} className="space-y-1">
                          <div className="font-display font-extrabold text-2xl text-gradient">{stat.num}</div>
                          <div className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? "text-white" : "text-gray-800"}`}>{stat.title}</div>
                          <p className={`text-[9px] leading-tight ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>{stat.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative w-full aspect-video sm:max-w-md lg:max-w-none mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 to-brand-purple/10 rounded-3xl blur-2xl opacity-50 pointer-events-none" />
                    <div className={`relative w-full h-full border rounded-3xl overflow-hidden shadow-2xl ${
                      isDarkMode ? "border-white/10 bg-brand-card shadow-black/60" : "border-gray-200 bg-white shadow-gray-200"
                    }`}>
                      <Image src="/hero_students.png" alt="Students celebrating with trophy" fill priority className="object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CATEGORY & FILTERS */}
            <section className="px-6 lg:px-16">
              <div className="max-w-7xl mx-auto space-y-8">
                
                <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b pb-6 ${
                  isDarkMode ? "border-white/5" : "border-gray-200"
                }`}>
                  <div className="space-y-1 text-left">
                    <h2 className={`font-display text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Kategori Lomba</h2>
                  </div>
                  {/* Search Bar */}
                  <div className="relative max-w-md w-full">
                    <input
                      type="text"
                      placeholder="Cari lomba atau kata kunci..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full px-4 py-3 pl-11 rounded-xl text-xs focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/30 transition-all ${
                        isDarkMode 
                          ? "bg-brand-card border border-white/10 text-white placeholder-brand-muted" 
                          : "bg-white border border-gray-300 text-gray-900 placeholder-gray-400 shadow-sm"
                      }`}
                    />
                    <svg className={`w-4 h-4 absolute left-4 top-3.5 ${isDarkMode ? "text-brand-muted" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
                          ? "bg-brand-primary/10 border-brand-primary text-brand-primary font-bold shadow-lg scale-[1.03]"
                          : (isDarkMode ? "bg-brand-card/30 border-white/5 text-brand-muted hover:text-white" : "bg-white border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 shadow-sm")
                      }`}
                    >
                      <div className={`p-2.5 rounded-lg mb-2.5 ${activeCategory === cat.name ? "bg-brand-primary text-white" : (isDarkMode ? "bg-white/[0.03]" : "bg-gray-100")}`}>
                        {cat.icon}
                      </div>
                      <span className="text-[10px] font-semibold tracking-wide leading-tight">{cat.name}</span>
                    </button>
                  ))}
                </div>

                {/* Secondary Dropdown Filters */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex flex-col gap-1 text-left">
                      <span className={`text-[9px] uppercase tracking-wider font-bold ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>Tingkat</span>
                      <select value={filterTingkat} onChange={(e) => setFilterTingkat(e.target.value)} className={`px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-brand-primary ${
                        isDarkMode ? "bg-brand-card border border-white/5 text-white" : "bg-white border border-gray-300 text-gray-800 shadow-sm"
                      }`}>
                        <option>Semua Tingkat</option>
                        <option>Nasional</option>
                        <option>Internasional</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1 text-left">
                      <span className={`text-[9px] uppercase tracking-wider font-bold ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>Status</span>
                      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className={`px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-brand-primary ${
                        isDarkMode ? "bg-brand-card border border-white/5 text-white" : "bg-white border border-gray-300 text-gray-800 shadow-sm"
                      }`}>
                        <option>Semua Status</option>
                        <option>Pendaftaran Dibuka</option>
                        <option>Segera Ditutup</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1 text-left">
                      <span className={`text-[9px] uppercase tracking-wider font-bold ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>Batas Pendaftaran</span>
                      <select value={filterBatas} onChange={(e) => setFilterBatas(e.target.value)} className={`px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-brand-primary ${
                        isDarkMode ? "bg-brand-card border border-white/5 text-white" : "bg-white border border-gray-300 text-gray-800 shadow-sm"
                      }`}>
                        <option>Semua Waktu</option>
                        <option>Bulan Ini</option>
                        <option>Bulan Depan</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1 text-left">
                      <span className={`text-[9px] uppercase tracking-wider font-bold ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>Jenis Peserta</span>
                      <select value={filterPeserta} onChange={(e) => setFilterPeserta(e.target.value)} className={`px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-brand-primary ${
                        isDarkMode ? "bg-brand-card border border-white/5 text-white" : "bg-white border border-gray-300 text-gray-800 shadow-sm"
                      }`}>
                        <option>Semua</option>
                        <option>Pelajar</option>
                        <option>Mahasiswa</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 text-left">
                    <span className={`text-[9px] uppercase tracking-wider font-bold ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>Urutkan</span>
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className={`px-3 py-2 rounded-lg text-xs focus:outline-none focus:border-brand-primary ${
                      isDarkMode ? "bg-brand-card border border-white/5 text-white" : "bg-white border border-gray-300 text-gray-800 shadow-sm"
                    }`}>
                      <option>Terbaru</option>
                      <option>Batas Paling Dekat</option>
                      <option>Hadiah Terbesar</option>
                    </select>
                  </div>
                </div>

              </div>
            </section>

            {/* LOMBA TERBARU GRID */}
            <section className="px-6 lg:px-16">
              <div className="max-w-7xl mx-auto space-y-8">
                
                <div className="flex items-center justify-between">
                  <h3 className={`font-display text-xl font-bold text-left ${isDarkMode ? "text-white" : "text-gray-900"}`}>Lomba Terbaru</h3>
                  <a href="#" className="text-xs font-semibold text-brand-purple hover:underline flex items-center gap-1.5 group">
                    Lihat Semua Lomba
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredContests.length > 0 ? (
                    filteredContests.map((c, i) => (
                      <div 
                        key={i} 
                        onClick={() => setSelectedContest(c)}
                        className={`rounded-2xl overflow-hidden flex flex-col group border transition-all cursor-pointer ${
                          isDarkMode 
                            ? "glassmorphism-card border-white/5 hover:border-brand-purple/40 hover:-translate-y-1" 
                            : "bg-white border-gray-200 shadow-md shadow-gray-200/50 hover:shadow-xl hover:border-brand-purple/40 hover:-translate-y-1"
                        }`}
                      >
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
                            <h4 className={`font-display font-bold text-sm leading-snug group-hover:text-brand-purple transition-colors min-h-[40px] ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}>
                              {c.title}
                            </h4>
                            <p className={`text-[11px] leading-relaxed line-clamp-3 ${
                              isDarkMode ? "text-brand-muted" : "text-gray-600"
                            }`}>
                              {c.description}
                            </p>
                          </div>

                          {/* Specifics */}
                          <div className={`space-y-2 pt-3 text-[11px] border-t text-left ${
                            isDarkMode ? "border-white/5" : "border-gray-100"
                          }`}>
                            <div className={`flex items-center gap-2 ${isDarkMode ? "text-brand-muted" : "text-gray-600"}`}>
                              <svg className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className={`font-semibold ${isDarkMode ? "text-emerald-400" : "text-emerald-600"}`}>Biaya Daftar: {c.fee || "Gratis"}</span>
                            </div>
                            <div className={`flex items-center gap-2 ${isDarkMode ? "text-brand-muted" : "text-gray-600"}`}>
                              <svg className="w-3.5 h-3.5 text-brand-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>Batas Daftar: {c.deadline}</span>
                            </div>
                            <div className={`flex items-center gap-2 ${isDarkMode ? "text-brand-muted" : "text-gray-600"}`}>
                              <svg className="w-3.5 h-3.5 text-brand-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span>{c.target}</span>
                            </div>
                            <div className={`flex items-center gap-2 ${isDarkMode ? "text-brand-muted" : "text-gray-600"}`}>
                              <svg className="w-3.5 h-3.5 text-brand-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                              </svg>
                              <span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Total Hadiah: {c.prize}</span>
                            </div>
                          </div>

                          {/* Tags Pills & Action Button */}
                          <div className="space-y-3 pt-2">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {c.tags.map((tag, idx) => (
                                <span key={idx} className={`px-2.5 py-0.5 rounded-md text-[9px] font-bold whitespace-nowrap border ${
                                  isDarkMode ? "bg-white/[0.06] text-brand-muted border-white/5" : "bg-purple-50 text-brand-purple border-purple-100"
                                }`}>
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedContest(c);
                              }}
                              className="w-full py-2.5 rounded-xl bg-brand-purple text-white text-xs font-bold hover:bg-brand-purple/90 transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                            >
                              Daftar Sekarang
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-4 py-16 text-center space-y-3">
                      <p className={`text-sm ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>Tidak ada info lomba yang cocok dengan kategori atau kata kunci tersebut.</p>
                      <button onClick={() => { setSearchQuery(""); setActiveCategory("Semua"); }} className="px-4 py-2 bg-brand-primary text-white text-xs font-semibold rounded-lg hover:bg-blue-600">Reset Filter</button>
                    </div>
                  )}
                </div>

              </div>
            </section>

            {/* TIPS MEMILIH LOMBA YANG TEPAT */}
            <section className="px-6 lg:px-16">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-3">
                  <h2 className={`font-display text-3xl font-extrabold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Tips Memilih Lomba yang Tepat</h2>
                  <div className="w-16 h-[3px] bg-gradient-brand mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      title: "Sesuaikan dengan Minatmu",
                      desc: "Pilih lomba sesuai bidang yang kamu minati agar lebih semangat dan maksimal dalam berproses.",
                      icon: (
                        <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      )
                    },
                    {
                      title: "Perhatikan Tingkat Lomba",
                      desc: "Pilih tingkat lomba yang sesuai dengan pengalamanmu, mulai dari regional hingga internasional.",
                      icon: (
                        <svg className="w-6 h-6 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                        </svg>
                      )
                    },
                    {
                      title: "Cek Timeline dengan Teliti",
                      desc: "Perhatikan jadwal pendaftaran, pengumpulan karya, dan pengumuman hasil agar tidak ketinggalan.",
                      icon: (
                        <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )
                    },
                    {
                      title: "Bangun Tim yang Solid",
                      desc: "Berkolaborasi dengan teman satu visi akan membuat proses persiapan lebih efektif dan menyenangkan.",
                      icon: (
                        <svg className="w-6 h-6 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      )
                    }
                  ].map((tip, i) => (
                    <div key={i} className={`p-6 rounded-2xl border space-y-4 transition-all text-left ${
                      isDarkMode ? "bg-brand-card/20 border-white/5 hover:bg-brand-card/45" : "bg-white border-gray-200 shadow-sm hover:shadow-md"
                    }`}>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                        isDarkMode ? "bg-white/[0.03] border-white/5" : "bg-gray-50 border-gray-200"
                      }`}>
                        {tip.icon}
                      </div>
                      <div className="space-y-1.5">
                        <h4 className={`font-semibold text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>{tip.title}</h4>
                        <p className={`text-[11px] leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-600"}`}>{tip.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA BANNER */}
            <section className="px-6 lg:px-16">
              <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-brand p-8 sm:p-12 relative overflow-hidden shadow-2xl shadow-brand-primary/20">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-purple/20 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                  <div className="space-y-4 max-w-xl text-left">
                    <h2 className="font-display text-3xl font-extrabold text-white tracking-tight">
                      Siap Raih Prestasi Terbaikmu?
                    </h2>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Ikuti bootcamp penulisan dan persiapan lomba bersama mentor ahli dari Kayzen Academia untuk memaksimalkan potensimu.
                    </p>
                  </div>

                  <div className="flex-shrink-0 text-left">
                    <button onClick={() => handleTabChange("program")} className="px-8 py-4 bg-brand-purple text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all inline-flex items-center gap-2 group cursor-pointer">
                      Mulai Belajar Gratis
                      <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}
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
                    Panduan & Wawasan<br />
                    <span className="text-gradient">Kepenulisan & Inovasi</span>
                  </h1>
                  <p className={`text-xs sm:text-sm max-w-xl mx-auto leading-relaxed ${
                    isDarkMode ? "text-brand-muted" : "text-gray-500"
                  }`}>
                    Temukan artikel seputar teknik penulisan LKTI, esai nasional, proposal business plan, riset akademik, dan tips menjuarai kompetisi.
                  </p>
                </div>

                {dbBlogs.length === 0 ? (
                  <div className="text-center py-12 border rounded-2xl border-dashed border-gray-500/20">
                    <p className="text-sm font-semibold text-gray-500">Belum ada artikel panduan & wawasan yang terbit.</p>
                    <p className="text-xs text-gray-400 mt-1">Data baru akan muncul setelah Anda menambahkannya dari Admin Dashboard.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {dbBlogs.slice(0, 3).map((b) => (
                      <Link
                        key={b.id}
                        href={`/blog/${b.slug || b.id}`}
                        className={`border rounded-2xl overflow-hidden flex flex-col justify-between group transition-all cursor-pointer ${
                          isDarkMode 
                            ? "bg-brand-card/40 border-white/5 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-0.5" 
                            : "bg-white border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-0.5"
                        }`}
                      >
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                          <Image
                            src={b.image || "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80"}
                            alt={b.title}
                            fill
                            className="object-cover group-hover:scale-103 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-5 flex-grow flex flex-col justify-between space-y-4 text-left">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-[10px] font-bold text-gray-400">
                              <span className="px-2 py-0.5 rounded bg-brand-purple/10 text-brand-purple border border-brand-purple/20">
                                {b.category || "Umum"}
                              </span>
                              <span>{b.author || "Admin"}</span>
                            </div>
                            <h3 className={`font-display font-bold text-sm leading-snug group-hover:text-brand-purple transition-colors ${
                              isDarkMode ? "text-white" : "text-gray-800"
                            }`}>
                              {b.title}
                            </h3>
                            <p className={`text-[11px] leading-relaxed line-clamp-2 ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                              {b.excerpt || ""}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-gray-100/10">
                            <span className={`font-semibold text-[10px] ${isDarkMode ? "text-brand-muted" : "text-gray-600"}`}>
                              {b.author || "Admin"}
                            </span>
                            <span className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-brand-purple group-hover:text-white transition-colors">
                              &rarr;
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

              </div>
            </section>

            {/* CATEGORIES HORIZONTAL BAR */}
            <section className="px-6 lg:px-16">
              <div className={`max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto pb-4 border-b ${
                isDarkMode ? "border-white/5" : "border-gray-100"
              }`}>
                {["Semua", "Karya Tulis Ilmiah", "Esai", "Business Plan", "Teknologi & AI", "Riset & Metodologi", "Tips Lomba"].map((cat, i) => (
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

                  {dbBlogs.length === 0 ? (
                    <div className="text-center py-16 border rounded-3xl border-dashed border-gray-500/20">
                      <p className="text-sm font-semibold text-gray-500">Belum ada artikel blog yang terbit.</p>
                      <p className="text-xs text-gray-400 mt-1">Artikel baru akan muncul setelah Anda menambahkannya dari Admin Dashboard.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {dbBlogs
                        .filter(b => activeBlogCategory === "Semua" || b.category === activeBlogCategory)
                        .map((b) => (
                          <Link
                            key={b.id}
                            href={`/blog/${b.slug || b.id}`}
                            className={`border rounded-2xl overflow-hidden flex flex-col justify-between group transition-all text-left block cursor-pointer ${
                              isDarkMode ? "bg-brand-card/30 border-white/5 hover:border-brand-purple/40" : "bg-white border-gray-100 hover:shadow-xl shadow-sm"
                            }`}
                          >
                            <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                              <Image
                                src={b.image || "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80"}
                                alt={b.title}
                                fill
                                className="object-cover group-hover:scale-103 transition-transform"
                              />
                            </div>
                            <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                                  <span className="px-2 py-0.5 rounded bg-brand-purple/10 text-brand-purple border border-brand-purple/20">
                                    {b.category || "Umum"}
                                  </span>
                                  <span>•</span>
                                  <span>{b.author || "Admin"}</span>
                                </div>
                                <h4 className={`font-display font-bold text-sm group-hover:text-brand-purple transition-colors leading-snug ${
                                  isDarkMode ? "text-white" : "text-gray-800"
                                }`}>
                                  {b.title}
                                </h4>
                                <p className={`text-xs leading-relaxed line-clamp-2 ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                                  {b.excerpt || ""}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  )}

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
                        { name: "Karya Tulis Ilmiah", count: 18 },
                        { name: "Esai", count: 14 },
                        { name: "Business Plan", count: 9 },
                        { name: "Teknologi & AI", count: 8 },
                        { name: "Riset & Metodologi", count: 7 },
                        { name: "Tips Lomba", count: 5 }
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

        {/* ==================== TAB 4: TENTANG KAMI ==================== */}
        {activeTab === "tentang-kami" && (
          <div className="space-y-0">
            
            {/* HERO SECTION */}
            <section className={`relative pt-12 pb-16 px-6 lg:px-16 overflow-hidden border-b transition-colors duration-300 ${
              isDarkMode ? "bg-[#080b16] text-white border-white/5" : "bg-gradient-to-b from-purple-50/60 via-white to-gray-50 text-gray-900 border-gray-200"
            }`}>
              <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="max-w-7xl mx-auto space-y-12 relative z-10">
                {/* Breadcrumb */}
                <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-left ${
                  isDarkMode ? "text-brand-muted" : "text-gray-500"
                }`}>
                  <span className="cursor-pointer hover:underline transition-colors" onClick={() => handleTabChange("beranda")}>Beranda</span>
                  <span>&gt;</span>
                  <span className={isDarkMode ? "text-white" : "text-gray-900"}>Tentang Kami</span>
                </div>

                {/* Hero Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  {/* Left Column: Title & Text */}
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <h1 className={`font-display text-4xl sm:text-5xl font-extrabold leading-tight ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}>
                      Tentang <br />
                      <span className="text-gradient">Kayzen Academia</span>
                    </h1>

                    <p className="text-brand-primary font-bold text-sm sm:text-base leading-relaxed">
                      Mendorong ide, menulis ilmiah, dan menciptakan inovasi untuk perubahan nyata.
                    </p>

                    <p className={`text-xs sm:text-sm leading-relaxed max-w-xl ${
                      isDarkMode ? "text-brand-muted" : "text-gray-600"
                    }`}>
                      Kayzen Academia adalah platform pembelajaran yang berfokus pada pengembangan keterampilan kepenulisan ilmiah, riset, dan inovasi bagi pelajar dan mahasiswa di seluruh Indonesia. Kami percaya, setiap ide yang ditulis dengan baik dapat menjadi awal dari solusi untuk tantangan dunia nyata.
                    </p>
                  </div>

                  {/* Right Column: Visual Image */}
                  <div className="lg:col-span-5 relative w-full aspect-[4/3] sm:max-w-md lg:max-w-none mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-brand-purple/20 rounded-3xl blur-2xl opacity-50 pointer-events-none" />
                    <div className={`relative w-full h-full border rounded-3xl overflow-hidden shadow-2xl ${
                      isDarkMode ? "border-white/10 bg-brand-card shadow-black/60" : "border-gray-200 bg-white shadow-gray-200"
                    }`}>
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

                {/* Stats Row inside Hero */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-2xl border backdrop-blur-md ${
                  isDarkMode ? "border-white/5 bg-[#0e1224]/50" : "border-gray-200 bg-white shadow-md shadow-gray-200/50"
                }`}>
                  {[
                    {
                      num: "2K+",
                      title: "Pelajar Aktif",
                      desc: "Bergabung dan terus bertumbuh bersama kami.",
                      icon: (
                        <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 025.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      )
                    },
                    {
                      num: "50+",
                      title: "Mentor Ahli",
                      desc: "Dosen, peneliti, dan praktisi berpengalaman di bidangnya.",
                      icon: (
                        <svg className="w-5 h-5 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-4-9 4 9 5zm0 0l-9-4.243V17a4 4 0 004 4h10a4 4 0 004-4v-6.243L12 14z" />
                        </svg>
                      )
                    },
                    {
                      num: "30+",
                      title: "Program",
                      desc: "Kelas dan bootcamp berkualitas untuk berbagai kebutuhan.",
                      icon: (
                        <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" />
                        </svg>
                      )
                    },
                    {
                      num: "95%",
                      title: "Tingkat Kepuasan",
                      desc: "Dari ribuan peserta yang telah belajar bersama kami.",
                      icon: (
                        <svg className="w-5 h-5 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      )
                    }
                  ].map((hl, i) => (
                    <div key={i} className="flex gap-4 p-3 text-left">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center ${
                        isDarkMode ? "bg-white/[0.04] border-white/5" : "bg-purple-50/60 border-purple-100"
                      }`}>
                        {hl.icon}
                      </div>
                      <div className="space-y-0.5">
                        <div className={`font-display font-extrabold text-lg ${isDarkMode ? "text-white" : "text-gray-900"}`}>{hl.num}</div>
                        <h4 className={`font-bold text-xs ${isDarkMode ? "text-white" : "text-gray-900"}`}>{hl.title}</h4>
                        <p className={`text-[10px] leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>{hl.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CONTENT BG WRAPPER (LIGHT GREY BACKGROUND EXACTLY AS MOCKUP) */}
            <div className={`py-20 space-y-24 transition-colors duration-300 ${
              isDarkMode ? "bg-brand-dark text-white" : "bg-[#FAFBFD] text-gray-800"
            }`}>
              
              {/* MISI & VISI KAMI */}
              <section className="px-6 lg:px-16">
                <div className="max-w-7xl mx-auto space-y-12">
                  <div className="text-center space-y-3">
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold">Misi & Visi Kami</h2>
                    <div className="w-16 h-[3px] bg-gradient-brand mx-auto rounded-full" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Misi Card */}
                    <div className={`p-8 rounded-3xl border flex gap-6 text-left items-start ${
                      isDarkMode ? "bg-brand-card/30 border-white/5 text-white" : "bg-white border-gray-100 shadow-sm shadow-gray-100"
                    }`}>
                      <div className="w-14 h-14 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary flex-shrink-0">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-display font-extrabold text-lg">Misi</h3>
                        <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                          Memberdayakan pelajar dan mahasiswa melalui pendidikan kepenulisan ilmiah, bimbingan ahli, and komunitas inspiratif untuk menghasilkan karya ilmiah dan inovasi yang berdampak nyata.
                        </p>
                      </div>
                    </div>

                    {/* Visi Card */}
                    <div className={`p-8 rounded-3xl border flex gap-6 text-left items-start ${
                      isDarkMode ? "bg-brand-card/30 border-white/5 text-white" : "bg-white border-gray-100 shadow-sm shadow-gray-100"
                    }`}>
                      <div className="w-14 h-14 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple flex-shrink-0">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-display font-extrabold text-lg">Visi</h3>
                        <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>
                          Menjadi ekosistem pembelajaran kepenulisan ilmiah dan inovasi terdepan di Indonesia yang melahirkan generasi penulis dan inovator masa depan.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* APA YANG KAMI LAKUKAN */}
              <section className="px-6 lg:px-16">
                <div className="max-w-7xl mx-auto space-y-12">
                  <div className="text-center space-y-3">
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold">Apa yang Kami Lakukan</h2>
                    <div className="w-16 h-[3px] bg-gradient-brand mx-auto rounded-full" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        title: "Pendidikan Ilmiah",
                        desc: "Program terstruktur dan materi komprehensif untuk menguasai kepenulisan ilmiah, riset, dan inovasi.",
                        icon: (
                          <svg className="w-6 h-6 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" />
                          </svg>
                        )
                      },
                      {
                        title: "Bimbingan Ahli",
                        desc: "Belajar langsung dari mentor berpengalaman yang siap membimbing setiap langkah perjalananmu.",
                        icon: (
                          <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 025.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        )
                      },
                      {
                        title: "Komunitas Inspiratif",
                        desc: "Bergabung dengan ribuan pelajar dan mahasiswa untuk saling bertukar ide dan bertumbuh bersama.",
                        icon: (
                          <svg className="w-6 h-6 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0zm7-2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        )
                      },
                      {
                        title: "Dampak Nyata",
                        desc: "Mendorong lahirnya karya ilmiah dan inovasi yang memberikan solusi untuk tantangan di dunia nyata.",
                        icon: (
                          <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        )
                      }
                    ].map((act, i) => (
                      <div key={i} className={`p-6 rounded-2xl border flex flex-col justify-start text-left space-y-4 ${
                        isDarkMode ? "bg-brand-card/30 border-white/5" : "bg-white border-gray-100 shadow-sm shadow-gray-100"
                      }`}>
                        <div className="w-12 h-12 rounded-xl bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center flex-shrink-0">
                          {act.icon}
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-display font-extrabold text-sm sm:text-base">{act.title}</h3>
                          <p className={`text-xs leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>{act.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* NILAI-NILAI KAMI */}
              <section className="px-6 lg:px-16">
                <div className="max-w-7xl mx-auto space-y-12">
                  <div className="text-center space-y-3">
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold">Nilai-Nilai Kami</h2>
                    <div className="w-16 h-[3px] bg-gradient-brand mx-auto rounded-full" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                    {[
                      {
                        title: "Inovatif",
                        desc: "Selalu mencari cara baru untuk menciptakan solusi dan peluang.",
                        icon: (
                          <svg className="w-5 h-5 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        )
                      },
                      {
                        title: "Ilmiah",
                        desc: "Mengutamakan pendekatan ilmiah dalam setiap program, materi, dan pendampingan.",
                        icon: (
                          <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        )
                      },
                      {
                        title: "Kolaboratif",
                        desc: "Bersinergi dan saling mendukung untuk mencapai tujuan bersama.",
                        icon: (
                          <svg className="w-5 h-5 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0zm7-2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        )
                      },
                      {
                        title: "Integritas",
                        desc: "Menjunjung tinggi kejujuran, etika, dan tanggung jawab dalam setiap langkah.",
                        icon: (
                          <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                          </svg>
                        )
                      },
                      {
                        title: "Berdampak",
                        desc: "Berkomitmen menghasilkan karya dan inovasi yang bermanfaat luas.",
                        icon: (
                          <svg className="w-5 h-5 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        )
                      }
                    ].map((val, i) => (
                      <div key={i} className={`p-6 rounded-2xl border text-center space-y-4 hover:border-brand-primary/20 transition-all flex flex-col items-center justify-start ${
                        isDarkMode ? "bg-brand-card/30 border-white/5 text-white" : "bg-white border-gray-100 text-gray-800 shadow-sm shadow-gray-100"
                      }`}>
                        <div className="w-10 h-10 rounded-full bg-brand-primary/5 flex items-center justify-center flex-shrink-0 text-brand-primary">
                          {val.icon}
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-semibold text-xs sm:text-sm">{val.title}</h4>
                          <p className={`text-[11px] leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>{val.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* TIM DI BALIK KAYZEN ACADEMIA */}
              <section className="px-6 lg:px-16">
                <div className="max-w-7xl mx-auto space-y-12">
                  <div className="text-center space-y-3">
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold">Tim di Balik Kayzen Academia</h2>
                    <div className="w-16 h-[3px] bg-gradient-brand mx-auto rounded-full" />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                    {teamMembers.slice(0, 6).map((member, i) => (
                      <div key={i} className={`rounded-2xl p-5 text-center flex flex-col justify-between items-center space-y-4 border hover:border-brand-primary/20 ${
                        isDarkMode ? "bg-brand-card/30 border-white/5 text-white" : "bg-white border-gray-100 text-gray-800 shadow-sm shadow-gray-100"
                      }`}>
                        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                          <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                        </div>

                        <div className="space-y-1">
                          <h4 className="font-bold text-xs sm:text-sm leading-tight min-h-[32px] flex items-center justify-center">
                            {member.name}
                          </h4>
                          <span className={`text-[10px] font-bold block ${member.roleColor}`}>
                            {member.role}
                          </span>
                        </div>

                        {/* LinkedIn and Mail Icons */}
                        <div className="flex items-center gap-3 pt-2 text-gray-400">
                          <a href="#" className="hover:text-brand-primary transition-colors">
                            <span className="font-bold text-xs">in</span>
                          </a>
                          <a href="#" className="hover:text-brand-purple transition-colors">
                            <span>✉️</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* CTA BANNER */}
              <section className="px-6 lg:px-16">
                <div className="max-w-5xl mx-auto rounded-3xl bg-[#080b16] p-8 sm:p-12 border border-white/5 relative overflow-hidden shadow-2xl text-white">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none" />
                  <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-purple/5 rounded-full blur-2xl pointer-events-none" />

                  <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8 text-left">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center flex-shrink-0 text-brand-primary">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-4-9 4 9 5zm0 0l-9-4.243V17a4 4 0 004 4h10a4 4 0 004-4v-6.243L12 14z" />
                        </svg>
                      </div>
                      <div className="space-y-2">
                        <h2 className="font-display text-lg sm:text-xl font-extrabold tracking-tight">
                          Bergabung dan Jadi Bagian dari Perubahan!
                        </h2>
                        <p className="text-brand-muted text-xs leading-relaxed max-w-xl">
                          Bersama Kayzen Academia, wujudkan ide-idemu menjadi karya ilmiah dan inovasi yang berdampak bagi masa depan.
                        </p>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <button className="px-6 py-3.5 bg-gradient-brand text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all inline-flex items-center gap-2 group cursor-pointer">
                        Mulai Belajar Gratis
                        <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

            </div>
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

      {/* CONTEST DETAIL MODAL DIALOG */}
      {selectedContest && (
        <div 
          onClick={() => setSelectedContest(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-modal-backdrop cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border shadow-2xl animate-modal-content cursor-default ${
              isDarkMode ? "bg-[#090c19] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"
            }`}
          >
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedContest(null)}
              className={`absolute top-6 right-6 p-2 rounded-full border transition-all cursor-pointer z-10 ${
                isDarkMode ? "bg-white/5 border-white/10 hover:bg-white/10 text-white" : "bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-700"
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header Info */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative w-full sm:w-52 aspect-[4/3] rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 shadow-md">
                <Image src={selectedContest.image} alt={selectedContest.title} fill className="object-cover" />
                <span className={`absolute top-2 left-2 px-2.5 py-1 rounded text-[9px] font-bold ${selectedContest.statusColor}`}>
                  {selectedContest.status}
                </span>
              </div>
              <div className="space-y-3 text-left flex-grow">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-brand-purple/10 text-brand-purple border border-brand-purple/20">
                  {selectedContest.level}
                </span>
                <h2 className="font-display text-2xl font-extrabold leading-snug">
                  {selectedContest.title}
                </h2>
                <p className={`text-xs leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-600"}`}>
                  {selectedContest.description}
                </p>
              </div>
            </div>

            {/* Grid Highlights */}
            <div className={`grid grid-cols-2 sm:grid-cols-3 gap-4 my-6 p-4 rounded-2xl border text-left ${
              isDarkMode ? "bg-white/[0.02] border-white/5" : "bg-purple-50/50 border-purple-100"
            }`}>
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider block ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>Batas Pendaftaran</span>
                <span className="text-xs font-bold text-brand-purple">{selectedContest.deadline}</span>
              </div>
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider block ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>Sasaran Peserta</span>
                <span className="text-xs font-bold">{selectedContest.target}</span>
              </div>
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider block ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>Total Hadiah</span>
                <span className="text-xs font-extrabold text-gradient">{selectedContest.prize}</span>
              </div>
            </div>

            {/* Breakdown Details */}
            <div className="space-y-6 text-left">
              
              {/* Hadiah Breakdown */}
              <div className="space-y-2">
                <h3 className="font-bold text-sm flex items-center gap-2">
                  🏆 Breakdown Hadiah &amp; Penghargaan
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className={`p-3.5 rounded-xl border text-xs space-y-1 ${isDarkMode ? "bg-white/5 border-white/5" : "bg-gray-50 border-gray-200"}`}>
                    <div className="font-bold text-amber-500">🥇 Juara 1 Utama</div>
                    <p className={`text-[11px] ${isDarkMode ? "opacity-80" : "text-gray-600"}`}>Uang Tunai + Thropy + Sertifikat Juara 1 Nasional</p>
                  </div>
                  <div className={`p-3.5 rounded-xl border text-xs space-y-1 ${isDarkMode ? "bg-white/5 border-white/5" : "bg-gray-50 border-gray-200"}`}>
                    <div className="font-bold text-slate-400">🥈 Juara 2 Runner Up</div>
                    <p className={`text-[11px] ${isDarkMode ? "opacity-80" : "text-gray-600"}`}>Uang Tunai + Thropy + Sertifikat Juara 2 Nasional</p>
                  </div>
                  <div className={`p-3.5 rounded-xl border text-xs space-y-1 ${isDarkMode ? "bg-white/5 border-white/5" : "bg-gray-50 border-gray-200"}`}>
                    <div className="font-bold text-amber-700">🥉 Juara 3 Runner Up</div>
                    <p className={`text-[11px] ${isDarkMode ? "opacity-80" : "text-gray-600"}`}>Uang Tunai + Thropy + Sertifikat Juara 3 Nasional</p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-2">
                <h3 className="font-bold text-sm flex items-center gap-2">
                  📅 Timeline &amp; Tahapan Lomba
                </h3>
                <ul className={`space-y-2.5 text-xs p-4 rounded-xl border ${isDarkMode ? "bg-white/5 border-white/5" : "bg-gray-50 border-gray-200"}`}>
                  <li className="flex items-center justify-between">
                    <span>Pendaftaran Early Bird &amp; Submisi Karya</span>
                    <span className="font-bold text-brand-purple">1 Mei - 31 Mei 2024</span>
                  </li>
                  <li className={`flex items-center justify-between border-t pt-2 ${isDarkMode ? "border-white/5" : "border-gray-200"}`}>
                    <span>Pendaftaran Gelombang Reguler</span>
                    <span className="font-bold text-brand-purple">1 Juni - {selectedContest.deadline}</span>
                  </li>
                  <li className={`flex items-center justify-between border-t pt-2 ${isDarkMode ? "border-white/5" : "border-gray-200"}`}>
                    <span>Penilaian Juri &amp; Pengumuman Finalis</span>
                    <span className="font-bold">10 Juli - 18 Juli 2024</span>
                  </li>
                  <li className={`flex items-center justify-between border-t pt-2 ${isDarkMode ? "border-white/5" : "border-gray-200"}`}>
                    <span>Awarding Night &amp; Pengumuman Pemenang</span>
                    <span className="font-bold text-emerald-500">25 Juli 2024</span>
                  </li>
                </ul>
              </div>

              {/* Ketentuan */}
              <div className="space-y-2">
                <h3 className="font-bold text-sm flex items-center gap-2">
                  📋 Ketentuan Umum Peserta
                </h3>
                <ul className={`list-disc list-inside text-xs space-y-1.5 p-4 rounded-xl border ${
                  isDarkMode ? "bg-white/5 border-white/5 text-brand-muted" : "bg-gray-50 border-gray-200 text-gray-600"
                }`}>
                  <li>Terbuka untuk {selectedContest.target} aktif di seluruh Indonesia.</li>
                  <li>Dapat diikuti secara Individu maupun Tim (Maksimal 3 Orang).</li>
                  <li>Karya orisinal dan belum pernah memenangkan lomba sejenis sebelumnya.</li>
                  <li>Keputusan dewan juri bersifat mutlak dan tidak dapat diganggu gugat.</li>
                </ul>
              </div>

            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 mt-6 border-t border-gray-200/20">
              <a 
                href={selectedContest.link || "https://google.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl font-bold text-xs text-white bg-gradient-brand shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all inline-flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                Daftar Lomba Sekarang
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <button 
                onClick={() => alert(`Mengunduh Guidebook PDF & Buku Panduan untuk "${selectedContest.title}"...`)}
                className={`w-full sm:w-auto py-3.5 px-6 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                  isDarkMode ? "border-white/20 text-white hover:bg-white/10" : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                Unduh Guidebook (PDF)
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
