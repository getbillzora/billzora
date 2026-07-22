import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GstCalculatorTool from "@/components/GstCalculatorTool";
import RelatedTools from "@/components/RelatedTools";
import Prose from "@/components/Prose";

const HREF = "/gst-calculator";

export const metadata: Metadata = {
  title: "GST Calculator — CGST, SGST & IGST (Inclusive/Exclusive) | Billzora",
  description:
    "Free GST calculator for India. Work out CGST, SGST and IGST for the 0/5/18/40% slabs, with GST-inclusive and exclusive amounts. Instant, no login.",
  keywords: [
    "gst calculator",
    "cgst sgst calculator",
    "igst calculator",
    "gst inclusive exclusive calculator",
  ],
  alternates: { canonical: HREF },
  openGraph: {
    title: "Free GST Calculator | Billzora",
    description:
      "Work out CGST, SGST and IGST with GST-inclusive and exclusive amounts. Instant, no login.",
    url: HREF,
    siteName: "Billzora",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to calculate GST (CGST, SGST, IGST)",
  description:
    "Calculate CGST, SGST and IGST on an amount using the correct GST slab, for both GST-inclusive and exclusive prices.",
  step: [
    {
      "@type": "HowToStep",
      name: "Enter the amount",
      text: "Enter the amount and choose whether it already includes GST or not.",
    },
    {
      "@type": "HowToStep",
      name: "Pick the GST rate",
      text: "Select the applicable GST slab (0%, 5%, 18% or 40%).",
    },
    {
      "@type": "HowToStep",
      name: "Choose the supply type",
      text: "Intra-state supply splits GST into CGST and SGST; inter-state supply applies IGST.",
    },
    {
      "@type": "HowToStep",
      name: "Read the result",
      text: "See the base amount, tax breakup and total instantly.",
    },
  ],
};

export default function GstCalculatorPage() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />

      <div className="mx-auto max-w-4xl px-4 py-10 lg:px-8">
        <h1 className="text-3xl font-bold text-teal-800 sm:text-4xl">
          GST Calculator
        </h1>
        <p className="mt-2 text-gray-600">
          Work out CGST, SGST and IGST for any amount — GST-inclusive or
          exclusive — across the 0%, 5%, 18% and 40% slabs.
        </p>
        <div className="mt-8">
          <GstCalculatorTool />
        </div>
      </div>

      <section className="mx-auto max-w-4xl px-4 pb-4 lg:px-8">
        <Prose>
          <h2>How GST is calculated</h2>
          <p>
            GST is charged as a percentage of the taxable value of goods or
            services. If a price is <strong>GST-exclusive</strong>, the tax is
            added on top: for a ₹1,000 item at 18%, GST is ₹180 and the total is
            ₹1,180. If a price is <strong>GST-inclusive</strong>, the tax is
            already inside the number, so you work backwards: a ₹1,180
            GST-inclusive amount at 18% contains ₹180 of GST on a ₹1,000 base.
          </p>

          <h2>CGST, SGST and IGST</h2>
          <p>
            For a supply within the same state (intra-state), GST is split
            equally into <strong>CGST</strong> (central) and{" "}
            <strong>SGST</strong> (state) — so 18% becomes 9% + 9%. For a supply
            between different states (inter-state), the whole amount is charged
            as <strong>IGST</strong>. This calculator handles both; pick the
            supply type to see the right breakup.
          </p>

          <h2>GST 2.0 slabs</h2>
          <p>
            This calculator supports the current 0%, 5%, 18% and 40% slabs. Not
            sure which rate applies to your product or service? Check the
            official GST rate finder, then come back to work out the numbers.
          </p>

          <h2>Turn the numbers into an invoice</h2>
          <p>
            Once you know the tax, raise a compliant bill with the{" "}
            <a href="/invoice-generator">GST invoice generator</a> — it applies
            the same CGST/SGST/IGST logic automatically across all your line
            items.
          </p>
        </Prose>
      </section>

      <RelatedTools currentHref={HREF} />
      <Footer />
    </main>
  );
}
