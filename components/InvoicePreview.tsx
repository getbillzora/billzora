"use client";

import { formatINR } from "@/lib/gstCalculator";
import type { InvoiceData, InvoiceTotals } from "@/lib/types";

interface Props {
  invoice: InvoiceData;
  totals: InvoiceTotals;
  upiQrDataUrl?: string | null;
}

/**
 * On-screen invoice. Deliberately mirrors the <InvoicePDF /> layout so the
 * preview is an honest representation of the downloaded file.
 */
export default function InvoicePreview({ invoice, totals, upiQrDataUrl }: Props) {
  const { business, client, meta } = invoice;
  const showCgstSgst = !totals.interState;

  return (
    <div className="mx-auto w-full max-w-[794px] rounded-card border border-gray-200 bg-white p-8 text-ink-900">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-gray-200 pb-6">
        <div className="flex items-start gap-3">
          {meta.logoDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={meta.logoDataUrl}
              alt="Business logo"
              className="h-14 w-14 rounded-control object-contain"
            />
          ) : null}
          <div>
            <p className="text-lg font-semibold text-teal-800">
              {business.name || "Your business name"}
            </p>
            {business.gstin && (
              <p className="text-xs text-gray-600">GSTIN: {business.gstin}</p>
            )}
            {business.state && (
              <p className="text-xs text-gray-600">{business.state}</p>
            )}
            {business.address && (
              <p className="mt-1 whitespace-pre-line text-xs text-gray-600">
                {business.address}
              </p>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold tracking-wide text-ink-900">
            TAX INVOICE
          </p>
          <p className="mt-1 text-sm font-medium">
            {meta.invoiceNumber || "—"}
          </p>
          {meta.invoiceDate && (
            <p className="text-xs text-gray-600">
              Date: {formatDate(meta.invoiceDate)}
            </p>
          )}
          {meta.dueDate && (
            <p className="text-xs text-gray-600">
              Due: {formatDate(meta.dueDate)}
            </p>
          )}
        </div>
      </div>

      {/* Bill to */}
      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Bill to
        </p>
        <p className="mt-1 text-sm font-semibold">
          {client.name || "Client name"}
        </p>
        {client.gstin && (
          <p className="text-xs text-gray-600">GSTIN: {client.gstin}</p>
        )}
        {client.state && (
          <p className="text-xs text-gray-600">{client.state}</p>
        )}
        {client.address && (
          <p className="whitespace-pre-line text-xs text-gray-600">
            {client.address}
          </p>
        )}
      </div>

      {/* Items table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-teal-50 text-left text-xs uppercase tracking-wide text-teal-800">
              <th className="p-2 font-semibold">Description</th>
              <th className="p-2 text-right font-semibold">Qty</th>
              <th className="p-2 text-right font-semibold">Rate</th>
              <th className="p-2 text-right font-semibold">Taxable</th>
              <th className="p-2 text-right font-semibold">GST%</th>
              <th className="p-2 text-right font-semibold">GST</th>
              <th className="p-2 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {totals.lines.map((line) => (
              <tr key={line.id} className="border-b border-gray-100">
                <td className="p-2">{line.description || "—"}</td>
                <td className="p-2 text-right">{trimNum(line.quantity)}</td>
                <td className="p-2 text-right">
                  {formatINR(line.rate, false)}
                </td>
                <td className="p-2 text-right">
                  {formatINR(line.taxable, false)}
                </td>
                <td className="p-2 text-right">{line.gstRate}%</td>
                <td className="p-2 text-right">
                  {formatINR(line.gstAmount, false)}
                </td>
                <td className="p-2 text-right font-medium">
                  {formatINR(line.total, false)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals + GST breakup */}
      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Tax summary ({totals.interState ? "IGST — inter-state" : "CGST + SGST — intra-state"})
          </p>
          <table className="mt-2 w-full border-collapse text-xs">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-1 pr-2 font-medium">Slab</th>
                <th className="py-1 pr-2 text-right font-medium">Taxable</th>
                {showCgstSgst ? (
                  <>
                    <th className="py-1 pr-2 text-right font-medium">CGST</th>
                    <th className="py-1 text-right font-medium">SGST</th>
                  </>
                ) : (
                  <th className="py-1 text-right font-medium">IGST</th>
                )}
              </tr>
            </thead>
            <tbody>
              {totals.breakup.map((row) => (
                <tr key={row.gstRate} className="border-t border-gray-100">
                  <td className="py-1 pr-2">{row.gstRate}%</td>
                  <td className="py-1 pr-2 text-right">
                    {formatINR(row.taxable, false)}
                  </td>
                  {showCgstSgst ? (
                    <>
                      <td className="py-1 pr-2 text-right">
                        {formatINR(row.cgst, false)}
                      </td>
                      <td className="py-1 text-right">
                        {formatINR(row.sgst, false)}
                      </td>
                    </>
                  ) : (
                    <td className="py-1 text-right">
                      {formatINR(row.igst, false)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full sm:w-72">
          <Row label="Subtotal" value={formatINR(totals.subTotal)} />
          {showCgstSgst ? (
            <>
              <Row label="CGST" value={formatINR(totals.totalCgst)} />
              <Row label="SGST" value={formatINR(totals.totalSgst)} />
            </>
          ) : (
            <Row label="IGST" value={formatINR(totals.totalIgst)} />
          )}
          {totals.roundOff !== 0 && (
            <Row label="Round off" value={formatINR(totals.roundOff)} />
          )}
          <div className="mt-1 flex justify-between border-t-2 border-teal-800 py-2 text-base font-bold text-teal-800">
            <span>Total</span>
            <span>{formatINR(totals.grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* Amount in words */}
      <p className="mt-4 rounded-control bg-teal-50 px-3 py-2 text-xs text-teal-900">
        <span className="font-semibold">Amount in words:</span>{" "}
        {totals.amountInWords}
      </p>

      {/* Footer: UPI QR + notes */}
      <div className="mt-6 flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm text-xs text-gray-600">
          {meta.notes && (
            <>
              <p className="font-semibold text-ink-900">Notes</p>
              <p className="whitespace-pre-line">{meta.notes}</p>
            </>
          )}
        </div>
        {upiQrDataUrl && (
          <div className="text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={upiQrDataUrl}
              alt="UPI payment QR"
              className="h-28 w-28 rounded-control border border-gray-200"
            />
            <p className="mt-1 text-[10px] text-gray-500">Scan to pay via UPI</p>
            {meta.upiId && (
              <p className="text-[10px] text-gray-500">{meta.upiId}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1 text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function trimNum(n: number): string {
  return Number.isInteger(n) ? String(n) : String(n);
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
