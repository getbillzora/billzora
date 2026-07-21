import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://billzora.in"),
  title: {
    default: "Billzora — GST invoicing made simple",
    template: "%s · Billzora",
  },
  description:
    "Create GST-compliant invoices in seconds. Free, no login required.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
