"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MasukPage() {
  const router = useRouter();
  const [authEmail, setAuthEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [simulatedGoogleLoading, setSimulatedGoogleLoading] = useState(false);
  const [simulatedOTPLoading, setSimulatedOTPLoading] = useState(false);

  // Simulated login actions that store the user session in localStorage
  const handleGoogleLogin = () => {
    setSimulatedGoogleLoading(true);
    setTimeout(() => {
      const userData = {
        name: "Ahmad Mujahidin",
        email: "ahmad.mujahidin@student.univ.ac.id",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80"
      };
      localStorage.setItem("kayzen_user", JSON.stringify(userData));
      setSimulatedGoogleLoading(false);
      router.push("/?auth=success");
    }, 1500);
  };

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail) return;
    setSimulatedOTPLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setSimulatedOTPLoading(false);
      alert("Simulasi: Kode verifikasi OTP 6-digit (554289) telah dikirim ke " + authEmail);
    }, 1000);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode === "554289") {
      setSimulatedOTPLoading(true);
      setTimeout(() => {
        const userData = {
          name: authEmail.split("@")[0].toUpperCase(),
          email: authEmail,
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
        };
        localStorage.setItem("kayzen_user", JSON.stringify(userData));
        setSimulatedOTPLoading(false);
        router.push("/?auth=success");
      }, 1000);
    } else {
      alert("Kode verifikasi salah! Gunakan kode simulasi: 554289");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-12 bg-white text-gray-800 font-sans">
      
      {/* SISI KIRI (BRANDING SHOWCASE - GELAP) */}
      <div className="hidden lg:flex lg:col-span-6 bg-[#0c0e17] flex-col justify-between p-12 text-white relative overflow-hidden border-r border-white/5">
        {/* Abstract Blur Decor */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-brand-purple/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Header Back Link */}
        <Link href="/" className="flex items-center gap-2 text-xs font-semibold text-brand-muted hover:text-white transition-colors relative z-10">
          <span>&larr;</span> Kembali ke Beranda
        </Link>

        {/* Branding & Quote Content */}
        <div className="space-y-8 relative z-10 text-left my-auto max-w-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-wider text-white block">KAYZEN</span>
              <span className="text-[10px] tracking-[0.25em] text-brand-primary font-bold block -mt-1">ACADEMIA</span>
            </div>
          </div>

          <h2 className="font-display text-3xl font-extrabold leading-tight text-white">
            Gabung dengan Komunitas Inovator Terbesar Indonesia.
          </h2>

          {/* Testimonial Quote */}
          <div className="p-6 rounded-2xl glassmorphism border border-white/10 relative shadow-xl">
            <p className="text-xs text-white/90 leading-relaxed italic">
              "Kayzen Academia membantu saya merancang proposal riset hingga memenangkan hibah penelitian nasional. Pendampingan mentor benar-benar terarah."
            </p>
            <div className="text-[10px] text-brand-primary font-bold mt-4">
              — Muhammad F., Mahasiswa Riset & Inovasi
            </div>
          </div>
        </div>

        {/* Media Partners List */}
        <div className="relative z-10 space-y-2 text-left">
          <span className="text-[9px] uppercase tracking-wider text-brand-muted font-bold block">
            Media Partner & Komunitas
          </span>
          <div className="flex gap-4 opacity-50 text-[10px] font-bold text-white tracking-wide">
            <span>Kampus Merdeka</span>
            <span>Sains Indonesia</span>
            <span>Ruangguru</span>
            <span>Info Kompetisi</span>
          </div>
        </div>
      </div>

      {/* SISI KANAN (FORMULIR MASUK - TERANG) */}
      <div className="col-span-12 lg:col-span-6 bg-white flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 relative text-gray-800">
        
        {/* Back Link on Mobile */}
        <Link href="/" className="lg:hidden absolute top-6 left-8 flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors">
          <span>&larr;</span> Kembali
        </Link>

        <div className="max-w-md w-full mx-auto space-y-7 text-left">
          {/* Header text */}
          <div className="space-y-2">
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-gray-900">
              Masuk ke Akun Anda
            </h1>
            <p className="text-xs text-gray-500">
              Akses riset, program, dan inovasi akademik tanpa batas.
            </p>
          </div>

          {/* Google Sign-in Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={simulatedGoogleLoading}
            className="w-full py-3.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs flex items-center justify-center gap-3 transition-all active:scale-[0.98] cursor-pointer shadow-sm shadow-gray-100"
          >
            {simulatedGoogleLoading ? (
              <span className="w-4 h-4 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24" width="24" height="24">
                <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.488 0-6.315-2.827-6.315-6.314v-.002c0-3.487 2.827-6.314 6.315-6.314 1.564 0 2.99.576 4.095 1.523l3.056-3.056C19.23 2.502 15.932 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c5.783 0 10.606-4.148 11.207-9.565v-3.63H12.24z" />
              </svg>
            )}
            Masuk dengan Akun Google
          </button>

          {/* Separator */}
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="h-[1px] bg-gray-200 flex-grow" />
            <span>atau masuk dengan email</span>
            <span className="h-[1px] bg-gray-200 flex-grow" />
          </div>

          {/* Email / OTP Form */}
          {!otpSent ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Alamat Email</label>
                <input
                  type="email"
                  required
                  placeholder="nama@email.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50/50 px-4 py-3 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/20 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={simulatedOTPLoading}
                className="w-full py-3.5 bg-brand-purple hover:bg-purple-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-brand-purple/10 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                {simulatedOTPLoading && (
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                Kirim Kode Verifikasi Ke Email
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Kode OTP 6-Digit</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="Masukkan 6 digit kode"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50/50 px-4 py-3 rounded-xl text-xs text-center font-bold tracking-widest focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/20 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={simulatedOTPLoading}
                className="w-full py-3.5 bg-brand-primary hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-brand-primary/10 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                {simulatedOTPLoading && (
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                Verifikasi & Masuk
              </button>
              <button 
                type="button" 
                onClick={() => setOtpSent(false)} 
                className="w-full text-center text-[10px] font-bold text-brand-purple hover:underline"
              >
                Ganti Alamat Email
              </button>
            </form>
          )}

          {/* Signup Link */}
          <div className="text-center pt-4 text-xs text-gray-500">
            Belum memiliki akun?{" "}
            <Link href="/daftar" className="text-brand-purple font-bold hover:underline">
              Daftar Gratis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
