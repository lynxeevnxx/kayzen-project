"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

interface UserProfile {
  name?: string;
  email?: string;
  avatar?: string;
  role?: string;
  [key: string]: unknown;
}

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  activeTab?: string;
}

export default function Header({ isDarkMode, setIsDarkMode, activeTab = "beranda" }: HeaderProps) {
  const { data: session } = useSession();
  const [localUser, setLocalUser] = useState<UserProfile | null>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("kayzen_user");
      if (savedUser) {
        setLocalUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Priority: NextAuth Session User (e.g. Google) or LocalStorage User (Email OTP/Password)
  const activeUser = session?.user
    ? {
        name: session.user.name || "Pengguna Google",
        email: session.user.email || "",
        avatar: session.user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
      }
    : localUser;

  const userRole = (session?.user as { role?: string })?.role || localUser?.role;
  const isAdmin = userRole === "admin";
  const isPenulis = userRole === "penulis";
  const canAccessAdmin = isAdmin || isPenulis;

  const handleLogout = () => {
    localStorage.removeItem("kayzen_user");
    setLocalUser(null);
    setShowUserDropdown(false);
    if (session) {
      signOut({ callbackUrl: "/" });
    }
  };

  const navItems = [
    { id: "beranda", label: "Beranda", href: "/" },
    { id: "program", label: "Program", href: "/program" },
    { id: "kemitraan", label: "Kemitraan", href: "/kemitraan" },
    { id: "info-lomba", label: "Info Lomba", href: "/info-lomba" },
    { id: "blog", label: "Blog", href: "/blog" },
    { id: "tentang-kami", label: "Tentang Kami", href: "/tentang-kami" },
  ];

  return (
    <header 
      suppressHydrationWarning
      className={`sticky top-0 z-50 transition-colors duration-300 border-b px-6 lg:px-16 ${
        isDarkMode 
          ? "bg-[#03040b]/95 backdrop-blur-md border-white/5 text-white" 
          : "bg-white/95 backdrop-blur-md border-black/5 text-[#0e1726]"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
        
        {/* Logo Brand */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-lg shadow-brand-primary/20">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <span className={`font-display font-bold text-xl tracking-wider block ${
              isDarkMode ? "text-white" : "text-[#0e1726]"
            }`}>KAYZEN</span>
            <span className="text-[10px] tracking-[0.25em] text-brand-primary font-bold block -mt-1">ACADEMIA</span>
          </div>
        </Link>

        {/* Nav Items */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8">
          {navItems.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`relative py-2 text-xs lg:text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? (isDarkMode ? "text-white font-semibold" : "text-[#0e1726] font-semibold")
                    : (isDarkMode ? "text-brand-muted hover:text-white" : "text-gray-500 hover:text-gray-900")
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-brand rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons & Theme Switcher */}
        <div className="flex items-center gap-4">
          
          {/* Dark / Light Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              isDarkMode
                ? "bg-white/[0.03] border-white/10 text-amber-400 hover:bg-white/[0.08] hover:border-white/20"
                : "bg-gray-100 border-gray-200 text-purple-600 hover:bg-gray-200 hover:border-gray-300"
            }`}
            title="Toggle Theme"
          >
            {isDarkMode ? (
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464-5.636a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-5.05-1.243a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707zM3 11a1 1 0 100-2H2a1 1 0 100 2h1zm2-7a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          {/* User Profile or Auth */}
          {activeUser ? (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2.5 p-1 px-3.5 rounded-xl border border-brand-purple/20 bg-brand-purple/5 hover:bg-brand-purple/10 transition-all cursor-pointer"
              >
                <div className="relative w-6 h-6 rounded-full overflow-hidden border border-brand-purple/35">
                  <Image unoptimized src={activeUser.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"} alt="User profile" fill className="object-cover" />
                </div>
                <span className={`text-xs font-semibold hidden sm:inline ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}>
                  {activeUser.name}
                </span>
              </button>

              {showUserDropdown && (
                <div className={`absolute right-0 mt-2 w-52 rounded-xl shadow-xl border py-2 z-50 ${
                  isDarkMode ? "bg-brand-card border-white/10 text-white" : "bg-white border-gray-200 text-gray-800"
                }`}>
                  <div className="px-4 py-2 border-b border-white/10 text-left">
                    <p className="font-bold text-xs truncate">{activeUser.name}</p>
                    <p className="text-[10px] opacity-60 truncate">{activeUser.email}</p>
                  </div>
                  {canAccessAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setShowUserDropdown(false)}
                      className="block px-4 py-2 text-xs font-semibold text-brand-purple hover:bg-white/5 transition-colors"
                    >
                      {isAdmin ? "⚡ Admin Panel CMS" : "✍️ Panel Penulis CMS"}
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    Keluar Akun
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/masuk"
                className={`hidden sm:inline-flex px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  isDarkMode ? "text-white hover:text-brand-primary" : "text-gray-700 hover:text-brand-primary"
                }`}
              >
                Masuk
              </Link>
              <Link
                href="/daftar"
                className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-brand rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                Daftar Sekarang
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
