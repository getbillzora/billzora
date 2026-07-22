import Link from "next/link";
import { COMPETITORS } from "@/lib/competitors";

/** Shared footer. Used on every page. */
export default function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Internal links: tools + comparisons (helps crawl/indexing). */}
        <div className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-3">
          <div>
            <p className="font-semibold text-ink-900">Tools</p>
            <ul className="mt-2 space-y-1 text-gray-500">
              <li>
                <Link href="/invoice-generator" className="hover:text-teal-800">
                  Invoice generator
                </Link>
              </li>
              <li>
                <Link
                  href="/gst-invoice-software"
                  className="hover:text-teal-800"
                >
                  GST invoice software
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-ink-900">Compare</p>
            <ul className="mt-2 space-y-1 text-gray-500">
              {COMPETITORS.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/billzora-vs-${c.slug}`}
                    className="hover:text-teal-800"
                  >
                    Billzora vs {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-ink-900">Company</p>
            <ul className="mt-2 space-y-1 text-gray-500">
              <li>
                <Link href="/about" className="hover:text-teal-800">
                  About
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-teal-800">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-teal-800">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-teal-800">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-teal-800">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-teal-800">
                  Terms
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello.billzora@gmail.com"
                  className="hover:text-teal-800"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-8 border-t border-gray-200 pt-6 text-sm text-gray-500">
          © 2026 Billzora · GST-first invoicing for India
        </p>
      </div>
    </footer>
  );
}
