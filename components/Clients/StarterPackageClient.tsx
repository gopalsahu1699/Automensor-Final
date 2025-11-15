"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Zap, Smartphone, TrendingDown, Shield, Wrench, Star } from "lucide-react";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Zap,
    title: "Smart Lighting",
    description: "Automated smart lighting tailored to your lifestyle",
  },
  {
    icon: Smartphone,
    title: "Mobile App Control",
    description: "Seamless mobile app control anytime, anywhere",
  },
  {
    icon: TrendingDown,
    title: "Energy Tracking",
    description: "Energy consumption tracking to cut your bills",
  },
  {
    icon: Shield,
    title: "Advanced Security",
    description: "24/7 advanced security sensors with instant alerts",
  },
  {
    icon: Wrench,
    title: "Professional Installation",
    description: "Fast, hassle-free professional installation",
  },
];

export default function StarterPackageClient() {
  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-blue-50 py-16 px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-2xl"
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl ring-2 ring-blue-400/30">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
                <Star className="w-8 h-8 text-blue-600" />
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-900 leading-tight">
                Smart Home Starter Package
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6"
              >
                Easily transform your home into a smarter, safer, and more
                energy-efficient space with our affordable starter package.
              </motion.p>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="inline-block bg-gradient-to-r from-red-100 to-orange-100 border-2 border-red-300 rounded-full px-6 py-3 mb-8"
              >
                <p className="text-red-600 font-bold text-lg">
                  🎉 10% OFF First Installation
                </p>
                <p className="text-sm text-red-500">Limited time offer</p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
            >
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex gap-4 p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-200"
            >
              <h3 className="text-lg font-bold text-blue-900 mb-4">
                What&apos;s Included:
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm md:text-base text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  Smart Lighting System
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  Mobile App Control
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  Energy Monitoring
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  Security Sensors
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  Professional Installation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  1 Year Warranty
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="text-center mb-8"
            >
              <p className="text-gray-600 text-sm mb-2">Starting from</p>
              <p className="text-4xl md:text-5xl font-bold text-blue-900">
                ₹25,000
              </p>
              <p className="text-sm text-gray-500 mt-2">
                + Installation charges | Tax applicable
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6, type: "spring" }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-full shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-xl"
              >
                Get Started Today
              </Link>
              <Link
                href="/estimate-cost-calculator"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-full border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300"
              >
                Calculate Cost
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.6 }}
              className="mt-8 pt-8 border-t border-gray-200 text-center"
            >
              <p className="text-sm text-gray-600 mb-4">
                Join 500+ satisfied customers
              </p>
              <div className="flex justify-center gap-6 text-xs md:text-sm text-gray-500">
                <span>✓ 10 Year Warranty</span>
                <span>✓ 24/7 Support</span>
                <span>✓ Free Consultation</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}
