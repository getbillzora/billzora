import Link from "next/link";
import type { ReactNode } from "react";
import Prose from "@/components/Prose";
import { formatPostDate, relatedPosts, type PostMeta } from "@/lib/blog";

const BASE_URL = "https://billzora.in";

interface Props {
  meta: PostMeta;
  children: ReactNode;
}

/** Shared article shell: header (dates + author), Article JSON-LD, prose body,
 * a single CTA, and related-post links. */
export default function ArticleLayout({ meta, children }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.published,
    dateModified: meta.updated,
    author: {
      "@type": "Organization",
      name: "Billzora",
      url: `${BASE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "Billzora",
      url: BASE_URL,
    },
    mainEntityOfPage: `${BASE_URL}/blog/${meta.slug}`,
  };

  const related = relatedPosts(meta.slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-sm text-gray-500">
        <Link href="/blog" className="hover:text-teal-800">
          ← All articles
        </Link>
      </nav>

      <h1 className="mt-4 text-3xl font-bold leading-tight text-ink-900 sm:text-4xl">
        {meta.title}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
        <span>
          By{" "}
          <Link href="/about" className="text-teal-800 hover:underline">
            Billzora
          </Link>
        </span>
        <span aria-hidden>·</span>
        <span>
          Updated <time dateTime={meta.updated}>{formatPostDate(meta.updated)}</time>
        </span>
        <span aria-hidden>·</span>
        <span>{meta.readingMinutes} min read</span>
      </div>

      <div className="mt-8">
        <Prose>{children}</Prose>
      </div>

      {/* Single CTA */}
      <div className="mt-10 rounded-card bg-teal-50 p-6 text-center">
        <p className="font-semibold text-teal-900">
          Create a GST-compliant invoice free
        </p>
        <p className="mt-1 text-sm text-gray-600">
          No login. Download the PDF or share on WhatsApp in under a minute.
        </p>
        <Link
          href="/invoice-generator"
          className="mt-4 inline-block rounded-control bg-amber-600 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-800"
        >
          Create a free invoice
        </Link>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Related articles
          </h2>
          <ul className="mt-3 space-y-2">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="text-teal-800 hover:underline"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
