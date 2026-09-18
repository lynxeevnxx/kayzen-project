import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Read .env.local manually
const envPath = path.resolve(process.cwd(), ".env.local");
let envVars = {};
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  content.split("\n").forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*"(.*)"\s*$/) || line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (match) {
      envVars[match[1]] = match[2];
    }
  });
}

const url = process.env.SUPABASE_URL || envVars.SUPABASE_URL;
const key = process.env.SUPABASE_API_KEY || envVars.SUPABASE_API_KEY;

if (!url || !key) {
  console.error("Missing SUPABASE_URL or SUPABASE_API_KEY");
  process.exit(1);
}

const sb = createClient(url, key);

import bcrypt from "bcryptjs";

async function seedDatabase() {
  console.log("Seeding data to Supabase...");

  try {
    // 0. Default Admin User
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const { error: err0 } = await sb.from("users").upsert([
      {
        id: "usr_admin_1",
        name: "Administrator Kayzen",
        email: "admin@kayzenacademia.com",
        password: hashedPassword,
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      }
    ]);
    if (err0) console.error("Admin User Error:", err0.message);
    else console.log("✓ Default Admin User seeded");
    // 1. Contests
    const { error: err1 } = await sb.from("contests").upsert([
      {
        id: "c_1",
        title: "Lomba Karya Tulis Ilmiah Nasional (LKTI) 2026",
        category: "Karya Tulis Ilmiah",
        level: "Tingkat Nasional",
        deadline: "30 Oktober 2026",
        fee: "Gratis",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
        description: "Ajang gagasan kreatif & riset ilmiah mahasiswa seluruh Indonesia dalam menjawab tantangan keberlanjutan dan sains.",
        guide_url: "https://google.com",
        status: "open",
      },
      {
        id: "c_2",
        title: "National Essay Competition 2026",
        category: "Esai",
        level: "Tingkat Nasional",
        deadline: "15 November 2026",
        fee: "Rp 35.000",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
        description: "Kompetisi esai opini dan gagasan kritis mahasiswa serta siswa SMA se-Indonesia bertema transformasi digital.",
        guide_url: "https://google.com",
        status: "open",
      },
      {
        id: "c_3",
        title: "Business Plan Competition 2026",
        category: "Business Plan",
        level: "Tingkat Nasional",
        deadline: "20 Desember 2026",
        fee: "Rp 50.000",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        description: "Perancangan model bisnis inovatif berdaya saing global untuk startup muda Indonesia.",
        guide_url: "https://google.com",
        status: "open",
      },
    ]);
    if (err1) console.error("Contests Error:", err1.message);
    else console.log("✓ Contests seeded");

    // 2. Programs
    const { error: err2 } = await sb.from("programs").upsert([
      {
        id: "prg_1",
        title: "Essay Bootcamp: Masterclass Kepenulisan Esai Beasiswa & Lomba",
        slug: "essay-bootcamp",
        category: "Bootcamp & Mentoring",
        price: "Rp 39.000",
        mentor: "Dinda Salsabila, M.Sc.",
        image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80",
        description: "Program bootcamp 4 minggu yang dirancang khusus untuk membantu pelajar dan mahasiswa memahami struktur penulisan esai kritis.",
        link: "https://wa.me/6281234567890",
        status: "active",
      },
      {
        id: "prg_2",
        title: "KTI Bootcamp: Panduan Lengkap Karya Tulis Ilmiah & Penelitian",
        slug: "kti-bootcamp",
        category: "Bootcamp & Mentoring",
        price: "Rp 39.000",
        mentor: "Raihan Putra, S.T., M.Eng.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
        description: "Bootcamp intensif 5 minggu untuk membimbing Anda dari tahap perumusan ide riset hingga teknik penulisan ilmiah terstruktur.",
        link: "https://wa.me/6281234567890",
        status: "active",
      },
      {
        id: "prg_3",
        title: "Bisnis Plan Bootcamp: Proposal Bisnis Inovatif & Investable",
        slug: "bisnis-plan",
        category: "Bootcamp & Mentoring",
        price: "Rp 39.000",
        mentor: "Muhammad Farhan, S.E.",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
        description: "Susun rencana bisnis yang terstruktur, rasional secara finansial, dan menarik minat juri kompetisi maupun investor.",
        link: "https://wa.me/6281234567890",
        status: "active",
      },
    ]);
    if (err2) console.error("Programs Error:", err2.message);
    else console.log("✓ Programs seeded");

    // 3. Blogs
    const { error: err3 } = await sb.from("blogs").upsert([
      {
        id: "b_1",
        title: "Panduan Lengkap Menyusun Novelty Karya Tulis Ilmiah 2026",
        slug: "panduan-lengkap-novelty-kti",
        category: "Tips Lomba",
        author: "Tim Kayzen Academia",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
        excerpt: "Strategi menentukan kebaruan riset (novelty) agar proposal karya tulis Anda menonjol di mata juri nasional.",
        content: "<p>Novelty atau kebaruan merupakan unsur paling krusial dalam karya tulis ilmiah...</p>",
        status: "published",
      },
      {
        id: "b_2",
        title: "Trik Menulis Esai Beasiswa LPDP & IISMA yang Memikat",
        slug: "trik-menulis-esai-beasiswa",
        category: "Esai",
        author: "Dinda Salsabila, M.Sc.",
        image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80",
        excerpt: "Struktur penulisan esai narasi diri dan kontribusi untuk menembus seleksi beasiswa terpopuler.",
        content: "<p>Menulis esai beasiswa membutuhkan keseimbangan antara pencapaian akademis dan kontribusi sosial...</p>",
        status: "published",
      },
    ]);
    if (err3) console.error("Blogs Error:", err3.message);
    else console.log("✓ Blogs seeded");

    // 4. Partners
    const { error: err4 } = await sb.from("partners").upsert([
      {
        id: "p_1",
        name: "Universitas Gadjah Mada",
        category: "Mitra Kampus",
        logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=300&q=80",
        status: "active",
      },
      {
        id: "p_2",
        name: "Institut Teknologi Bandung",
        category: "Mitra Kampus",
        logo: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=300&q=80",
        status: "active",
      },
      {
        id: "p_3",
        name: "Universitas Indonesia",
        category: "Mitra Kampus",
        logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=300&q=80",
        status: "active",
      },
    ]);
    if (err4) console.error("Partners Error:", err4.message);
    else console.log("✓ Partners seeded");

    // 5. Testimonials
    const { error: err5 } = await sb.from("testimonials").upsert([
      {
        id: "t_1",
        quote: "Essay Bootcamp membantu saya lolos beasiswa impian! Materinya sangat praktis dan mentornya sangat suportif.",
        author: "Nabila Annisa",
        title: "Awardee LPDP 2026",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
        rating: 5,
        status: "active",
      },
      {
        id: "t_2",
        quote: "KTI Bootcamp memberikan saya fondasi kuat hingga menjuarai LKTI Nasional.",
        author: "Arif Mahendra",
        title: "Juara 1 LKTI Nasional",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
        rating: 5,
        status: "active",
      },
    ]);
    if (err5) console.error("Testimonials Error:", err5.message);
    else console.log("✓ Testimonials seeded");

    // 6. Team Members
    const { error: err6 } = await sb.from("team_members").upsert([
      {
        id: "tm_1",
        name: "Dinda Salsabila, M.Sc.",
        role: "Lead Mentor Kepenulisan Esai",
        description: "Awardee LPDP & Senior Research Mentor di Kayzen Academia.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        status: "active",
      },
      {
        id: "tm_2",
        name: "Raihan Putra, S.T., M.Eng.",
        role: "Head of Research & KTI",
        description: "Juara 1 LKTI Nasional & Peneliti Terpublikasi Scopus.",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
        status: "active",
      },
    ]);
    if (err6) console.error("Team Error:", err6.message);
    else console.log("✓ Team Members seeded");

    console.log("\nALL SEEDING COMPLETED SUCCESSFULLY!");
  } catch (err) {
    console.error("Seeding Failed:", err);
  }
}

seedDatabase();
