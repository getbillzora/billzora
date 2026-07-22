import type { MetadataRoute } from "next";
import { COMPETITORS } from "@/lib/competitors";

const BASE_URL = "https://billzora.in";

// Auto-generated sitemap. Add new indexable routes here as batches ship.
// Noindexed pages (/privacy, /terms) are intentionally excluded.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${BASE_URL}/invoice-generator`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/gst-invoice-software`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const toolPages: MetadataRoute.Sitemap = [
    "/proforma-invoice-generator",
    "/online-receipt-generator",
    "/quotation-maker",
    "/gst-calculator",
    "/invoice-template",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const comparisonPages: MetadataRoute.Sitemap = COMPETITORS.map((c) => ({
    url: `${BASE_URL}/billzora-vs-${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...toolPages, ...comparisonPages];
}
