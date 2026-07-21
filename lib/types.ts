// Shared domain types for the Billzora invoice engine.

/** GST rate slabs matching GST 2.0. */
export const GST_RATES = [0, 5, 18, 40] as const;
export type GstRate = (typeof GST_RATES)[number];

export interface LineItem {
  id: string;
  description: string;
  /** Raw string inputs are kept in the form; the engine coerces to numbers. */
  quantity: number;
  rate: number;
  gstRate: GstRate;
}

export interface Party {
  name: string;
  gstin: string;
  address: string;
  /** State code/name — used to decide CGST+SGST vs IGST. */
  state: string;
}

export interface InvoiceMeta {
  invoiceNumber: string;
  invoiceDate: string; // ISO yyyy-mm-dd
  dueDate: string;
  logoDataUrl?: string;
  upiId?: string;
  notes?: string;
}

export interface InvoiceData {
  business: Party;
  client: Party;
  items: LineItem[];
  meta: InvoiceMeta;
}

/** Per-line computed values. */
export interface ComputedLine {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  gstRate: GstRate;
  taxable: number;
  gstAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  total: number;
}

export interface GstBreakupRow {
  gstRate: GstRate;
  taxable: number;
  cgst: number;
  sgst: number;
  igst: number;
}

export interface InvoiceTotals {
  interState: boolean;
  lines: ComputedLine[];
  breakup: GstBreakupRow[];
  subTotal: number; // sum of taxable amounts
  totalCgst: number;
  totalSgst: number;
  totalIgst: number;
  totalGst: number;
  grandTotal: number; // rounded to nearest rupee
  roundOff: number; // grandTotal - (subTotal + totalGst)
  amountInWords: string;
}
