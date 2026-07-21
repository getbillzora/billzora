import type { ReactNode } from "react";

interface Props {
  title: string;
  updated: string;
  children: ReactNode;
}

/**
 * Shared shell for legal pages. Renders the placeholder banner, the title, and
 * a styled prose container. Uses scoped element selectors (no Tailwind Typography
 * dependency) so headings/lists inside `children` are styled consistently.
 */
export default function LegalPage({ title, updated, children }: Props) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      {/* Placeholder notice — must be unmissable. */}
      <div className="rounded-card border border-amber-600 bg-amber-50 p-4">
        <p className="text-sm font-semibold text-amber-800">
          ⚠️ Placeholder document — pending legal review
        </p>
        <p className="mt-1 text-sm text-amber-800">
          This is standard boilerplate provided for development purposes only. It
          is not legal advice and has not been reviewed by a qualified lawyer.
          Replace it with terms reviewed for your business before going live.
        </p>
      </div>

      <h1 className="mt-8 text-3xl font-bold text-ink-900">{title}</h1>
      <p className="mt-1 text-sm text-gray-500">Last updated: {updated}</p>

      <div className="legal-prose mt-8">{children}</div>

      {/* Local styles for the prose block. */}
      <style>{`
        .legal-prose h2 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #2c2c2a;
          margin-top: 2rem;
          margin-bottom: 0.5rem;
        }
        .legal-prose p { color: #4b5563; margin-bottom: 0.75rem; line-height: 1.65; }
        .legal-prose ul {
          list-style: disc;
          padding-left: 1.25rem;
          color: #4b5563;
          margin-bottom: 0.75rem;
        }
        .legal-prose li { margin-bottom: 0.35rem; line-height: 1.6; }
        .legal-prose a { color: #085041; text-decoration: underline; }
        .legal-prose strong { color: #2c2c2a; }
      `}</style>
    </section>
  );
}
