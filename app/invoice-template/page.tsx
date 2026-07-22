import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import InvoiceGenerator from "@/components/InvoiceGenerator";
import RelatedTools from "@/components/RelatedTools";
import Prose from "@/components/Prose";

const HREF = "/invoice-template";

export const metadata: Metadata = {
  title: "Free GST Invoice Template (India) — Fill & Download | Billzora",
  description:
    "Free GST invoice template for India. Fill it in online and download a professional PDF instantly — no Word or Excel needed. CGST/SGST/IGST calculated for you.",
  keywords: [
    "invoice template",
    "gst invoice template",
    "invoice format india",
    "free invoice template",
  ],
  alternates: { canonical: HREF },
  openGraph: {
    title: "Free GST Invoice Template | Billzora",
    description:
      "Fill in a GST invoice template online and download a professional PDF instantly.",
    url: HREF,
    siteName: "Billzora",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Billzora GST Invoice Template",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  description:
    "Free, fillable GST invoice template for India — download a professional PDF instantly.",
};

export default function InvoiceTemplatePage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />

      <InvoiceGenerator
        heading="Free GST Invoice Template"
        subheading="A ready-to-use GST invoice template you fill in online — no Word or Excel needed. Add your details and download a clean, professional PDF. CGST/SGST/IGST is worked out for you."
      />

      <section className="mx-auto max-w-4xl px-4 pt-4 lg:px-8">
        <Prose>
          <h2>A GST invoice template that fills itself in</h2>
          <p>
            Static Word and Excel templates leave you to align columns, retype
            totals and calculate tax by hand. This template is live: enter your
            business and customer details, add line items, and the layout,
            totals, tax breakup and amount-in-words update as you type. When
            it&apos;s ready, download a professional PDF — the same format every
            time, so your invoices look consistent.
          </p>

          <h2>What the template includes</h2>
          <ul>
            <li>Your business name, GSTIN, address and logo.</li>
            <li>Customer details and place of supply.</li>
            <li>Line items with quantity, rate and GST rate.</li>
            <li>Automatic CGST/SGST or IGST, totals and amount in words.</li>
            <li>An optional UPI QR code so customers can pay instantly.</li>
          </ul>

          <h2>Which template do you need?</h2>
          <p>
            For a standard GST bill, use this template as-is. If you need to
            quote before the sale, use the{" "}
            <a href="/proforma-invoice-generator">proforma invoice</a> or{" "}
            <a href="/quotation-maker">quotation</a> format; to acknowledge a
            payment you&apos;ve received, use the{" "}
            <a href="/online-receipt-generator">receipt</a> format. They all
            share the same clean layout.
          </p>

          <h2>Free, no login</h2>
          <p>
            The template is completely free and needs no signup. Everything is
            filled in on your device — start typing above and download when
            you&apos;re done. Prefer to start from the main tool? Open the{" "}
            <a href="/invoice-generator">invoice generator</a>.
          </p>
        </Prose>
      </section>

      <RelatedTools currentHref={HREF} />
      <Footer />
    </main>
  );
}
