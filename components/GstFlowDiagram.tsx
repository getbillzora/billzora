// Flat inline SVG explaining intra-state (CGST+SGST) vs inter-state (IGST).
// No external request, no gradients/shadows — consistent with the brand rules.
export default function GstFlowDiagram() {
  return (
    <figure className="my-6">
      <svg
        viewBox="0 0 640 360"
        role="img"
        aria-labelledby="gstflow-title gstflow-desc"
        className="h-auto w-full max-w-full rounded-card border border-gray-200 bg-white"
      >
        <title id="gstflow-title">How GST splits by place of supply</title>
        <desc id="gstflow-desc">
          Within the same state, GST is split into CGST and SGST. Between
          different states, the full GST is charged as IGST.
        </desc>

        {/* Row 1: intra-state */}
        <text x="24" y="40" fontSize="15" fontWeight="700" fill="#085041">
          Same state → CGST + SGST
        </text>
        <rect x="24" y="56" width="150" height="52" rx="8" fill="#E1F5EE" />
        <text x="99" y="80" fontSize="13" fill="#2C2C2A" textAnchor="middle">
          Seller
        </text>
        <text x="99" y="98" fontSize="11" fill="#6B7280" textAnchor="middle">
          Karnataka
        </text>

        <line x1="174" y1="82" x2="250" y2="82" stroke="#085041" strokeWidth="2" />
        <polygon points="250,82 242,77 242,87" fill="#085041" />

        <rect x="250" y="56" width="150" height="52" rx="8" fill="#E1F5EE" />
        <text x="325" y="80" fontSize="13" fill="#2C2C2A" textAnchor="middle">
          Buyer
        </text>
        <text x="325" y="98" fontSize="11" fill="#6B7280" textAnchor="middle">
          Karnataka
        </text>

        <line x1="400" y1="82" x2="470" y2="82" stroke="#BA7517" strokeWidth="2" />
        <polygon points="470,82 462,77 462,87" fill="#BA7517" />

        <rect x="470" y="52" width="146" height="28" rx="6" fill="#FAEEDA" />
        <text x="543" y="71" fontSize="12" fontWeight="700" fill="#633806" textAnchor="middle">
          CGST 9%
        </text>
        <rect x="470" y="84" width="146" height="28" rx="6" fill="#FAEEDA" />
        <text x="543" y="103" fontSize="12" fontWeight="700" fill="#633806" textAnchor="middle">
          SGST 9%
        </text>

        {/* Divider */}
        <line x1="24" y1="176" x2="616" y2="176" stroke="#E5E7EB" strokeWidth="1" />

        {/* Row 2: inter-state */}
        <text x="24" y="220" fontSize="15" fontWeight="700" fill="#085041">
          Different states → IGST
        </text>
        <rect x="24" y="236" width="150" height="52" rx="8" fill="#E1F5EE" />
        <text x="99" y="260" fontSize="13" fill="#2C2C2A" textAnchor="middle">
          Seller
        </text>
        <text x="99" y="278" fontSize="11" fill="#6B7280" textAnchor="middle">
          Karnataka
        </text>

        <line x1="174" y1="262" x2="250" y2="262" stroke="#085041" strokeWidth="2" />
        <polygon points="250,262 242,257 242,267" fill="#085041" />

        <rect x="250" y="236" width="150" height="52" rx="8" fill="#E1F5EE" />
        <text x="325" y="260" fontSize="13" fill="#2C2C2A" textAnchor="middle">
          Buyer
        </text>
        <text x="325" y="278" fontSize="11" fill="#6B7280" textAnchor="middle">
          Maharashtra
        </text>

        <line x1="400" y1="262" x2="470" y2="262" stroke="#BA7517" strokeWidth="2" />
        <polygon points="470,262 462,257 462,267" fill="#BA7517" />

        <rect x="470" y="248" width="146" height="28" rx="6" fill="#FAEEDA" />
        <text x="543" y="267" fontSize="12" fontWeight="700" fill="#633806" textAnchor="middle">
          IGST 18%
        </text>

        <text x="24" y="332" fontSize="11" fill="#6B7280">
          The total GST is the same (18%) — only how it&apos;s split differs.
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-gray-500">
        GST splits by place of supply: intra-state vs inter-state.
      </figcaption>
    </figure>
  );
}
