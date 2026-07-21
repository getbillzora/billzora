# Billzora

GST-first invoicing for India. Next.js 14 (App Router) + Tailwind, no auth / no DB.

## Status (Phase 1)

Per the build brief, only **Page 1 — `/invoice-generator`** is built so far. The
homepage (`/`) currently redirects to the tool; the real homepage and
`/gst-invoice-software` are the next steps and share the same invoice engine.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000/invoice-generator
npm test         # unit tests for the GST engine
npm run build    # production build
```

## Architecture

The reusable engine (shared by preview and PDF, unit-tested):

- `lib/gstCalculator.ts` — pure calculation: taxable, CGST/SGST vs IGST, rounding, breakup
- `lib/amountInWords.ts` — Indian-numbering amount-in-words
- `lib/gstin.ts` — 15-char GSTIN pattern + checksum validation
- `lib/states.ts` — Indian states with GST codes (drives intra/inter-state logic)
- `lib/form.ts` / `lib/types.ts` — form state, resolution to numeric invoice, UPI link

Components:

- `components/InvoiceForm.tsx` — all inputs
- `components/InvoicePreview.tsx` — live HTML invoice
- `components/InvoicePDF.tsx` — `@react-pdf/renderer` document (lazy-loaded on export)
- `components/InvoiceGenerator.tsx` — orchestrator (state, calc, PDF, share, capture)

GST logic: same business/client state → CGST + SGST (half each); different states →
full IGST. Grand total rounded to the nearest rupee with a round-off line.

## Known caveats / Phase-2 hooks

- **WhatsApp share** currently downloads the PDF and opens WhatsApp pre-filled with
  the invoice summary. A *hosted* PDF share-link needs lightweight storage (out of
  scope for Phase 1's "no DB" constraint) — see `TODO(phase-2)` in
  `components/InvoiceGenerator.tsx`.
- **Email capture** stores leads in `localStorage` only (non-blocking). Wire to a
  backend when accounts launch.
- **Next.js** is pinned to the latest patched `14.2.x` per the brief. Remaining
  `npm audit` findings are dev-only tooling (vitest/vite/esbuild) or Next
  self-hosted image-optimizer/dev-server issues that don't affect a Vercel-hosted,
  client-side tool.
