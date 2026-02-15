import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-950 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-800 shadow-2xl rounded-2xl p-8 md:p-12">

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Privacy Policy
        </h1>

        <p className="text-sm text-gray-400 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-8 text-gray-300 leading-relaxed">

          {/* Introduction */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              1. Introduction
            </h2>
            <p>
              This Privacy Policy explains how we collect, use, disclose, and
              protect your information when you use our platform, including when
              you send tips, submit messages, or interact with live streams.
              By using our service, you agree to the collection and use of
              information in accordance with this policy.
            </p>
          </section>

          {/* Information Collected */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. Information We Collect
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email address, or contact information</li>
              <li>Messages submitted with tips</li>
              <li>Device, browser, and usage information</li>
            </ul>
          </section>

          {/* How Used */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. How We Use Your Information
            </h2>

            <ul className="list-disc pl-6 space-y-2">
              <li>To process payments and transactions</li>
              <li>To display messages on live streams</li>
              <li>To provide customer support</li>
              <li>To detect fraud or unauthorized activity</li>
              <li>To improve platform performance</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          {/* Payment Processing */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Payment Processing
            </h2>
            <p>
              Payments are processed through third-party payment providers such
              as Razorpay. We do not store full card numbers, CVV, or sensitive
              financial credentials. Payment providers may collect and process
              your data according to their own privacy policies.
            </p>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Information Sharing
            </h2>
            <p className="mb-3">
              We may share your information with:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Payment processors and financial institutions</li>
              <li>Legal authorities if required by law</li>
              <li>Fraud prevention and security providers</li>
              <li>Service providers assisting platform operations</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              6. Data Security
            </h2>
            <p>
              We implement reasonable technical and organizational safeguards
              to protect your data. However, no method of transmission over the
              internet is completely secure, and we cannot guarantee absolute
              security.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              7. Data Retention
            </h2>
            <p>
              We retain personal data only as long as necessary to provide our
              services, comply with legal obligations, resolve disputes, and
              enforce agreements.
            </p>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              8. Your Rights
            </h2>
            <p className="mb-3">You may have the right to:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of personal data</li>
              <li>Withdraw consent where applicable</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              9. Cookies and Tracking
            </h2>
            <p>
              We may use cookies or similar technologies to improve user
              experience, analyze traffic, and enhance functionality.
            </p>
          </section>

          {/* Children */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              10. Children’s Privacy
            </h2>
            <p>
              Our services are not intended for individuals under 18 years of
              age. We do not knowingly collect personal information from minors.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              11. Changes to this Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Continued use
              of the platform after changes indicates acceptance of the revised
              policy.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              12. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please contact:
            </p>

            <div className="mt-3 space-y-1">
              <p>Email: <span className="font-bold">Kunalkumar17aug@gmail.com</span> </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
