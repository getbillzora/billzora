"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import InvoiceForm from "./InvoiceForm";
import InvoicePreview from "./InvoicePreview";
import { calculateInvoice } from "@/lib/gstCalculator";
import { buildUpiLink, defaultForm, resolveInvoice } from "@/lib/form";
import { generateQrDataUrl } from "@/lib/qr";

type Status = "idle" | "working" | "done";

interface Props {
  heading?: string;
  subheading?: string;
  /** Document label shown on the preview/PDF, e.g. "PROFORMA INVOICE". */
  docLabel?: string;
}

export default function InvoiceGenerator({
  heading = "Free GST Invoice Generator",
  subheading = "Create a GST-compliant invoice in seconds. CGST/SGST and IGST are calculated automatically. No login required — download the PDF or share on WhatsApp.",
  docLabel = "TAX INVOICE",
}: Props = {}) {
  const [form, setForm] = useState(defaultForm);
  const [qr, setQr] = useState<string | null>(null);
  const [pdfStatus, setPdfStatus] = useState<Status>("idle");
  const [showCapture, setShowCapture] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSaved, setEmailSaved] = useState(false);
  const lastUpiRef = useRef<string>("");

  // Resolve numeric invoice + totals from the form (pure, cheap).
  const invoice = useMemo(() => resolveInvoice(form), [form]);
  const totals = useMemo(
    () =>
      calculateInvoice({
        items: invoice.items,
        businessState: invoice.business.state,
        clientState: invoice.client.state,
      }),
    [invoice]
  );

  // Regenerate the UPI QR when the UPI id or grand total changes.
  useEffect(() => {
    const link = buildUpiLink(
      form.meta.upiId,
      form.business.name,
      totals.grandTotal
    );
    if (!link) {
      setQr(null);
      lastUpiRef.current = "";
      return;
    }
    if (link === lastUpiRef.current) return;
    lastUpiRef.current = link;
    let cancelled = false;
    generateQrDataUrl(link)
      .then((url) => {
        if (!cancelled) setQr(url);
      })
      .catch(() => {
        if (!cancelled) setQr(null);
      });
    return () => {
      cancelled = true;
    };
  }, [form.meta.upiId, form.business.name, totals.grandTotal]);

  const canGenerate =
    form.business.name.trim().length > 0 &&
    form.client.name.trim().length > 0 &&
    invoice.items.some((it) => it.quantity > 0 && it.rate > 0);

  async function buildPdfBlob(): Promise<Blob> {
    // Lazy-load the (heavy) PDF renderer only when actually exporting, so it
    // never blocks the interactive form or the initial page load.
    const [{ pdf }, { default: InvoicePDF }] = await Promise.all([
      import("@react-pdf/renderer"),
      import("./InvoicePDF"),
    ]);
    const doc = (
      <InvoicePDF
        invoice={invoice}
        totals={totals}
        upiQrDataUrl={qr}
        docLabel={docLabel}
      />
    );
    return pdf(doc).toBlob();
  }

  function fileName(ext: string) {
    const safe = (form.meta.invoiceNumber || "invoice").replace(
      /[^a-z0-9-_]+/gi,
      "-"
    );
    return `${safe}.${ext}`;
  }

  async function handleDownload() {
    setPdfStatus("working");
    try {
      const blob = await buildPdfBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName("pdf");
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setPdfStatus("done");
      setShowCapture(true);
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("Sorry — the PDF could not be generated. Please try again.");
      setPdfStatus("idle");
    }
  }

  async function handleWhatsApp() {
    // Phase 1 has no PDF hosting backend, so we download the PDF for the user
    // to attach and open WhatsApp pre-filled with the invoice summary.
    // TODO(phase-2): upload the blob to storage and put the share link here.
    await handleDownload();
    const amount = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(totals.grandTotal);
    const msg =
      `Hi ${form.client.name || "there"}, here is invoice ` +
      `${form.meta.invoiceNumber} from ${form.business.name} for ${amount}. ` +
      `(PDF attached.)`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  }

  function handleSaveEmail(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!value) return;
    // Phase 1: non-blocking local capture. Phase 2 wires this to the backend.
    try {
      const leads = JSON.parse(
        localStorage.getItem("billzora_leads") || "[]"
      );
      leads.push({ email: value, at: new Date().toISOString() });
      localStorage.setItem("billzora_leads", JSON.stringify(leads));
    } catch {
      /* ignore storage errors */
    }
    setEmailSaved(true);
  }

  const stateMismatchHint =
    form.business.state &&
    form.client.state &&
    totals.interState;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-teal-800 sm:text-4xl">
          {heading}
        </h1>
        <p className="mt-2 max-w-2xl text-gray-600">{subheading}</p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left: form */}
        <div>
          <InvoiceForm form={form} setForm={setForm} />
        </div>

        {/* Right: preview + actions (sticky on desktop) */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleDownload}
              disabled={!canGenerate || pdfStatus === "working"}
              className="rounded-control bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {pdfStatus === "working" ? "Generating…" : "Download PDF"}
            </button>
            <button
              type="button"
              onClick={handleWhatsApp}
              disabled={!canGenerate || pdfStatus === "working"}
              className="rounded-control border border-teal-800 px-5 py-2.5 text-sm font-semibold text-teal-800 hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Share on WhatsApp
            </button>
            {!canGenerate && (
              <span className="text-xs text-gray-500">
                Add business name, client name and at least one priced item.
              </span>
            )}
          </div>

          {stateMismatchHint && (
            <p className="mb-3 rounded-control bg-amber-50 px-3 py-2 text-xs text-amber-800">
              Different states selected → IGST applied (inter-state supply).
            </p>
          )}

          <div className="overflow-x-auto">
            <InvoicePreview
              invoice={invoice}
              totals={totals}
              upiQrDataUrl={qr}
              docLabel={docLabel}
            />
          </div>

          {/* Soft, non-blocking email capture */}
          {showCapture && (
            <div className="mt-4 rounded-card border border-teal-800 bg-teal-50 p-4">
              {emailSaved ? (
                <p className="text-sm text-teal-900">
                  Thanks! We&apos;ll email you payment reminders and save your
                  invoices when accounts launch.
                </p>
              ) : (
                <form
                  onSubmit={handleSaveEmail}
                  className="flex flex-col gap-2 sm:flex-row sm:items-center"
                >
                  <label htmlFor="capture-email" className="text-sm text-teal-900">
                    Save this invoice &amp; get payment reminders:
                  </label>
                  <input
                    id="capture-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@business.com"
                    className="flex-1 rounded-control border border-gray-300 bg-white px-3 py-2 text-sm focus:border-teal-800 focus:outline-none focus:ring-1 focus:ring-teal-800"
                  />
                  <button
                    type="submit"
                    className="rounded-control border border-teal-800 px-4 py-2 text-sm font-semibold text-teal-800 hover:bg-white"
                  >
                    Save
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
