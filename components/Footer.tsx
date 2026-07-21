import Link from "next/link";

/** Shared footer. Used on every page. */
export default function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-8 text-sm text-gray-500 sm:flex-row sm:items-center lg:px-8">
        <span>© 2026 Billzora · GST-first invoicing for India</span>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-teal-800">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-teal-800">
            Terms
          </Link>
          <a
            href="mailto:hello.billzora@gmail.com"
            className="hover:text-teal-800"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
