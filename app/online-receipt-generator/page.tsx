import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import InvoiceGenerator from "@/components/InvoiceGenerator";
import RelatedTools from "@/components/RelatedTools";
import Prose from "@/components/Prose";

const HREF = "/online-receipt-generator";

export const metadata: Metadata = {
  title: "Online Receipt Generator — Free Payment Receipts | Billzora",
  description:
    "Free online receipt generator for India. Create a legitimate payment receipt for money you've received, with GST details, UPI QR and WhatsApp sharing. No login.",
  keywords: [
    "online receipt generator",
    "payment receipt generator",
    "receipt maker india",
    "gst receipt format",
  ],
  alternates: { canonical: HREF },
  openGraph: {
    title: "Free Online Receipt Generator | Billzora",
    description:
      "Create a legitimate payment receipt for money received, with GST details and UPI QR.",
    url: HREF,
    siteName: "Billzora",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Billzora Online Receipt Generator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  description:
    "Free online payment-receipt generator for India with GST details, UPI QR and WhatsApp sharing.",
};

export default function ReceiptGeneratorPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />

      <InvoiceGenerator
        heading="Online Receipt Generator"
        subheading="Issue a professional payment receipt for money you have received from a customer. Download the PDF or share it on WhatsApp. No login required."
        docLabel="RECEIPT"
      />

      <section className="mx-auto max-w-4xl px-4 pt-4 lg:px-8">
        <Prose>
          <h2>Create a payment receipt for money you&apos;ve received</h2>
          <p>
            A receipt is proof that a payment has actually been made and
            received. Use this tool to give your customer a clean, professional
            record after they pay you — for a service rendered, goods sold, or an
            advance received. Enter the amount received, what it was for, and the
            parties involved, then download the PDF or share it on WhatsApp.
          </p>

          <p>
            <strong>This tool is for genuine receipts only.</strong> It documents
            real payments you have received. Please don&apos;t use it to create
            receipts for transactions that didn&apos;t happen — a receipt is a
            legal record, and issuing a false one can amount to fraud.
          </p>

          <h2>What a good receipt includes</h2>
          <ul>
            <li>Who paid and who received the money.</li>
            <li>The amount received and what it was for.</li>
            <li>The date of payment and a unique receipt number.</li>
            <li>GST details where the underlying supply is taxable.</li>
          </ul>

          <h2>Receipt vs invoice</h2>
          <p>
            An invoice <em>requests</em> payment for a supply; a receipt{" "}
            <em>confirms</em> that payment has been received. You typically issue
            an invoice first and a receipt once the customer pays. If you need to
            bill a customer, use the{" "}
            <a href="/invoice-generator">GST invoice generator</a>; once
            they&apos;ve paid, come back here to issue the receipt.
          </p>

          <h2>Collect and confirm payments faster</h2>
          <p>
            Add your UPI ID and the receipt (and your invoices) will carry a
            scannable UPI QR code, so customers can pay in seconds and you can
            hand them a receipt just as quickly.
          </p>
        </Prose>
      </section>

      <RelatedTools currentHref={HREF} />
      <Footer />
    </main>
  );
}
