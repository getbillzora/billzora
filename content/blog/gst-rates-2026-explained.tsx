import Link from "next/link";
import type { PostMeta } from "@/lib/blog";

export const meta: PostMeta = {
  slug: "gst-rates-2026-explained",
  title: "GST Rates in 2026 Explained (After GST 2.0)",
  description:
    "A plain-English guide to India's GST slabs in 2026 after GST 2.0 — the 0%, 5%, 18% and 40% rates, how to find your rate, and how to apply it correctly.",
  keyword: "gst rates 2026",
  published: "2026-07-02",
  updated: "2026-07-22",
  readingMinutes: 5,
};

export default function Body() {
  return (
    <>
      <p>
        GST 2.0 simplified India&apos;s rate structure. Instead of juggling
        several middle slabs, most goods and services now fall into a cleaner set
        of rates. If you invoice customers, you need to know which one applies —
        charge too little and you carry the shortfall; too much and you overcharge
        your customer. Here&apos;s the 2026 picture in plain terms.
      </p>

      <h2>The 2026 GST slabs</h2>
      <ul>
        <li>
          <strong>0% (exempt / nil-rated)</strong> — essential items such as many
          unbranded food staples, and certain services. No GST is charged, and you
          issue a bill of supply rather than a tax invoice for purely exempt
          supplies.
        </li>
        <li>
          <strong>5%</strong> — the &ldquo;merit&rdquo; rate for mass-consumption
          goods and several services.
        </li>
        <li>
          <strong>18%</strong> — the standard rate that applies to the large
          majority of goods and services.
        </li>
        <li>
          <strong>40%</strong> — the &ldquo;demerit / luxury&rdquo; rate for a
          small set of items such as tobacco, aerated drinks and other sin or
          luxury goods.
        </li>
      </ul>

      <h2>How the tax splits: CGST, SGST, IGST</h2>
      <p>
        The slab is only half the story. Whatever the rate, how it&apos;s{" "}
        <em>collected</em> depends on where the supply goes. Within the same
        state, an 18% supply is split into 9% CGST + 9% SGST. Across states, the
        full 18% is charged as IGST. Our{" "}
        <Link href="/blog/cgst-sgst-igst-difference">
          CGST vs SGST vs IGST guide
        </Link>{" "}
        explains why, and the{" "}
        <Link href="/gst-calculator">GST calculator</Link> shows the breakup
        instantly.
      </p>

      <h2>How to find the right rate for your product</h2>
      <p>
        Rates are tied to <strong>HSN codes</strong> (for goods) and{" "}
        <strong>SAC codes</strong> (for services). To get it right:
      </p>
      <ol>
        <li>Identify the correct HSN/SAC code for what you sell.</li>
        <li>
          Look up the notified rate for that code on the official GST rate
          finder.
        </li>
        <li>
          Apply it consistently across invoices — and re-check periodically, as
          rates are revised in council meetings.
        </li>
      </ol>

      <h2>Inclusive vs exclusive pricing</h2>
      <p>
        Decide whether your listed price <em>includes</em> GST or not, and say so
        on the invoice. If a ₹1,000 price is GST-exclusive at 18%, you add ₹180
        and bill ₹1,180. If ₹1,180 is GST-inclusive, it already contains ₹180 of
        tax on a ₹1,000 base. The{" "}
        <Link href="/gst-calculator">GST calculator</Link> handles both directions.
      </p>

      <h2>A note on accuracy</h2>
      <p>
        GST rates and slab boundaries change through council decisions, and a few
        categories carry conditions or a compensation cess on top. Treat this
        guide as an overview, confirm the current rate for your specific HSN/SAC
        before you bill, and when in doubt, ask your accountant. To turn the right
        rate into a compliant bill, use the{" "}
        <Link href="/invoice-generator">invoice generator</Link>, which supports
        the 0/5/18/40% slabs out of the box.
      </p>
    </>
  );
}
