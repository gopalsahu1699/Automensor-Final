"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";


export default function FAQs() {
  const faqItems = [
    {
      question: "What is home automation?",
      answer:
        "Home automation allows you to control lights, climate, security, and appliances from a single app or device, making your home smarter and more efficient.",
    },
    {
      question: "Do I need a special Wi-Fi for automation?",
      answer:
        "No. Our solutions are designed to work on standard home Wi-Fi networks, ensuring seamless connectivity for all your devices.",
    },
    {
      question: "Can I control my home remotely?",
      answer:
        "Yes! Autommensor allows full remote control via your smartphone or tablet from anywhere in the world.",
    },
    {
      question: "Is installation complicated?",
      answer:
        "Not at all. Our certified professionals handle installation and setup, ensuring everything works perfectly.",
    },
    {
      question: "Do you provide warranty?",
      answer:
        "Absolutely! We offer a 10 year warranty on all our products and systems and on site service, giving you peace of mind.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-slate-900 mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Frequently Asked Questions
        </motion.h2>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none"
              >
                <span className="text-base sm:text-lg font-medium text-slate-900">
                  {item.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-600" />
                )}
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 text-sm sm:text-base text-slate-600"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

     {/* Right-aligned CTA */}
<div className="mt-10 flex justify-end">
  <Link
    href="/faq"
    className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition"
  >
    More
    <span className="text-lg">→</span>
  </Link>
</div>


      </div>
    </section>
  );
}
