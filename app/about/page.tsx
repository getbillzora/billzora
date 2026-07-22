import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Prose from "@/components/Prose";

const HREF = "/about";

export const metadata: Metadata = {
  title: "About Billzora — Simple GST Invoicing for India",
  description:
    "Billzora is on a mission to make GST invoicing dead simple for Indian freelancers and small businesses — flat pricing, no per-user fees, no login to start.",
  alternates: { canonical: HREF },
  openGraph: {
    title: "About Billzora",
    description:
      "Making GST invoicing dead simple for Indian freelancers and small businesses.",
    url: HREF,
    siteName: "Billzora",
    type: "website",
  },
};

// Organization-level schema only — no fabricated founder. Fill in real
// legalName / founder / address once finalised (see editor note below).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Billzora",
  url: "https://billzora.in",
  email: "hello.billzora@gmail.com",
  description:
    "GST-first invoicing and billing tools for freelancers and small businesses in India.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />

      <section className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        {/* Editor note — remove before publishing once real details are in. */}
        <div className="rounded-card border border-amber-600 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-800">
            ✏️ Editor note — complete before publishing
          </p>
          <p className="mt-1 text-sm text-amber-800">
            The founder/company details below use bracketed placeholders. For
            E-E-A-T (Google weights real authorship for financial tools), fill in
            the real name, role, city and registered entity, and consider adding
            a photo. Delete this note when done.
          </p>
        </div>

        <h1 className="mt-8 text-3xl font-bold text-ink-900 sm:text-4xl">
          About Billzora
        </h1>

        <Prose>
          <h2>Why we built Billzora</h2>
          <p>
            Invoicing in India shouldn&apos;t require a course, a per-user
            subscription, or a desktop install. Yet most tools bury a simple
            job — send a GST-compliant invoice — under setup, tiers and add-on
            fees. Billzora exists to make that one job effortless: enter your
            details, and get a correct GST invoice you can download or send on
            WhatsApp in under a minute.
          </p>

          <h2>What we believe</h2>
          <ul>
            <li>
              <strong>Simple beats feature-rich.</strong> Most businesses need to
              invoice, not to learn accounting software.
            </li>
            <li>
              <strong>Pricing should be flat and honest.</strong> No per-user or
              per-device fees, no compliance features held behind the top tier.
            </li>
            <li>
              <strong>Get correct GST by default.</strong> CGST/SGST vs IGST,
              slabs and rounding handled for you, so invoices are right the first
              time.
            </li>
            <li>
              <strong>Meet people where they are.</strong> WhatsApp sharing and
              UPI collection, because that&apos;s how India transacts.
            </li>
          </ul>

          <h2>Who&apos;s behind Billzora</h2>
          <p>
            Billzora is built by [Founder name], [role] based in [city], India,
            [one line of relevant background — e.g. years working with small
            businesses / GST / product]. It is operated by [registered entity
            name], [registration/GSTIN if applicable]. You can reach us directly
            at{" "}
            <a href="mailto:hello.billzora@gmail.com">
              hello.billzora@gmail.com
            </a>
            .
          </p>

          <h2>What&apos;s live today</h2>
          <p>
            We&apos;re honest about where the product is. The free invoicing
            tools — GST invoices, proforma invoices, quotations, receipts and a
            GST calculator — are live now. E-invoicing (IRN), e-way bills,
            multi-company and filing are on paid plans and the roadmap. See the{" "}
            <a href="/features">features page</a> for the full live-vs-coming
            breakdown.
          </p>
        </Prose>

        <div className="mt-8">
          <Link
            href="/invoice-generator"
            className="inline-block rounded-control bg-amber-600 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-800"
          >
            Create a free invoice
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
