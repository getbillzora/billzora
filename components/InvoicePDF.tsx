"use client";

import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { formatINR } from "@/lib/gstCalculator";
import type { InvoiceData, InvoiceTotals } from "@/lib/types";

// Uses @react-pdf's built-in Helvetica (no external font fetch → no layout
// shift, no blocking network request), consistent with the perf targets.
const s = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 9,
    color: "#2C2C2A",
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 16,
  },
  logo: { width: 48, height: 48, marginRight: 10, objectFit: "contain" },
  bizName: { fontSize: 13, fontFamily: "Helvetica-Bold", color: "#085041" },
  muted: { fontSize: 8, color: "#6B7280", marginTop: 1 },
  invoiceTitle: {
    fontSize: 15,
    fontFamily: "Helvetica-Bold",
    textAlign: "right",
  },
  sectionLabel: {
    fontSize: 7,
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  billName: { fontSize: 10, fontFamily: "Helvetica-Bold" },
  table: { marginTop: 16 },
  thead: {
    flexDirection: "row",
    backgroundColor: "#E1F5EE",
    paddingVertical: 5,
    paddingHorizontal: 4,
  },
  th: { color: "#085041", fontFamily: "Helvetica-Bold", fontSize: 7.5 },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    paddingVertical: 5,
    paddingHorizontal: 4,
  },
  // Column widths (sum ~100)
  cDesc: { width: "30%" },
  cQty: { width: "10%", textAlign: "right" },
  cRate: { width: "13%", textAlign: "right" },
  cTax: { width: "15%", textAlign: "right" },
  cPct: { width: "10%", textAlign: "right" },
  cGst: { width: "12%", textAlign: "right" },
  cAmt: { width: "10%", textAlign: "right" },
  totalsWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  totalsBox: { width: "42%" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  grandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 2,
    borderTopColor: "#085041",
    marginTop: 3,
    paddingTop: 4,
  },
  grandText: { fontFamily: "Helvetica-Bold", fontSize: 11, color: "#085041" },
  words: {
    marginTop: 14,
    backgroundColor: "#E1F5EE",
    padding: 6,
    fontSize: 8,
    color: "#04342C",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 12,
  },
  qr: { width: 84, height: 84, borderWidth: 1, borderColor: "#E5E7EB" },
  breakupRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingVertical: 2,
  },
});

interface Props {
  invoice: InvoiceData;
  totals: InvoiceTotals;
  upiQrDataUrl?: string | null;
  docLabel?: string;
}

export default function InvoicePDF({
  invoice,
  totals,
  upiQrDataUrl,
  docLabel = "TAX INVOICE",
}: Props) {
  const { business, client, meta } = invoice;
  const showCgstSgst = !totals.interState;

  return (
    <Document
      title={`${docLabel} ${meta.invoiceNumber}`}
      author={business.name || "Billzora"}
    >
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <View style={{ flexDirection: "row", maxWidth: "60%" }}>
            {meta.logoDataUrl ? (
              <Image style={s.logo} src={meta.logoDataUrl} />
            ) : null}
            <View>
              <Text style={s.bizName}>
                {business.name || "Your business name"}
              </Text>
              {business.gstin ? (
                <Text style={s.muted}>GSTIN: {business.gstin}</Text>
              ) : null}
              {business.state ? (
                <Text style={s.muted}>{business.state}</Text>
              ) : null}
              {business.address ? (
                <Text style={s.muted}>{business.address}</Text>
              ) : null}
            </View>
          </View>
          <View>
            <Text style={s.invoiceTitle}>{docLabel}</Text>
            <Text style={{ textAlign: "right", marginTop: 2 }}>
              {meta.invoiceNumber || "-"}
            </Text>
            {meta.invoiceDate ? (
              <Text style={[s.muted, { textAlign: "right" }]}>
                Date: {formatDate(meta.invoiceDate)}
              </Text>
            ) : null}
            {meta.dueDate ? (
              <Text style={[s.muted, { textAlign: "right" }]}>
                Due: {formatDate(meta.dueDate)}
              </Text>
            ) : null}
          </View>
        </View>

        {/* Bill to */}
        <View style={{ marginTop: 14 }}>
          <Text style={s.sectionLabel}>Bill to</Text>
          <Text style={s.billName}>{client.name || "Client name"}</Text>
          {client.gstin ? (
            <Text style={s.muted}>GSTIN: {client.gstin}</Text>
          ) : null}
          {client.state ? <Text style={s.muted}>{client.state}</Text> : null}
          {client.address ? (
            <Text style={s.muted}>{client.address}</Text>
          ) : null}
        </View>

        {/* Items */}
        <View style={s.table}>
          <View style={s.thead}>
            <Text style={[s.th, s.cDesc]}>Description</Text>
            <Text style={[s.th, s.cQty]}>Qty</Text>
            <Text style={[s.th, s.cRate]}>Rate</Text>
            <Text style={[s.th, s.cTax]}>Taxable</Text>
            <Text style={[s.th, s.cPct]}>GST%</Text>
            <Text style={[s.th, s.cGst]}>GST</Text>
            <Text style={[s.th, s.cAmt]}>Amount</Text>
          </View>
          {totals.lines.map((line) => (
            <View style={s.row} key={line.id}>
              <Text style={s.cDesc}>{line.description || "-"}</Text>
              <Text style={s.cQty}>{line.quantity}</Text>
              <Text style={s.cRate}>{formatINR(line.rate, false)}</Text>
              <Text style={s.cTax}>{formatINR(line.taxable, false)}</Text>
              <Text style={s.cPct}>{line.gstRate}%</Text>
              <Text style={s.cGst}>{formatINR(line.gstAmount, false)}</Text>
              <Text style={s.cAmt}>{formatINR(line.total, false)}</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={s.totalsWrap}>
          {/* Tax breakup */}
          <View style={s.totalsBox}>
            <Text style={s.sectionLabel}>
              Tax summary (
              {totals.interState
                ? "IGST - inter-state"
                : "CGST + SGST - intra-state"}
              )
            </Text>
            <View style={[s.breakupRow, { borderTopWidth: 0 }]}>
              <Text style={{ width: "25%" }}>Slab</Text>
              <Text style={{ width: "35%", textAlign: "right" }}>Taxable</Text>
              {showCgstSgst ? (
                <>
                  <Text style={{ width: "20%", textAlign: "right" }}>CGST</Text>
                  <Text style={{ width: "20%", textAlign: "right" }}>SGST</Text>
                </>
              ) : (
                <Text style={{ width: "40%", textAlign: "right" }}>IGST</Text>
              )}
            </View>
            {totals.breakup.map((row) => (
              <View style={s.breakupRow} key={row.gstRate}>
                <Text style={{ width: "25%" }}>{row.gstRate}%</Text>
                <Text style={{ width: "35%", textAlign: "right" }}>
                  {formatINR(row.taxable, false)}
                </Text>
                {showCgstSgst ? (
                  <>
                    <Text style={{ width: "20%", textAlign: "right" }}>
                      {formatINR(row.cgst, false)}
                    </Text>
                    <Text style={{ width: "20%", textAlign: "right" }}>
                      {formatINR(row.sgst, false)}
                    </Text>
                  </>
                ) : (
                  <Text style={{ width: "40%", textAlign: "right" }}>
                    {formatINR(row.igst, false)}
                  </Text>
                )}
              </View>
            ))}
          </View>

          {/* Money totals */}
          <View style={s.totalsBox}>
            <View style={s.totalRow}>
              <Text>Subtotal</Text>
              <Text>{formatINR(totals.subTotal)}</Text>
            </View>
            {showCgstSgst ? (
              <>
                <View style={s.totalRow}>
                  <Text>CGST</Text>
                  <Text>{formatINR(totals.totalCgst)}</Text>
                </View>
                <View style={s.totalRow}>
                  <Text>SGST</Text>
                  <Text>{formatINR(totals.totalSgst)}</Text>
                </View>
              </>
            ) : (
              <View style={s.totalRow}>
                <Text>IGST</Text>
                <Text>{formatINR(totals.totalIgst)}</Text>
              </View>
            )}
            {totals.roundOff !== 0 ? (
              <View style={s.totalRow}>
                <Text>Round off</Text>
                <Text>{formatINR(totals.roundOff)}</Text>
              </View>
            ) : null}
            <View style={s.grandRow}>
              <Text style={s.grandText}>Total</Text>
              <Text style={s.grandText}>{formatINR(totals.grandTotal)}</Text>
            </View>
          </View>
        </View>

        {/* Amount in words */}
        <Text style={s.words}>
          Amount in words: {totals.amountInWords}
        </Text>

        {/* Footer */}
        <View style={s.footer}>
          <View style={{ maxWidth: "60%" }}>
            {meta.notes ? (
              <>
                <Text style={{ fontFamily: "Helvetica-Bold" }}>Notes</Text>
                <Text style={s.muted}>{meta.notes}</Text>
              </>
            ) : null}
          </View>
          {upiQrDataUrl ? (
            <View style={{ alignItems: "center" }}>
              <Image style={s.qr} src={upiQrDataUrl} />
              <Text style={[s.muted, { textAlign: "center" }]}>
                Scan to pay via UPI
              </Text>
              {meta.upiId ? (
                <Text style={[s.muted, { textAlign: "center" }]}>
                  {meta.upiId}
                </Text>
              ) : null}
            </View>
          ) : null}
        </View>
      </Page>
    </Document>
  );
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
