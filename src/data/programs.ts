export interface ProgramDetail {
  id: string;
  slug: string;
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
  syllabus: { week: string; title: string; desc: string }[];
}

export const programDetails: Record<string, ProgramDetail> = {
  "essay-bootcamp": {
    id: "essay-bootcamp",
    slug: "essay-bootcamp",
    title: "Essay Bootcamp: Masterclass Kepenulisan Esai Beasiswa & Lomba",
    badge: "POPULAR BOOTCAMP",
    badgeColor: "bg-brand-purple text-white border-brand-purple/40",
    tagline: "Kuasai teknik menulis essay yang terstruktur, argumentatif, dan persuasif untuk menembus beasiswa dan juara kompetisi nasional.",
    description: "Program bootcamp 4 minggu yang dirancang khusus untuk membantu pelajar dan mahasiswa memahami struktur penulisan esai kritis, teknik menyusun argumen yang logis, hingga trik lolos seleksi beasiswa top dunia.",
    price: "Rp 149.000",
    originalPrice: "Rp 299.000",
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
    slug: "kti-bootcamp",
    title: "KTI Bootcamp: Panduan Lengkap Karya Tulis Ilmiah & Penelitian",
    badge: "MENTORSHIP EXPERT",
    badgeColor: "bg-brand-primary text-white border-brand-primary/40",
    tagline: "Pelajari metodologi penelitian, perancangan proposal riset, hingga teknik publikasi ilmiah terstruktur.",
    description: "Bootcamp intensif 5 minggu untuk membimbing Anda dari tahap perumusan ide riset, peninjauan pustaka (literature review), metodologi kuantitatif/kualitatif, hingga penulisan pembahasan ilmiah yang akurat.",
    price: "Rp 199.000",
    originalPrice: "Rp 349.000",
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
    slug: "bisnis-plan",
    title: "Bisnis Plan Bootcamp: Merancang Proposal Bisnis Inovatif & Investable",
    badge: "STARTUP & PIMNAS",
    badgeColor: "bg-brand-purple text-white border-brand-purple/40",
    tagline: "Susun rencana bisnis yang terstruktur, rasional secara finansial, dan menarik minat juri kompetisi maupun investor.",
    description: "Program bootcamp 4 minggu fokus pada pemetaan ide bisnis (Business Model Canvas), analisis pasar (TAM/SAM/SOM), rencana operasional, serta proyeksi keuangan (financial projection).",
    price: "Rp 169.000",
    originalPrice: "Rp 299.000",
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
    slug: "startup-builder",
    title: "Startup Builder Cohort: Dari Validasi Ide hingga Initial Growth",
    badge: "INCUBATION PROGRAM",
    badgeColor: "bg-emerald-500 text-white border-emerald-400/40",
    tagline: "Program inkubasi awal untuk membawa prototype produkmu menuju pasar yang sesungguhnya.",
    description: "Program intensif 6 minggu untuk merancang MVP (Minimum Viable Product), uji coba pasar (go-to-market strategy), hingga siap melakukan fundraising awal.",
    price: "Rp 249.000",
    originalPrice: "Rp 499.000",
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
