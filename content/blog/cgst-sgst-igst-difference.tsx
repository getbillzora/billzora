import Link from "next/link";
import GstFlowDiagram from "@/components/GstFlowDiagram";
import type { PostMeta } from "@/lib/blog";

export const meta: PostMeta = {
  slug: "cgst-sgst-igst-difference",
  title: "CGST vs SGST vs IGST: Which Applies to Your Invoice",
  description:
    "Understand the difference between CGST, SGST and IGST with a simple diagram — when to split GST for intra-state supplies and when to charge IGST across states.",
  keyword: "cgst sgst igst difference",
  published: "2026-07-16",
  updated: "2026-07-22",
  readingMinutes: 5,
};

export default function Body() {
  return (
    <>
      <p>
        GST is a single tax, but it&apos;s collected under three heads — CGST,
        SGST and IGST. Which one you charge doesn&apos;t change how much tax
        applies; it changes <em>who</em> collects it and <em>how</em> it&apos;s
        recorded. Pick the wrong head on an invoice and you&apos;ll be fixing it
        later, so let&apos;s make it simple.
      </p>

      <h2>The three heads</h2>
      <ul>
        <li>
          <strong>CGST</strong> — Central GST, collected by the central
          government.
        </li>
        <li>
          <strong>SGST</strong> — State GST, collected by the state government
          where the supply happens.
        </li>
        <li>
          <strong>IGST</strong> — Integrated GST, collected by the centre on
          inter-state supplies and then apportioned with the destination state.
        </li>
      </ul>

      <h2>The one rule that decides it: place of supply</h2>
      <p>
        Compare the <strong>supplier&apos;s state</strong> with the{" "}
        <strong>place of supply</strong> (usually the customer&apos;s state):
      </p>
      <ul>
        <li>
          <strong>Same state</strong> → it&apos;s an intra-state supply. Split the
          GST equally into CGST and SGST. An 18% supply becomes 9% CGST + 9% SGST.
        </li>
        <li>
          <strong>Different states</strong> → it&apos;s an inter-state supply.
          Charge the whole rate as IGST — the full 18%.
        </li>
      </ul>

      <GstFlowDiagram />

      <h2>A worked example</h2>
      <p>
        You&apos;re in Karnataka and sell services worth ₹1,000 at 18%:
      </p>
      <ul>
        <li>
          <strong>Customer in Karnataka:</strong> ₹90 CGST + ₹90 SGST = ₹180 tax,
          total ₹1,180.
        </li>
        <li>
          <strong>Customer in Maharashtra:</strong> ₹180 IGST, total ₹1,180.
        </li>
      </ul>
      <p>
        Same ₹180 of tax either way — only the split differs. You can check any
        amount with the <Link href="/gst-calculator">GST calculator</Link>.
      </p>

      <h2>Why it matters</h2>
      <p>
        The heads flow into your returns and your customer&apos;s input tax
        credit. Charge CGST/SGST on what was really an inter-state supply (or vice
        versa) and the credit can be mismatched, leading to notices and rework.
        It&apos;s a small detail with outsized consequences.
      </p>

      <h2>Special cases to watch</h2>
      <ul>
        <li>
          <strong>Place of supply for services</strong> isn&apos;t always the
          customer&apos;s billing address — specific rules apply (e.g. for
          immovable property or events).
        </li>
        <li>
          <strong>Union territories</strong> use UTGST in place of SGST.
        </li>
        <li>
          <strong>Exports</strong> are treated as inter-state and are typically
          zero-rated.
        </li>
      </ul>

      <h2>Let the tool handle it</h2>
      <p>
        You don&apos;t have to decide the head on every line manually. The{" "}
        <Link href="/invoice-generator">Billzora invoice generator</Link> compares
        the two states and applies CGST + SGST or IGST automatically, so your
        invoices come out right the first time. New to invoicing? Start with{" "}
        <Link href="/blog/how-to-create-gst-invoice">
          how to create a GST-compliant invoice
        </Link>
        .
      </p>
    </>
  );
}
