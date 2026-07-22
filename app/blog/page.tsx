import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { POSTS, formatPostDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Billzora Blog — GST, Invoicing & Compliance Guides for India",
  description:
    "Practical, plain-English guides on GST invoicing, e-invoicing, e-way bills, GST rates and getting paid faster — for Indian freelancers and small businesses.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Billzora Blog",
    description:
      "Practical guides on GST invoicing, e-invoicing, e-way bills and getting paid.",
    url: "/blog",
    siteName: "Billzora",
    type: "website",
  },
};

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-white">
      <Nav />

      <section className="bg-teal-50">
        <div className="mx-auto max-w-4xl px-4 py-14 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">
            Resources
          </p>
          <h1 className="mt-2 text-4xl font-bold text-ink-900 sm:text-5xl">
            GST &amp; invoicing guides
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Plain-English answers to the GST and invoicing questions Indian
            businesses actually ask.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <ul className="space-y-6">
          {POSTS.map((post) => (
            <li
              key={post.slug}
              className="rounded-card border border-gray-200 p-6 hover:border-teal-800"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <h2 className="text-xl font-semibold text-teal-800">
                  {post.title}
                </h2>
                <p className="mt-2 text-gray-600">{post.description}</p>
                <p className="mt-3 text-sm text-gray-500">
                  {formatPostDate(post.published)} · {post.readingMinutes} min
                  read
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Footer />
    </main>
  );
}
