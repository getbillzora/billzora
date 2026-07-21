interface FaqItem {
  q: string;
  a: string;
}

/**
 * Accessible, no-JS FAQ list (native <details>). The visible Q&A is crawlable;
 * pages that use this should also emit FAQPage JSON-LD from the same data.
 */
export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-gray-200 rounded-card border border-gray-200">
      {items.map((item) => (
        <details key={item.q} className="group p-5">
          <summary className="cursor-pointer list-none font-semibold text-ink-900 marker:content-none">
            <span className="flex items-center justify-between gap-4">
              {item.q}
              <span className="text-teal-800 transition-transform group-open:rotate-45">
                +
              </span>
            </span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
