import Link from "next/link";
import { relatedTools } from "@/lib/tools";

/** Internal-link block to related free tools (helps crawl + funnels users). */
export default function RelatedTools({
  currentHref,
  count = 3,
}: {
  currentHref: string;
  count?: number;
}) {
  const tools = relatedTools(currentHref, count);
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
        Related free tools
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="rounded-card border border-gray-200 p-4 hover:border-teal-800"
          >
            <p className="font-semibold text-teal-800">{t.name}</p>
            <p className="mt-1 text-sm text-gray-600">{t.blurb}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
