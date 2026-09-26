import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kayzenacademia.id";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Kayzen Academia - Platform Kepenulisan Ilmiah & Mentorship Riset",
    template: "%s | Kayzen Academia",
  },
  description:
    "Kayzen Academia memberdayakan pelajar dan mahasiswa Indonesia melalui bootcamp kepenulisan LKTI, esai beasiswa, proposal bisnis plan, dan mentorship riset terstruktur.",
  keywords: [
    "LKTI",
    "Karya Tulis Ilmiah",
    "Esai Beasiswa",
    "Mentoring Riset",
    "Business Plan Competition",
    "Kayzen Academia",
    "Bootcamp Kepenulisan",
    "Lomba Mahasiswa 2026",
    "Beasiswa LPDP",
    "Publikasi Scopus",
  ],
  authors: [{ name: "Kayzen Academia Team", url: baseUrl }],
  creator: "Kayzen Academia",
  publisher: "Kayzen Academia",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: baseUrl,
    siteName: "Kayzen Academia",
    title: "Kayzen Academia - Tulis Ide, Riset Solusi, Ciptakan Inovasi",
    description:
      "Platform edukasi & bimbingan kepenulisan ilmiah, esai beasiswa, dan inovasi riset untuk mahasiswa se-Indonesia.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kayzen Academia - Platform Kepenulisan Ilmiah & Inovasi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kayzen Academia - Tulis Ide, Riset Solusi, Ciptakan Inovasi",
    description:
      "Bimbingan intensif karya tulis ilmiah (LKTI), esai beasiswa, dan proposal bisnis plan untuk pelajar & mahasiswa.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Kayzen Academia",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      "Platform bimbingan kepenulisan ilmiah, esai beasiswa, dan riset inovasi mahasiswa.",
    sameAs: [
      "https://instagram.com/kayzenacademia",
      "https://linkedin.com/company/kayzenacademia",
    ],
  };

  return (
    <html lang="id" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-full bg-brand-dark text-brand-text flex flex-col font-sans"
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
