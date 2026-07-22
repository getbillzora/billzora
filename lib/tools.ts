// Registry of free-tool pages, used for cross-linking between them.

export interface ToolLink {
  href: string;
  name: string;
  blurb: string;
}

export const TOOLS: ToolLink[] = [
  {
    href: "/invoice-generator",
    name: "Invoice generator",
    blurb: "Create a GST-compliant tax invoice.",
  },
  {
    href: "/gst-invoice-software",
    name: "GST invoice software",
    blurb: "GST invoicing with e-invoicing & e-way bills.",
  },
  {
    href: "/proforma-invoice-generator",
    name: "Proforma invoice generator",
    blurb: "Send a proforma invoice before the sale.",
  },
  {
    href: "/quotation-maker",
    name: "Quotation maker",
    blurb: "Turn estimates into professional quotes.",
  },
  {
    href: "/online-receipt-generator",
    name: "Receipt generator",
    blurb: "Issue a payment receipt to your customer.",
  },
  {
    href: "/gst-calculator",
    name: "GST calculator",
    blurb: "Work out CGST, SGST & IGST in seconds.",
  },
  {
    href: "/invoice-template",
    name: "Invoice templates",
    blurb: "Free GST invoice templates + live editor.",
  },
];

export function relatedTools(currentHref: string, count = 3): ToolLink[] {
  return TOOLS.filter((t) => t.href !== currentHref).slice(0, count);
}
