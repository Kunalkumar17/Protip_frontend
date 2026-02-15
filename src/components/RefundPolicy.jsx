import React from "react";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gray-950 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-800 shadow-2xl rounded-2xl p-8 md:p-12">

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Refund Policy
        </h1>

        <p className="text-sm text-gray-400 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-8 text-gray-300 leading-relaxed">

          {/* Overview */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              1. Overview
            </h2>
            <p>
              This Refund Policy explains the conditions under which refunds
              may be issued for transactions made on our platform. All payments
              made through the platform are voluntary tips or digital
              contributions and are generally non-refundable.
            </p>
          </section>

          {/* Non refundable */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. Non-Refundable Payments
            </h2>
            <p>
              Because payments represent voluntary digital contributions,
              refunds are not provided once a transaction has been successfully
              completed and processed, except in specific circumstances
              described below.
            </p>
          </section>

          {/* Eligible */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. Eligible Refund Situations
            </h2>

            <p className="mb-3">
              Refunds may be considered only under the following conditions:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Duplicate or multiple payments for the same transaction</li>
              <li>Technical payment processing errors</li>
              <li>Unauthorized or fraudulent transactions (verified)</li>
              <li>Payment charged but service not delivered due to system failure</li>
              <li>Refund required under applicable law</li>
            </ul>
          </section>

          {/* Not eligible */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Non-Eligible Refund Situations
            </h2>

            <p className="mb-3">
              Refunds will NOT be provided for:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Change of mind after payment</li>
              <li>Dissatisfaction with message display timing</li>
              <li>Failure to read platform terms before payment</li>
              <li>User input errors (wrong amount, message, etc.)</li>
              <li>Moderation or removal of content violating policies</li>
            </ul>
          </section>

          {/* How to request */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Refund Request Process
            </h2>

            <p className="mb-3">
              To request a refund, please contact our support team with:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>Transaction ID</li>
              <li>Date and amount of payment</li>
              <li>Reason for refund request</li>
              <li>Proof of payment if available</li>
            </ul>
          </section>

          {/* Processing */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              6. Refund Processing Time
            </h2>
            <p>
              Approved refunds are processed through the original payment
              method via our payment gateway provider. Refunds may take
              5–10 business days to reflect in your account depending on
              banking and payment network timelines.
            </p>
          </section>

          {/* Chargebacks */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              7. Chargebacks and Disputes
            </h2>
            <p>
              Users may raise disputes or chargebacks through their bank or
              payment provider. Fraudulent or abusive chargebacks may result in
              suspension or restriction of platform access.
            </p>
          </section>

          {/* Policy changes */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              8. Changes to this Policy
            </h2>
            <p>
              We reserve the right to modify this Refund Policy at any time.
              Continued use of the platform after changes indicates acceptance
              of the updated policy.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              9. Contact Information
            </h2>

            <p>If you have questions or wish to request a refund:</p>

            <div className="mt-3 space-y-1">
              <p>
                Email:{" "}
                <a
                  href="mailto:Kunalkumar17aug@gmail.com"
                  className="font-semibold text-blue-400 hover:underline"
                >
                  Kunalkumar17aug@gmail.com
                </a>
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
