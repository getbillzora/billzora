import type { Metadata } from "next";
import Link from "next/link";
import InvoiceGenerator from "@/components/InvoiceGenerator";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "GST Invoice Software — E-Invoicing, IRN & E-Way Bills | Billzora",
  description:
    "GST invoice software for India. Generate GST-compliant tax invoices with automatic CGST/SGST/IGST, e-invoicing (IRN) and e-way bills. Create your first invoice free — no login.",
  keywords: [
    "gst invoice software",
    "gst billing software",
    "e-invoicing software",
    "gst invoice generator",
    "tax invoice software india",
  ],
  alternates: { canonical: "/gst-invoice-software" },
  openGraph: {
    title: "GST Invoice Software | Billzora",
    description:
      "Generate GST-compliant tax invoices with automatic CGST/SGST/IGST, e-invoicing (IRN) and e-way bills.",
    url: "/gst-invoice-software",
    siteName: "Billzora",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Billzora GST Invoice Software",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  description:
    "GST invoice software for India with automatic CGST/SGST/IGST, e-invoicing (IRN) and e-way bill support.",
};

const COMPLIANCE = [
  {
    title: "GST-compliant tax invoices",
    body: "Every invoice carries GSTIN, place of supply, HSN-ready line items and an automatic CGST/SGST or IGST split based on your customer's state.",
  },
  {
    title: "E-invoicing & IRN ready",
    body: "Built to slot into the e-invoicing workflow — generate the invoice, then push for IRN and a signed QR when you move to Pro.",
  },
  {
    title: "E-way bills",
    body: "Capture the details you need for e-way bill generation on movement of goods, without re-keying invoice data.",
  },
];

export default function GstInvoiceSoftwarePage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />

      {/* Compliance-led intro (this page targets higher-intent searchers). */}
      <section className="bg-teal-50">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">
            GST invoice software for India
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-ink-900 sm:text-5xl">
            GST invoicing that stays compliant by default.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Generate GST-compliant tax invoices with automatic CGST, SGST and
            IGST, e-invoicing (IRN) and e-way bill support — built for GST 2.0
            slabs.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#tool"
              className="rounded-control bg-amber-600 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-800"
            >
              Create a GST invoice
            </Link>
            <Link
              href="/#pricing"
              className="rounded-control border border-teal-800 px-6 py-3 text-sm font-semibold text-teal-800 hover:bg-white"
            >
              See pricing
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {COMPLIANCE.map((c) => (
              <div
                key={c.title}
                className="rounded-card border border-teal-800/20 bg-white p-6"
              >
                <h2 className="text-base font-semibold text-teal-800">
                  {c.title}
                </h2>
                <p className="mt-2 text-sm text-gray-600">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Same engine as /invoice-generator, compliance-led copy. */}
      <div id="tool">
        <InvoiceGenerator
          heading="GST Invoice Generator"
          subheading="Enter your details below to generate a GST-compliant tax invoice. CGST/SGST and IGST are applied automatically from the place of supply. Download the PDF or share on WhatsApp — no login required."
        />
      </div>

      {/* Supporting SEO content */}
      <section className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
        <h2 className="text-2xl font-bold text-ink-900">
          What makes an invoice GST-compliant?
        </h2>
        <p className="mt-3 text-gray-600">
          A valid GST tax invoice needs the supplier and recipient GSTIN, a
          unique invoice number and date, the place of supply, a clear
          description of goods or services, the taxable value, and the correct
          tax split. Billzora fills these in for you: when the supplier and
          recipient are in the same state it applies CGST + SGST (half each),
          and when they differ it applies IGST — so you never pick the wrong tax
          head.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-ink-900">
          Built for GST 2.0 slabs
        </h2>
        <p className="mt-3 text-gray-600">
          Line items support the 0%, 5%, 18% and 40% slabs, with totals,
          per-slab tax breakup, round-off and amount-in-words computed
          automatically and shown live as you type.
        </p>

        <div className="mt-8">
          <Link
            href="#tool"
            className="rounded-control border border-teal-800 px-6 py-3 text-sm font-semibold text-teal-800 hover:bg-teal-50"
          >
            Generate your invoice
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
