"use client";

import { useMemo, useState } from "react";
import { round2, formatINR } from "@/lib/gstCalculator";
import { GST_RATES } from "@/lib/types";

type Mode = "exclusive" | "inclusive";
type Supply = "intra" | "inter";

const inputCls =
  "w-full rounded-control border border-gray-300 bg-white px-3 py-2 text-sm text-ink-900 focus:border-teal-800 focus:outline-none focus:ring-1 focus:ring-teal-800";
const labelCls = "block text-sm font-medium text-ink-900 mb-1";

/**
 * Standalone GST calculator: amount + rate → CGST/SGST/IGST breakdown, with
 * GST-inclusive vs exclusive handling. Uses the same rounding as the invoice
 * engine so results are consistent across the site.
 */
export default function GstCalculatorTool() {
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState(18);
  const [mode, setMode] = useState<Mode>("exclusive");
  const [supply, setSupply] = useState<Supply>("intra");

  const result = useMemo(() => {
    const amt = parseFloat(amount);
    const a = isFinite(amt) && amt >= 0 ? amt : 0;
    const r = rate;

    let base: number;
    let gst: number;
    let total: number;
    if (mode === "exclusive") {
      base = round2(a);
      gst = round2((a * r) / 100);
      total = round2(base + gst);
    } else {
      // amount already includes GST
      base = round2(a / (1 + r / 100));
      gst = round2(a - base);
      total = round2(a);
    }

    const cgst = supply === "intra" ? round2(gst / 2) : 0;
    const sgst = supply === "intra" ? round2(gst - cgst) : 0;
    const igst = supply === "inter" ? gst : 0;

    return { base, gst, cgst, sgst, igst, total };
  }, [amount, rate, mode, supply]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Inputs */}
      <div className="rounded-card border border-gray-200 bg-white p-6">
        <div>
          <label className={labelCls} htmlFor="gst-amount">
            Amount (₹)
          </label>
          <input
            id="gst-amount"
            className={inputCls}
            type="number"
            inputMode="decimal"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <label className={labelCls} htmlFor="gst-rate">
            GST rate
          </label>
          <select
            id="gst-rate"
            className={inputCls}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          >
            {GST_RATES.map((r) => (
              <option key={r} value={r}>
                {r}%
              </option>
            ))}
          </select>
        </div>

        <fieldset className="mt-4">
          <legend className={labelCls}>Amount is</legend>
          <div className="flex gap-2">
            <ToggleButton
              active={mode === "exclusive"}
              onClick={() => setMode("exclusive")}
            >
              GST exclusive
            </ToggleButton>
            <ToggleButton
              active={mode === "inclusive"}
              onClick={() => setMode("inclusive")}
            >
              GST inclusive
            </ToggleButton>
          </div>
        </fieldset>

        <fieldset className="mt-4">
          <legend className={labelCls}>Supply type</legend>
          <div className="flex gap-2">
            <ToggleButton
              active={supply === "intra"}
              onClick={() => setSupply("intra")}
            >
              Intra-state (CGST+SGST)
            </ToggleButton>
            <ToggleButton
              active={supply === "inter"}
              onClick={() => setSupply("inter")}
            >
              Inter-state (IGST)
            </ToggleButton>
          </div>
        </fieldset>
      </div>

      {/* Result */}
      <div className="rounded-card border border-gray-200 bg-white p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Result
        </p>
        <Row label="Base amount" value={formatINR(result.base)} />
        {supply === "intra" ? (
          <>
            <Row label={`CGST (${rate / 2}%)`} value={formatINR(result.cgst)} />
            <Row label={`SGST (${rate / 2}%)`} value={formatINR(result.sgst)} />
          </>
        ) : (
          <Row label={`IGST (${rate}%)`} value={formatINR(result.igst)} />
        )}
        <Row label="Total GST" value={formatINR(result.gst)} />
        <div className="mt-2 flex justify-between border-t-2 border-teal-800 py-2 text-lg font-bold text-teal-800">
          <span>Total amount</span>
          <span>{formatINR(result.total)}</span>
        </div>
      </div>
    </div>
  );
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "flex-1 rounded-control border px-3 py-2 text-sm font-medium " +
        (active
          ? "border-teal-800 bg-teal-50 text-teal-800"
          : "border-gray-300 text-gray-600 hover:border-teal-800")
      }
    >
      {children}
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1.5 text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-ink-900">{value}</span>
    </div>
  );
}
