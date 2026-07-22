// Blog registry. Each post lives in content/blog/<slug>.tsx and exports a
// `meta` object plus a default Body component. This file pulls them together
// into an ordered list the index and [slug] pages read from.

import type { ComponentType } from "react";

import * as howToInvoice from "@/content/blog/how-to-create-gst-invoice";
import * as eInvoicing from "@/content/blog/what-is-e-invoicing";
import * as gstRates from "@/content/blog/gst-rates-2026-explained";
import * as ewayBill from "@/content/blog/e-way-bill-guide";
import * as cgstSgstIgst from "@/content/blog/cgst-sgst-igst-difference";

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  published: string; // ISO yyyy-mm-dd
  updated: string; // ISO yyyy-mm-dd
  readingMinutes: number;
}

export interface Post extends PostMeta {
  Body: ComponentType;
}

const MODULES = [
  howToInvoice,
  eInvoicing,
  gstRates,
  ewayBill,
  cgstSgstIgst,
];

// Newest first.
export const POSTS: Post[] = MODULES.map((m) => ({
  ...m.meta,
  Body: m.default,
})).sort((a, b) => (a.published < b.published ? 1 : -1));

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function relatedPosts(slug: string, count = 3): Post[] {
  return POSTS.filter((p) => p.slug !== slug).slice(0, count);
}

export function formatPostDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
