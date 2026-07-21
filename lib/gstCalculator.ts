// GstCalculator — the pure, unit-testable core of the invoice engine.
// Used by both <InvoicePreview /> and <InvoicePDF /> so the numbers on screen
// always match the numbers in the downloaded PDF.

import { amountInWords } from "./amountInWords";
import type {
  ComputedLine,
  GstBreakupRow,
  InvoiceTotals,
  LineItem,
} from "./types";

/** Round to 2 decimals, guarding against binary-float drift (e.g. 1.005). */
export function round2(n: number): number {
  if (!isFinite(n)) return 0;
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function num(value: unknown): number {
  const n = typeof value === "number" ? value : parseFloat(String(value));
  return isFinite(n) ? n : 0;
}

export interface CalcInput {
  items: LineItem[];
  businessState: string;
  clientState: string;
}

/**
 * Decide intra-state (CGST+SGST) vs inter-state (IGST).
 * Intra-state = same state → GST splits into CGST + SGST (half each).
 * Inter-state = different states → full GST as IGST.
 * If either state is blank we cannot know the place of supply, so we default to
 * intra-state (CGST+SGST), the most common case for the free tool's users.
 */
export function isInterState(businessState: string, clientState: string): boolean {
  const a = (businessState || "").trim();
  const b = (clientState || "").trim();
  if (!a || !b) return false;
  return a !== b;
}

export function calculateInvoice({
  items,
  businessState,
  clientState,
}: CalcInput): InvoiceTotals {
  const interState = isInterState(businessState, clientState);

  const lines: ComputedLine[] = items.map((item) => {
    const quantity = num(item.quantity);
    const rate = num(item.rate);
    const gstRate = num(item.gstRate);

    const taxable = round2(quantity * rate);
    const gstAmount = round2((taxable * gstRate) / 100);

    let cgst = 0;
    let sgst = 0;
    let igst = 0;
    if (interState) {
      igst = gstAmount;
    } else {
      // Split so the two halves always re-sum to gstAmount exactly.
      cgst = round2(gstAmount / 2);
      sgst = round2(gstAmount - cgst);
    }

    return {
      id: item.id,
      description: item.description,
      quantity,
      rate,
      gstRate: item.gstRate,
      taxable,
      gstAmount,
      cgst,
      sgst,
      igst,
      total: round2(taxable + gstAmount),
    };
  });

  // Group tax by rate for the invoice's GST summary block.
  const breakupMap = new Map<number, GstBreakupRow>();
  for (const line of lines) {
    const existing =
      breakupMap.get(line.gstRate) ??
      ({
        gstRate: line.gstRate,
        taxable: 0,
        cgst: 0,
        sgst: 0,
        igst: 0,
      } as GstBreakupRow);
    existing.taxable = round2(existing.taxable + line.taxable);
    existing.cgst = round2(existing.cgst + line.cgst);
    existing.sgst = round2(existing.sgst + line.sgst);
    existing.igst = round2(existing.igst + line.igst);
    breakupMap.set(line.gstRate, existing);
  }
  const breakup = Array.from(breakupMap.values()).sort(
    (a, b) => a.gstRate - b.gstRate
  );

  const subTotal = round2(lines.reduce((s, l) => s + l.taxable, 0));
  const totalCgst = round2(lines.reduce((s, l) => s + l.cgst, 0));
  const totalSgst = round2(lines.reduce((s, l) => s + l.sgst, 0));
  const totalIgst = round2(lines.reduce((s, l) => s + l.igst, 0));
  const totalGst = round2(totalCgst + totalSgst + totalIgst);

  const rawTotal = round2(subTotal + totalGst);
  const grandTotal = Math.round(rawTotal);
  const roundOff = round2(grandTotal - rawTotal);

  return {
    interState,
    lines,
    breakup,
    subTotal,
    totalCgst,
    totalSgst,
    totalIgst,
    totalGst,
    grandTotal,
    roundOff,
    amountInWords: amountInWords(grandTotal),
  };
}

/** Format a number as Indian-grouped rupees, e.g. 123456.5 -> "1,23,456.50". */
export function formatINR(n: number, withSymbol = true): string {
  const value = isFinite(n) ? n : 0;
  const formatted = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  return withSymbol ? `₹${formatted}` : formatted;
}
