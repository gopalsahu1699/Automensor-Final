"use client"

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  "Automated smart lighting tailored to your lifestyle",
  "Seamless mobile app control anytime, anywhere",
  "Energy consumption tracking to cut your bills",
  "24/7 advanced security sensors with instant alerts",
  "Fast, hassle-free professional installation"
];

const StarterPackage = () => {
  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-blue-50 py-16 px-6 flex items-center justify-center">
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white max-w-xl w-full rounded-3xl p-12 shadow-xl ring-2 ring-blue-400/30"
        >
          <motion.h2
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-4xl font-extrabold mb-6 text-center text-blue-900 tracking-wide drop-shadow-sm"
          >
            Smart Home Starter Package
          </motion.h2>
         

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-center mb-10 text-lg text-gray-700 leading-relaxed max-w-lg mx-auto"
          >
            Easily transform your home into a smarter, safer, and more energy-efficient space with our affordable starter package.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="mb-10 list-disc list-inside space-y-4 text-lg max-w-md mx-auto text-gray-800"
          >
            {features.map((feature, index) => (
              <li
                key={index}
                className="hover:text-blue-600 transition-colors cursor-default"
              >
                {feature}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6, type: "spring", stiffness: 120 }}
            className="text-center"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.7 }}
              className="mb-6 italic text-sm text-red-600 font-semibold max-w-xs mx-auto"
            >
              Exclusive 10% off your first installation! Limited time offer.
            </motion.p>

            <Link
              href="/contact-us"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-14 py-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
              aria-label="Get Started Today with Home Automation Starter Package"
            >
              Get Started Today
            </Link>
          </motion.div>
        </motion.section>
      </section>
      <Footer />
    </>
  );
};

export default StarterPackage;
