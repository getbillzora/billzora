// Data for the /billzora-vs-[competitor] comparison pages (Batch 1).
// One record per competitor; the page template renders entirely from this.
//
// Competitor facts (pricing, feature availability) change often — every page
// carries a visible "verify before relying on it" disclaimer, and the copy is
// deliberately fair (fair comparisons build trust and rank better than
// one-sided pages).

import type { ComparisonRow } from "./comparison";

export const COMPARISON_YEAR = 2026;

export interface CompareFaq {
  q: string;
  a: string;
}

export interface Competitor {
  slug: string; // e.g. "zoho-books" → /billzora-vs-zoho-books
  name: string; // "Zoho Books"
  /** Short who-it-suits line for the meta description. */
  tagline: string;
  /** One honest paragraph on who each tool suits best. */
  summary: string;
  /** Deep feature rows: Billzora vs this competitor. */
  rows: ComparisonRow[];
  whenCompetitor: string[];
  whenBillzora: string[];
  faqs: CompareFaq[];
}

// Billzora's consistent column values, reused across every table.
const BILLZORA = {
  pricing: "Flat annual (₹1,999/yr)",
  fees: "None",
  einvoice: { ok: true, label: "Included on Pro" },
  eway: { ok: true, label: "Included on Pro" },
  whatsapp: true,
  upi: true,
  free: true,
  mobile: "Responsive web",
  curve: "Minimal",
  support: "Email (priority on Pro)",
};

function rows(
  competitor: Record<keyof typeof BILLZORA, ComparisonRow["cells"][number]>
): ComparisonRow[] {
  return [
    { feature: "Pricing model", cells: [BILLZORA.pricing, competitor.pricing] },
    { feature: "Per-user / per-device fees", cells: [BILLZORA.fees, competitor.fees] },
    { feature: "E-invoicing (IRN)", cells: [BILLZORA.einvoice, competitor.einvoice] },
    { feature: "E-way bills", cells: [BILLZORA.eway, competitor.eway] },
    { feature: "WhatsApp sharing", cells: [BILLZORA.whatsapp, competitor.whatsapp] },
    { feature: "UPI payments", cells: [BILLZORA.upi, competitor.upi] },
    { feature: "Free tier", cells: [BILLZORA.free, competitor.free] },
    { feature: "Mobile app", cells: [BILLZORA.mobile, competitor.mobile] },
    { feature: "Learning curve", cells: [BILLZORA.curve, competitor.curve] },
    { feature: "Support", cells: [BILLZORA.support, competitor.support] },
  ];
}

export const COMPETITORS: Competitor[] = [
  {
    slug: "zoho-books",
    name: "Zoho Books",
    tagline: "full double-entry accounting vs simple flat-priced GST invoicing",
    summary:
      "Zoho Books is mature, full double-entry accounting software with inventory, multi-currency and a deep app ecosystem — a strong fit if you want a complete finance suite and don't mind per-user pricing and a learning curve. Billzora is for businesses that mainly need fast, GST-compliant invoicing at one flat price, with WhatsApp sharing and UPI built in and nothing to learn.",
    rows: rows({
      pricing: "Per-user tiered (from ₹899/mo + 18% GST)",
      fees: "≈₹150–180/user/mo extra",
      einvoice: true,
      eway: true,
      whatsapp: { ok: false, label: "Not native" },
      upi: true,
      free: { ok: true, label: "Limited free plan" },
      mobile: true,
      curve: "Moderate",
      support: "Email / phone / chat",
    }),
    whenCompetitor: [
      "You need full double-entry accounting, not just invoicing.",
      "You want built-in inventory, multi-currency or project billing.",
      "You already use other Zoho apps and want them integrated.",
      "You have an accountant who works inside Zoho.",
    ],
    whenBillzora: [
      "You mainly send GST invoices and want that to take seconds.",
      "You want one flat price with no per-user fees.",
      "You share invoices on WhatsApp and collect via UPI.",
      "You want zero onboarding — start without creating an account.",
    ],
    faqs: [
      {
        q: "Is Billzora cheaper than Zoho Books?",
        a: "For invoicing-first use, usually yes: Billzora is a flat ₹1,999/year with no per-user fees, while Zoho Books is priced per organisation and adds roughly ₹150–180 per extra user per month. Zoho's free plan may suit very small businesses, but costs rise as you add users and features.",
      },
      {
        q: "Can Billzora replace Zoho Books entirely?",
        a: "Only if your needs are invoicing and GST-focused. Zoho Books does full accounting — ledgers, reconciliation, inventory, multi-currency — which Billzora does not (and does not aim to in this phase). Many small businesses need only invoicing, and that is where Billzora is simpler and cheaper.",
      },
      {
        q: "Does Billzora support GST e-invoicing like Zoho Books?",
        a: "E-invoicing (IRN) is included on Billzora's Pro plan. Zoho Books also supports e-invoicing. If e-invoicing is mandatory for your turnover, both cover it; verify current thresholds and your plan before relying on it.",
      },
      {
        q: "Which is easier to learn?",
        a: "Billzora — it does one thing, so there is effectively nothing to set up. Zoho Books is more powerful and correspondingly takes longer to configure and learn.",
      },
    ],
  },

  {
    slug: "vyapar",
    name: "Vyapar",
    tagline: "offline desktop billing with inventory vs cloud flat-priced invoicing",
    summary:
      "Vyapar is popular offline-first billing and inventory software with strong Android and desktop apps — a good fit if you work without reliable internet and want built-in stock management. Billzora is fully cloud-based: nothing to install, works on any device without per-device licences, and focuses on quick GST invoicing with WhatsApp and UPI.",
    rows: rows({
      pricing: "Per-device annual (≈₹3,599–5,699/yr)",
      fees: "Per-device licence",
      einvoice: { ok: false, label: "Limited / add-on" },
      eway: true,
      whatsapp: true,
      upi: true,
      free: { ok: true, label: "Free mobile app (limited)" },
      mobile: true,
      curve: "Easy",
      support: "Email / phone",
    }),
    whenCompetitor: [
      "You often work offline and need billing without internet.",
      "You want built-in inventory and stock tracking.",
      "You prefer a desktop/Android app over a browser tool.",
      "You want barcode and batch features for a shop.",
    ],
    whenBillzora: [
      "You want to invoice from any device without per-device licences.",
      "You'd rather not install or update desktop software.",
      "WhatsApp sharing and UPI collection matter to you.",
      "You want to start free with unlimited invoices in the browser.",
    ],
    faqs: [
      {
        q: "Does Billzora work offline like Vyapar?",
        a: "No — Billzora is a cloud/browser tool, so it needs an internet connection. Vyapar's strength is offline desktop and mobile billing. If offline use is essential, Vyapar fits better; if you always have internet, Billzora avoids installs and per-device licences.",
      },
      {
        q: "Is Vyapar's per-device pricing more expensive?",
        a: "It can be: Vyapar is generally licensed per device, so costs multiply across computers or phones. Billzora is one flat annual price you can use on any device. Compare against how many devices you actually need; pricing changes, so verify current rates.",
      },
      {
        q: "Does Billzora have inventory management like Vyapar?",
        a: "Not in this phase. Vyapar includes stock, low-stock alerts and barcode features. Billzora focuses on GST invoicing, UPI and WhatsApp. If inventory is core to your business, Vyapar is the better fit today.",
      },
      {
        q: "Can I share invoices on WhatsApp with both?",
        a: "Yes — both support WhatsApp sharing. Billzora also generates a UPI QR on the invoice so customers can pay by scanning.",
      },
    ],
  },

  {
    slug: "mybillbook",
    name: "myBillBook",
    tagline: "tier-gated billing with staff & inventory vs flat-priced invoicing",
    summary:
      "myBillBook is a well-known Indian billing app with inventory, staff management and regional-language support, sold in tiered plans. It suits shops and small teams that want those extras. Billzora keeps things flat and simple: unlimited invoices, e-invoicing and e-way bills on one Pro plan, without gating core compliance behind higher tiers.",
    rows: rows({
      pricing: "Tier-gated annual (≈₹3,490/yr and up)",
      fees: "Higher tiers for more users",
      einvoice: { ok: false, label: "Higher tier only" },
      eway: true,
      whatsapp: true,
      upi: true,
      free: { ok: true, label: "Limited free plan" },
      mobile: true,
      curve: "Easy",
      support: "Email / phone",
    }),
    whenCompetitor: [
      "You need staff accounts and role management.",
      "You want built-in inventory for a retail shop.",
      "You prefer strong regional-language support.",
      "You want an established Android-first billing app.",
    ],
    whenBillzora: [
      "You don't want e-invoicing gated behind the top tier.",
      "You want the simplest possible invoice flow.",
      "You want flat, predictable annual pricing.",
      "You want to start free with unlimited invoices.",
    ],
    faqs: [
      {
        q: "Is e-invoicing included in Billzora or only higher plans?",
        a: "E-invoicing (IRN) is on Billzora's single Pro plan — you don't have to climb to an enterprise tier for it. On some competitors, including myBillBook, e-invoicing and certain compliance features sit on higher tiers. Always verify current plan inclusions before relying on them.",
      },
      {
        q: "Does Billzora manage inventory like myBillBook?",
        a: "No. myBillBook includes inventory and staff management; Billzora focuses on GST invoicing, e-way bills, UPI and WhatsApp. Choose myBillBook if stock and staff features are central to you.",
      },
      {
        q: "Which is better for a small shop?",
        a: "If you need billing plus inventory and multiple staff logins, myBillBook is built for that. If you mainly issue GST invoices and want it fast and flat-priced, Billzora is simpler.",
      },
    ],
  },

  {
    slug: "tally",
    name: "Tally",
    tagline: "on-premise accounting standard vs no-download cloud invoicing",
    summary:
      "Tally (TallyPrime / ERP 9) is the long-standing on-premise accounting standard in India — deep statutory, inventory and accounting features that CAs know well, sold as a one-time licence. It's the right tool for complex books. Billzora is the opposite end: nothing to download, instant GST invoices in the browser, WhatsApp and UPI, and free to start.",
    rows: rows({
      pricing: "One-time licence (≈₹18,000) + AMC, or rental",
      fees: "Multi-user edition costs more",
      einvoice: true,
      eway: true,
      whatsapp: { ok: false, label: "Via add-ons" },
      upi: { ok: false, label: "Not native" },
      free: { ok: false, label: "Educational only" },
      mobile: { ok: false, label: "Limited / third-party" },
      curve: "Steep",
      support: "Via partners",
    }),
    whenCompetitor: [
      "You keep complex, full accounting books, not just invoices.",
      "Your CA works in Tally and wants your data there.",
      "You need deep statutory reports and inventory accounting.",
      "You prefer on-premise software with a one-time licence.",
    ],
    whenBillzora: [
      "You want to raise a GST invoice without installing anything.",
      "You want WhatsApp sharing and UPI collection out of the box.",
      "You don't want a steep learning curve or partner setup.",
      "You want to start free and pay a small flat fee later.",
    ],
    faqs: [
      {
        q: "Is Billzora a full Tally replacement?",
        a: "No. Tally is complete accounting software with ledgers, inventory accounting and deep statutory features. Billzora handles GST invoicing (and e-invoicing/e-way bills on Pro), not full books. Many small businesses use a simple invoicing tool and leave full accounting to their CA — that's Billzora's niche.",
      },
      {
        q: "Do I need to download anything to use Billzora?",
        a: "No — Billzora runs in your browser on any device. Tally is installed on a computer. If you want zero setup and access from anywhere, Billzora is simpler; if you need on-premise accounting depth, Tally fits.",
      },
      {
        q: "Is Billzora cheaper than Tally?",
        a: "Tally is a one-time licence (around ₹18,000 for a single-user edition) plus optional AMC; Billzora is free to start and ₹1,999/year for Pro. Total cost depends on your needs — verify current Tally pricing before deciding.",
      },
      {
        q: "Can Billzora do GST e-invoicing like TallyPrime?",
        a: "Yes, on the Pro plan. Both support IRN generation. Confirm current e-invoicing thresholds for your turnover and that your plan covers it.",
      },
    ],
  },

  {
    slug: "swipe",
    name: "Swipe",
    tagline: "two modern free-first GST invoicing tools compared",
    summary:
      "Swipe is a modern, free-first billing platform with invoicing, payments and a broad feature set — a capable, more mature option if you want more integrations and tooling today. Billzora is deliberately narrower: dead-simple GST invoicing at one transparent flat price, with WhatsApp and UPI, and no upsell pressure. If you value simplicity and predictable pricing, Billzora; if you want a broader platform now, Swipe.",
    rows: rows({
      pricing: "Freemium + paid plans",
      fees: "Plan-based",
      einvoice: true,
      eway: true,
      whatsapp: true,
      upi: true,
      free: true,
      mobile: true,
      curve: "Easy",
      support: "Email / chat",
    }),
    whenCompetitor: [
      "You want a broader, more mature platform right now.",
      "You need more integrations and payment tooling today.",
      "You want a native mobile app as well as web.",
      "You're comfortable with a larger feature surface.",
    ],
    whenBillzora: [
      "You want the simplest possible GST invoice flow.",
      "You prefer one flat, transparent price with no upsell.",
      "You don't need extra features you won't use.",
      "You want to start instantly with no account.",
    ],
    faqs: [
      {
        q: "Billzora and Swipe both look similar — what's the real difference?",
        a: "Both are modern, free-to-start GST invoicing tools with WhatsApp and UPI. Swipe is a broader, more established platform with more features and integrations. Billzora is intentionally focused on simple invoicing at a flat price, so there's less to learn and pricing is predictable.",
      },
      {
        q: "Are both free to start?",
        a: "Yes. Both offer a free tier; Billzora's free plan includes unlimited invoices, UPI collection and WhatsApp sharing, with e-invoicing and e-way bills on the paid Pro plan.",
      },
      {
        q: "Which should a freelancer choose?",
        a: "If you want the fastest path to a clean GST invoice with nothing extra to configure, Billzora. If you expect to grow into a wider set of billing and payment features, Swipe is worth a look.",
      },
    ],
  },
];

export function getCompetitor(slug: string): Competitor | undefined {
  return COMPETITORS.find((c) => c.slug === slug);
}
