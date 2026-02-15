import React from "react";

export default function ContactUs() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-6">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-10 max-w-xl w-full">

        <h1 className="text-3xl font-bold text-white mb-6">
          Contact Us
        </h1>

        <p className="text-gray-300 mb-6 leading-relaxed">
          We're here to help! If you have any questions, feedback, or concerns
          about <span className="font-semibold text-white">ProTip</span>, 
          please don't hesitate to reach out.
        </p>

        <div className="text-gray-300 space-y-2">
          <p className="font-semibold text-white">Email Support:</p>

          <p>
            You can email us directly at:{" "}
            <a
              href="mailto:kunalkumar17aug@gmail.com"
              className="text-blue-400 font-semibold hover:underline"
            >
              Kunalkumar117aug@gmail.com
            </a>
          </p>

          <p className="text-gray-400">
            We aim to respond to all inquiries within 24–48 hours.
          </p>
        </div>

      </div>
    </div>
  );
}
