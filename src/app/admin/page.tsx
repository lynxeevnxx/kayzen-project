"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

type AdminTab =
  | "dashboard"
  | "users"
  | "program"
  | "lomba"
  | "blog"
  | "testimonials"
  | "team"
  | "partners";

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

  const { data: session } = useSession();
  const [localUser, setLocalUser] = useState<any>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("kayzen_user");
      if (saved) setLocalUser(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const userRole = (session?.user as { role?: string })?.role || localUser?.role || "user";
  const isPenulis = userRole === "penulis";

  useEffect(() => {
    if (isPenulis && activeTab !== "blog") {
      setActiveTab("blog");
    }
  }, [isPenulis, activeTab]);

  // Load Data from APIs
  const fetchAllData = async () => {
    setLoading(true);
    try {
      if (isPenulis) {
        const bRes = await fetch("/api/admin/blogs");
        const bData = await bRes.json();
        if (bData.blogs) setBlogs(bData.blogs);
      } else {
        const [cRes, prgRes, bRes, tstRes, tmRes, pRes, usrRes] = await Promise.all([
          fetch("/api/admin/contests"),
          fetch("/api/admin/programs"),
          fetch("/api/admin/blogs"),
          fetch("/api/admin/testimonials"),
          fetch("/api/admin/team"),
          fetch("/api/admin/partners"),
          fetch("/api/admin/users"),
        ]);

        const cData = await cRes.json();
        const prgData = await prgRes.json();
        const bData = await bRes.json();
        const tstData = await tstRes.json();
        const tmData = await tmRes.json();
        const pData = await pRes.json();
        const usrData = await usrRes.json();

        if (cData.contests) setContests(cData.contests);
        if (prgData.programs) setPrograms(prgData.programs);
        if (bData.blogs) setBlogs(bData.blogs);
        if (tstData.testimonials) setTestimonials(tstData.testimonials);
        if (tmData.teamMembers) setTeamMembers(tmData.teamMembers);
        if (pData.partners) setPartners(pData.partners);
        if (usrData.users) setUsers(usrData.users);
      }
    } catch (err: any) {
      console.error("Fetch admin data error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userRole]);

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  // Delete Handlers
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

  // User Handlers
  const handleUpdateUserRole = async (id: string, newRole: string) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, role: newRole }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      showNotification(data.message || "Role pengguna berhasil diperbarui");
      fetchAllData();
    } catch (err: any) {
      alert(err.message || "Gagal mengupdate role pengguna");
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus akun pengguna ini secara permanen?")) return;
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      showNotification(data.message);
      fetchAllData();
    } catch (err: any) {
      alert(err.message || "Gagal menghapus pengguna");
    }
  };

  // Nav Items Definition
  const allNavItems = [
    { id: "dashboard", label: "Dashboard Overview", badge: null },
    { id: "users", label: "Pengguna & Hak Akses", badge: users.length },
    { id: "program", label: "Program & Bootcamp", badge: programs.length },
    { id: "lomba", label: "Info Lomba & Beasiswa", badge: contests.length },
    { id: "blog", label: "Blog & Artikel", badge: blogs.length },
    { id: "testimonials", label: "Testimonial", badge: testimonials.length },
    { id: "team", label: "Tim & Mentor", badge: teamMembers.length },
    { id: "partners", label: "Kemitraan & Partner", badge: partners.length },
  ];

  const navItems = isPenulis
    ? allNavItems.filter((item) => item.id === "blog")
    : allNavItems;

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-[#04060f] text-gray-100" : "bg-slate-50 text-slate-900"} font-sans antialiased transition-colors duration-300`}>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} activeTab="admin" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Notification Toast */}
        {successMsg && (
          <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce">
            <span className="font-bold text-xs">BERHASIL:</span>
            <span className="font-semibold text-sm">{successMsg}</span>
          </div>
        )}

        {/* Dashboard Title & Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 ${isPenulis ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-brand-purple/20 text-brand-purple border-brand-purple/30"} text-xs font-bold rounded-full border`}>
                {isPenulis ? "Penulis Panel CMS" : "Kayzen CMS v2.0"}
              </span>
              <span className="text-xs text-gray-400">
                {isPenulis ? "Akses Khusus Manajement Artikel & Blog" : "Pusat Pengelolaan Konten Web Client"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              {isPenulis ? "Panel Penulis Konten" : "Admin Control Panel"}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={fetchAllData}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isDarkMode
                  ? "bg-white/5 border-white/10 hover:bg-white/10 text-gray-200"
                  : "bg-white border-slate-200 hover:bg-slate-100 text-slate-700 shadow-sm"
              }`}
            >
              Refresh Data
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
                      <span className="font-semibold">{item.label}</span>
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
                  <div className={`w-8 h-8 rounded-full ${isPenulis ? "bg-emerald-500/20 text-emerald-400" : "bg-brand-purple/30 text-brand-purple"} flex items-center justify-center font-bold text-xs`}>
                    {isPenulis ? "P" : "KA"}
                  </div>
                  <div>
                    <div className="text-xs font-bold truncate max-w-[130px]">
                      {session?.user?.name || (isPenulis ? "Penulis Kayzen" : "Admin Kayzen")}
                    </div>
                    <div className="text-[10px] text-gray-400">
                      {isPenulis ? "Penulis Blog / Konten" : "Master Administrator"}
                    </div>
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className={`p-5 rounded-2xl border transition-all ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
                        <div className="text-xs font-semibold text-gray-400">Program Mentoring</div>
                        <div className="text-2xl font-extrabold mt-3">{programs.length} Program</div>
                        <div className="text-[11px] text-purple-400 font-semibold mt-1">Rp 39.000 All Bootcamp</div>
                      </div>

                      <div className={`p-5 rounded-2xl border transition-all ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
                        <div className="text-xs font-semibold text-gray-400">Info Lomba</div>
                        <div className="text-2xl font-extrabold mt-3">{contests.length} Perlombaan</div>
                        <div className="text-[11px] text-amber-400 font-semibold mt-1">Tingkat Nasional</div>
                      </div>

                      <div className={`p-5 rounded-2xl border transition-all ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
                        <div className="text-xs font-semibold text-gray-400">Artikel Blog</div>
                        <div className="text-2xl font-extrabold mt-3">{blogs.length} Artikel</div>
                        <div className="text-[11px] text-emerald-400 font-semibold mt-1">Published Active</div>
                      </div>
                    </div>

                    {/* QUICK ACTIONS */}
                    <div className={`p-6 rounded-2xl border ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
                      <h3 className="text-xs font-extrabold uppercase tracking-wider mb-4 text-gray-400">
                        Quick Actions (Halaman Editor Terpisah)
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <Link
                          href="/admin/program/editor"
                          className="p-4 rounded-xl bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/30 text-purple-400 font-bold text-xs text-center transition-all"
                        >
                          + Tambah Program
                        </Link>

                        <Link
                          href="/admin/lomba/editor"
                          className="p-4 rounded-xl bg-amber-600/10 hover:bg-amber-600/20 border border-amber-500/30 text-amber-400 font-bold text-xs text-center transition-all"
                        >
                          + Tambah Lomba
                        </Link>

                        <Link
                          href="/admin/blog/editor"
                          className="p-4 rounded-xl bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs text-center transition-all"
                        >
                          + Tulis Blog
                        </Link>

                        <Link
                          href="/admin/testimonial/editor"
                          className="p-4 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold text-xs text-center transition-all"
                        >
                          + Testimonial
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* ----------------- TAB: PENGGUNA & HAK AKSES ----------------- */}
                {activeTab === "users" && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold">Pengguna & Hak Akses</h2>
                        <p className="text-xs text-gray-400">Kelola akun terdaftar, peran pengguna, dan akses administrator</p>
                      </div>

                      <div className="text-xs text-brand-purple font-bold">
                        Total {users.length} Akun Terdaftar
                      </div>
                    </div>

                    {/* SEARCH FILTER */}
                    <div>
                      <input
                        type="text"
                        placeholder="Cari pengguna berdasarkan nama atau email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none ${
                          isDarkMode ? "bg-brand-card border-white/10 text-white" : "bg-white border-slate-200 text-slate-900"
                        }`}
                      />
                    </div>

                    {/* USERS TABLE */}
                    <div className={`p-6 rounded-2xl border ${isDarkMode ? "bg-brand-card border-white/10" : "bg-white border-slate-200 shadow-sm"}`}>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead className={`border-b ${isDarkMode ? "border-white/10 text-gray-400" : "border-slate-200 text-slate-500"}`}>
                            <tr>
                              <th className="py-3 px-3 font-bold">Pengguna</th>
                              <th className="py-3 px-3 font-bold">Email</th>
                              <th className="py-3 px-3 font-bold">Role / Hak Akses</th>
                              <th className="py-3 px-3 font-bold">Tanggal Terdaftar</th>
                              <th className="py-3 px-3 font-bold text-right">Aksi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {users
                              .filter((u) => {
                                const q = searchQuery.toLowerCase();
                                return (
                                  (u.name || "").toLowerCase().includes(q) ||
                                  (u.email || "").toLowerCase().includes(q)
                                );
                              })
                              .map((usr) => (
                                <tr key={usr.id} className="hover:bg-white/5 transition-colors">
                                  <td className="py-3.5 px-3">
                                    <div className="flex items-center gap-2.5">
                                      <div className="w-8 h-8 rounded-full bg-brand-purple/20 text-brand-purple flex items-center justify-center font-bold text-xs">
                                        {(usr.name || "U")[0].toUpperCase()}
                                      </div>
                                      <div>
                                        <div className="font-bold text-sm">{usr.name || "User"}</div>
                                        <div className="text-[10px] text-gray-400">ID: {usr.id}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-3.5 px-3 font-medium text-gray-300">
                                    {usr.email}
                                  </td>
                                  <td className="py-3.5 px-3">
                                    <select
                                      value={usr.role || "user"}
                                      onChange={(e) => handleUpdateUserRole(usr.id, e.target.value)}
                                      className={`px-3 py-1 rounded-lg text-xs font-bold border outline-none cursor-pointer ${
                                        usr.role === "admin"
                                          ? "bg-purple-500/20 text-purple-400 border-purple-500/40"
                                          : usr.role === "penulis"
                                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                          : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                      }`}
                                    >
                                      <option value="user" className="text-black">User (Peserta)</option>
                                      <option value="penulis" className="text-black">Penulis (Blog & Artikel)</option>
                                      <option value="admin" className="text-black">Admin (Pengelola)</option>
                                    </select>
                                  </td>
                                  <td className="py-3.5 px-3 text-gray-400 text-[11px]">
                                    {usr.created_at ? new Date(usr.created_at).toLocaleDateString("id-ID") : "-"}
                                  </td>
                                  <td className="py-3.5 px-3 text-right">
                                    <button
                                      onClick={() => handleDeleteUser(usr.id)}
                                      className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/20 cursor-pointer"
                                    >
                                      Hapus Akun
                                    </button>
                                  </td>
                                </tr>
                              ))}

                            {users.length === 0 && (
                              <tr>
                                <td colSpan={5} className="py-8 text-center text-gray-400">
                                  Belum ada pengguna terdaftar.
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

                      <Link
                        href="/admin/program/editor"
                        className="px-4 py-2.5 bg-brand-purple hover:bg-purple-600 text-white rounded-xl text-xs font-bold shadow-lg transition-all self-start sm:self-auto"
                      >
                        + Tambah Program
                      </Link>
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
                              <Link
                                href={`/admin/program/editor?id=${item.id}`}
                                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold"
                              >
                                Edit
                              </Link>
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

                      <Link
                        href="/admin/lomba/editor"
                        className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all self-start sm:self-auto"
                      >
                        + Tambah Lomba
                      </Link>
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
                              <Link
                                href={`/admin/lomba/editor?id=${item.id}`}
                                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold"
                              >
                                Edit
                              </Link>
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

                      <Link
                        href="/admin/blog/editor"
                        className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg transition-all self-start sm:self-auto"
                      >
                        + Tulis Blog
                      </Link>
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

                      <Link
                        href="/admin/testimonial/editor"
                        className="px-4 py-2.5 bg-brand-purple hover:bg-purple-600 text-white rounded-xl text-xs font-bold shadow-lg transition-all self-start sm:self-auto"
                      >
                        + Tambah Testimonial
                      </Link>
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
                            <div className="text-amber-400 text-xs font-semibold">Rating: {item.rating || 5} / 5</div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                            <span className="text-[11px] text-gray-400">Status: {item.status}</span>
                            <div className="flex gap-2">
                              <Link
                                href={`/admin/testimonial/editor?id=${item.id}`}
                                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold"
                              >
                                Edit
                              </Link>
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

                      <Link
                        href="/admin/team/editor"
                        className="px-4 py-2.5 bg-brand-purple hover:bg-purple-600 text-white rounded-xl text-xs font-bold shadow-lg transition-all self-start sm:self-auto"
                      >
                        + Tambah Mentor
                      </Link>
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
                            <Link
                              href={`/admin/team/editor?id=${item.id}`}
                              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold"
                            >
                              Edit
                            </Link>
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
                        <p className="text-xs text-gray-400">Kelola logo instansi, universitas, dan mitra</p>
                      </div>

                      <Link
                        href="/admin/partner/editor"
                        className="px-4 py-2.5 bg-brand-purple hover:bg-purple-600 text-white rounded-xl text-xs font-bold shadow-lg transition-all self-start sm:self-auto"
                      >
                        + Tambah Partner
                      </Link>
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
                            <Link
                              href={`/admin/partner/editor?id=${item.id}`}
                              className="px-2.5 py-1 rounded bg-white/10 text-[10px] font-bold"
                            >
                              Edit
                            </Link>
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
    </div>
  );
}
