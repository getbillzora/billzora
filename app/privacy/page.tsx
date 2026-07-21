import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Billzora",
  description:
    "How Billzora handles your data. Placeholder policy pending legal review.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Nav />
      <LegalPage title="Privacy Policy" updated="19 July 2026">
        <h2>1. Who we are</h2>
        <p>
          Billzora (&ldquo;Billzora&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)
          provides GST invoicing and related tools for businesses in India. This
          Privacy Policy explains what information we collect when you use our
          website and tools at billzora.in, and how we use it. You can reach us
          at{" "}
          <a href="mailto:hello.billzora@gmail.com">hello.billzora@gmail.com</a>.
        </p>

        <h2>2. Information we collect</h2>
        <p>
          The Billzora invoice generator runs in your browser. The invoice
          details you enter — business and client names, GSTINs, addresses, line
          items and amounts — are processed on your device to build a live
          preview and PDF and are not required to be sent to our servers to use
          the free tool.
        </p>
        <p>We may collect:</p>
        <ul>
          <li>
            <strong>Contact information</strong> you choose to provide, such as
            an email address submitted to save an invoice or receive payment
            reminders.
          </li>
          <li>
            <strong>Usage and device data</strong>, such as pages visited,
            approximate location, browser type and similar analytics, collected
            to operate and improve the service.
          </li>
          <li>
            <strong>Communications</strong> you send us, such as support
            requests.
          </li>
        </ul>

        <h2>3. How we use your information</h2>
        <ul>
          <li>To provide, maintain and improve the Billzora tools.</li>
          <li>
            To send transactional messages and, where you have opted in,
            payment reminders and product updates.
          </li>
          <li>To respond to your enquiries and provide support.</li>
          <li>
            To detect, prevent and address technical issues, fraud or misuse.
          </li>
          <li>To comply with applicable law.</li>
        </ul>

        <h2>4. Legal basis and consent</h2>
        <p>
          We process personal data on the basis of your consent, to perform a
          service you have requested, and to comply with legal obligations,
          consistent with India&rsquo;s Digital Personal Data Protection Act,
          2023 and other applicable laws. You may withdraw consent at any time.
        </p>

        <h2>5. Sharing your information</h2>
        <p>
          We do not sell your personal data. We may share information with
          service providers who help us run the service (for example hosting and
          email delivery), and where required by law or to protect our rights.
          Service providers are expected to handle data consistent with this
          policy.
        </p>

        <h2>6. Data retention</h2>
        <p>
          We retain personal data only for as long as needed for the purposes
          described here or as required by law, after which it is deleted or
          anonymised.
        </p>

        <h2>7. Security</h2>
        <p>
          We use reasonable technical and organisational measures to protect
          your information. No method of transmission or storage is completely
          secure, and we cannot guarantee absolute security.
        </p>

        <h2>8. Your rights</h2>
        <p>
          Subject to applicable law, you may request access to, correction of,
          or deletion of your personal data, and may withdraw consent. To make a
          request, contact us at{" "}
          <a href="mailto:hello.billzora@gmail.com">hello.billzora@gmail.com</a>.
        </p>

        <h2>9. Cookies</h2>
        <p>
          We may use cookies or similar technologies for essential functionality
          and analytics. You can control cookies through your browser settings.
        </p>

        <h2>10. Children</h2>
        <p>
          Billzora is intended for businesses and is not directed to individuals
          under 18. We do not knowingly collect data from children.
        </p>

        <h2>11. Changes to this policy</h2>
        <p>
          We may update this policy from time to time. Material changes will be
          reflected by updating the date at the top of this page.
        </p>

        <h2>12. Contact</h2>
        <p>
          Questions about this policy? Email{" "}
          <a href="mailto:hello.billzora@gmail.com">hello.billzora@gmail.com</a>.
        </p>
      </LegalPage>
      <Footer />
    </main>
  );
}
