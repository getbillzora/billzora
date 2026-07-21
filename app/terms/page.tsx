import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | Billzora",
  description:
    "Terms governing use of Billzora. Placeholder terms pending legal review.",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Nav />
      <LegalPage title="Terms of Service" updated="19 July 2026">
        <h2>1. Agreement to terms</h2>
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and
          use of the Billzora website and tools at billzora.in (the
          &ldquo;Service&rdquo;), operated by Billzora (&ldquo;Billzora&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;). By using the Service you agree to
          these Terms. If you do not agree, do not use the Service.
        </p>

        <h2>2. The Service</h2>
        <p>
          Billzora provides tools to create GST invoices and related documents.
          The free invoice generator runs in your browser and is provided to
          help you produce invoices; you are responsible for the accuracy of the
          information you enter and the invoices you issue.
        </p>

        <h2>3. Not tax or legal advice</h2>
        <p>
          The Service, including GST calculations, tax slabs, CGST/SGST/IGST
          splits and amount-in-words, is provided for convenience and does not
          constitute tax, accounting or legal advice. You are responsible for
          verifying that your invoices comply with applicable GST law and for
          consulting a qualified professional where appropriate. Billzora is not
          liable for errors in tax treatment, filings or compliance arising from
          your use of the Service.
        </p>

        <h2>4. Your responsibilities</h2>
        <ul>
          <li>
            Provide accurate business, customer, GSTIN and transaction details.
          </li>
          <li>
            Use the Service only for lawful purposes and not to create false,
            misleading or fraudulent documents.
          </li>
          <li>
            Keep any account credentials (where accounts are offered) secure.
          </li>
          <li>Comply with all applicable laws, including GST regulations.</li>
        </ul>

        <h2>5. Plans and payment</h2>
        <p>
          Certain features are offered under paid plans. Prices, inclusions and
          billing cycles are described on our pricing page and may change.
          Applicable taxes may be added. Except where required by law, fees are
          non-refundable.
        </p>

        <h2>6. Intellectual property</h2>
        <p>
          The Service, including its software, design and branding, is owned by
          Billzora and protected by applicable laws. You retain ownership of the
          content and data you enter. You may use the invoices you generate for
          your own business purposes.
        </p>

        <h2>7. Acceptable use</h2>
        <p>
          You agree not to misuse the Service, including by attempting to disrupt
          it, reverse-engineer it, access it through unauthorised means, or use
          it to infringe the rights of others.
        </p>

        <h2>8. Availability and changes</h2>
        <p>
          We may modify, suspend or discontinue any part of the Service at any
          time. We aim for reliable availability but do not guarantee that the
          Service will be uninterrupted or error-free.
        </p>

        <h2>9. Disclaimer of warranties</h2>
        <p>
          The Service is provided &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo; without warranties of any kind, whether express or
          implied, including fitness for a particular purpose and accuracy of
          calculations, to the maximum extent permitted by law.
        </p>

        <h2>10. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, Billzora shall not be liable
          for any indirect, incidental, special or consequential damages, or for
          loss of profits, revenue, data or goodwill, arising from your use of
          the Service. Our total liability for any claim shall not exceed the
          amount you paid us, if any, in the twelve months preceding the claim.
        </p>

        <h2>11. Indemnity</h2>
        <p>
          You agree to indemnify and hold Billzora harmless from claims arising
          out of your use of the Service or your breach of these Terms.
        </p>

        <h2>12. Governing law</h2>
        <p>
          These Terms are governed by the laws of India. Subject to applicable
          law, the courts at our registered place of business shall have
          jurisdiction over any disputes.
        </p>

        <h2>13. Changes to these Terms</h2>
        <p>
          We may update these Terms from time to time. Material changes will be
          reflected by updating the date at the top of this page. Continued use
          of the Service after changes constitutes acceptance.
        </p>

        <h2>14. Contact</h2>
        <p>
          Questions about these Terms? Email{" "}
          <a href="mailto:hello.billzora@gmail.com">hello.billzora@gmail.com</a>.
        </p>
      </LegalPage>
      <Footer />
    </main>
  );
}
