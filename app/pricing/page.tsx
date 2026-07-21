import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PricingCards from "@/components/PricingCards";
import Faq from "@/components/Faq";
import Prose from "@/components/Prose";

const HREF = "/pricing";

export const metadata: Metadata = {
  title: "Pricing — Free GST Billing Software, Flat Plans | Billzora",
  description:
    "Billzora pricing: start free with unlimited GST invoices, or go Pro for ₹1,999/year with e-invoicing, e-way bills and no branding. Flat pricing, no per-user fees.",
  keywords: [
    "gst billing software price",
    "free gst billing software",
    "gst invoice software price",
    "billzora pricing",
  ],
  alternates: { canonical: HREF },
  openGraph: {
    title: "Billzora Pricing — Flat, Free to Start",
    description:
      "Start free with unlimited GST invoices, or go Pro for ₹1,999/year. No per-user fees.",
    url: HREF,
    siteName: "Billzora",
    type: "website",
  },
};

const PRICING_FAQS = [
  {
    q: "Is there a free plan?",
    a: "Yes. The Free plan includes unlimited invoices, UPI collection, WhatsApp sharing and basic reports, with no login required and no time limit.",
  },
  {
    q: "What does Pro add?",
    a: "Pro (₹1,999/year) adds e-invoicing (IRN), e-way bills, removal of Billzora branding, GST reports and priority support.",
  },
  {
    q: "Are there per-user or per-device fees?",
    a: "No. Billzora is flat-priced — you don't pay extra per user or per device, unlike many competitors that charge per seat.",
  },
  {
    q: "Do prices include GST?",
    a: "Applicable taxes may be added at checkout. The headline plan prices are annual and flat; there are no hidden add-on fees for core compliance features.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PRICING_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Nav />

      <section className="bg-teal-50">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">
            Pricing
          </p>
          <h1 className="mt-2 max-w-3xl text-4xl font-bold text-ink-900 sm:text-5xl">
            Flat, honest pricing for GST billing software
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Start free with unlimited invoices. Upgrade only when you need
            e-invoicing, e-way bills and collaboration — at one flat annual
            price, never per user.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <PricingCards />
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-4 lg:px-8">
        <Prose>
          <h2>What you get for free</h2>
          <p>
            Most small businesses and freelancers can run their invoicing
            entirely on the Free plan: unlimited GST-compliant invoices, UPI
            collection with a QR on every invoice, WhatsApp sharing and basic
            reports — with no login and no time limit. Try it with the{" "}
            <a href="/invoice-generator">invoice generator</a>.
          </p>

          <h2>When to go Pro</h2>
          <p>
            Upgrade to Pro (₹1,999/year) when you need e-invoicing (IRN), e-way
            bills, GST reports, and to remove Billzora branding from your
            documents. It&apos;s a flat annual fee — there are no per-user or
            per-device charges, so your cost doesn&apos;t balloon as your team
            grows.
          </p>

          <h2>Business plan for teams and accountants</h2>
          <p>
            The Business plan adds multi-company support, CA collaboration, GSTR
            filing and bank reconciliation — built for teams and the accountants
            who work with them. See how the plans stack up against alternatives
            on the <a href="/billzora-vs-zoho-books">comparison pages</a>.
          </p>

          <h2>No surprises</h2>
          <p>
            No per-user fees, no e-invoice add-ons, no branding paywall on paid
            plans. Competitor pricing referenced across the site is as of 2026
            and changes often — always verify current rates before deciding.
          </p>
        </Prose>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
        <h2 className="text-2xl font-bold text-ink-900">Pricing FAQs</h2>
        <div className="mt-6">
          <Faq items={PRICING_FAQS} />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 text-center lg:px-8">
        <Link
          href="/invoice-generator"
          className="inline-block rounded-control bg-amber-600 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-800"
        >
          Start free — create an invoice
        </Link>
      </section>

      <Footer />
    </main>
  );
}
