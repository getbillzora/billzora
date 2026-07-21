import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ComparisonTable from "@/components/ComparisonTable";
import Faq from "@/components/Faq";
import { COMPARISON_YEAR, COMPETITORS, getCompetitor } from "@/lib/competitors";

// Shared template for every /billzora-vs-* page. Each route is a thin static
// folder that renders this with its slug — one template, exact URLs, no engine
// or markup duplication.

export function buildComparisonMetadata(slug: string): Metadata {
  const c = getCompetitor(slug);
  if (!c) return {};
  const title = `Billzora vs ${c.name}: ${COMPARISON_YEAR} Comparison`;
  const description = `Billzora vs ${c.name} (${COMPARISON_YEAR}) — ${c.tagline}. Compare pricing, e-invoicing, e-way bills, WhatsApp, UPI and more, side by side.`;
  const url = `/billzora-vs-${c.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "Billzora", type: "website" },
  };
}

export default function ComparisonPageTemplate({ slug }: { slug: string }) {
  const c = getCompetitor(slug);
  if (!c) notFound();

  const others = COMPETITORS.filter((x) => x.slug !== c.slug);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Nav />

      <article className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">
          Comparison
        </p>
        <h1 className="mt-2 text-3xl font-bold text-ink-900 sm:text-4xl">
          Billzora vs {c.name}: {COMPARISON_YEAR} comparison
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-gray-600">{c.summary}</p>

        <div className="mt-6">
          <Link
            href="/invoice-generator"
            className="inline-block rounded-control bg-amber-600 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-800"
          >
            Create a free invoice
          </Link>
        </div>

        {/* Side-by-side table */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Billzora vs {c.name} at a glance
          </h2>
          <div className="mt-6">
            <ComparisonTable columns={["Billzora", c.name]} rows={c.rows} />
          </div>
        </section>

        {/* When competitor is better */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            When {c.name} is the better choice
          </h2>
          <ul className="mt-4 space-y-2 text-gray-600">
            {c.whenCompetitor.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="mt-0.5 font-bold text-teal-800">→</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* When Billzora is better */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            When Billzora is the better choice
          </h2>
          <ul className="mt-4 space-y-2 text-gray-600">
            {c.whenBillzora.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="mt-0.5 font-bold text-teal-800">→</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-ink-900">
            Billzora vs {c.name}: FAQs
          </h2>
          <div className="mt-6">
            <Faq items={c.faqs} />
          </div>
        </section>

        {/* CTA */}
        <section className="mt-12 rounded-card bg-teal-50 p-8 text-center">
          <h2 className="text-xl font-bold text-teal-900">
            Try Billzora free — no login required
          </h2>
          <p className="mt-2 text-gray-600">
            Create a GST-compliant invoice in under a minute and download the PDF
            or share it on WhatsApp.
          </p>
          <Link
            href="/invoice-generator"
            className="mt-5 inline-block rounded-control bg-amber-600 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-800"
          >
            Create a free invoice
          </Link>
        </section>

        {/* Internal links to other comparisons */}
        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Compare Billzora with others
          </h2>
          <div className="mt-3 flex flex-wrap gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/billzora-vs-${o.slug}`}
                className="rounded-control border border-gray-200 px-4 py-2 text-sm text-teal-800 hover:bg-teal-50"
              >
                Billzora vs {o.name}
              </Link>
            ))}
          </div>
        </section>

        <p className="mt-10 text-xs text-gray-500">
          Competitor pricing and features are as of {COMPARISON_YEAR} and change
          often — verify on the competitor&apos;s official site before relying on
          them. Comparisons reflect Billzora&apos;s honest assessment for typical
          small-business invoicing needs.
        </p>
      </article>

      <Footer />
    </main>
  );
}
