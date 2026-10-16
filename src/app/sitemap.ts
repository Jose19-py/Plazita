import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://plazita.vercel.app";

  let emprendimientoUrls: MetadataRoute.Sitemap = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase.from("emprendimientos").select("slug, created_at");
    if (data) {
      emprendimientoUrls = data.map((item) => ({
        url: `${baseUrl}/emprendimiento/${item.slug}`,
        lastModified: item.created_at ? new Date(item.created_at) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    }
  } catch {
    // Si falla la consulta durante el build estático, mantener páginas principales
  }

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/explorar`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  return [...staticPages, ...emprendimientoUrls];
}
