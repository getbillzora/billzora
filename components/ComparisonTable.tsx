import {
  COMPARISON_COLUMNS,
  COMPARISON_ROWS,
  type ComparisonCell,
  type ComparisonRow,
} from "@/lib/comparison";

interface Props {
  columns?: string[];
  rows?: ComparisonRow[];
}

/**
 * Data-driven comparison table. Horizontal scroll on mobile; fixed layout on
 * desktop. The first column (Billzora) is visually emphasised.
 */
export default function ComparisonTable({
  columns = COMPARISON_COLUMNS,
  rows = COMPARISON_ROWS,
}: Props) {
  return (
    <div>
      <div className="overflow-x-auto rounded-card border border-gray-200">
        <table className="w-full min-w-[640px] border-collapse text-sm md:table-fixed">
          <thead>
            <tr className="bg-teal-50 text-left">
              <th className="p-4 font-semibold text-ink-900">Feature</th>
              {columns.map((col, i) => (
                <th
                  key={col}
                  className={
                    "p-4 text-center font-semibold " +
                    (i === 0 ? "text-teal-800" : "text-ink-900")
                  }
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.feature} className="border-t border-gray-200">
                <th
                  scope="row"
                  className="p-4 text-left font-medium text-ink-900"
                >
                  {row.feature}
                </th>
                {row.cells.map((cell, i) => (
                  <td
                    key={i}
                    className={
                      "p-4 text-center align-top " +
                      (i === 0 ? "bg-teal-50/50" : "")
                    }
                  >
                    <Cell value={cell} emphasise={i === 0} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-gray-500">
        Competitor pricing as of 2026 — verify before publishing, these change
        often.
      </p>
    </div>
  );
}

function Cell({
  value,
  emphasise,
}: {
  value: ComparisonCell;
  emphasise: boolean;
}) {
  if (typeof value === "boolean") {
    return value ? (
      <Check emphasise={emphasise} />
    ) : (
      <Cross />
    );
  }
  if (typeof value === "string") {
    return (
      <span
        className={
          "font-medium " + (emphasise ? "text-teal-800" : "text-ink-900")
        }
      >
        {value}
      </span>
    );
  }
  // { ok, label }
  return (
    <span className="inline-flex flex-col items-center gap-1">
      {value.ok ? <Check emphasise={emphasise} /> : <Cross />}
      <span className="text-xs text-gray-500">{value.label}</span>
    </span>
  );
}

function Check({ emphasise }: { emphasise: boolean }) {
  return (
    <span
      aria-label="Yes"
      className={
        "text-base font-bold " + (emphasise ? "text-teal-800" : "text-teal-800")
      }
    >
      ✓
    </span>
  );
}

function Cross() {
  return (
    <span aria-label="No" className="text-base font-bold text-gray-300">
      ✗
    </span>
  );
}
