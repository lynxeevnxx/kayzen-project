import { MetadataRoute } from "next";
import { getSupabase, initTables } from "@/lib/db";

interface DbItem {
  slug: string;
  created_at?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kayzenacademia.id";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/program`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/info-lomba`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kemitraan`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tentang-kami`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  try {
    await initTables();
    const sb = getSupabase();

    const [blogsRes, programsRes] = await Promise.all([
      sb.from("blogs").select("slug, created_at").eq("status", "published"),
      sb.from("programs").select("slug, created_at").eq("status", "active"),
    ]);

    const blogsData = (blogsRes.data || []) as DbItem[];
    const programsData = (programsRes.data || []) as DbItem[];

    const blogRoutes: MetadataRoute.Sitemap = blogsData.map((blog: DbItem) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date(blog.created_at || Date.now()),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    const programRoutes: MetadataRoute.Sitemap = programsData.map((program: DbItem) => ({
      url: `${baseUrl}/program/${program.slug}`,
      lastModified: new Date(program.created_at || Date.now()),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [...staticRoutes, ...programRoutes, ...blogRoutes];
  } catch (e) {
    console.error("Sitemap generation error:", e);
    return staticRoutes;
  }
}
