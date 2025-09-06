"use client"

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const StarterPackage = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-10 max-w-xl mx-auto my-12 shadow-2xl ring-4 ring-indigo-500/40"
    >
      <motion.h2
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-4xl font-extrabold mb-6 text-center tracking-wide drop-shadow-lg"
      >
        Starter Package for Smart Home Automation
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-center mb-8 text-lg leading-relaxed max-w-lg mx-auto drop-shadow-md"
      >
        Transform your home with our easy, affordable starter package designed for comfort,
        security, and energy savings.
      </motion.p>

      <motion.ul
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mb-8 list-disc list-inside space-y-3 text-lg max-w-md mx-auto"
      >
        <li className="hover:text-yellow-300 transition-colors cursor-default">
          Smart lighting with automated schedules
        </li>
        <li className="hover:text-yellow-300 transition-colors cursor-default">
          Mobile app control from anywhere
        </li>
        <li className="hover:text-yellow-300 transition-colors cursor-default">
          Energy usage monitoring to lower bills
        </li>
        <li className="hover:text-yellow-300 transition-colors cursor-default">
          24/7 security sensors and alerts
        </li>
        <li className="hover:text-yellow-300 transition-colors cursor-default">
          Quick and professional installation
        </li>
      </motion.ul>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5, type: "spring", stiffness: 100 }}
        className="text-center"
      >
        <Link
          href="/contact"
          className="inline-block bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold px-12 py-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
        >
          Get Started Today
        </Link>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="mt-8 text-center italic text-sm opacity-80 drop-shadow-md max-w-xs mx-auto"
      >
        Exclusive 30% off on your first installation. Limited time offer!
      </motion.p>
    </motion.section>
  );
};

export default StarterPackage;
