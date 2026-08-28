import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kayzen Academia - Tulis Ide, Riset Solusi, Ciptakan Inovasi",
  description: "Kayzen Academia memberdayakan pelajar dan mahasiswa melalui kepenulisan ilmiah dan inovasi untuk menghasilkan karya berkualitas yang memberi dampak nyata.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-full bg-brand-dark text-brand-text flex flex-col font-sans"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
