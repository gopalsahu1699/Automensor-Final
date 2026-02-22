"use client";
import React from 'react';
import Image from "next/image";
import { motion } from "framer-motion";

export default function ComparisonSection() {
  return (
    <section className="relative w-full h-[80vh] md:h-screen flex flex-col justify-center overflow-hidden">


      {/* Center Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="absolute top-10 md:top-20 w-full text-center z-20 px-4"
      >
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-black mb-2">
          TURN TO THE NEW WAY
        </h2>
        <p className="text-xs sm:text-sm md:text-lg text-black font-medium px-2">
          "WiFi Based Home Automation - No Special Wiring Required"
        </p>
      </motion.div>

      {/* Split Layout */}
      <div className="flex w-full h-full">
        {/* LEFT - OLD */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-1/2 bg-[#d1d5db] flex flex-col items-center justify-center text-center px-4 md:px-8 border-r border-gray-400/20"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="https://res.cloudinary.com/dn9rohd6h/image/upload/v1768528700/Switch_vzrmnz.webp"
              alt="Old Switch"
              width={120}
              height={120}
              style={{ width: "auto", height: "auto" }}
              className="drop-shadow-xl opacity-80 grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
          <p className="mt-4 md:mt-8 text-sm sm:text-base md:text-xl font-medium text-slate-700 leading-relaxed">
            Outdated<br />
            Difficult to Maintain<br />
            Old Fashioned
          </p>
        </motion.div>

        {/* RIGHT - NEW */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-1/2 bg-[#e0f2fe] flex flex-col items-center justify-center text-center px-4 md:px-8"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="https://res.cloudinary.com/dn9rohd6h/image/upload/v1768528699/panel_1_fuot6k.webp"
              alt="Smart Switch"
              width={140}
              height={140}
              style={{ width: "auto", height: "auto" }}
              className="drop-shadow-2xl"
            />
          </motion.div>
          <p className="mt-4 md:mt-8 text-sm sm:text-base md:text-xl font-bold text-blue-900 leading-relaxed">
            Cutting-Edge Technology<br />
            Easy To Maintain<br />
            Intelligent Touch Controls
          </p>
        </motion.div>
      </div>

      {/* Bottom Text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        viewport={{ once: true }}
        className="absolute bottom-6 w-full text-center text-slate-600 text-xs md:text-sm tracking-[0.2em] uppercase font-medium"
      >
        #Touch The Future Today
      </motion.div>
    </section>
  );
}
