"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Home, Wifi } from "lucide-react";

const HeroSection = () => {
  const trustItems = [
    { value: "10", label: "Years Warranty", icon: Shield },
    { value: "200+", label: "Homes Automated", icon: Home },
    { value: "100%", label: "Wi-Fi Based", icon: Wifi },
  ];

  return (
    <section className="relative w-full min-h-screen bg-[#f5f6f4] flex items-start  ">
      {/* Optional Hero Background */}
      <div className="absolute inset-0">
        <div className="bg-gradient-to-b from-[#f5f6f4]/80 to-[#f5f6f4]/100 w-full h-full"></div>
        {/* <img className="w-full h-full object-cover" src="/hero-bg.jpg" alt="Smart Home" /> */}
      </div>

      <div className="relative max-w-5xl mx-auto px-6 pt-16 sm:pt-20 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold text-slate-900 leading-tight mb-8"
          >
            Smart Living,
            <br />
            <span className="text-blue-600">Designed for Your Home</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Autommensor brings intelligent lighting, security, and automation together —
            beautifully designed, easy to use, and crafted for modern homes, villas,
            and premium interiors.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Book Free Demo
            </Link>

            <Link
              href="/all-products"
              className="inline-flex items-center gap-2 text-slate-900 font-medium hover:text-blue-600 transition"
            >
              Explore Solutions
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 gap-10 mt-16 sm:mt-20 max-w-3xl mx-auto"
          >
            {trustItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex flex-col items-center">
                  <Icon className="w-8 h-8 text-blue-600 mb-2" />
                  <p className="text-3xl font-semibold text-slate-900">{item.value}</p>
                  <p className="text-sm text-slate-500 mt-1">{item.label}</p>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Optional Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400 animate-bounce">
        ↓ Scroll
      </div>
    </section>
  );
};

export default HeroSection;
