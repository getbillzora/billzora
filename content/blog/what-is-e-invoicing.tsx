import Link from "next/link";
import type { PostMeta } from "@/lib/blog";

export const meta: PostMeta = {
  slug: "what-is-e-invoicing",
  title: "What Is E-Invoicing and Who Needs It?",
  description:
    "E-invoicing explained for Indian businesses: what IRN and the signed QR are, how the system works, current turnover thresholds and who has to comply.",
  keyword: "what is e-invoicing",
  published: "2026-06-25",
  updated: "2026-07-22",
  readingMinutes: 6,
};

export default function Body() {
  return (
    <>
      <p>
        &ldquo;E-invoicing&rdquo; is one of the most misunderstood terms in GST.
        It does <em>not</em> mean emailing a PDF. It means reporting your invoice
        to the government&apos;s Invoice Registration Portal (IRP) in a standard
        format, which returns a unique{" "}
        <strong>Invoice Reference Number (IRN)</strong> and a digitally signed QR
        code. Only then is the invoice valid for the businesses that fall under
        the rules.
      </p>

      <h2>How e-invoicing actually works</h2>
      <p>
        The flow is quick once set up:
      </p>
      <ol>
        <li>You create the invoice in your billing software as usual.</li>
        <li>
          The invoice data is sent to the IRP in the prescribed JSON schema.
        </li>
        <li>
          The IRP validates it, generates a unique IRN, digitally signs it, and
          returns a signed QR code.
        </li>
        <li>
          You print the IRN and QR on the invoice you give your customer.
        </li>
      </ol>
      <p>
        Because the data is reported at the point of invoicing, it also
        auto-populates parts of your GST returns and e-way bills — less
        double-entry later.
      </p>

      <h2>Who needs to do e-invoicing?</h2>
      <p>
        E-invoicing applies to <strong>B2B</strong> supplies (and exports) once a
        business&apos;s aggregate annual turnover crosses a notified threshold.
        The threshold has been lowered in stages over the years — from ₹500 crore
        down to ₹5 crore — and the direction of travel is clear: it keeps coming
        down, with a further reduction toward the ₹2 crore range widely expected.
      </p>
      <p>
        Because the threshold is based on aggregate turnover in{" "}
        <em>any</em> preceding financial year (not just the current one), a
        business that crossed it once generally stays in. Always confirm the
        current notified threshold and your own turnover before relying on this —
        the numbers move.
      </p>

      <h2>What&apos;s usually out of scope</h2>
      <ul>
        <li>
          <strong>B2C invoices</strong> are generally outside e-invoicing (though
          large businesses may still need a QR for B2C under separate rules).
        </li>
        <li>
          Certain sectors — like banks, insurers, passenger transport and cinema
          tickets — have specific exemptions.
        </li>
        <li>Businesses below the threshold don&apos;t have to comply — yet.</li>
      </ul>

      <h2>Why it matters even if you&apos;re below the threshold</h2>
      <p>
        Two reasons. First, thresholds keep dropping, so today&apos;s exemption
        can become tomorrow&apos;s obligation. Second, an invoice that{" "}
        <em>should</em> have an IRN but doesn&apos;t is treated as not a valid
        tax invoice — which can put your customer&apos;s input tax credit at
        risk. It pays to use software that can generate IRNs when you need them.
      </p>

      <h2>Getting ready</h2>
      <p>
        Make sure your invoices already capture clean, complete data — correct
        GSTINs, HSN/SAC codes and place of supply — because the IRP validates all
        of it. If your fundamentals are right, switching e-invoicing on is
        straightforward. The{" "}
        <Link href="/invoice-generator">Billzora invoice generator</Link> keeps
        those fundamentals correct today, and e-invoicing (IRN) is included on
        the Pro plan for when you cross the line. For the mechanics of a valid
        invoice, see{" "}
        <Link href="/blog/how-to-create-gst-invoice">
          how to create a GST-compliant invoice
        </Link>
        .
      </p>
    </>
  );
}
