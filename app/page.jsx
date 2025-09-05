'use client';

import React, { useState, useEffect } from "react";
import HeaderSlider from "@/components/HeaderSlider";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";
import FeaturedProduct from "@/components/FeaturedProduct";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";

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
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
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
          <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight"
            >
              Automensor: Smart Homes & Buildings
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-700 mb-6"
            >
              A Wi-Fi Based Home Automation System that does not require any special wiring.
            </motion.p>

            <Link
              href="#store"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition"
            >
              Get Your Quotation
            </Link>
          </div>
        </section>

        {/* Market Needs */}
        <section id="needs" className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">The Need for Smart Buildings</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Fragmented Ecosystems",
                  desc: "Multiple communication protocols like Zigbee, BLE, and Wi-Fi make integration complex.",
                },
                {
                  title: "Outdated Interfaces",
                  desc: "Users expect smartphone-like UI for any connected device at home or office.",
                },
                {
                  title: "Scalability",
                  desc: "Manufacturers need flexible software to scale across products while reducing time-to-market.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition"
                >
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits" className="bg-white py-16">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Why Automensor?</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
              {[
                {
                  title: "Unified Connectivity",
                  desc: "Support for multiple wireless protocols including Zigbee, Wi-Fi, BLE, and Thread.",
                },
                {
                  title: "Modular Architecture",
                  desc: "Update or extend your features without rewriting core firmware.",
                },
                {
                  title: "Elegant UI",
                  desc: "Provide users with sleek, modern interfaces similar to mobile apps.",
                },
                {
                  title: "Security First",
                  desc: "Encrypted communications, secure containers, and OTA updates built-in.",
                },
                {
                  title: "Energy Optimization",
                  desc: "Monitor and reduce consumption intelligently across devices.",
                },
                {
                  title: "Rapid Deployment",
                  desc: "Reusable modules and UI kits allow faster development and consistency.",
                },
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transform hover:scale-105 transition"
                >
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section id="cta" className="bg-[#003366] text-white py-20 text-center px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Build the Future Together</h2>
            <p className="text-lg text-gray-300 mb-8">
              Join hundreds of innovators who trust Automensor to power smart homes and buildings.
            </p>

            <Link
              href="/contact"
              className="inline-block bg-white text-[#003366] px-8 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100 transform hover:scale-105 transition"
            >
              Contact Us
            </Link>
          </div>
        </section>

        <HeaderSlider />
        <FeaturedProduct /> 
        {/* <Banner />  */}
        {/* <NewsLetter /> */}
      </div>
      <Footer />
    </>
  );
};

export default Home;
