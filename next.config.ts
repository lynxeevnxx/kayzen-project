import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  // ponytail: CSP penuh (script-src dll.) belum dipasang karena butuh nonce untuk inline script Next.js.
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  images: {
    remotePatterns: [
      // Gambar hasil upload CMS (Supabase Storage)
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      // Admin boleh menempel URL gambar dari situs mana pun (mode "URL Link").
      // Tanpa ini, next/image melempar error dan halaman crash untuk host yang belum terdaftar.
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
