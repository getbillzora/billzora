import type { ReactNode } from "react";

/** Reusable styled prose container for SEO copy on tool pages (no Tailwind
 * Typography dependency; scoped element styles). */
export default function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="tool-prose">
      {children}
      <style>{`
        .tool-prose h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2c2c2a;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .tool-prose h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #085041;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .tool-prose p { color: #4b5563; margin-bottom: 0.85rem; line-height: 1.7; }
        .tool-prose ul { list-style: disc; padding-left: 1.25rem; color: #4b5563; margin-bottom: 0.85rem; }
        .tool-prose ol { list-style: decimal; padding-left: 1.25rem; color: #4b5563; margin-bottom: 0.85rem; }
        .tool-prose li { margin-bottom: 0.4rem; line-height: 1.65; }
        .tool-prose a { color: #085041; text-decoration: underline; }
        .tool-prose strong { color: #2c2c2a; }
      `}</style>
    </div>
  );
}
