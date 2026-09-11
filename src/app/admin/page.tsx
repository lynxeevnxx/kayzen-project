"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

type AdminTab = "dashboard" | "lomba" | "program" | "blog" | "testimonial" | "team" | "partner" | "users";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");

  // Data States
  const [contests, setContests] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  // Modal States
  const [modalType, setModalType] = useState<"lomba" | "program" | "blog" | "testimonial" | "team" | "partner" | null>(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  // Form States - Lomba
  const [contestForm, setContestForm] = useState({
    id: "",
    title: "",
    category: "Karya Tulis Ilmiah",
    level: "Nasional",
    deadline: "30 Hari",
    fee: "Gratis",
    image: "",
    description: "",
    guide_url: "",
    status: "open",
  });

  // Form States - Program
  const [programForm, setProgramForm] = useState({
    id: "",
    title: "",
    category: "Bootcamp & Mentoring",
    price: "Rp 150.000",
    mentor: "Tim Mentor Kayzen",
    image: "",
    description: "",
    link: "",
    status: "active",
  });

  // Form States - Blog
  const [blogForm, setBlogForm] = useState({
    id: "",
    title: "",
    category: "Teknologi & AI",
    author: "Tim Kayzen Academia",
    image: "",
    excerpt: "",
    content: "",
    status: "published",
  });

  // Form States - Testimonial
  const [testimonialForm, setTestimonialForm] = useState({
    id: "",
    quote: "",
    author: "",
    title: "Juara 1 LKTI Nasional",
    avatar: "",
    rating: 5,
    status: "active",
  });

  // Form States - Team Member
  const [teamForm, setTeamForm] = useState({
    id: "",
    name: "",
    role: "Head of Mentorship",
    description: "",
    avatar: "",
    status: "active",
  });

  // Form States - Partner
  const [partnerForm, setPartnerForm] = useState({
    id: "",
    name: "",
    category: "Universitas",
    logo: "",
    status: "active",
  });

  // Load All Data from API
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [cRes, prgRes, bRes, tstRes, tmRes, pRes, uRes] = await Promise.all([
        fetch("/api/admin/contests"),
        fetch("/api/admin/programs"),
        fetch("/api/admin/blogs"),
        fetch("/api/admin/testimonials"),
        fetch("/api/admin/team"),
        fetch("/api/admin/partners"),
        fetch("/api/admin/registrations"),
      ]);

      const cData = await cRes.json();
      const prgData = await prgRes.json();
      const bData = await bRes.json();
      const tstData = await tstRes.json();
      const tmData = await tmRes.json();
      const pData = await pRes.json();
      const uData = await uRes.json();

      if (cData.contests) setContests(cData.contests);
      if (prgData.programs) setPrograms(prgData.programs);
      if (bData.blogs) setBlogs(bData.blogs);
      if (tstData.testimonials) setTestimonials(tstData.testimonials);
      if (tmData.teamMembers) setTeamMembers(tmData.teamMembers);
      if (pData.partners) setPartners(pData.partners);
      if (uData.users) setUsers(uData.users);
    } catch (err: any) {
      console.error("Fetch admin data error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  // Submit Handlers - Lomba
  const handleSaveContest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingItem ? "PUT" : "POST";
      const res = await fetch("/api/admin/contests", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem ? { ...contestForm, id: editingItem.id } : contestForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      showNotification(data.message);
      setModalType(null);
      setEditingItem(null);
      fetchAllData();
    } catch (err: any) {
      alert(err.message || "Gagal menyimpan lomba");
    }
  };

  const handleDeleteContest = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus lomba ini?")) return;
    try {
      const res = await fetch(`/api/admin/contests?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      showNotification(data.message);
      fetchAllData();
    } catch (err: any) {
      alert("Gagal menghapus lomba");
    }
  };

  // Submit Handlers - Program
  const handleSaveProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingItem ? "PUT" : "POST";
      const res = await fetch("/api/admin/programs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem ? { ...programForm, id: editingItem.id } : programForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      showNotification(data.message);
      setModalType(null);
      setEditingItem(null);
      fetchAllData();
    } catch (err: any) {
      alert(err.message || "Gagal menyimpan program");
    }
  };

  const handleDeleteProgram = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus program ini?")) return;
    try {
      const res = await fetch(`/api/admin/programs?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      showNotification(data.message);
      fetchAllData();
    } catch (err: any) {
      alert("Gagal menghapus program");
    }
  };

  // Submit Handlers - Blog
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingItem ? "PUT" : "POST";
      const res = await fetch("/api/admin/blogs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem ? { ...blogForm, id: editingItem.id } : blogForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      showNotification(data.message);
      setModalType(null);
      setEditingItem(null);
      fetchAllData();
    } catch (err: any) {
      alert(err.message || "Gagal menyimpan artikel blog");
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus artikel blog ini?")) return;
    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      showNotification(data.message);
      fetchAllData();
    } catch (err: any) {
      alert("Gagal menghapus artikel blog");
    }
  };

  // Submit Handlers - Testimonial
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingItem ? "PUT" : "POST";
      const res = await fetch("/api/admin/testimonials", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem ? { ...testimonialForm, id: editingItem.id } : testimonialForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      showNotification(data.message);
      setModalType(null);
      setEditingItem(null);
      fetchAllData();
    } catch (err: any) {
      alert(err.message || "Gagal menyimpan testimonial");
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus testimonial ini?")) return;
    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      showNotification(data.message);
      fetchAllData();
    } catch (err: any) {
      alert("Gagal menghapus testimonial");
    }
  };

  // Submit Handlers - Team Member
  const handleSaveTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingItem ? "PUT" : "POST";
      const res = await fetch("/api/admin/team", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem ? { ...teamForm, id: editingItem.id } : teamForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      showNotification(data.message);
      setModalType(null);
      setEditingItem(null);
      fetchAllData();
    } catch (err: any) {
      alert(err.message || "Gagal menyimpan anggota tim");
    }
  };

  const handleDeleteTeam = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus anggota tim ini?")) return;
    try {
      const res = await fetch(`/api/admin/team?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      showNotification(data.message);
      fetchAllData();
    } catch (err: any) {
      alert("Gagal menghapus anggota tim");
    }
  };

  // Submit Handlers - Partner
  const handleSavePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingItem ? "PUT" : "POST";
      const res = await fetch("/api/admin/partners", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem ? { ...partnerForm, id: editingItem.id } : partnerForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      showNotification(data.message);
      setModalType(null);
      setEditingItem(null);
      fetchAllData();
    } catch (err: any) {
      alert(err.message || "Gagal menyimpan partner");
    }
  };

  const handleDeletePartner = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus partner ini?")) return;
    try {
      const res = await fetch(`/api/admin/partners?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      showNotification(data.message);
      fetchAllData();
    } catch (err: any) {
      alert("Gagal menghapus partner");
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-[#050711] text-gray-100" : "bg-gray-50 text-gray-900"} font-sans antialiased`}>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} activeTab="admin" />

      {/* ADMIN NOTIFICATION TOAST */}
      {successMsg && (
        <div className="fixed top-24 right-6 z-50 p-4 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <span>✅ {successMsg}</span>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* HEADER TITLE */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-primary mb-1">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
              KAYZEN ACADEMIA FULL CMS PANEL
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Pusat Pengelolaan Seluruh Konten Dinamis Web
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAllData}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isDarkMode ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white border-gray-200 hover:bg-gray-100"
              }`}
            >
              🔄 Refresh Data DB
            </button>
            <Link
              href="/"
              className="px-4 py-2.5 bg-brand-purple hover:bg-purple-600 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-brand-purple/20"
            >
              &larr; Lihat Web Utama
            </Link>
          </div>
        </div>

        {/* ADMIN TAB NAVIGATION */}
        <div className={`flex items-center gap-2 overflow-x-auto p-1.5 rounded-2xl border mb-8 ${
          isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-gray-200 shadow-sm"
        }`}>
          {[
            { id: "dashboard", label: "📊 Overview" },
            { id: "lomba", label: "🏆 Info Lomba" },
            { id: "program", label: "🎓 Program Academy" },
            { id: "blog", label: "✍️ Artikel Blog" },
            { id: "testimonial", label: "💬 Testimonial Alumni" },
            { id: "team", label: "👥 Tim & Mentors" },
            { id: "partner", label: "🤝 Logo Partner" },
            { id: "users", label: "👤 Akun DB" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-gradient-brand text-white shadow-md"
                  : isDarkMode
                  ? "text-brand-muted hover:text-white hover:bg-white/5"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1. OVERVIEW DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* STAT CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className={`p-5 rounded-2xl border ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
                <p className="text-[10px] font-bold text-brand-muted uppercase">Lomba</p>
                <h3 className="text-2xl font-extrabold text-brand-primary mt-1">{contests.length}</h3>
              </div>

              <div className={`p-5 rounded-2xl border ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
                <p className="text-[10px] font-bold text-brand-muted uppercase">Program</p>
                <h3 className="text-2xl font-extrabold text-brand-purple mt-1">{programs.length}</h3>
              </div>

              <div className={`p-5 rounded-2xl border ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
                <p className="text-[10px] font-bold text-brand-muted uppercase">Blog</p>
                <h3 className="text-2xl font-extrabold text-emerald-400 mt-1">{blogs.length}</h3>
              </div>

              <div className={`p-5 rounded-2xl border ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
                <p className="text-[10px] font-bold text-brand-muted uppercase">Testimonial</p>
                <h3 className="text-2xl font-extrabold text-amber-400 mt-1">{testimonials.length}</h3>
              </div>

              <div className={`p-5 rounded-2xl border ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
                <p className="text-[10px] font-bold text-brand-muted uppercase">Tim Mentor</p>
                <h3 className="text-2xl font-extrabold text-pink-400 mt-1">{teamMembers.length}</h3>
              </div>

              <div className={`p-5 rounded-2xl border ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
                <p className="text-[10px] font-bold text-brand-muted uppercase">Partner</p>
                <h3 className="text-2xl font-extrabold text-cyan-400 mt-1">{partners.length}</h3>
              </div>
            </div>

            {/* ACTION QUICK LINKS */}
            <div className={`p-6 rounded-2xl border ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-gray-200 shadow-sm"}`}>
              <h3 className="text-sm font-bold mb-4">⚡ Akses Cepat Halaman Editor Baru (Full-Page Form)</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/admin/lomba/editor"
                  className="px-3.5 py-2.5 bg-brand-purple hover:bg-purple-600 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  + Tambah Lomba (Page Baru)
                </Link>

                <Link
                  href="/admin/program/editor"
                  className="px-3.5 py-2.5 bg-brand-primary hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  + Tambah Program (Page Baru)
                </Link>

                <Link
                  href="/admin/blog/editor"
                  className="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  + Tulis Artikel Blog (Page Baru)
                </Link>

                <button
                  onClick={() => {
                    setEditingItem(null);
                    setTestimonialForm({ id: "", quote: "", author: "", title: "Juara 1 LKTI Nasional", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80", rating: 5, status: "active" });
                    setModalType("testimonial");
                  }}
                  className="px-3.5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  + Tambah Testimonial
                </button>

                <button
                  onClick={() => {
                    setEditingItem(null);
                    setTeamForm({ id: "", name: "", role: "Head of Mentorship", description: "", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80", status: "active" });
                    setModalType("team");
                  }}
                  className="px-3.5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  + Tambah Anggota Tim
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. KELOLA LOMBA */}
        {activeTab === "lomba" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Kelola Informasi Lomba & Kompetisi</h2>
              <Link
                href="/admin/lomba/editor"
                className="px-4 py-2 bg-brand-purple hover:bg-purple-600 text-white rounded-xl text-xs font-bold shadow-md"
              >
                + Tambah Lomba (Page Baru)
              </Link>
            </div>

            <div className={`overflow-x-auto rounded-2xl border ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-gray-200"}`}>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className={`border-b ${isDarkMode ? "border-white/10 bg-white/5 text-gray-300" : "border-gray-200 bg-gray-100 text-gray-700"}`}>
                    <th className="p-4">Poster</th>
                    <th className="p-4">Judul Lomba</th>
                    <th className="p-4">Kategori</th>
                    <th className="p-4">Tingkat</th>
                    <th className="p-4">Biaya</th>
                    <th className="p-4">Deadline</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {contests.length === 0 ? (
                    <tr><td colSpan={7} className="p-6 text-center text-gray-500">Belum ada lomba ditambahkan.</td></tr>
                  ) : (
                    contests.map((c) => (
                      <tr key={c.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden relative border border-white/10">
                            <Image unoptimized src={c.image} alt={c.title} fill className="object-cover" />
                          </div>
                        </td>
                        <td className="p-4 font-bold max-w-xs truncate">{c.title}</td>
                        <td className="p-4"><span className="px-2 py-1 rounded bg-brand-purple/20 text-brand-purple font-bold text-[10px]">{c.category}</span></td>
                        <td className="p-4">{c.level}</td>
                        <td className="p-4 font-semibold text-emerald-400">{c.fee}</td>
                        <td className="p-4">{c.deadline}</td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Link href={`/admin/lomba/editor?id=${c.id}`} className="px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded-lg font-bold text-[10px]">Edit (Page)</Link>
                            <button onClick={() => handleDeleteContest(c.id)} className="px-3 py-1.5 bg-red-600/20 text-red-400 rounded-lg font-bold text-[10px]">Hapus</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. KELOLA PROGRAM ACADEMY */}
        {activeTab === "program" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Kelola Program & Bootcamp Academy</h2>
              <Link
                href="/admin/program/editor"
                className="px-4 py-2 bg-brand-primary hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md"
              >
                + Tambah Program (Page Baru)
              </Link>
            </div>

            <div className={`overflow-x-auto rounded-2xl border ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-gray-200"}`}>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className={`border-b ${isDarkMode ? "border-white/10 bg-white/5 text-gray-300" : "border-gray-200 bg-gray-100 text-gray-700"}`}>
                    <th className="p-4">Cover</th>
                    <th className="p-4">Judul Program</th>
                    <th className="p-4">Kategori</th>
                    <th className="p-4">Biaya / Harga</th>
                    <th className="p-4">Mentor</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {programs.length === 0 ? (
                    <tr><td colSpan={6} className="p-6 text-center text-gray-500">Belum ada program ditambahkan.</td></tr>
                  ) : (
                    programs.map((p) => (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden relative border border-white/10">
                            <Image unoptimized src={p.image} alt={p.title} fill className="object-cover" />
                          </div>
                        </td>
                        <td className="p-4 font-bold max-w-xs truncate">{p.title}</td>
                        <td className="p-4"><span className="px-2 py-1 rounded bg-brand-primary/20 text-brand-primary font-bold text-[10px]">{p.category}</span></td>
                        <td className="p-4 font-semibold text-emerald-400">{p.price}</td>
                        <td className="p-4">{p.mentor}</td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Link href={`/admin/program/editor?id=${p.id}`} className="px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded-lg font-bold text-[10px]">Edit (Page)</Link>
                            <button onClick={() => handleDeleteProgram(p.id)} className="px-3 py-1.5 bg-red-600/20 text-red-400 rounded-lg font-bold text-[10px]">Hapus</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. KELOLA BLOG */}
        {activeTab === "blog" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Kelola Artikel Blog & Edukasi</h2>
              <Link
                href="/admin/blog/editor"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md"
              >
                + Tulis Artikel (Page Baru)
              </Link>
            </div>

            <div className={`overflow-x-auto rounded-2xl border ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-gray-200"}`}>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className={`border-b ${isDarkMode ? "border-white/10 bg-white/5 text-gray-300" : "border-gray-200 bg-gray-100 text-gray-700"}`}>
                    <th className="p-4">Cover</th>
                    <th className="p-4">Judul Artikel</th>
                    <th className="p-4">Kategori</th>
                    <th className="p-4">Penulis</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {blogs.length === 0 ? (
                    <tr><td colSpan={5} className="p-6 text-center text-gray-500">Belum ada artikel ditambahkan.</td></tr>
                  ) : (
                    blogs.map((b) => (
                      <tr key={b.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden relative border border-white/10">
                            <Image unoptimized src={b.image} alt={b.title} fill className="object-cover" />
                          </div>
                        </td>
                        <td className="p-4 font-bold max-w-xs truncate">{b.title}</td>
                        <td className="p-4"><span className="px-2 py-1 rounded bg-brand-primary/20 text-brand-primary font-bold text-[10px]">{b.category}</span></td>
                        <td className="p-4">{b.author}</td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Link href={`/admin/blog/editor?id=${b.id}`} className="px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded-lg font-bold text-[10px]">Edit (Page)</Link>
                            <button onClick={() => handleDeleteBlog(b.id)} className="px-3 py-1.5 bg-red-600/20 text-red-400 rounded-lg font-bold text-[10px]">Hapus</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. KELOLA TESTIMONIAL */}
        {activeTab === "testimonial" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Kelola Testimonial & Ulasan Alumni</h2>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setTestimonialForm({ id: "", quote: "", author: "", title: "Juara 1 LKTI Nasional", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80", rating: 5, status: "active" });
                  setModalType("testimonial");
                }}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
              >
                + Tambah Testimonial
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {testimonials.map((t) => (
                <div key={t.id} className={`p-5 rounded-2xl border flex flex-col justify-between ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-gray-200"}`}>
                  <div className="space-y-3">
                    <p className="text-xs italic leading-relaxed opacity-90">&quot;{t.quote}&quot;</p>
                    <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                      <div className="w-9 h-9 rounded-full overflow-hidden relative border border-white/10">
                        <Image unoptimized src={t.avatar} alt={t.author} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs">{t.author}</h4>
                        <p className="text-[10px] text-amber-400">{t.title}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-white/10">
                    <button onClick={() => { setEditingItem(t); setTestimonialForm(t); setModalType("testimonial"); }} className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded font-bold text-[10px]">Edit</button>
                    <button onClick={() => handleDeleteTestimonial(t.id)} className="px-2 py-1 bg-red-600/20 text-red-400 rounded font-bold text-[10px]">Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. KELOLA TIM & MENTOR */}
        {activeTab === "team" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Kelola Tim & Mentors Kayzen</h2>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setTeamForm({ id: "", name: "", role: "Head of Mentorship", description: "", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80", status: "active" });
                  setModalType("team");
                }}
                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
              >
                + Tambah Anggota Tim
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {teamMembers.map((m) => (
                <div key={m.id} className={`p-4 rounded-2xl border flex flex-col justify-between ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-gray-200"}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden relative border border-brand-purple/40">
                      <Image unoptimized src={m.avatar} alt={m.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs">{m.name}</h4>
                      <p className="text-[10px] text-brand-purple font-semibold">{m.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-white/10">
                    <button onClick={() => { setEditingItem(m); setTeamForm(m); setModalType("team"); }} className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded font-bold text-[10px]">Edit</button>
                    <button onClick={() => handleDeleteTeam(m.id)} className="px-2 py-1 bg-red-600/20 text-red-400 rounded font-bold text-[10px]">Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. KELOLA PARTNER */}
        {activeTab === "partner" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Kelola Logo Partner & Sponsor</h2>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setPartnerForm({ id: "", name: "", category: "Universitas", logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=300&q=80", status: "active" });
                  setModalType("partner");
                }}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
              >
                + Tambah Partner
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {partners.map((p) => (
                <div key={p.id} className={`p-4 rounded-2xl border flex flex-col justify-between ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-gray-200"}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl border border-white/10 overflow-hidden relative bg-white/5 flex items-center justify-center">
                      <Image unoptimized src={p.logo} alt={p.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs truncate max-w-[140px]">{p.name}</h4>
                      <p className="text-[10px] text-brand-muted">{p.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-white/10">
                    <button onClick={() => { setEditingItem(p); setPartnerForm(p); setModalType("partner"); }} className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded font-bold text-[10px]">Edit</button>
                    <button onClick={() => handleDeletePartner(p.id)} className="px-2 py-1 bg-red-600/20 text-red-400 rounded font-bold text-[10px]">Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. USER TERDAFTAR */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold">Daftar Akun Pengguna Terdaftar (MySQL DB)</h2>
            <div className={`overflow-x-auto rounded-2xl border ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-gray-200"}`}>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className={`border-b ${isDarkMode ? "border-white/10 bg-white/5 text-gray-300" : "border-gray-200 bg-gray-100 text-gray-700"}`}>
                    <th className="p-4">ID User</th>
                    <th className="p-4">Nama Pengguna</th>
                    <th className="p-4">Alamat Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Tanggal Registrasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users.length === 0 ? (
                    <tr><td colSpan={5} className="p-6 text-center text-gray-500">Belum ada akun di database.</td></tr>
                  ) : (
                    users.map((u) => (
                      <tr key={u.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-mono text-[10px] text-brand-muted">{u.id}</td>
                        <td className="p-4 font-bold">{u.name}</td>
                        <td className="p-4">{u.email}</td>
                        <td className="p-4"><span className="px-2 py-1 rounded bg-brand-purple/20 text-brand-purple font-bold text-[10px]">{u.role || "user"}</span></td>
                        <td className="p-4 text-gray-400">{new Date(u.created_at).toLocaleString("id-ID")}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* MODAL FORM LOMBA */}
      {modalType === "lomba" && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`w-full max-w-xl p-6 rounded-2xl border shadow-2xl ${isDarkMode ? "bg-[#0b0e1b] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"}`}>
            <h3 className="text-lg font-bold mb-4">{editingItem ? "Edit Info Lomba" : "Tambah Lomba Baru"}</h3>
            <form onSubmit={handleSaveContest} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Judul Lomba</label>
                <input type="text" required value={contestForm.title} onChange={(e) => setContestForm({ ...contestForm, title: e.target.value })} className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-brand-purple" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Kategori</label>
                  <input type="text" required value={contestForm.category} onChange={(e) => setContestForm({ ...contestForm, category: e.target.value })} className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-brand-purple" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Biaya Pendaftaran</label>
                  <input type="text" required value={contestForm.fee} onChange={(e) => setContestForm({ ...contestForm, fee: e.target.value })} className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-brand-purple" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">URL Link Form Mitra / Google Form</label>
                <input type="text" placeholder="https://..." value={contestForm.guide_url} onChange={(e) => setContestForm({ ...contestForm, guide_url: e.target.value })} className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-brand-purple" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">URL Poster Image</label>
                <input type="text" required value={contestForm.image} onChange={(e) => setContestForm({ ...contestForm, image: e.target.value })} className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-brand-purple" />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 rounded-xl border border-white/10 text-xs font-bold">Batal</button>
                <button type="submit" className="px-5 py-2 bg-brand-purple text-white rounded-xl text-xs font-bold shadow-lg">Simpan Lomba</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FORM PROGRAM */}
      {modalType === "program" && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`w-full max-w-xl p-6 rounded-2xl border shadow-2xl ${isDarkMode ? "bg-[#0b0e1b] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"}`}>
            <h3 className="text-lg font-bold mb-4">{editingItem ? "Edit Program Academy" : "Tambah Program Academy Baru"}</h3>
            <form onSubmit={handleSaveProgram} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Judul Program / Bootcamp</label>
                <input type="text" required value={programForm.title} onChange={(e) => setProgramForm({ ...programForm, title: e.target.value })} className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-brand-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Kategori</label>
                  <input type="text" required value={programForm.category} onChange={(e) => setProgramForm({ ...programForm, category: e.target.value })} className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-brand-primary" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Harga / Biaya</label>
                  <input type="text" required value={programForm.price} onChange={(e) => setProgramForm({ ...programForm, price: e.target.value })} className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-brand-primary" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Mentor / Instruktur</label>
                <input type="text" required value={programForm.mentor} onChange={(e) => setProgramForm({ ...programForm, mentor: e.target.value })} className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-brand-primary" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">URL Cover Image</label>
                <input type="text" required value={programForm.image} onChange={(e) => setProgramForm({ ...programForm, image: e.target.value })} className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-brand-primary" />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 rounded-xl border border-white/10 text-xs font-bold">Batal</button>
                <button type="submit" className="px-5 py-2 bg-brand-primary text-white rounded-xl text-xs font-bold shadow-lg">Simpan Program</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FORM BLOG */}
      {modalType === "blog" && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`w-full max-w-xl p-6 rounded-2xl border shadow-2xl ${isDarkMode ? "bg-[#0b0e1b] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"}`}>
            <h3 className="text-lg font-bold mb-4">{editingItem ? "Edit Artikel Blog" : "Tulis Artikel Blog Baru"}</h3>
            <form onSubmit={handleSaveBlog} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Judul Artikel</label>
                <input
                  type="text"
                  required
                  placeholder="misal: Panduan Lengkap Menggunakan AI dalam Kepenulisan Ilmiah"
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Kategori</label>
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
                    placeholder="Tim Kayzen Academia"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-brand-purple"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">URL Cover Image</label>
                <input
                  type="text"
                  required
                  placeholder="https://..."
                  value={blogForm.image}
                  onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                  className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Ringkasan Artikel (Excerpt)</label>
                <textarea
                  rows={2}
                  placeholder="Ringkasan 2-3 kalimat mengenai isi artikel..."
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Isi Konten Artikel (Rich Formatting Tools)</label>
                </div>
                
                {/* TOOLBAR FORMATTING CEPAT */}
                <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-t-xl bg-white/10 border border-white/10 border-b-0 text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => setBlogForm({ ...blogForm, content: blogForm.content + "<h3>Judul Bagian</h3>\n" })}
                    className="px-2 py-1 bg-brand-purple/30 hover:bg-brand-purple/50 rounded"
                  >
                    + H3 Sub-Judul
                  </button>
                  <button
                    type="button"
                    onClick={() => setBlogForm({ ...blogForm, content: blogForm.content + "<p>Tulis paragraf penjelasan Anda di sini...</p>\n" })}
                    className="px-2 py-1 bg-brand-primary/30 hover:bg-brand-primary/50 rounded"
                  >
                    + Paragraf
                  </button>
                  <button
                    type="button"
                    onClick={() => setBlogForm({ ...blogForm, content: blogForm.content + "<strong>Teks Tebal</strong>" })}
                    className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded font-black"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    onClick={() => setBlogForm({ ...blogForm, content: blogForm.content + "<em>Teks Miring</em>" })}
                    className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded italic"
                  >
                    I
                  </button>
                  <button
                    type="button"
                    onClick={() => setBlogForm({ ...blogForm, content: blogForm.content + "<blockquote>Kutipan penting...</blockquote>\n" })}
                    className="px-2 py-1 bg-amber-500/30 hover:bg-amber-500/50 rounded"
                  >
                    + Quote Kutipan
                  </button>
                  <button
                    type="button"
                    onClick={() => setBlogForm({ ...blogForm, content: blogForm.content + "<ul>\n  <li>Poin 1</li>\n  <li>Poin 2</li>\n</ul>\n" })}
                    className="px-2 py-1 bg-emerald-500/30 hover:bg-emerald-500/50 rounded"
                  >
                    + List Poin
                  </button>
                </div>

                <textarea
                  rows={6}
                  placeholder="Ketik isi artikel blog lengkap di sini. Gunakan tombol formatting di atas untuk menyusun paragraf dan sub-judul secara rapi..."
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  className="w-full p-3 rounded-b-xl border border-white/10 bg-white/5 text-xs font-mono leading-relaxed focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2 rounded-xl border border-white/10 text-xs font-bold opacity-70 hover:opacity-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-lg"
                >
                  Publikasikan Artikel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FORM TESTIMONIAL */}
      {modalType === "testimonial" && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`w-full max-w-lg p-6 rounded-2xl border shadow-2xl ${isDarkMode ? "bg-[#0b0e1b] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"}`}>
            <h3 className="text-lg font-bold mb-4">{editingItem ? "Edit Testimonial Alumni" : "Tambah Testimonial Alumni Baru"}</h3>
            <form onSubmit={handleSaveTestimonial} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Isi Kutipan Testimonial</label>
                <textarea rows={3} required value={testimonialForm.quote} onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })} className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-amber-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Nama Alumni</label>
                  <input type="text" required value={testimonialForm.author} onChange={(e) => setTestimonialForm({ ...testimonialForm, author: e.target.value })} className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-amber-500" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Gelar / Prestasi</label>
                  <input type="text" required value={testimonialForm.title} onChange={(e) => setTestimonialForm({ ...testimonialForm, title: e.target.value })} className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-amber-500" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">URL Avatar Foto</label>
                <input type="text" required value={testimonialForm.avatar} onChange={(e) => setTestimonialForm({ ...testimonialForm, avatar: e.target.value })} className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-amber-500" />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 rounded-xl border border-white/10 text-xs font-bold">Batal</button>
                <button type="submit" className="px-5 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold shadow-lg">Simpan Testimonial</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FORM TEAM */}
      {modalType === "team" && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`w-full max-w-lg p-6 rounded-2xl border shadow-2xl ${isDarkMode ? "bg-[#0b0e1b] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"}`}>
            <h3 className="text-lg font-bold mb-4">{editingItem ? "Edit Anggota Tim" : "Tambah Anggota Tim Baru"}</h3>
            <form onSubmit={handleSaveTeam} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Nama Lengkap</label>
                  <input type="text" required value={teamForm.name} onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })} className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-pink-500" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Jabatan / Role</label>
                  <input type="text" required value={teamForm.role} onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })} className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-pink-500" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">URL Avatar Foto</label>
                <input type="text" required value={teamForm.avatar} onChange={(e) => setTeamForm({ ...teamForm, avatar: e.target.value })} className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-pink-500" />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 rounded-xl border border-white/10 text-xs font-bold">Batal</button>
                <button type="submit" className="px-5 py-2 bg-pink-600 text-white rounded-xl text-xs font-bold shadow-lg">Simpan Anggota Tim</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL FORM PARTNER */}
      {modalType === "partner" && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl ${isDarkMode ? "bg-[#0b0e1b] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"}`}>
            <h3 className="text-lg font-bold mb-4">{editingItem ? "Edit Logo Partner" : "Tambah Logo Partner Baru"}</h3>
            <form onSubmit={handleSavePartner} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">Nama Partner / Kampus</label>
                <input type="text" required value={partnerForm.name} onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })} className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-cyan-500" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider opacity-60">URL Logo Partner</label>
                <input type="text" required value={partnerForm.logo} onChange={(e) => setPartnerForm({ ...partnerForm, logo: e.target.value })} className="w-full mt-1 p-3 rounded-xl border border-white/10 bg-white/5 text-xs focus:outline-none focus:border-cyan-500" />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 rounded-xl border border-white/10 text-xs font-bold">Batal</button>
                <button type="submit" className="px-5 py-2 bg-cyan-600 text-white rounded-xl text-xs font-bold shadow-lg">Simpan Partner</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
