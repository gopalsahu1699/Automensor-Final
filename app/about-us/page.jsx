"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <>
      <Navbar />
      {/* Background design layers */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Soft gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-gray-100 opacity-60" />
        {/* Abstract blurred circles */}
        <div className="absolute bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 w-72 h-72 -top-16 -left-16 animate-floatSlow" />
        <div className="absolute bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 w-96 h-96 -bottom-24 -right-20 animate-floatSlow animation-delay-2000" />
      </div>
      <motion.main
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative min-h-screen flex flex-col items-center px-6 py-16 bg-white bg-opacity-90 text-gray-800 max-w-4xl mx-auto rounded-lg shadow-lg"
        aria-label="About Automensor"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-extrabold mb-10 text-center text-gray-900 max-w-4xl"
        >
          About Automensor
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl text-xl md:text-2xl mb-14 leading-relaxed text-center text-gray-700"
        >
          Welcome to Automensor, your trusted partner in smart home and building automation. We deliver cutting-edge Wi-Fi-based solutions requiring no special wiring, offering seamless integration for smarter, safer, and more energy-efficient living.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl space-y-16"
        >
          <section>
            <h2 className="text-3xl font-semibold mb-4 text-orange-600">
              Our Mission
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Revolutionizing the way you live and work by creating innovative, secure, and intuitive automation technologies that bring true convenience and peace of mind.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-4 text-orange-600">
              Our Core Values
            </h2>
            <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed space-y-2">
              <li>Customer-First Experience: Every solution is designed with you in mind.</li>
              <li>Unmatched Reliability & Security to protect your home and data.</li>
              <li>Highly Scalable & Modular Systems to grow with your needs.</li>
              <li>Relentless Innovation to keep you at the forefront of smart living.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-4 text-orange-600">
              Meet Our Team
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              A passionate group of engineers, designers, and support specialists dedicated to crafting seamless and inspiring smart environments tailored for modern lifestyles.
            </p>
          </section>
        </motion.div>
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
}
