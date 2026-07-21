// Form-facing state shapes. Numeric inputs are held as strings so fields can be
// cleared/typed freely; resolveInvoice() coerces them into the numeric
// InvoiceData that the calculator, preview, and PDF consume.

import type { GstRate, InvoiceData, LineItem } from "./types";

export interface FormItem {
  id: string;
  description: string;
  quantity: string;
  rate: string;
  gstRate: GstRate;
}

export interface PartyForm {
  name: string;
  gstin: string;
  address: string;
  state: string;
}

export interface InvoiceForm {
  business: PartyForm;
  client: PartyForm;
  items: FormItem[];
  meta: {
    invoiceNumber: string;
    invoiceDate: string;
    dueDate: string;
    logoDataUrl?: string;
    upiId?: string;
    notes?: string;
  };
}

let itemCounter = 0;
export function emptyItem(): FormItem {
  itemCounter += 1;
  return {
    id: `item-${Date.now()}-${itemCounter}`,
    description: "",
    quantity: "1",
    rate: "",
    gstRate: 18,
  };
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function defaultForm(): InvoiceForm {
  return {
    business: { name: "", gstin: "", address: "", state: "" },
    client: { name: "", gstin: "", address: "", state: "" },
    items: [emptyItem()],
    meta: {
      invoiceNumber: "INV-001",
      invoiceDate: todayISO(),
      dueDate: "",
      logoDataUrl: undefined,
      upiId: "",
      notes: "",
    },
  };
}

/** Convert form state (string numerics) into numeric InvoiceData. */
export function resolveInvoice(form: InvoiceForm): InvoiceData {
  const items: LineItem[] = form.items.map((it) => ({
    id: it.id,
    description: it.description,
    quantity: toNumber(it.quantity),
    rate: toNumber(it.rate),
    gstRate: it.gstRate,
  }));

  return {
    business: { ...form.business },
    client: { ...form.client },
    items,
    meta: { ...form.meta },
  };
}

function toNumber(v: string): number {
  const n = parseFloat(v);
  return isFinite(n) ? n : 0;
}

/** Build the UPI deep-link for a QR code, or null if not enough info. */
export function buildUpiLink(
  upiId: string | undefined,
  payeeName: string,
  amount: number
): string | null {
  const id = (upiId || "").trim();
  if (!id || !id.includes("@")) return null;
  const params = new URLSearchParams({
    pa: id,
    pn: payeeName || "Merchant",
    cu: "INR",
  });
  if (amount > 0) params.set("am", amount.toFixed(2));
  return `upi://pay?${params.toString()}`;
}
