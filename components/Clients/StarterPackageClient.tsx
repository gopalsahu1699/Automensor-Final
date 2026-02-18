"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, X, Star, ShieldCheck, Zap } from "lucide-react";

export default function StarterPackageClient() {
  return (
    <>
      <Navbar />
      <div className="bg-slate-50 min-h-screen">

        {/* HERO */}
        <section className="bg-blue-900 text-white pt-32 pb-24 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block bg-blue-800 text-blue-200 text-sm font-bold px-4 py-1.5 rounded-full mb-6 border border-blue-700"
          >
            Limited Time Offer for Bilaspur & Raipur
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            The Ultimate Smart Home<br />Starter Package
          </motion.h1>

          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            For just <span className="text-yellow-400 font-bold text-2xl">₹25,000</span>, transform your living room into a futuristic smart space. No hidden costs.
          </p>
        </section>

        {/* PACKAGE DETAILS + COMPARISON */}
        <section className="py-20 px-6 container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">

            {/* Left: What's Included */}
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-8">What You Get</h2>
              <ul className="space-y-6">
                {[
                  "3 Smart Touch Switches (Control 12 Appliances)",
                  "1 Smart Fan Controller (Speed Regulation)",
                  "Voice Control Config (Alexa/Google)",
                  "Mobile App Setup (iOS/Android)",
                  "Autommensor IoT Hub (The Brain)",
                  "Professional Installation Included"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg text-slate-700 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Price Comparison Card */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 sticky top-24">
              <div className="bg-slate-900 p-6 text-white text-center">
                <h3 className="text-xl font-semibold opacity-90">Total Market Value</h3>
                <div className="text-gray-400 line-through text-2xl mt-1">₹45,000+</div>
              </div>

              <div className="p-8">
                <div className="text-center mb-8">
                  <span className="text-5xl font-bold text-blue-600">₹25,000</span>
                  <span className="text-slate-500 block mt-2">+ GST Only</span>
                </div>

                {/* Comparison Table */}
                <div className="bg-slate-50 rounded-xl p-6 mb-8 text-sm">
                  <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <span className="font-semibold text-slate-500">Feature</span>
                    <span className="font-bold text-blue-600">Autommensor</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Warranty</span>
                      <span className="font-bold text-green-600">10 Years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Rewiring?</span>
                      <span className="font-bold text-green-600">No (Retrofit)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Support</span>
                      <span className="font-bold text-green-600">24/7 Local</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/contact-us"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl py-4 rounded-xl text-center shadow-lg transition-all transform hover:scale-[1.02]"
                >
                  Claim This Offer
                </Link>

                <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-2">
                  <ShieldCheck size={14} /> 10-Year Warranty included
                </p>
              </div>
            </div>

          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}
