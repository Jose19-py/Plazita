import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://emprendehub.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/panel", "/panel/*"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
