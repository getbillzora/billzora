import Link from "next/link";

/** Shared top navigation. Used on every page. */
export default function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <Link href="/" className="text-lg font-bold text-teal-800">
          Billzora
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/features"
            className="text-sm text-ink-900 hover:text-teal-800"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-ink-900 hover:text-teal-800"
          >
            Pricing
          </Link>
          <Link
            href="/pricing#business"
            className="text-sm text-ink-900 hover:text-teal-800"
          >
            For CAs
          </Link>
        </div>

        <Link
          href="/invoice-generator"
          className="rounded-control bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800"
        >
          Try free
        </Link>
      </nav>
    </header>
  );
}
