// Data for the homepage comparison table. Kept separate from markup so pricing
// and rows can be updated without touching the component.
// NOTE: Competitor pricing changes often — verify before publishing.

export type ComparisonCell =
  | boolean
  | string
  | { ok: boolean; label: string };

export interface ComparisonRow {
  feature: string;
  /** One cell per column, in the same order as `columns`. */
  cells: ComparisonCell[];
}

export const COMPARISON_COLUMNS = [
  "Billzora",
  "Zoho Books",
  "Vyapar",
  "myBillBook",
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: "Flat pricing",
    cells: [
      true,
      { ok: false, label: "Per-user (₹150–180/user/mo extra)" },
      { ok: false, label: "Per-device" },
      { ok: false, label: "Tier-gated" },
    ],
  },
  {
    feature: "E-invoicing included",
    cells: [
      true,
      true,
      { ok: false, label: "Paid add-on" },
      { ok: false, label: "Enterprise tier only" },
    ],
  },
  {
    feature: "WhatsApp sharing",
    cells: [true, false, true, true],
  },
  {
    feature: "No branding paywall",
    cells: [true, true, false, true],
  },
  {
    feature: "Starting price",
    cells: ["₹1,999/yr", "₹899/mo + 18% GST", "~₹5,699/yr (MRP)", "₹3,490/yr"],
  },
];
