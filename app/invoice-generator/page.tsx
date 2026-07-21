import type { Metadata } from "next";
import InvoiceGenerator from "@/components/InvoiceGenerator";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free Invoice Generator — GST Invoices in Seconds | Billzora",
  description:
    "Free online invoice generator for India. Create GST-compliant invoices with automatic CGST, SGST & IGST, UPI QR and WhatsApp sharing. No login, no signup.",
  keywords: [
    "invoice generator",
    "gst invoice generator",
    "free invoice generator india",
    "online invoice maker",
    "gst invoice",
  ],
  alternates: { canonical: "/invoice-generator" },
  openGraph: {
    title: "Free GST Invoice Generator | Billzora",
    description:
      "Create GST-compliant invoices in seconds. Automatic CGST/SGST/IGST, UPI QR, WhatsApp sharing. No login required.",
    url: "/invoice-generator",
    siteName: "Billzora",
    type: "website",
  },
};

// JSON-LD so the free tool can win a rich result for "invoice generator".
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Billzora Invoice Generator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  description:
    "Free GST invoice generator for India with automatic CGST/SGST/IGST calculation, UPI QR and WhatsApp sharing.",
};

export default function InvoiceGeneratorPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Nav />
      <InvoiceGenerator />
      <Footer />
    </main>
  );
}
