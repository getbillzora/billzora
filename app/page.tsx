import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ComparisonTable from "@/components/ComparisonTable";
import PricingCards from "@/components/PricingCards";
import Faq from "@/components/Faq";
import { HOME_FAQS } from "@/lib/homeFaqs";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const metadata: Metadata = {
  title: "Cloud Accounting Software for India | Billzora",
  description:
    "Billzora is simple cloud accounting software for India — GST invoicing, e-way bills, UPI payments and WhatsApp sharing at one flat price. Create a free invoice in 60 seconds.",
  keywords: [
    "cloud accounting software",
    "accounting software india",
    "gst invoicing software",
    "online accounting software",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Cloud Accounting Software for India | Billzora",
    description:
      "GST invoicing, e-way bills, UPI payments and WhatsApp sharing at one flat price.",
    url: "/",
    siteName: "Billzora",
    type: "website",
  },
};

const FEATURES = [
  {
    title: "Instant invoicing",
    caption: "No login required",
    body: "Create a GST-compliant invoice in under a minute and download the PDF on the spot.",
  },
  {
    title: "WhatsApp native",
    caption: "Share and collect",
    body: "Send invoices and UPI payment links straight to your customers on WhatsApp.",
  },
  {
    title: "Flat pricing",
    caption: "No per-user fees",
    body: "One transparent price with everything included — no add-ons, no surprises.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Nav />

      {/* Hero */}
      <section className="bg-teal-50">
        <div className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">
            Cloud accounting software for India
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-ink-900 sm:text-5xl">
            Send a GST invoice in 60 seconds. Free.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            One flat price, everything included — invoicing, GST, e-way bills,
            UPI payments, WhatsApp sharing.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/invoice-generator"
              className="rounded-control bg-amber-600 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-800"
            >
              Create free invoice
            </Link>
            <Link
              href="#pricing"
              className="rounded-control border border-teal-800 px-6 py-3 text-sm font-semibold text-teal-800 hover:bg-white"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-card border border-gray-200 p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
                {f.caption}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-teal-800">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section id="comparison" className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
          How Billzora compares
        </h2>
        <p className="mt-2 text-gray-600">
          No per-user fees. No e-invoice add-ons. No branding paywall.
        </p>
        <div className="mt-8">
          <ComparisonTable />
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="surface-1">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
            Simple, flat pricing
          </h2>
          <p className="mt-2 text-gray-600">
            Start free. Upgrade when you need compliance and collaboration.
          </p>
          <div className="mt-8">
            <PricingCards />
          </div>
          <p className="mt-6 text-sm text-gray-500">
            See the{" "}
            <Link href="/pricing" className="text-teal-800 underline">
              full pricing breakdown
            </Link>{" "}
            or explore{" "}
            <Link href="/features" className="text-teal-800 underline">
              all features
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-4 py-16 lg:px-8">
        <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
          Frequently asked questions
        </h2>
        <div className="mt-8">
          <Faq items={HOME_FAQS} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
