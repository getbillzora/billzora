import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import InvoiceGenerator from "@/components/InvoiceGenerator";
import RelatedTools from "@/components/RelatedTools";
import Prose from "@/components/Prose";

const HREF = "/quotation-maker";

export const metadata: Metadata = {
  title: "Quotation Maker — Free Quote & Estimate Generator | Billzora",
  description:
    "Free quotation maker for India. Create professional quotes and estimates with GST, then convert them to invoices. Download the PDF or share on WhatsApp. No login.",
  keywords: [
    "quotation maker",
    "quotation format",
    "estimate generator",
    "quotation generator india",
  ],
  alternates: { canonical: HREF },
  openGraph: {
    title: "Free Quotation Maker | Billzora",
    description:
      "Create professional quotes and estimates with GST. Download the PDF or share on WhatsApp.",
    url: HREF,
    siteName: "Billzora",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Billzora Quotation Maker",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  description:
    "Free quotation and estimate generator for India with GST, PDF download and WhatsApp sharing.",
};

export default function QuotationMakerPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />

      <InvoiceGenerator
        heading="Quotation Maker"
        subheading="Create a professional quotation or estimate with GST worked out for you. Send it to win the work, then convert it to an invoice once approved. No login required."
        docLabel="QUOTATION"
      />

      <section className="mx-auto max-w-4xl px-4 pt-4 lg:px-8">
        <Prose>
          <h2>What is a quotation?</h2>
          <p>
            A quotation (or estimate) tells a prospective customer what a job
            will cost before they commit. It lists the items or services, the
            unit prices, applicable GST and the total, usually with a validity
            period. A clear, professional quote helps you win work and sets
            expectations so there are no surprises when you invoice.
          </p>

          <h2>How to make a quotation</h2>
          <ol>
            <li>Add your business details and the customer&apos;s details.</li>
            <li>
              List each line item with quantity, rate and GST rate — totals and
              tax are calculated live.
            </li>
            <li>Download the PDF or share the quote on WhatsApp.</li>
          </ol>

          <h2>From quote to invoice</h2>
          <p>
            When the customer approves your quotation, you don&apos;t start over:
            the same details become a GST tax invoice. Head to the{" "}
            <a href="/invoice-generator">invoice generator</a> to bill for the
            approved work, or send a{" "}
            <a href="/proforma-invoice-generator">proforma invoice</a> if you
            need an advance first.
          </p>

          <h2>Tips for quotes that convert</h2>
          <ul>
            <li>Be specific about what is and isn&apos;t included.</li>
            <li>Add a validity date so pricing isn&apos;t open-ended.</li>
            <li>Include your payment terms and UPI details up front.</li>
            <li>Send it quickly — speed often wins the deal.</li>
          </ul>
        </Prose>
      </section>

      <RelatedTools currentHref={HREF} />
      <Footer />
    </main>
  );
}
