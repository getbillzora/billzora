import Link from "next/link";
import type { PostMeta } from "@/lib/blog";

export const meta: PostMeta = {
  slug: "e-way-bill-guide",
  title: "E-Way Bill: When You Need One and How to Generate It",
  description:
    "A practical guide to e-way bills in India — what they are, the ₹50,000 threshold, when they're required, how to generate one, and how long they stay valid.",
  keyword: "e-way bill",
  published: "2026-07-09",
  updated: "2026-07-22",
  readingMinutes: 6,
};

export default function Body() {
  return (
    <>
      <p>
        An e-way bill is an electronic document you generate before moving goods
        above a certain value. It links the consignment to your invoice and lets
        the tax authorities track movement. Move goods without one when it&apos;s
        required, and both the goods and the vehicle can be detained — so
        it&apos;s worth understanding the basics.
      </p>

      <h2>When do you need an e-way bill?</h2>
      <p>
        The general rule: an e-way bill is required for the movement of goods
        whose consignment value exceeds <strong>₹50,000</strong>, whether the
        movement is for a sale, a transfer, or even a return. This covers movement
        both between states and, in most cases, within a state (some states set
        their own intra-state thresholds, so check locally).
      </p>
      <p>Common triggers include:</p>
      <ul>
        <li>Supplying goods to a customer above the threshold.</li>
        <li>Branch or stock transfers between your own locations.</li>
        <li>Sending goods to a job worker, or receiving them back.</li>
        <li>Sales returns and replacements.</li>
      </ul>

      <h2>When you don&apos;t need one</h2>
      <ul>
        <li>Consignments at or below ₹50,000 (subject to state rules).</li>
        <li>
          Certain exempt goods, and specified non-motorised transport.
        </li>
        <li>
          Some short-distance movements and notified categories — the list of
          exemptions is specific, so verify for your case.
        </li>
      </ul>

      <h2>How to generate an e-way bill</h2>
      <ol>
        <li>
          Log in to the official e-way bill portal (or use software / GSP
          integration).
        </li>
        <li>
          Choose &ldquo;Generate New&rdquo; and enter Part A: GSTINs, the invoice
          number and date, HSN codes, taxable value and place of supply.
        </li>
        <li>
          Enter Part B: the transporter ID or the vehicle number for the
          movement.
        </li>
        <li>
          Submit to receive a unique <strong>e-way bill number (EBN)</strong>,
          which travels with the consignment.
        </li>
      </ol>
      <p>
        Because Part A mirrors your invoice, clean invoice data saves you
        re-keying. If you already raised the invoice in the{" "}
        <Link href="/invoice-generator">invoice generator</Link>, you have most of
        Part A ready to go.
      </p>

      <h2>How long is it valid?</h2>
      <p>
        Validity is distance-based — broadly one day per a set block of
        kilometres, with more time for longer hauls and special rules for
        over-dimensional cargo. If goods can&apos;t be delivered in time (a
        breakdown, say), the bill can be updated or extended within the allowed
        window.
      </p>

      <h2>Tips to stay out of trouble</h2>
      <ul>
        <li>Generate the e-way bill <em>before</em> the movement starts.</li>
        <li>Keep the invoice and e-way bill numbers consistent.</li>
        <li>Update Part B if the vehicle changes mid-transit.</li>
        <li>Cancel within the allowed window if a shipment falls through.</li>
      </ul>

      <p>
        E-way bill support is part of Billzora&apos;s Pro plan, and it draws on
        the same invoice data you already enter. For the invoice side of the
        equation, see{" "}
        <Link href="/blog/how-to-create-gst-invoice">
          how to create a GST-compliant invoice
        </Link>
        . Rules and thresholds change, so confirm the current position on the
        official portal before you ship.
      </p>
    </>
  );
}
