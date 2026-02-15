import React from "react";

export default function ShippingDeliveryPolicy() {
  return (
    <div className="min-h-screen bg-gray-950 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-800 shadow-2xl rounded-2xl p-8 md:p-12">

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Shipping & Delivery Policy
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
              This platform provides digital services only. We do not sell,
              ship, or deliver any physical goods. All transactions made on this
              platform relate to voluntary tips, digital interactions, or
              online content display.
            </p>
          </section>

          {/* Digital Delivery */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. Digital Service Delivery
            </h2>
            <p>
              When a user sends a tip or message, the delivery of the service is
              performed digitally. This may include:
            </p>

            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Displaying the message on a live stream</li>
              <li>Showing notifications or overlays</li>
              <li>Recording or storing the message</li>
              <li>Providing digital acknowledgment of the tip</li>
            </ul>
          </section>

          {/* Delivery Time */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. Delivery Timeframe
            </h2>
            <p>
              Digital services are typically delivered instantly after
              successful payment confirmation. However, delivery time may vary
              depending on:
            </p>

            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Live stream moderation or filtering</li>
              <li>Network or technical delays</li>
              <li>Payment verification processes</li>
              <li>Platform maintenance or downtime</li>
            </ul>
          </section>

          {/* No Guarantee */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Delivery Limitations
            </h2>
            <p>
              While we aim to deliver digital services promptly, we do not
              guarantee that messages or content will always be displayed
              immediately or in all circumstances. Content may be moderated,
              delayed, or removed if it violates platform policies or legal
              requirements.
            </p>
          </section>

          {/* Failed Delivery */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Failed or Delayed Delivery
            </h2>
            <p>
              In rare cases, technical errors may prevent digital delivery. If
              this occurs, users may contact support for assistance. Refunds, if
              applicable, are handled according to our Refund Policy.
            </p>
          </section>

          {/* Geographic */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              6. Geographic Availability
            </h2>
            <p>
              Our digital services are accessible globally where internet
              access is available, subject to payment gateway availability and
              legal restrictions in certain regions.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              7. Contact Information
            </h2>
            <p>
              If you have any questions regarding shipping or delivery, please
              contact:
            </p>

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
