"use client";

import { useCallback, useMemo } from "react";
import type { Dispatch, SetStateAction } from "react";
import { INDIAN_STATES } from "@/lib/states";
import { GST_RATES, type GstRate } from "@/lib/types";
import { isValidGstin, looksLikeGstin } from "@/lib/gstin";
import { emptyItem, type FormItem, type InvoiceForm as InvoiceFormState } from "@/lib/form";

const labelCls = "block text-sm font-medium text-ink-900 mb-1";
const inputCls =
  "w-full rounded-control border border-gray-300 bg-white px-3 py-2 text-sm text-ink-900 placeholder:text-gray-400 focus:border-teal-800 focus:outline-none focus:ring-1 focus:ring-teal-800";
const sectionCls = "rounded-card border border-gray-200 bg-white p-5";
const sectionTitleCls = "text-sm font-semibold uppercase tracking-wide text-teal-800 mb-4";

interface Props {
  form: InvoiceFormState;
  setForm: Dispatch<SetStateAction<InvoiceFormState>>;
}

export default function InvoiceForm({ form, setForm }: Props) {
  const updateBusiness = useCallback(
    (field: keyof InvoiceFormState["business"], value: string) =>
      setForm((f) => ({ ...f, business: { ...f.business, [field]: value } })),
    [setForm]
  );
  const updateClient = useCallback(
    (field: keyof InvoiceFormState["client"], value: string) =>
      setForm((f) => ({ ...f, client: { ...f.client, [field]: value } })),
    [setForm]
  );
  const updateMeta = useCallback(
    (field: keyof InvoiceFormState["meta"], value: string) =>
      setForm((f) => ({ ...f, meta: { ...f.meta, [field]: value } })),
    [setForm]
  );

  const updateItem = useCallback(
    (id: string, field: keyof FormItem, value: string | GstRate) =>
      setForm((f) => ({
        ...f,
        items: f.items.map((it) =>
          it.id === id ? { ...it, [field]: value } : it
        ),
      })),
    [setForm]
  );
  const addItem = useCallback(
    () => setForm((f) => ({ ...f, items: [...f.items, emptyItem()] })),
    [setForm]
  );
  const removeItem = useCallback(
    (id: string) =>
      setForm((f) => ({
        ...f,
        items:
          f.items.length > 1 ? f.items.filter((it) => it.id !== id) : f.items,
      })),
    [setForm]
  );

  const onLogoChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) return;
      if (file.size > 1024 * 1024 * 2) {
        alert("Please choose a logo under 2 MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () =>
        setForm((f) => ({
          ...f,
          meta: { ...f.meta, logoDataUrl: String(reader.result) },
        }));
      reader.readAsDataURL(file);
    },
    [setForm]
  );

  return (
    <div className="space-y-5">
      {/* Business */}
      <section className={sectionCls}>
        <h2 className={sectionTitleCls}>Your business</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="biz-name">
              Business name <span className="text-amber-600">*</span>
            </label>
            <input
              id="biz-name"
              className={inputCls}
              value={form.business.name}
              onChange={(e) => updateBusiness("name", e.target.value)}
              placeholder="Acme Consulting"
            />
          </div>
          <GstinField
            id="biz-gstin"
            label="Business GSTIN"
            value={form.business.gstin}
            onChange={(v) => updateBusiness("gstin", v)}
          />
          <div>
            <label className={labelCls} htmlFor="biz-state">
              Your state <span className="text-amber-600">*</span>
            </label>
            <StateSelect
              id="biz-state"
              value={form.business.state}
              onChange={(v) => updateBusiness("state", v)}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="biz-address">
              Business address
            </label>
            <textarea
              id="biz-address"
              className={inputCls}
              rows={2}
              value={form.business.address}
              onChange={(e) => updateBusiness("address", e.target.value)}
              placeholder="Street, City, PIN"
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="biz-logo">
              Logo (optional)
            </label>
            <div className="flex items-center gap-3">
              <input
                id="biz-logo"
                type="file"
                accept="image/*"
                onChange={onLogoChange}
                className="text-sm text-ink-900 file:mr-3 file:rounded-control file:border file:border-gray-300 file:bg-white file:px-3 file:py-1.5 file:text-sm file:text-teal-800"
              />
              {form.meta.logoDataUrl && (
                <button
                  type="button"
                  className="text-xs text-amber-800 underline"
                  onClick={() => updateMeta("logoDataUrl", "")}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Client */}
      <section className={sectionCls}>
        <h2 className={sectionTitleCls}>Bill to (client)</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="cli-name">
              Client name <span className="text-amber-600">*</span>
            </label>
            <input
              id="cli-name"
              className={inputCls}
              value={form.client.name}
              onChange={(e) => updateClient("name", e.target.value)}
              placeholder="Client Pvt Ltd"
            />
          </div>
          <GstinField
            id="cli-gstin"
            label="Client GSTIN"
            value={form.client.gstin}
            onChange={(v) => updateClient("gstin", v)}
          />
          <div>
            <label className={labelCls} htmlFor="cli-state">
              Client state <span className="text-amber-600">*</span>
            </label>
            <StateSelect
              id="cli-state"
              value={form.client.state}
              onChange={(v) => updateClient("state", v)}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="cli-address">
              Client address
            </label>
            <textarea
              id="cli-address"
              className={inputCls}
              rows={2}
              value={form.client.address}
              onChange={(e) => updateClient("address", e.target.value)}
              placeholder="Street, City, PIN"
            />
          </div>
        </div>
      </section>

      {/* Invoice meta */}
      <section className={sectionCls}>
        <h2 className={sectionTitleCls}>Invoice details</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className={labelCls} htmlFor="inv-no">
              Invoice number
            </label>
            <input
              id="inv-no"
              className={inputCls}
              value={form.meta.invoiceNumber}
              onChange={(e) => updateMeta("invoiceNumber", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="inv-date">
              Invoice date
            </label>
            <input
              id="inv-date"
              type="date"
              className={inputCls}
              value={form.meta.invoiceDate}
              onChange={(e) => updateMeta("invoiceDate", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="inv-due">
              Due date
            </label>
            <input
              id="inv-due"
              type="date"
              className={inputCls}
              value={form.meta.dueDate}
              onChange={(e) => updateMeta("dueDate", e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="inv-upi">
              UPI ID (optional — renders a payment QR)
            </label>
            <input
              id="inv-upi"
              className={inputCls}
              value={form.meta.upiId}
              onChange={(e) => updateMeta("upiId", e.target.value)}
              placeholder="name@okhdfcbank"
            />
          </div>
          <div className="sm:col-span-3">
            <label className={labelCls} htmlFor="inv-notes">
              Notes / terms (optional)
            </label>
            <textarea
              id="inv-notes"
              className={inputCls}
              rows={2}
              value={form.meta.notes}
              onChange={(e) => updateMeta("notes", e.target.value)}
              placeholder="Payment due within 15 days."
            />
          </div>
        </div>
      </section>

      {/* Line items */}
      <section className={sectionCls}>
        <h2 className={sectionTitleCls}>Line items</h2>
        <div className="space-y-3">
          {/* Column headers on desktop */}
          <div className="hidden gap-2 px-1 text-xs font-medium uppercase tracking-wide text-gray-500 sm:grid sm:grid-cols-[1fr_5rem_7rem_5rem_2rem]">
            <span>Description</span>
            <span>Qty</span>
            <span>Rate (₹)</span>
            <span>GST %</span>
            <span />
          </div>

          {form.items.map((it) => (
            <div
              key={it.id}
              className="grid grid-cols-1 gap-2 rounded-control border border-gray-200 p-3 sm:grid-cols-[1fr_5rem_7rem_5rem_2rem] sm:border-0 sm:p-0"
            >
              <input
                className={inputCls}
                value={it.description}
                onChange={(e) =>
                  updateItem(it.id, "description", e.target.value)
                }
                placeholder="Service or product"
                aria-label="Description"
              />
              <input
                className={inputCls}
                type="number"
                inputMode="decimal"
                min="0"
                value={it.quantity}
                onChange={(e) => updateItem(it.id, "quantity", e.target.value)}
                aria-label="Quantity"
              />
              <input
                className={inputCls}
                type="number"
                inputMode="decimal"
                min="0"
                value={it.rate}
                onChange={(e) => updateItem(it.id, "rate", e.target.value)}
                placeholder="0.00"
                aria-label="Rate"
              />
              <select
                className={inputCls}
                value={it.gstRate}
                onChange={(e) =>
                  updateItem(
                    it.id,
                    "gstRate",
                    Number(e.target.value) as GstRate
                  )
                }
                aria-label="GST rate"
              >
                {GST_RATES.map((r) => (
                  <option key={r} value={r}>
                    {r}%
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeItem(it.id)}
                disabled={form.items.length === 1}
                className="flex items-center justify-center rounded-control text-gray-400 hover:text-amber-800 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Remove item"
                title="Remove item"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addItem}
          className="mt-4 rounded-control border border-teal-800 px-4 py-2 text-sm font-medium text-teal-800 hover:bg-teal-50"
        >
          + Add item
        </button>
      </section>
    </div>
  );
}

function StateSelect({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      id={id}
      className={inputCls}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select state…</option>
      {INDIAN_STATES.map((s) => (
        <option key={s.code} value={s.name}>
          {s.name}
        </option>
      ))}
    </select>
  );
}

function GstinField({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const status = useMemo(() => {
    const v = value.trim();
    if (!v) return null;
    if (isValidGstin(v)) return "valid" as const;
    if (looksLikeGstin(v)) return "checksum" as const;
    return "invalid" as const;
  }, [value]);

  return (
    <div>
      <label className={labelCls} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={inputCls}
        value={value}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        placeholder="15-character GSTIN"
        maxLength={15}
      />
      {status === "valid" && (
        <p className="mt-1 text-xs text-teal-800">✓ Valid GSTIN</p>
      )}
      {status === "checksum" && (
        <p className="mt-1 text-xs text-amber-800">
          Format looks right but the checksum doesn&apos;t match — double-check
          it.
        </p>
      )}
      {status === "invalid" && (
        <p className="mt-1 text-xs text-amber-800">
          Doesn&apos;t look like a valid 15-character GSTIN.
        </p>
      )}
    </div>
  );
}
