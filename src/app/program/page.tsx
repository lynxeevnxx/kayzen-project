"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { programDetails } from "@/data/programs";
import Header from "@/components/Header";

export default function ProgramListPage() {
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

  return (
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-300 ${
      isDarkMode ? "bg-brand-dark text-white" : "bg-gray-50 text-gray-900"
    }`}>
      {/* HEADER NAVBAR */}
      <Header isDarkMode={isDarkMode} setIsDarkMode={handleSetIsDarkMode} activeTab="program" />

      {/* MAIN CONTENT */}
      <main className="flex-grow space-y-20 pb-24">
        
        {/* HERO SECTION */}
        <section className="relative pt-12 md:pt-16 px-6 lg:px-16 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-6 ${
              isDarkMode ? "text-brand-purple" : "text-brand-purple"
            }`}>
              <Link href="/" className="cursor-pointer hover:text-brand-primary text-left">Beranda</Link>
              <span className="text-gray-400">&gt;</span>
              <span className={isDarkMode ? "text-brand-muted" : "text-gray-600"}>Program Bootcamp</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Text Content */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <h1 className={`font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Bootcamp Intensif untuk<br />
                  Upgrade Skill, Bangun Portofolio,<br />
                  <span className="text-gradient">dan Siap Berkarya</span>
                </h1>

                <p className={`text-sm sm:text-base max-w-2xl leading-relaxed ${isDarkMode ? "text-brand-muted" : "text-gray-600"}`}>
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
                        <h4 className={`text-xs font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{hl.title}</h4>
                        <p className={`text-[10px] leading-snug mt-0.5 ${isDarkMode ? "text-brand-muted" : "text-gray-500"}`}>{hl.desc}</p>
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
              <h2 className={`font-display text-3xl font-extrabold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Program Bootcamp Kami</h2>
              <div className="w-16 h-[3px] bg-gradient-brand mx-auto rounded-full" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.values(programDetails).map((prog) => (
                <Link
                  key={prog.id}
                  href={`/program/${prog.slug}`}
                  className={`rounded-2xl overflow-hidden flex flex-col group border cursor-pointer transition-all ${
                    isDarkMode ? "glassmorphism-card border-white/5 hover:border-brand-purple/40 hover:-translate-y-1" : "bg-white border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1"
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-card">
                    <span className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${prog.badgeColor}`}>
                      {prog.badge}
                    </span>
                    <Image
                      src={prog.image}
                      alt={prog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between space-y-5">
                    <div className="space-y-2 text-left">
                      <h3 className={`font-display font-bold text-base leading-snug group-hover:text-brand-purple transition-colors ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {prog.title}
                      </h3>
                      <p className={`text-xs leading-relaxed line-clamp-2 ${isDarkMode ? "text-brand-muted" : "text-gray-600"}`}>
                        {prog.tagline}
                      </p>
                    </div>
                    
                    {/* Specs */}
                    <div className={`space-y-2.5 pt-2 text-xs border-t text-left ${isDarkMode ? "border-white/5 text-brand-muted" : "border-gray-100 text-gray-600"}`}>
                      <div className="flex items-center gap-2.5">
                        <svg className="w-4 h-4 text-brand-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{prog.modulesCount}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <svg className="w-4 h-4 text-brand-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{prog.duration}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <svg className="w-4 h-4 text-brand-purple flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>Sertifikat Kelulusan</span>
                      </div>
                    </div>

                    <div className={`w-full py-2.5 text-xs text-center font-bold border rounded-xl transition-all inline-flex items-center justify-center gap-1.5 group/btn ${
                      isDarkMode
                        ? "text-white border-brand-purple/40 bg-brand-purple/10 hover:bg-brand-purple/20"
                        : "text-brand-purple border-brand-purple/30 bg-brand-purple/10 hover:bg-brand-purple/20"
                    }`}>
                      Lihat Detail Program
                      <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

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
