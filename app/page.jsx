"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Home as HomeIcon, Wifi } from "lucide-react";
import HeaderSlider from "@/components/HeaderSlider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EstimateCostCalculator from "../components/EstimateCostCalculator";
import WhyAutommensor from "@/components/WhyAutommensor";
import HowYouCanControl from "@/components/HowYouCanControl";
import MarketNeed from "@/components/MarketNeed";
import CallToAction from "@/components/CallToAction";
import Loading from "@/components/Loading";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />

      {/* Hero Section - Modern Gradient Background */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900">
          {/* Animated Circles */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 -right-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 text-center">
          {/* Floating Icons */}
          <motion.div
            className="flex items-center justify-center gap-6 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <HomeIcon className="w-8 h-8 text-blue-400" />
            </motion.div>
            <motion.div
              className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            >
              <Zap className="w-10 h-10 text-orange-400" />
            </motion.div>
            <motion.div
              className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            >
              <Wifi className="w-8 h-8 text-blue-400" />
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-4 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200">
                Autommensor
              </span>
            </h1>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Smart Homes & Buildings
            </h3>
          </motion.div>

          {/* Subtitle */}
          <motion.p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed text-white">
            "A Wi-Fi Based Home Automation System that does not require any
            special wiring."
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/quotation"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl shadow-blue-500/50 hover:shadow-blue-600/60 transform hover:scale-105 transition-all duration-300"
            >
              Get Your Quotation
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Book Free Demo
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
          >
            {[
              { value: "10", label: "Years Warranty" },
              { value: "200+", label: "Happy Customers" },
              { value: "100%", label: "Wi-Fi Based" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-blue-200 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </section>

      {/* Content Sections */}
      <div className="bg-gray-50">
        {/* Additional Interactive Sections */}
        <section className="py-20 bg-white">
          <HeaderSlider />
        </section>

        <section className="py-20">
          <EstimateCostCalculator />
        </section>

        <section className="py-20 bg-white">
          <HowYouCanControl />
        </section>

        {/* Call to Action */}
        <section className="py-20">
          <CallToAction />
        </section>

        {/* Market Needs */}
        <section className="py-20">
          <MarketNeed />
        </section>

        {/* Benefits */}
        <section className="py-20 bg-white">
          <WhyAutommensor />
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Home;
