"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is a smart home automation system?",
    answer:
      "A smart home automation system allows you to control lights, curtains, door locks, sensors, and appliances using a mobile app, smart panel, or voice assistant.",
  },
  {
    question: "Can I control my smart devices remotely?",
    answer:
      "Yes, you can control your smart devices remotely using a mobile app as long as your system is connected to the internet.",
  },
  {
    question: "Do smart devices work without the internet?",
    answer:
      "Basic functions may work on local Wi-Fi, but remote access, notifications, and cloud automation require an internet connection.",
  },
  {
    question: "What is scene creation?",
    answer:
      "Scene creation allows you to control multiple devices with a single tap, such as turning off lights, closing curtains, and locking doors together.",
  },
  {
    question: "Are smart door locks safe?",
    answer:
      "Yes, smart door locks use encrypted communication and support secure access methods like PIN, fingerprint, RFID, and mobile app control.",
  },
  {
    question: "Can I give temporary access to guests?",
    answer:
      "Yes, you can provide time-based or temporary access to guests, family members, or service staff through the app.",
  },
  {
    question: "What happens during a power cut?",
    answer:
      "Most devices resume their previous state after power restoration, and some devices support battery backup.",
  },
  {
    question: "Can I control devices using voice assistants?",
    answer:
      "Yes, our smart devices support Google Assistant and Alexa for hands-free control.",
  },
  {
    question: "Is professional installation required?",
    answer:
      "Professional installation is recommended for best performance, especially for door locks and integrated automation systems.",
  },
  {
    question: "Can I upgrade my existing home?",
    answer:
      "Yes, smart automation solutions can be installed in both new and existing homes with minimal modifications.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
    <section className="bg-[#f5f6f7] pt-20 pb-8 px-4 md:pt-28 md:pb-16">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Everything you need to know about smart home automation
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-4 md:p-6 text-left"
              >
                <span className="text-sm md:text-lg font-medium text-gray-900">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-4 pb-4 md:px-6 md:pb-6 text-gray-600 text-sm md:text-base">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Still have questions?
          </p>
          <a
            href="/contact-us"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition"
          >
            Contact Support
            <span className="text-lg">→</span>
          </a>
        </div>
      </div>
    </section>
    </>
  );
}
