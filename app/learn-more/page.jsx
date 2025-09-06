"use client"
import React from "react";

const LearnMore = () => {
  const features = [
    "Easy mobile app control from anywhere",
    "Automated lighting and climate schedules",
    "Energy consumption monitoring",
    "Smart security sensors and alerts",
    "Seamless integration with voice assistants",
  ];

  const technicalSpecs = [
    { label: "Connectivity", value: "Wi-Fi 802.11 b/g/n, Zigbee, Z-Wave" },
    { label: "Power Source", value: "110-240V AC / Battery backup" },
    { label: "Compatibility", value: "iOS & Android mobile apps" },
    { label: "Installation", value: "Professional quick setup" },
    { label: "Data Security", value: "End-to-end encryption with GDPR compliance" },
  ];

  const benefits = [
    "Reduce energy bills by up to 30%",
    "Control your home effortlessly with your phone or voice",
    "Improve home security with real-time alerts",
    "Increase comfort with customizable ambiance settings",
    "Enhance property value with smart tech upgrades",
  ];

  return (
    <main className="bg-gray-50 min-h-screen py-12 px-6 md:px-12 lg:px-24">
      <section className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-extrabold text-indigo-900 mb-6 text-center">
          Learn More About AUTOMENSOR Smart Home Solutions
        </h1>

        <p className="text-lg text-gray-700 text-center mb-10 max-w-3xl mx-auto leading-relaxed">
          Unlock the full potential of your home with AUTOMENSOR’s reliable, modern,
          and user-friendly home automation packages. Below is everything you need to know
          to get started and transform how you live.
        </p>

        {/* Features */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg max-w-3xl mx-auto">
            {features.map((feature, i) => (
              <li key={i} className="hover:text-indigo-600 transition-colors">{feature}</li>
            ))}
          </ul>
        </div>

        {/* Technical Specifications */}
        <div className="mb-10 overflow-x-auto">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Technical Specifications</h2>
          <table className="w-full text-left text-gray-800 border-separate border-spacing-y-4">
            <tbody>
              {technicalSpecs.map((spec, i) => (
                <tr
                  key={i}
                  className="bg-indigo-50 rounded-lg drop-shadow-md"
                >
                  <th className="p-4 text-indigo-900 font-semibold w-48">{spec.label}</th>
                  <td className="p-4">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Benefits */}
        <div className="mb-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Benefits</h2>
          <ul className="list-decimal list-inside space-y-2 text-gray-700 text-lg">
            {benefits.map((b, i) => (
              <li key={i} className="hover:text-indigo-600 transition-colors">{b}</li>
            ))}
          </ul>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <a
            href="/contact"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-12 py-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
            aria-label="Contact us to get started"
          >
            Contact Us to Get Started
          </a>
        </div>
      </section>
    </main>
  );
};

export default LearnMore;
