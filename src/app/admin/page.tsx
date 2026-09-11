"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

type AdminTab = "dashboard" | "program" | "lomba" | "blog" | "registrations" | "testimonials" | "team" | "partners";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Data States
  const [contests, setContests] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);

  // Modal States
  const [modalType, setModalType] = useState<"lomba" | "program" | "blog" | "testimonial" | "team" | "partner" | null>(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  // Form States
  const [contestForm, setContestForm] = useState({
    id: "",
    title: "",
    category: "Karya Tulis Ilmiah",
    level: "Nasional",
    deadline: "30 Hari",
    fee: "Gratis",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    description: "",
    guide_url: "#",
    status: "open",
  });

  const [programForm, setProgramForm] = useState({
    id: "",
    title: "",
    category: "Bootcamp & Mentoring",
    price: "Rp 39.000",
    mentor: "Tim Mentor Kayzen",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    description: "",
    link: "https://wa.me/6281234567890",
    status: "active",
  });

  const [blogForm, setBlogForm] = useState({
    id: "",
    title: "",
    category: "Teknologi & AI",
    author: "Tim Kayzen Academia",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    excerpt: "",
    content: "",
    status: "published",
  });

  const [testimonialForm, setTestimonialForm] = useState({
    id: "",
    quote: "",
    author: "",
    title: "Juara 1 LKTI Nasional",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    status: "active",
  });

  const [teamForm, setTeamForm] = useState({
    id: "",
    name: "",
    role: "Head of Mentorship",
    description: "",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    status: "active",
  });

  const [partnerForm, setPartnerForm] = useState({
    id: "",
    name: "",
    category: "Universitas",
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=300&q=80",
    status: "active",
  });

  // Load All Data from APIs
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
      if (uData.registrations) setRegistrations(uData.registrations);
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

  // Submit Handlers
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
      alert(err.message || "Gagal menyimpan testimoni");
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus testimoni ini?")) return;
    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      showNotification(data.message);
      fetchAllData();
    } catch (err: any) {
      alert("Gagal menghapus testimoni");
    }
  };

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

  // Status handler for Registration
  const handleUpdateRegStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/registrations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      showNotification("Status pendaftaran berhasil diperbarui");
      fetchAllData();
    } catch (err: any) {
      alert(err.message || "Gagal mengupdate status");
    }
  };

  const handleDeleteRegistration = async (id: string) => {
    if (!confirm("Hapus data pendaftaran ini?")) return;
    try {
      const res = await fetch(`/api/admin/registrations?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      showNotification(data.message);
      fetchAllData();
    } catch (err: any) {
      alert("Gagal menghapus pendaftaran");
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (registrations.length === 0) {
      alert("Belum ada data pendaftaran untuk di-export.");
      return;
    }
    const headers = "ID,Nama,Email,No HP,Judul Lomba/Program,Status,Tanggal\n";
    const rows = registrations
      .map(
        (r) =>
          `"${r.id}","${r.user_name || r.name || ''}","${r.user_email || r.email || ''}","${r.phone || ''}","${r.contest_title || r.title || ''}","${r.status || 'Pending'}","${r.created_at || ''}"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Data_Pendaftaran_Kayzen_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Modal Opener Helper
  const openAddModal = (type: "lomba" | "program" | "blog" | "testimonial" | "team" | "partner") => {
    setEditingItem(null);
    setModalType(type);
    if (type === "lomba") {
      setContestForm({
        id: "",
        title: "",
        category: "Karya Tulis Ilmiah",
        level: "Nasional",
        deadline: "30 Hari",
        fee: "Gratis",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
        description: "",
        guide_url: "#",
        status: "open",
      });
    } else if (type === "program") {
      setProgramForm({
        id: "",
        title: "",
        category: "Bootcamp & Mentoring",
        price: "Rp 39.000",
        mentor: "Tim Mentor Kayzen",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
        description: "",
        link: "https://wa.me/6281234567890",
        status: "active",
      });
    } else if (type === "blog") {
      setBlogForm({
        id: "",
        title: "",
        category: "Teknologi & AI",
        author: "Tim Kayzen Academia",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
        excerpt: "",
        content: "",
        status: "published",
      });
    } else if (type === "testimonial") {
      setTestimonialForm({
        id: "",
        quote: "",
        author: "",
        title: "Juara 1 LKTI Nasional",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        rating: 5,
        status: "active",
      });
    } else if (type === "team") {
      setTeamForm({
        id: "",
        name: "",
        role: "Head of Mentorship",
        description: "",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        status: "active",
      });
    } else if (type === "partner") {
      setPartnerForm({
        id: "",
        name: "",
        category: "Universitas",
        logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=300&q=80",
        status: "active",
      });
    }
  };

  const openEditModal = (type: "lomba" | "program" | "blog" | "testimonial" | "team" | "partner", item: any) => {
    setEditingItem(item);
    setModalType(type);
    if (type === "lomba") setContestForm(item);
    else if (type === "program") setProgramForm(item);
    else if (type === "blog") setBlogForm(item);
    else if (type === "testimonial") setTestimonialForm(item);
    else if (type === "team") setTeamForm(item);
    else if (type === "partner") setPartnerForm(item);
  };

  // Nav Items Definition
  const navItems = [
    { id: "dashboard", label: "Dashboard Overview", icon: "📊", badge: null },
    { id: "registrations", label: "Pendaftaran Peserta", icon: "👥", badge: registrations.length },
    { id: "program", label: "Program & Bootcamp", icon: "🎓", badge: programs.length },
    { id: "lomba", label: "Info Lomba & Beasiswa", icon: "🏆", badge: contests.length },
    { id: "blog", label: "Blog & Artikel", icon: "✍️", badge: blogs.length },
    { id: "testimonials", label: "Testimonial", icon: "💬", badge: testimonials.length },
    { id: "team", label: "Tim & Mentor", icon: "👨‍🏫", badge: teamMembers.length },
    { id: "partners", label: "Kemitraan & Partner", icon: "🤝", badge: partners.length },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-[#04060f] text-gray-100" : "bg-slate-50 text-slate-900"} font-sans antialiased transition-colors duration-300`}>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} activeTab="admin" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Notification Toast */}
        {successMsg && (
          <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
            <span className="text-xl">✅</span>
            <span className="font-semibold text-sm">{successMsg}</span>
          </div>
        )}

        {/* Dashboard Title & Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-brand-purple/20 text-brand-purple text-xs font-bold rounded-full border border-brand-purple/30">
                Kayzen CMS v2.0
              </span>
              <span className="text-xs text-gray-400">Pusat Manajemen Client & Konten</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              Admin Control Panel
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={fetchAllData}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                isDarkMode
                  ? "bg-white/5 border-white/10 hover:bg-white/10 text-gray-200"
                  : "bg-white border-slate-200 hover:bg-slate-100 text-slate-700 shadow-sm"
              }`}
            >
              <span>🔄</span> Refresh Data
            </button>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>📥</span> Export CSV Peserta
            </button>
          </div>
        </div>

        {/* Main Grid: Sidebar Nav + Main Content Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* SIDEBAR NAVIGATION */}
          <aside className="lg:col-span-3">
            <div className={`p-3 rounded-2xl border ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-slate-200 shadow-sm"} sticky top-24`}>
              <div className="px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
                Menu Utama Admin
              </div>
              <nav className="space-y-1 mt-2">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as AdminTab);
                        setSearchQuery("");
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? "bg-brand-purple text-white shadow-md shadow-brand-purple/20 font-bold"
                          : isDarkMode
                          ? "text-gray-300 hover:bg-white/5 hover:text-white"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== null && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                            isActive
                              ? "bg-white/20 text-white"
                              : isDarkMode
                              ? "bg-white/10 text-gray-300"
                              : "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-6 pt-4 border-t border-white/10 px-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-purple/30 flex items-center justify-center font-bold text-brand-purple text-xs">
                    KA
                  </div>
                  <div>
                    <div className="text-xs font-bold">Admin Kayzen</div>
                    <div className="text-[10px] text-gray-400">Master Administrator</div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="lg:col-span-9">
            {loading ? (
              <div className={`p-12 rounded-2xl border text-center ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-slate-200"}`}>
                <div className="inline-block w-8 h-8 border-4 border-brand-purple border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-sm font-semibold text-gray-400">Memuat data Admin Control Panel...</p>
              </div>
            ) : (
              <>
                {/* ----------------- TAB 1: DASHBOARD OVERVIEW ----------------- */}
                {activeTab === "dashboard" && (
                  <div className="space-y-8">
                    {/* STAT CARDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className={`p-5 rounded-2xl border transition-all ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-gray-400">Total Pendaftaran</span>
                          <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400 text-lg">👥</span>
                        </div>
                        <div className="text-2xl font-extrabold mt-3">{registrations.length} Peserta</div>
                        <div className="text-[11px] text-emerald-400 font-semibold mt-1">↑ Direct Live Sync</div>
                      </div>

                      <div className={`p-5 rounded-2xl border transition-all ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-gray-400">Program Mentoring</span>
                          <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 text-lg">🎓</span>
                        </div>
                        <div className="text-2xl font-extrabold mt-3">{programs.length} Program</div>
                        <div className="text-[11px] text-purple-400 font-semibold mt-1">Rp 39.000 All Bootcamp</div>
                      </div>

                      <div className={`p-5 rounded-2xl border transition-all ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-gray-400">Info Lomba</span>
                          <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 text-lg">🏆</span>
                        </div>
                        <div className="text-2xl font-extrabold mt-3">{contests.length} Perlombaan</div>
                        <div className="text-[11px] text-amber-400 font-semibold mt-1">Tingkat Nasional</div>
                      </div>

                      <div className={`p-5 rounded-2xl border transition-all ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-gray-400">Artikel Blog</span>
                          <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 text-lg">✍️</span>
                        </div>
                        <div className="text-2xl font-extrabold mt-3">{blogs.length} Artikel</div>
                        <div className="text-[11px] text-emerald-400 font-semibold mt-1">Published Active</div>
                      </div>
                    </div>

                    {/* QUICK ACTIONS */}
                    <div className={`p-6 rounded-2xl border ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
                      <h3 className="text-sm font-extrabold uppercase tracking-wider mb-4 text-gray-400">
                        ⚡ Quick Action Management
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <button
                          onClick={() => openAddModal("program")}
                          className="p-4 rounded-xl bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/30 text-purple-400 font-bold text-xs flex flex-col items-center gap-2 cursor-pointer transition-all"
                        >
                          <span className="text-2xl">🎓</span>
                          <span>+ Tambah Program</span>
                        </button>
                        <button
                          onClick={() => openAddModal("lomba")}
                          className="p-4 rounded-xl bg-amber-600/10 hover:bg-amber-600/20 border border-amber-500/30 text-amber-400 font-bold text-xs flex flex-col items-center gap-2 cursor-pointer transition-all"
                        >
                          <span className="text-2xl">🏆</span>
                          <span>+ Tambah Lomba</span>
                        </button>
                        <Link
                          href="/admin/blog/editor"
                          className="p-4 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex flex-col items-center gap-2 cursor-pointer transition-all text-center"
                        >
                          <span className="text-2xl">✍️</span>
                          <span>+ Tulis Blog Editor</span>
                        </Link>
                        <button
                          onClick={() => setActiveTab("registrations")}
                          className="p-4 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold text-xs flex flex-col items-center gap-2 cursor-pointer transition-all"
                        >
                          <span className="text-2xl">👥</span>
                          <span>Kelola Peserta</span>
                        </button>
                      </div>
                    </div>

                    {/* RECENT REGISTRATIONS TABLE */}
                    <div className={`p-6 rounded-2xl border ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-base font-bold">Pendaftaran Peserta Terbaru</h3>
                          <p className="text-xs text-gray-400">Data pendaftaran langsung dari form user</p>
                        </div>
                        <button
                          onClick={() => setActiveTab("registrations")}
                          className="text-xs font-bold text-brand-purple hover:underline"
                        >
                          Lihat Semua Peserta &rarr;
                        </button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className={`border-b ${isDarkMode ? "border-white/10 text-gray-400" : "border-slate-200 text-slate-500"}`}>
                            <tr>
                              <th className="py-3 px-2 font-bold">Peserta</th>
                              <th className="py-3 px-2 font-bold">Kontak</th>
                              <th className="py-3 px-2 font-bold">Lomba / Program</th>
                              <th className="py-3 px-2 font-bold">Status</th>
                              <th className="py-3 px-2 font-bold">Aksi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {registrations.slice(0, 5).map((reg) => (
                              <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                                <td className="py-3 px-2 font-semibold">{reg.user_name || reg.name || "Peserta"}</td>
                                <td className="py-3 px-2 text-gray-400">{reg.user_email || reg.email || "-"}</td>
                                <td className="py-3 px-2 text-brand-purple font-medium">{reg.contest_title || reg.title || "Bootcamp Mentoring"}</td>
                                <td className="py-3 px-2">
                                  <span
                                    className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                                      reg.status === "Approved"
                                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                        : reg.status === "Cancelled"
                                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                        : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                    }`}
                                  >
                                    {reg.status || "Pending"}
                                  </span>
                                </td>
                                <td className="py-3 px-2">
                                  <button
                                    onClick={() => handleUpdateRegStatus(reg.id, reg.status === "Approved" ? "Pending" : "Approved")}
                                    className="text-[11px] font-bold text-brand-purple hover:underline cursor-pointer"
                                  >
                                    Toggle Approve
                                  </button>
                                </td>
                              </tr>
                            ))}
                            {registrations.length === 0 && (
                              <tr>
                                <td colSpan={5} className="py-6 text-center text-gray-400">
                                  Belum ada data pendaftaran terbaru.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* ----------------- TAB 2: PENDAFTARAN PESERTA ----------------- */}
                {activeTab === "registrations" && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold">Pendaftaran Peserta</h2>
                        <p className="text-xs text-gray-400">Kelola dan verifikasi peserta program/lomba</p>
                      </div>

                      <button
                        onClick={handleExportCSV}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all self-start sm:self-auto"
                      >
                        📥 Export File CSV
                      </button>
                    </div>

                    {/* SEARCH & STATUS FILTERS */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Cari nama peserta, email, atau nama program..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none ${
                            isDarkMode ? "bg-brand-card border-white/10 text-white" : "bg-white border-slate-200 text-slate-900"
                          }`}
                        />
                      </div>
                      <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
                        {["all", "Pending", "Approved", "Cancelled"].map((st) => (
                          <button
                            key={st}
                            onClick={() => setStatusFilter(st)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer whitespace-nowrap ${
                              statusFilter === st
                                ? "bg-brand-purple text-white"
                                : isDarkMode
                                ? "bg-white/5 border border-white/10 text-gray-300"
                                : "bg-white border border-slate-200 text-slate-600"
                            }`}
                          >
                            {st === "all" ? "Semua Status" : st}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* REGISTRATIONS TABLE */}
                    <div className={`p-6 rounded-2xl border ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className={`border-b ${isDarkMode ? "border-white/10 text-gray-400" : "border-slate-200 text-slate-500"}`}>
                            <tr>
                              <th className="py-3 px-3 font-bold">Peserta</th>
                              <th className="py-3 px-3 font-bold">Kontak</th>
                              <th className="py-3 px-3 font-bold">Program / Lomba</th>
                              <th className="py-3 px-3 font-bold">Status Verifikasi</th>
                              <th className="py-3 px-3 font-bold text-right">Aksi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {registrations
                              .filter((r) => {
                                const q = searchQuery.toLowerCase();
                                const nameMatches = (r.user_name || r.name || "").toLowerCase().includes(q);
                                const emailMatches = (r.user_email || r.email || "").toLowerCase().includes(q);
                                const titleMatches = (r.contest_title || r.title || "").toLowerCase().includes(q);
                                const matchesSearch = nameMatches || emailMatches || titleMatches;
                                const matchesStatus = statusFilter === "all" || (r.status || "Pending") === statusFilter;
                                return matchesSearch && matchesStatus;
                              })
                              .map((reg) => (
                                <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                                  <td className="py-3.5 px-3">
                                    <div className="font-bold text-sm">{reg.user_name || reg.name || "Peserta"}</div>
                                    <div className="text-[10px] text-gray-400">ID: {reg.id}</div>
                                  </td>
                                  <td className="py-3.5 px-3">
                                    <div>{reg.user_email || reg.email || "-"}</div>
                                    <div className="text-[10px] text-gray-400">{reg.phone || "-"}</div>
                                  </td>
                                  <td className="py-3.5 px-3 font-medium text-brand-purple">
                                    {reg.contest_title || reg.title || "Bootcamp Mentoring"}
                                  </td>
                                  <td className="py-3.5 px-3">
                                    <select
                                      value={reg.status || "Pending"}
                                      onChange={(e) => handleUpdateRegStatus(reg.id, e.target.value)}
                                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border outline-none cursor-pointer ${
                                        reg.status === "Approved"
                                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                          : reg.status === "Cancelled"
                                          ? "bg-red-500/20 text-red-400 border-red-500/30"
                                          : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                      }`}
                                    >
                                      <option value="Pending" className="text-black">Pending</option>
                                      <option value="Approved" className="text-black">Approved</option>
                                      <option value="Cancelled" className="text-black">Cancelled</option>
                                    </select>
                                  </td>
                                  <td className="py-3.5 px-3 text-right">
                                    <button
                                      onClick={() => handleDeleteRegistration(reg.id)}
                                      className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/20 cursor-pointer"
                                    >
                                      Hapus
                                    </button>
                                  </td>
                                </tr>
                              ))}

                            {registrations.length === 0 && (
                              <tr>
                                <td colSpan={5} className="py-8 text-center text-gray-400">
                                  Belum ada pendaftaran peserta.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* ----------------- TAB 3: PROGRAM & BOOTCAMP ----------------- */}
                {activeTab === "program" && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold">Program & Bootcamp</h2>
                        <p className="text-xs text-gray-400">Kelola katalog bootcamp dan paket mentoring</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Link
                          href="/admin/program/editor"
                          className="px-4 py-2.5 bg-brand-purple hover:bg-purple-600 text-white rounded-xl text-xs font-bold shadow-lg transition-all flex items-center gap-2"
                        >
                          <span>✏️</span> Editor Halaman Program
                        </Link>
                        <button
                          onClick={() => openAddModal("program")}
                          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow-lg cursor-pointer transition-all"
                        >
                          + Tambah Program
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {programs.map((item) => (
                        <div
                          key={item.id}
                          className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                            isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-slate-200 shadow-sm"
                          }`}
                        >
                          <div>
                            <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4 bg-gray-800">
                              <Image src={item.image} alt={item.title} fill className="object-cover" />
                              <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded-lg">
                                {item.category}
                              </div>
                              <div className="absolute top-3 right-3 px-2.5 py-1 bg-emerald-500 text-white text-[10px] font-extrabold rounded-lg shadow-md">
                                {item.price || "Rp 39.000"}
                              </div>
                            </div>
                            <h3 className="font-extrabold text-base mb-1">{item.title}</h3>
                            <p className="text-xs text-gray-400 line-clamp-2 mb-3">{item.description}</p>
                            <div className="text-xs text-brand-purple font-semibold">Mentor: {item.mentor}</div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'}`}>
                              {item.status || 'active'}
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => openEditModal("program", item)}
                                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteProgram(item.id)}
                                className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-bold cursor-pointer"
                              >
                                Hapus
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ----------------- TAB 4: INFO LOMBA & BEASISWA ----------------- */}
                {activeTab === "lomba" && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold">Info Lomba & Beasiswa</h2>
                        <p className="text-xs text-gray-400">Kelola info lomba karya tulis, teknologi, dan sains</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Link
                          href="/admin/lomba/editor"
                          className="px-4 py-2.5 bg-brand-purple hover:bg-purple-600 text-white rounded-xl text-xs font-bold shadow-lg transition-all flex items-center gap-2"
                        >
                          <span>✏️</span> Editor Halaman Lomba
                        </Link>
                        <button
                          onClick={() => openAddModal("lomba")}
                          className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow-lg cursor-pointer transition-all"
                        >
                          + Tambah Lomba
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {contests.map((item) => (
                        <div
                          key={item.id}
                          className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                            isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-slate-200 shadow-sm"
                          }`}
                        >
                          <div>
                            <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4 bg-gray-800">
                              <Image src={item.image} alt={item.title} fill className="object-cover" />
                              <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded-lg">
                                {item.category}
                              </div>
                              <div className="absolute top-3 right-3 px-2.5 py-1 bg-amber-500 text-white text-[10px] font-extrabold rounded-lg shadow-md">
                                {item.level}
                              </div>
                            </div>
                            <h3 className="font-extrabold text-base mb-1">{item.title}</h3>
                            <p className="text-xs text-gray-400 line-clamp-2 mb-3">{item.description}</p>
                            <div className="flex justify-between text-xs text-gray-400">
                              <span>Deadline: <strong className="text-amber-400">{item.deadline}</strong></span>
                              <span>Biaya: <strong className="text-emerald-400">{item.fee}</strong></span>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                            <span className="text-[11px] text-gray-400">Status: {item.status}</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => openEditModal("lomba", item)}
                                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteContest(item.id)}
                                className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-bold cursor-pointer"
                              >
                                Hapus
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ----------------- TAB 5: BLOG & ARTIKEL ----------------- */}
                {activeTab === "blog" && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold">Blog & Artikel</h2>
                        <p className="text-xs text-gray-400">Publikasi artikel riset, tips lomba, dan panduan akademis</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <Link
                          href="/admin/blog/editor"
                          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all flex items-center gap-2"
                        >
                          <span>✍️</span> Tulis di Full Editor
                        </Link>
                        <button
                          onClick={() => openAddModal("blog")}
                          className="px-4 py-2.5 bg-brand-purple hover:bg-purple-600 text-white rounded-xl text-xs font-bold shadow-lg cursor-pointer transition-all"
                        >
                          + Quick Add Artikel
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {blogs.map((item) => (
                        <div
                          key={item.id}
                          className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                            isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-slate-200 shadow-sm"
                          }`}
                        >
                          <div>
                            <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4 bg-gray-800">
                              <Image src={item.image} alt={item.title} fill className="object-cover" />
                              <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded-lg">
                                {item.category}
                              </div>
                            </div>
                            <h3 className="font-extrabold text-base mb-1">{item.title}</h3>
                            <p className="text-xs text-gray-400 line-clamp-2 mb-3">{item.excerpt}</p>
                            <div className="text-xs text-gray-400">Penulis: <strong className="text-white">{item.author}</strong></div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                            <span className="text-[11px] text-emerald-400 font-bold">{item.status || "published"}</span>
                            <div className="flex gap-2">
                              <Link
                                href={`/admin/blog/editor?id=${item.id}`}
                                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDeleteBlog(item.id)}
                                className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-bold cursor-pointer"
                              >
                                Hapus
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ----------------- TAB 6: TESTIMONIAL ----------------- */}
                {activeTab === "testimonials" && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold">Testimonial Mahasiswa</h2>
                        <p className="text-xs text-gray-400">Kelola ulasan dan pencapaian alumni mentoring</p>
                      </div>

                      <button
                        onClick={() => openAddModal("testimonial")}
                        className="px-4 py-2.5 bg-brand-purple hover:bg-purple-600 text-white rounded-xl text-xs font-bold shadow-lg cursor-pointer transition-all"
                      >
                        + Tambah Testimoni
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {testimonials.map((item) => (
                        <div
                          key={item.id}
                          className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                            isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-slate-200 shadow-sm"
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-3 mb-3">
                              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-800">
                                <Image src={item.avatar} alt={item.author} fill className="object-cover" />
                              </div>
                              <div>
                                <h4 className="font-bold text-sm">{item.author}</h4>
                                <div className="text-[11px] text-brand-purple font-semibold">{item.title}</div>
                              </div>
                            </div>
                            <p className="text-xs text-gray-300 italic mb-3">"{item.quote}"</p>
                            <div className="text-amber-400 text-xs">{"★".repeat(item.rating || 5)}</div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                            <span className="text-[11px] text-gray-400">Status: {item.status}</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => openEditModal("testimonial", item)}
                                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteTestimonial(item.id)}
                                className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-bold cursor-pointer"
                              >
                                Hapus
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ----------------- TAB 7: TIM & MENTOR ----------------- */}
                {activeTab === "team" && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold">Tim & Mentor</h2>
                        <p className="text-xs text-gray-400">Kelola profil mentor dan instruktur Kayzen</p>
                      </div>

                      <button
                        onClick={() => openAddModal("team")}
                        className="px-4 py-2.5 bg-brand-purple hover:bg-purple-600 text-white rounded-xl text-xs font-bold shadow-lg cursor-pointer transition-all"
                      >
                        + Tambah Mentor
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {teamMembers.map((item) => (
                        <div
                          key={item.id}
                          className={`p-5 rounded-2xl border text-center flex flex-col justify-between transition-all ${
                            isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-slate-200 shadow-sm"
                          }`}
                        >
                          <div>
                            <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 bg-gray-800">
                              <Image src={item.avatar} alt={item.name} fill className="object-cover" />
                            </div>
                            <h4 className="font-extrabold text-base">{item.name}</h4>
                            <div className="text-xs text-brand-purple font-semibold mb-2">{item.role}</div>
                            <p className="text-xs text-gray-400 line-clamp-3">{item.description}</p>
                          </div>

                          <div className="mt-4 pt-4 border-t border-white/10 flex justify-center gap-2">
                            <button
                              onClick={() => openEditModal("team", item)}
                              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTeam(item.id)}
                              className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-bold cursor-pointer"
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ----------------- TAB 8: KEMITRAAN & PARTNER ----------------- */}
                {activeTab === "partners" && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold">Kemitraan & Partner</h2>
                        <p className="text-xs text-gray-400">Kelola logo instansi, universitas, dan jaringan mitra</p>
                      </div>

                      <button
                        onClick={() => openAddModal("partner")}
                        className="px-4 py-2.5 bg-brand-purple hover:bg-purple-600 text-white rounded-xl text-xs font-bold shadow-lg cursor-pointer transition-all"
                      >
                        + Tambah Partner
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {partners.map((item) => (
                        <div
                          key={item.id}
                          className={`p-4 rounded-2xl border text-center flex flex-col justify-between transition-all ${
                            isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-slate-200 shadow-sm"
                          }`}
                        >
                          <div>
                            <div className="relative w-full h-20 rounded-xl overflow-hidden mb-2 bg-gray-800 flex items-center justify-center">
                              <Image src={item.logo} alt={item.name} fill className="object-contain p-2" />
                            </div>
                            <h4 className="font-bold text-xs">{item.name}</h4>
                            <div className="text-[10px] text-gray-400">{item.category}</div>
                          </div>

                          <div className="mt-3 pt-2 border-t border-white/10 flex justify-center gap-2">
                            <button
                              onClick={() => openEditModal("partner", item)}
                              className="px-2.5 py-1 rounded bg-white/10 text-[10px] font-bold cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeletePartner(item.id)}
                              className="px-2.5 py-1 rounded bg-red-500/20 text-red-400 text-[10px] font-bold cursor-pointer"
                            >
                              Hapus
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* ----------------- MODAL FOR QUICK ADD / EDIT ----------------- */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div
            className={`w-full max-w-xl p-6 rounded-3xl border shadow-2xl transition-all ${
              isDarkMode ? "bg-[#0b0f19] border-white/10 text-white" : "bg-white border-slate-200 text-slate-900"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">
                {editingItem ? "Edit" : "Tambah"} {modalType.toUpperCase()}
              </h3>
              <button
                onClick={() => setModalType(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* LOMBA FORM */}
            {modalType === "lomba" && (
              <form onSubmit={handleSaveContest} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Judul Lomba</label>
                  <input
                    type="text"
                    required
                    value={contestForm.title}
                    onChange={(e) => setContestForm({ ...contestForm, title: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                      isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                    }`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Kategori</label>
                    <input
                      type="text"
                      value={contestForm.category}
                      onChange={(e) => setContestForm({ ...contestForm, category: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                        isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Tingkat</label>
                    <input
                      type="text"
                      value={contestForm.level}
                      onChange={(e) => setContestForm({ ...contestForm, level: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                        isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                      }`}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Deadline</label>
                    <input
                      type="text"
                      value={contestForm.deadline}
                      onChange={(e) => setContestForm({ ...contestForm, deadline: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                        isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Biaya</label>
                    <input
                      type="text"
                      value={contestForm.fee}
                      onChange={(e) => setContestForm({ ...contestForm, fee: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                        isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">URL Gambar Banner</label>
                  <input
                    type="text"
                    required
                    value={contestForm.image}
                    onChange={(e) => setContestForm({ ...contestForm, image: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                      isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Deskripsi Ringkas</label>
                  <textarea
                    rows={3}
                    value={contestForm.description}
                    onChange={(e) => setContestForm({ ...contestForm, description: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                      isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                    }`}
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 text-xs font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-brand-purple text-white text-xs font-bold shadow-lg"
                  >
                    Simpan Lomba
                  </button>
                </div>
              </form>
            )}

            {/* PROGRAM FORM */}
            {modalType === "program" && (
              <form onSubmit={handleSaveProgram} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Judul Program / Bootcamp</label>
                  <input
                    type="text"
                    required
                    value={programForm.title}
                    onChange={(e) => setProgramForm({ ...programForm, title: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                      isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                    }`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Kategori</label>
                    <input
                      type="text"
                      value={programForm.category}
                      onChange={(e) => setProgramForm({ ...programForm, category: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                        isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Harga Program</label>
                    <input
                      type="text"
                      value={programForm.price}
                      onChange={(e) => setProgramForm({ ...programForm, price: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                        isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Mentor</label>
                  <input
                    type="text"
                    value={programForm.mentor}
                    onChange={(e) => setProgramForm({ ...programForm, mentor: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                      isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">URL Gambar Banner</label>
                  <input
                    type="text"
                    required
                    value={programForm.image}
                    onChange={(e) => setProgramForm({ ...programForm, image: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                      isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Deskripsi</label>
                  <textarea
                    rows={3}
                    value={programForm.description}
                    onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                      isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                    }`}
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 text-xs font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold shadow-lg"
                  >
                    Simpan Program
                  </button>
                </div>
              </form>
            )}

            {/* BLOG FORM */}
            {modalType === "blog" && (
              <form onSubmit={handleSaveBlog} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Judul Artikel</label>
                  <input
                    type="text"
                    required
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                      isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                    }`}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Kategori</label>
                    <input
                      type="text"
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                        isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Penulis</label>
                    <input
                      type="text"
                      value={blogForm.author}
                      onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                        isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">URL Gambar Sampul</label>
                  <input
                    type="text"
                    required
                    value={blogForm.image}
                    onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                      isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Ringkasan / Excerpt</label>
                  <textarea
                    rows={2}
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                      isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                    }`}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Isi Konten Artikel</label>
                  <textarea
                    rows={4}
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                      isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                    }`}
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 text-xs font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-lg"
                  >
                    Simpan Artikel
                  </button>
                </div>
              </form>
            )}

            {/* TESTIMONIAL FORM */}
            {modalType === "testimonial" && (
              <form onSubmit={handleSaveTestimonial} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Nama Mahasiswa / Alumni</label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.author}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, author: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                      isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Pencapaian / Title</label>
                  <input
                    type="text"
                    value={testimonialForm.title}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, title: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                      isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">URL Foto Avatar</label>
                  <input
                    type="text"
                    value={testimonialForm.avatar}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, avatar: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                      isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Kutipan / Ulasan</label>
                  <textarea
                    rows={3}
                    required
                    value={testimonialForm.quote}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                      isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                    }`}
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 text-xs font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-brand-purple text-white text-xs font-bold shadow-lg"
                  >
                    Simpan Testimoni
                  </button>
                </div>
              </form>
            )}

            {/* TEAM FORM */}
            {modalType === "team" && (
              <form onSubmit={handleSaveTeam} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Nama Mentor / Staf</label>
                  <input
                    type="text"
                    required
                    value={teamForm.name}
                    onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                      isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Jabatan / Role</label>
                  <input
                    type="text"
                    value={teamForm.role}
                    onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                      isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">URL Foto Profil</label>
                  <input
                    type="text"
                    value={teamForm.avatar}
                    onChange={(e) => setTeamForm({ ...teamForm, avatar: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                      isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Bio / Deskripsi</label>
                  <textarea
                    rows={3}
                    value={teamForm.description}
                    onChange={(e) => setTeamForm({ ...teamForm, description: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                      isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                    }`}
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 text-xs font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-brand-purple text-white text-xs font-bold shadow-lg"
                  >
                    Simpan Mentor
                  </button>
                </div>
              </form>
            )}

            {/* PARTNER FORM */}
            {modalType === "partner" && (
              <form onSubmit={handleSavePartner} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Nama Instansi / Mitra</label>
                  <input
                    type="text"
                    required
                    value={partnerForm.name}
                    onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                      isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Kategori (e.g., Universitas)</label>
                  <input
                    type="text"
                    value={partnerForm.category}
                    onChange={(e) => setPartnerForm({ ...partnerForm, category: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                      isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">URL Logo</label>
                  <input
                    type="text"
                    required
                    value={partnerForm.logo}
                    onChange={(e) => setPartnerForm({ ...partnerForm, logo: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none ${
                      isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                    }`}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 text-xs font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-brand-purple text-white text-xs font-bold shadow-lg"
                  >
                    Simpan Partner
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
