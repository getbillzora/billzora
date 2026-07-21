import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const HREF = "/features";

export const metadata: Metadata = {
  title: "Features — GST Billing Software That Stays Simple | Billzora",
  description:
    "Billzora features: automatic CGST/SGST/IGST, live invoice preview, PDF download, UPI QR, WhatsApp sharing, GSTIN validation and more — with e-invoicing and e-way bills on Pro.",
  keywords: [
    "gst billing software",
    "gst invoice software features",
    "billing software india",
    "gst software features",
  ],
  alternates: { canonical: HREF },
  openGraph: {
    title: "Billzora Features — GST Billing Software",
    description:
      "Automatic GST, live preview, PDF, UPI QR, WhatsApp sharing — e-invoicing & e-way bills on Pro.",
    url: HREF,
    siteName: "Billzora",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Billzora GST Billing Software",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  description:
    "GST billing software for India: automatic CGST/SGST/IGST, live invoice preview, PDF, UPI QR and WhatsApp sharing, with e-invoicing and e-way bills on Pro.",
};

const LIVE = [
  ["Automatic GST", "CGST + SGST within a state, IGST across states, across the 0/5/18/40% slabs."],
  ["Live invoice preview", "See the exact invoice update as you type — the PDF matches it precisely."],
  ["Instant PDF download", "Generate a clean, professional PDF in your browser — no server wait."],
  ["UPI QR on invoices", "Add your UPI ID and every invoice carries a scannable payment QR."],
  ["WhatsApp sharing", "Send invoices and payment details to customers on WhatsApp."],
  ["GSTIN validation", "Checks the 15-character format and checksum as you enter it."],
  ["Amount in words", "Indian-numbering rupees-in-words generated automatically."],
  ["Logo upload", "Brand your invoice with your business logo."],
  ["Proforma, quote & receipt", "The same engine issues proforma invoices, quotations and receipts."],
  ["Standalone GST calculator", "Work out CGST/SGST/IGST, GST-inclusive or exclusive, in seconds."],
  ["No login, private by default", "Invoice data is processed in your browser — nothing to sign up for."],
];

const COMING = [
  ["E-invoicing (IRN)", "Pro", "Generate IRN and a signed QR for e-invoices."],
  ["E-way bills", "Pro", "Capture and generate e-way bill details on movement of goods."],
  ["Remove branding", "Pro", "Ship invoices with only your brand on them."],
  ["GST reports", "Pro", "Summaries to make GST return prep easier."],
  ["Multi-company", "Business", "Manage several businesses from one place."],
  ["CA collaboration", "Business", "Give your accountant structured access."],
  ["GSTR filing", "Business", "Prepare and file GST returns."],
  ["Bank reconciliation", "Business", "Match payments to invoices automatically."],
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />

      <section className="bg-teal-50">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">
            Features
          </p>
          <h1 className="mt-2 max-w-3xl text-4xl font-bold text-ink-900 sm:text-5xl">
            GST billing software that stays simple
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Everything you need to raise a compliant GST invoice fast — and an
            honest view of what&apos;s live today versus what&apos;s on the way.
          </p>
        </div>
      </section>

      {/* Live now */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-ink-900">Live now</h2>
          <span className="rounded-control bg-teal-50 px-2 py-1 text-xs font-semibold text-teal-800">
            Free to use
          </span>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {LIVE.map(([title, body]) => (
            <div key={title} className="rounded-card border border-gray-200 p-6">
              <h3 className="flex items-start gap-2 text-lg font-semibold text-teal-800">
                <span aria-hidden className="text-teal-800">
                  ✓
                </span>
                {title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Coming */}
      <section className="surface-1">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-ink-900">
              On paid plans &amp; on the way
            </h2>
          </div>
          <p className="mt-2 text-gray-600">
            We&apos;d rather be straight with you: these are part of the roadmap
            and paid plans, not all shipped in the free tool yet.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {COMING.map(([title, tier, body]) => (
              <div
                key={title}
                className="rounded-card border border-gray-200 bg-white p-6"
              >
                <span className="rounded-control bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-800">
                  {tier}
                </span>
                <h3 className="mt-3 text-base font-semibold text-ink-900">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center lg:px-8">
        <h2 className="text-2xl font-bold text-ink-900">
          Try the live tools — free, no login
        </h2>
        <p className="mt-2 text-gray-600">
          See the features in action in under a minute.
        </p>
        <Link
          href="/invoice-generator"
          className="mt-5 inline-block rounded-control bg-amber-600 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-800"
        >
          Create a free invoice
        </Link>
        <p className="mt-4 text-sm text-gray-500">
          Or see{" "}
          <Link href="/pricing" className="text-teal-800 underline">
            pricing
          </Link>
          .
        </p>
      </section>

      <Footer />
    </main>
  );
}
