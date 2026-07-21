import type { MetadataRoute } from "next";

const BASE_URL = "https://billzora.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /privacy and /terms carry a meta noindex; no need to disallow crawling.
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
