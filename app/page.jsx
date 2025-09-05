"use client";

import React, { useState, useEffect } from "react";
import HeaderSlider from "@/components/HeaderSlider";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import EstimateCostCalculator from "../components/EstimateCostCalculator";
import WhyAutomensor from "@/components/WhyAutomensor";
import MarketNeed from "@/components/MarketNeed";
import CallToAction from "@/components/CallToAction";

const Home = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading state — replace with actual data loading logic if needed
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 1 second loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32">
        {/* Hero Section */}
        <section
          id="hero"
          className="h-screen flex flex-col items-center justify-center relative text-black"
          style={{ background: "linear-gradient(to right, white, #d1d5db, white)" }}
        >
          {/* Overlay for subtle focus */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-100 to-white opacity-90 pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-gray-900"
            >
              Automensor: Smart Homes & Buildings
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-700 mb-6 max-w-xl mx-auto"
            >
              A Wi-Fi Based Home Automation System that does not require any special wiring.
            </motion.p>

            <Link
              href="/quotation"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition"
              aria-label="Get Your Quotation"
            >
              Get Your Quotation
            </Link>
          </div>
        </section>

        {/* Market Needs */}
        <section className="py-16">
          <MarketNeed />
        </section>

        {/* Benefits */}
        <section className="pb-16">
          <WhyAutomensor />
        </section>

        {/* Call to Action */}
        <section className="pb-16">
          <CallToAction />
        </section>

        {/* Additional Interactive Sections */}
        <section className="pb-16">
          <HeaderSlider />
        </section>

        <section className="pb-16">
          <EstimateCostCalculator />
        </section>

        {/* Uncomment and use when ready */}
        {/* <Banner /> */}
        {/* <NewsLetter /> */}
      </div>
      <Footer />
    </>
  );
};

export default Home;
