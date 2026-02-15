import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-950 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-800 shadow-2xl rounded-2xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Terms and Conditions
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-8 text-gray-300 leading-relaxed">

          {/* Agreement */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              1. Agreement to Terms
            </h2>
            <p>
              These Terms and Conditions ("Terms") constitute a legally binding
              agreement between you and this platform regarding your use of the
              website, services, and payment features, including sending
              voluntary monetary tips and displaying messages on live streams
              or digital broadcasts.
            </p>
            <p className="mt-3">
              By accessing or using this platform, you agree to be bound by
              these Terms, our Privacy Policy, and any applicable payment
              provider terms including those of Razorpay. If you do not agree,
              you must not use the service.
            </p>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. Description of Service
            </h2>
            <p>
              The platform enables users to voluntarily send monetary tips along
              with optional messages. These tips and messages may be publicly
              displayed during live streams, overlays, recordings, or other
              digital media.
            </p>
            <p className="mt-3">
              The platform acts solely as a technology intermediary facilitating
              payments and message display. We do not provide financial
              services, escrow, or guarantee any outcomes from tipping.
            </p>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. Eligibility
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be at least 18 years of age.</li>
              <li>
                You must have legal capacity to enter binding contracts under
                Indian law or applicable jurisdiction.
              </li>
              <li>
                You must provide accurate payment and identity information when
                required.
              </li>
              <li>
                You must comply with all applicable laws including financial,
                tax, and electronic transaction regulations.
              </li>
            </ul>
          </section>

          {/* Razorpay Processing */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Payment Processing via Razorpay
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                All payments are processed through Razorpay or other authorized
                payment gateways.
              </li>
              <li>
                By making a payment, you agree to Razorpay's terms of service
                and privacy policy.
              </li>
              <li>
                We do not store full card numbers, CVV, or sensitive financial
                credentials.
              </li>
              <li>
                Payment authorization, capture, settlement, and verification are
                handled by Razorpay.
              </li>
              <li>
                Razorpay may perform fraud detection, KYC verification, or risk
                monitoring as required by law.
              </li>
              <li>
                Transactions may be declined, delayed, or reversed by Razorpay
                or banking partners.
              </li>
            </ul>
          </section>

          {/* Voluntary Donations */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Voluntary Tips and Donations
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                All payments made through the platform are voluntary tips or
                donations.
              </li>
              <li>
                Tips are not purchases of goods or services unless explicitly
                stated.
              </li>
              <li>
                No ownership rights, equity, or contractual benefits are
                granted in exchange for tips.
              </li>
              <li>
                Users are responsible for understanding the voluntary nature of
                payments before completion.
              </li>
            </ul>
          </section>

          {/* Settlement and Fees */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              6. Fees, Settlement, and Charges
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Payment gateway fees, taxes, or bank charges may apply.
              </li>
              <li>
                Currency conversion fees may apply for international cards.
              </li>
              <li>
                Settlement timelines depend on Razorpay and banking partners.
              </li>
              <li>
                We are not responsible for settlement delays or banking issues.
              </li>
            </ul>
          </section>

          {/* Refund Policy */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              7. Refunds and Chargebacks
            </h2>
            <p className="mb-3">
              All tips are final and non-refundable except where required by
              applicable law.
            </p>
            <p className="mb-3">Refunds may be considered only in cases of:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Duplicate payment</li>
              <li>Technical transaction failure</li>
              <li>Unauthorized payment confirmed by investigation</li>
              <li>Legal or regulatory requirement</li>
            </ul>
            <p className="mt-3">
              Users may raise disputes or chargebacks through their bank or
              Razorpay. Fraudulent chargebacks may result in account
              suspension.
            </p>
          </section>

          {/* Content License */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              8. Content License
            </h2>
            <p>
              By submitting messages, names, or media with a tip, you grant the
              platform a worldwide, perpetual, non-exclusive, royalty-free
              license to display, reproduce, broadcast, store, and distribute
              such content for streaming, marketing, analytics, and operational
              purposes.
            </p>
          </section>

          {/* Moderation */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              9. Content Moderation
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Messages may be moderated, filtered, or rejected.</li>
              <li>Display timing is not guaranteed.</li>
              <li>
                Content violating law, Razorpay policies, or platform rules may
                be removed.
              </li>
            </ul>
          </section>

          {/* Prohibited Transactions */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              10. Prohibited Transactions and Activities
            </h2>
            <p className="mb-3">Users must not use the platform for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Money laundering or illegal financial activity</li>
              <li>Fraudulent or unauthorized payments</li>
              <li>Gambling or betting where prohibited</li>
              <li>Sale of illegal goods or services</li>
              <li>Hate, harassment, or unlawful content</li>
              <li>Transactions restricted by RBI or Razorpay</li>
            </ul>
          </section>

          {/* Compliance */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              11. Regulatory Compliance
            </h2>
            <p>
              The platform complies with applicable Indian laws including the
              Information Technology Act, RBI regulations, and payment
              processing standards. Users agree to cooperate with identity
              verification, fraud checks, or compliance reviews if required.
            </p>
          </section>

          {/* Limitation */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              12. Limitation of Liability
            </h2>
            <p>
              We shall not be liable for payment failures, gateway downtime,
              bank errors, settlement delays, fraud attempts, or technical
              interruptions.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              13. Indemnification
            </h2>
            <p>
              You agree to indemnify and hold harmless the platform and its
              operators from claims, losses, damages, or legal expenses arising
              from misuse, illegal activity, or violation of these Terms.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              14. Suspension and Termination
            </h2>
            <p>
              We may suspend or terminate access immediately if fraud,
              suspicious transactions, policy violations, or legal risks are
              detected.
            </p>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              15. Privacy and Data Protection
            </h2>
            <p>
              Personal data is handled according to our Privacy Policy and may
              be shared with payment processors, regulators, or law enforcement
              when legally required.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              16. Governing Law and Jurisdiction
            </h2>
            <p>
              These Terms shall be governed by and interpreted under the laws of
              India. Courts located in the platform owner's registered
              jurisdiction shall have exclusive jurisdiction.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              17. Changes to Terms
            </h2>
            <p>
              We may update these Terms at any time. Continued use of the
              platform after changes constitutes acceptance of the revised
              Terms.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              18. Contact Information
            </h2>
            <p>
              For support, disputes, or legal inquiries, contact your official
              business email or registered office address.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
