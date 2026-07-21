import Link from "next/link";

interface Plan {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  featured?: boolean;
  cta: string;
}

const PLANS: Plan[] = [
  {
    name: "Free",
    price: "₹0",
    cadence: "forever",
    blurb: "Everything you need to send your first invoices.",
    features: [
      "Unlimited invoices",
      "UPI collection",
      "WhatsApp share",
      "Basic reports",
    ],
    cta: "Start free",
  },
  {
    name: "Pro",
    price: "₹1,999",
    cadence: "per year",
    blurb: "Compliance and branding for growing businesses.",
    features: [
      "Everything in Free",
      "E-invoicing (IRN)",
      "E-way bills",
      "No Billzora branding",
      "GST reports",
      "Priority support",
    ],
    featured: true,
    cta: "Get Pro",
  },
  {
    name: "Business",
    price: "₹4,999",
    cadence: "per year",
    blurb: "For multi-entity teams and their accountants.",
    features: [
      "Everything in Pro",
      "Multi-company",
      "CA collaboration",
      "GSTR filing",
      "Bank reconciliation",
    ],
    cta: "Get Business",
  },
];

export default function PricingCards() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {PLANS.map((plan) => (
        <div
          key={plan.name}
          id={plan.name.toLowerCase()}
          className={
            "flex flex-col rounded-card bg-white p-6 " +
            (plan.featured
              ? "border-2 border-amber-600"
              : "border border-gray-200")
          }
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-ink-900">{plan.name}</h3>
            {plan.featured && (
              <span className="rounded-control bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-800">
                Most popular
              </span>
            )}
          </div>

          <div className="mt-4">
            <span className="text-3xl font-bold text-teal-800">
              {plan.price}
            </span>
            <span className="ml-1 text-sm text-gray-500">{plan.cadence}</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">{plan.blurb}</p>

          <ul className="mt-6 flex-1 space-y-2 text-sm text-ink-900">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-0.5 font-bold text-teal-800">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/invoice-generator"
            className={
              "mt-6 rounded-control px-4 py-2.5 text-center text-sm font-semibold " +
              (plan.featured
                ? "bg-amber-600 text-white hover:bg-amber-800"
                : "border border-teal-800 text-teal-800 hover:bg-teal-50")
            }
          >
            {plan.cta}
          </Link>
        </div>
      ))}
    </div>
  );
}
