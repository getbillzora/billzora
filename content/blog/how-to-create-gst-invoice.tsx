import Link from "next/link";
import type { PostMeta } from "@/lib/blog";

export const meta: PostMeta = {
  slug: "how-to-create-gst-invoice",
  title: "How to Create a GST-Compliant Invoice (Step by Step)",
  description:
    "A step-by-step guide to creating a GST-compliant tax invoice in India — the mandatory fields, how CGST/SGST/IGST work, and how to issue one for free in minutes.",
  keyword: "how to create a gst invoice",
  published: "2026-06-18",
  updated: "2026-07-22",
  readingMinutes: 6,
};

export default function Body() {
  return (
    <>
      <p>
        A GST invoice is more than a bill — it&apos;s the legal document your
        customer uses to claim input tax credit, and the record you rely on at
        return time. Get a field wrong and the invoice can be challenged. The
        good news: the rules are clear, and once you know them, issuing a correct
        invoice takes a couple of minutes. Here&apos;s exactly how to do it.
      </p>

      <h2>1. Start with the right document title</h2>
      <p>
        A taxable supply needs a document clearly titled{" "}
        <strong>&ldquo;Tax Invoice&rdquo;</strong>. If you&apos;re registered
        under the composition scheme, or supplying exempt goods, you issue a{" "}
        <em>Bill of Supply</em> instead, because you can&apos;t charge GST. For a
        quote before the sale, use a{" "}
        <Link href="/proforma-invoice-generator">proforma invoice</Link> — it is
        not a tax invoice and carries no tax liability.
      </p>

      <h2>2. Add supplier and recipient details</h2>
      <p>
        Every tax invoice must carry your business name, address and{" "}
        <strong>GSTIN</strong>, plus the customer&apos;s name and address. If the
        customer is registered, include their GSTIN too. For an unregistered
        customer where the invoice value crosses ₹50,000, you also record their
        name, address and the state.
      </p>

      <h2>3. Give it a unique number and date</h2>
      <p>
        Each invoice needs a consecutive serial number (unique for the financial
        year, up to 16 characters, letters, numbers, / and - allowed) and the
        date of issue. Don&apos;t skip or reuse numbers — the sequence is part of
        what makes your records auditable.
      </p>

      <h2>4. Describe what you&apos;re supplying</h2>
      <p>
        List each item or service with a clear description, the quantity and unit
        where relevant, and the taxable value. Goods and services also need the
        appropriate <strong>HSN or SAC code</strong>; how many digits you must
        show depends on your turnover. Getting descriptions right avoids disputes
        and makes returns easier.
      </p>

      <h2>5. Apply the correct GST — CGST/SGST or IGST</h2>
      <p>
        This is where most mistakes happen. The tax depends on the{" "}
        <strong>place of supply</strong>:
      </p>
      <ul>
        <li>
          <strong>Same state</strong> (intra-state): split the GST into CGST and
          SGST, half each. 18% becomes 9% CGST + 9% SGST.
        </li>
        <li>
          <strong>Different states</strong> (inter-state): charge the full rate
          as IGST.
        </li>
      </ul>
      <p>
        If you&apos;re unsure which applies, our{" "}
        <Link href="/blog/cgst-sgst-igst-difference">
          CGST vs SGST vs IGST guide
        </Link>{" "}
        walks through it, and the{" "}
        <Link href="/gst-calculator">GST calculator</Link> does the split for
        you.
      </p>

      <h2>6. Show the totals and amount in words</h2>
      <p>
        Show the taxable value, the tax amount broken up by head (CGST/SGST or
        IGST), any round-off, and the final total. It&apos;s standard practice —
        and expected — to also state the total in words, e.g.{" "}
        &ldquo;Rupees One Thousand One Hundred Eighty Only&rdquo;.
      </p>

      <h2>7. Sign and share it</h2>
      <p>
        The invoice should carry the signature or digital signature of the
        supplier or an authorised person. Then send it — as a PDF, or share it on
        WhatsApp. Adding your UPI ID lets you print a payment QR right on the
        invoice so the customer can pay in seconds.
      </p>

      <h2>Do e-invoicing rules apply to you?</h2>
      <p>
        Above a turnover threshold, you must also generate an{" "}
        <strong>Invoice Reference Number (IRN)</strong> and signed QR through the
        e-invoicing system. See{" "}
        <Link href="/blog/what-is-e-invoicing">what e-invoicing is and who needs it</Link>{" "}
        to check whether it applies to your business.
      </p>

      <h2>The fastest way to do all of this</h2>
      <p>
        You don&apos;t have to remember every field. The free{" "}
        <Link href="/invoice-generator">Billzora invoice generator</Link> lays
        them out for you, validates your GSTIN, applies the correct CGST/SGST or
        IGST from the place of supply, writes the amount in words, and lets you
        download the PDF or share on WhatsApp — no login required.
      </p>
    </>
  );
}
