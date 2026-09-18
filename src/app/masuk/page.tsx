"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function MasukPage() {
  const router = useRouter();
  const [step, setStep] = useState<"login" | "otp">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [demoCode, setDemoCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleAuth = async () => {
    setGoogleLoading(true);
    try {
      await signIn("google", { callbackUrl: "/?auth=success" });
    } catch (err: any) {
      setError("Gagal menghubungkan ke Akun Google");
      setGoogleLoading(false);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login gagal");

      const sessionResult = await signIn("credentials", { email, password, redirect: false });
      if (sessionResult?.error) throw new Error("Sesi login gagal dibuat. Silakan coba lagi.");

      localStorage.setItem("kayzen_user", JSON.stringify(data.user));
      alert("Selamat Datang Kembali, " + data.user.name + "!");
      router.push("/?auth=success");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    if (!email || !email.includes("@")) {
      setError("Masukkan email valid terlebih dahulu");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengirim OTP");

      if (data.demoOtp) setDemoCode(data.demoOtp);
      setStep("otp");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpCode }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Verifikasi OTP gagal");

      localStorage.setItem("kayzen_user", JSON.stringify(data.user));
      alert("Email Berhasil Diverifikasi! Selamat Datang.");
      router.push("/?auth=success");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-12 bg-white text-gray-800 font-sans">
      
      {/* SISI KIRI (BRANDING SHOWCASE - GELAP) */}
      <div className="hidden lg:flex lg:col-span-6 bg-[#0c0e17] flex-col justify-between p-12 text-white relative overflow-hidden border-r border-white/5">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-brand-purple/10 rounded-full blur-[80px] pointer-events-none" />

        <Link href="/" className="flex items-center gap-2 text-xs font-semibold text-brand-muted hover:text-white transition-colors relative z-10">
          <span>&larr;</span> Kembali ke Beranda
        </Link>

        <div className="space-y-8 relative z-10 text-left my-auto max-w-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-brand flex items-center justify-center">
              <svg className="w-6 h-6 text-white shrink-0" width="24" height="24" style={{ width: "24px", height: "24px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-wider text-white block">KAYZEN</span>
              <span className="text-[10px] tracking-[0.25em] text-brand-primary font-bold block -mt-1">ACADEMIA</span>
            </div>
          </div>

          <h2 className="font-display text-3xl font-extrabold leading-tight text-white">
            Selamat Datang Kembali di Kayzen Academia.
          </h2>

          <div className="p-6 rounded-2xl glassmorphism border border-white/10 relative shadow-xl">
            <p className="text-xs text-white/90 leading-relaxed italic">
              &quot;Akses langsung karya ilmiah, sertifikat terverifikasi, dan program mentoring terbaik Anda.&quot;
            </p>
          </div>
        </div>

        <div className="text-[11px] text-brand-muted relative z-10 text-left">
          &copy; {new Date().getFullYear()} Kayzen Academia. Hak Cipta Dilindungi.
        </div>
      </div>

      {/* SISI KANAN (FORMULIR MASUK) */}
      <div className="col-span-12 lg:col-span-6 flex flex-col justify-center p-6 sm:p-12 md:p-16 max-w-md mx-auto w-full text-left">
        
        <div className="lg:hidden mb-8">
          <Link href="/" className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors">
            <span>&larr;</span> Kembali ke Beranda
          </Link>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              {step === "login" ? "Masuk ke Akun" : "Verifikasi Masuk Email"}
            </h1>
            <p className="text-xs text-gray-500">
              {step === "login" 
                ? "Gunakan Akun Google atau email terdaftar Anda."
                : `Kode OTP verifikasi dikirim ke ${email}`}
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
              ⚠️ {error}
            </div>
          )}

          {step === "login" ? (
            <>
              {/* OPSI 1: MASUK DENGAN GOOGLE ACCOUNT */}
              <button
                onClick={handleGoogleAuth}
                disabled={googleLoading}
                className="w-full py-3.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold text-xs flex items-center justify-center gap-3 transition-all active:scale-[0.98] cursor-pointer shadow-sm shadow-gray-100"
              >
                {googleLoading ? (
                  <span className="w-4 h-4 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.488 0-6.315-2.827-6.315-6.314v-.002c0-3.487 2.827-6.314 6.315-6.314 1.564 0 2.99.576 4.095 1.523l3.056-3.056C19.23 2.502 15.932 1 12.24 1 6.033 1 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c5.783 0 10.606-4.148 11.207-9.565v-3.63H12.24z" />
                  </svg>
                )}
                Masuk dengan Akun Google
              </button>

              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="h-[1px] bg-gray-200 flex-grow" />
                <span>atau masuk via email terdaftar</span>
                <span className="h-[1px] bg-gray-200 flex-grow" />
              </div>

              {/* OPSI 2: FORM MASUK DENGAN EMAIL & PASSWORD / OTP */}
              <form onSubmit={handlePasswordLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Alamat Email Valid</label>
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-200 bg-gray-50/50 px-4 py-3 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/20 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Kata Sandi (Password)</label>
                    <button 
                      type="button" 
                      onClick={handleSendOTP} 
                      className="text-[10px] font-bold text-brand-purple hover:underline"
                    >
                      Masuk via Kode OTP Email
                    </button>
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="Password Anda"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-200 bg-gray-50/50 px-4 py-3 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/20 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-brand-purple hover:bg-purple-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-brand-purple/10 transition-colors cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  {loading && (
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  Masuk Sekarang
                </button>
              </form>
            </>
          ) : (
            /* STEP 2: VERIFIKASI OTP EMAIL MASUK */
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-brand-purple text-xs font-medium leading-relaxed text-center">
                📩 Kode OTP 6-digit telah dikirimkan ke <strong className="font-bold">{email}</strong>.<br />
                Silakan periksa <span className="font-bold underline">Kotak Masuk (Inbox)</span> atau folder <span className="font-bold underline">Spam</span> email Anda.
              </div>

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
                disabled={loading}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                {loading && (
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                Verifikasi OTP & Masuk
              </button>

              <button
                type="button"
                onClick={() => setStep("login")}
                className="w-full text-center text-xs font-bold text-gray-400 hover:text-gray-700"
              >
                &larr; Kembali ke Form Password
              </button>
            </form>
          )}

          <div className="text-center pt-4 text-xs text-gray-500">
            Belum memiliki akun?{" "}
            <Link href="/daftar" className="font-bold text-brand-purple hover:underline">
              Daftar Akun Baru
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
