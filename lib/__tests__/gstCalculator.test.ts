import { describe, it, expect } from "vitest";
import { calculateInvoice, isInterState, round2, formatINR } from "../gstCalculator";
import type { LineItem } from "../types";

function item(partial: Partial<LineItem>): LineItem {
  return {
    id: "1",
    description: "Item",
    quantity: 1,
    rate: 100,
    gstRate: 18,
    ...partial,
  };
}

describe("isInterState", () => {
  it("same state is intra-state", () => {
    expect(isInterState("Karnataka", "Karnataka")).toBe(false);
  });
  it("different states is inter-state", () => {
    expect(isInterState("Karnataka", "Maharashtra")).toBe(true);
  });
  it("defaults to intra-state when a state is missing", () => {
    expect(isInterState("", "Maharashtra")).toBe(false);
    expect(isInterState("Karnataka", "")).toBe(false);
  });
});

describe("calculateInvoice — intra-state (CGST + SGST)", () => {
  const totals = calculateInvoice({
    items: [item({ quantity: 2, rate: 500, gstRate: 18 })],
    businessState: "Karnataka",
    clientState: "Karnataka",
  });

  it("computes taxable = qty * rate", () => {
    expect(totals.subTotal).toBe(1000);
  });
  it("splits GST into equal CGST + SGST", () => {
    expect(totals.totalCgst).toBe(90);
    expect(totals.totalSgst).toBe(90);
    expect(totals.totalIgst).toBe(0);
  });
  it("total GST = 18% of 1000", () => {
    expect(totals.totalGst).toBe(180);
  });
  it("grand total = subtotal + gst", () => {
    expect(totals.grandTotal).toBe(1180);
  });
});

describe("calculateInvoice — inter-state (IGST)", () => {
  const totals = calculateInvoice({
    items: [item({ quantity: 2, rate: 500, gstRate: 18 })],
    businessState: "Karnataka",
    clientState: "Maharashtra",
  });

  it("applies full GST as IGST, no CGST/SGST", () => {
    expect(totals.totalIgst).toBe(180);
    expect(totals.totalCgst).toBe(0);
    expect(totals.totalSgst).toBe(0);
  });
  it("grand total matches", () => {
    expect(totals.grandTotal).toBe(1180);
  });
});

describe("calculateInvoice — multiple items and slabs", () => {
  const totals = calculateInvoice({
    items: [
      item({ id: "a", quantity: 1, rate: 1000, gstRate: 5 }),
      item({ id: "b", quantity: 3, rate: 200, gstRate: 18 }),
      item({ id: "c", quantity: 1, rate: 500, gstRate: 0 }),
    ],
    businessState: "Delhi",
    clientState: "Delhi",
  });

  it("subtotal sums all taxables", () => {
    expect(totals.subTotal).toBe(1000 + 600 + 500);
  });
  it("total GST = 5% of 1000 + 18% of 600 + 0", () => {
    expect(totals.totalGst).toBe(round2(50 + 108));
  });
  it("groups the GST breakup by rate", () => {
    const rates = totals.breakup.map((b) => b.gstRate);
    expect(rates).toEqual([0, 5, 18]);
  });
});

describe("calculateInvoice — rounding", () => {
  it("produces an integer grand total with a round-off delta", () => {
    const totals = calculateInvoice({
      items: [item({ quantity: 1, rate: 99.99, gstRate: 18 })],
      businessState: "Kerala",
      clientState: "Kerala",
    });
    expect(Number.isInteger(totals.grandTotal)).toBe(true);
    // raw = 99.99 + 17.9982 rounded... grandTotal is nearest rupee
    expect(Math.abs(totals.roundOff)).toBeLessThanOrEqual(0.5);
    expect(round2(totals.subTotal + totals.totalGst + totals.roundOff)).toBe(
      totals.grandTotal
    );
  });

  it("CGST + SGST always re-sum to the line GST amount", () => {
    const totals = calculateInvoice({
      items: [item({ quantity: 1, rate: 33.33, gstRate: 5 })],
      businessState: "Goa",
      clientState: "Goa",
    });
    const line = totals.lines[0];
    expect(round2(line.cgst + line.sgst)).toBe(line.gstAmount);
  });
});

describe("calculateInvoice — empty / zero", () => {
  it("handles no items", () => {
    const totals = calculateInvoice({
      items: [],
      businessState: "Delhi",
      clientState: "Delhi",
    });
    expect(totals.grandTotal).toBe(0);
    expect(totals.amountInWords).toBe("Rupees Zero Only");
  });
});

describe("formatINR", () => {
  it("uses Indian digit grouping", () => {
    expect(formatINR(123456.5)).toBe("₹1,23,456.50");
  });
  it("can omit the symbol", () => {
    expect(formatINR(1000, false)).toBe("1,000.00");
  });
});
