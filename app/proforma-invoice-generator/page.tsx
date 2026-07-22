import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import InvoiceGenerator from "@/components/InvoiceGenerator";
import RelatedTools from "@/components/RelatedTools";
import Prose from "@/components/Prose";

const HREF = "/proforma-invoice-generator";

export const metadata: Metadata = {
  title: "Proforma Invoice Generator — Free, GST-Ready | Billzora",
  description:
    "Free proforma invoice generator for India. Create and download a proforma invoice with GST estimates, UPI QR and WhatsApp sharing. No login required.",
  keywords: [
    "proforma invoice generator",
    "proforma invoice format",
    "proforma invoice in tally alternative",
    "proforma invoice india",
  ],
  alternates: { canonical: HREF },
  openGraph: {
    title: "Free Proforma Invoice Generator | Billzora",
    description:
      "Create a proforma invoice with GST estimates, UPI QR and WhatsApp sharing. No login.",
    url: HREF,
    siteName: "Billzora",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Billzora Proforma Invoice Generator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  description:
    "Free proforma invoice generator for India with GST estimates, UPI QR and WhatsApp sharing.",
};

export default function ProformaInvoicePage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />

      <InvoiceGenerator
        heading="Proforma Invoice Generator"
        subheading="Create a proforma invoice to send before the sale is confirmed — with GST estimated automatically. Download the PDF or share on WhatsApp. No login required."
        docLabel="PROFORMA INVOICE"
      />

      <section className="mx-auto max-w-4xl px-4 pt-4 lg:px-8">
        <Prose>
          <h2>What is a proforma invoice?</h2>
          <p>
            A proforma invoice is a preliminary bill of sale sent to a buyer{" "}
            <strong>before</strong> goods or services are delivered. It sets out
            what you intend to supply, the quantities, the price and the
            estimated GST, so the buyer can approve the order, arrange payment or
            raise a purchase order. It is not a demand for payment and it is not
            a tax invoice — no input tax credit can be claimed against a proforma
            invoice.
          </p>

          <h2>When do you need one?</h2>
          <p>
            Use a proforma invoice when a customer asks for a formal quote they
            can process internally, when you need an advance or deposit before
            starting work, or when goods are being exported and customs need an
            estimated value. Once the sale is confirmed and delivered, you
            replace it with a proper GST tax invoice.
          </p>

          <h2>How to create a proforma invoice</h2>
          <ol>
            <li>Enter your business details and the customer&apos;s details.</li>
            <li>
              Add each item with quantity, rate and GST rate — the tool
              estimates CGST/SGST or IGST from the place of supply.
            </li>
            <li>
              Check the live preview, then download the PDF or share it on
              WhatsApp.
            </li>
          </ol>

          <h2>Proforma invoice vs tax invoice</h2>
          <p>
            The layout is nearly identical, but the intent differs: a proforma
            invoice is an estimate issued before supply and carries no tax
            liability, while a tax invoice is issued on or after supply and is
            the document your customer uses to claim input tax credit. When
            you&apos;re ready to bill for real, use the{" "}
            <a href="/invoice-generator">GST invoice generator</a> instead.
          </p>
        </Prose>
      </section>

      <RelatedTools currentHref={HREF} />
      <Footer />
    </main>
  );
}
