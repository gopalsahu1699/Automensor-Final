"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const Help = () => {
  return (
    <>
      {/* Background design layers applied to entire page */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Soft gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-gray-100 opacity-60" />
        {/* Abstract blurred circles */}
        <div className="absolute bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 w-72 h-72 -top-16 -left-16 animate-floatSlow" />
        <div className="absolute bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 w-96 h-96 -bottom-24 -right-20 animate-floatSlow animation-delay-2000" />
      </div>

      <Navbar />

      <motion.main
        className="relative min-h-screen px-6 py-16 max-w-4xl mx-auto text-gray-800 bg-white bg-opacity-90 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        aria-label="Help and Support"
      >
        <h1 className="text-4xl font-extrabold mb-8 text-center">Help & Support</h1>
        <p className="text-lg mb-10 text-center text-gray-700">
          Welcome to the Automensor Help Center. Find answers to common questions,
          troubleshooting guides, and contact details for further assistance.
        </p>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-orange-600">Getting Started</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>How to set up your Automensor home automation system</li>
            <li>Connecting devices to Wi-Fi and configuring controls</li>
            <li>Using the mobile app for remote access</li>
          </ul>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-orange-600">Troubleshooting</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Resolving connectivity issues</li>
            <li>Resetting devices securely</li>
            <li>Firmware updates and installation tips</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-orange-600">Contact Support</h2>
          <p className="text-gray-700 mb-4">
            If you can't find what you need here, please reach out to our support team:
          </p>
          <p className="font-semibold">Phone:</p>
          <p className="mb-2">+91-8085782471</p>
          <p className="font-semibold">Email:</p>
          <p>
            <a href="mailto:automensor@gmail.com" className="text-blue-600 hover:underline">
              automensor@gmail.com
            </a>
          </p>
        </section>
      </motion.main>

      <Footer />

      <style jsx>{`
        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(15px);
          }
        }
        .animate-floatSlow {
          animation: floatSlow 8s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </>
  );
};

export default Help;
