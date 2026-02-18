"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Smartphone, Calendar, Wrench, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  {
    icon: Smartphone,
    title: "1. Book Your Free Demo",
    description: "Schedule a visit online or call us. We'll bring the smart home experience to your doorstep in Bilaspur or Raipur.",
  },
  {
    icon: Calendar,
    title: "2. Custom Plan & Quote",
    description: "Our experts analyze your home and create a tailored automation plan that fits your budget perfectly.",
  },
  {
    icon: Wrench,
    title: "3. 2-Hour Installation",
    description: "No breaking walls! Our certified technicians retrofit smart modules behind your existing switchboards.",
  },
  {
    icon: ShieldCheck,
    title: "4. Lifetime Support",
    description: "Enjoy your smart home with peace of mind. We provide a 10-Year Warranty and 24/7 local support.",
  },
];

export default function GetStartedClient() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">

        {/* HERO SECTION */}
        <section className="relative py-20 bg-blue-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-blue-900/20"></div>
          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Your Smart Home Journey
              <br />
              <span className="text-blue-200">Starts Here</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl opacity-90 mb-10 max-w-2xl mx-auto"
            >
              Transform your home in 4 simple steps. No rewiring, no dust, just pure comfort.
            </motion.p>
          </div>
        </section>

        {/* STEPS SECTION */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="space-y-12 relative">

              {/* Vertical Line for Desktop */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-100 -transform-x-1/2"></div>

              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Icon Bubble */}
                  <div className="relative z-10 w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200 shrink-0">
                    <step.icon size={32} />
                  </div>

                  {/* Content Card */}
                  <div className={`flex-1 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow duration-300 text-center md:text-left ${index % 2 !== 0 ? 'md:text-right' : ''}`}>
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">{step.title}</h3>
                    <p className="text-lg text-slate-600">{step.description}</p>
                  </div>

                  {/* Spacer for other side */}
                  <div className="flex-1 hidden md:block"></div>
                </motion.div>
              ))}

            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 bg-white text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Ready to Take the First Step?
            </h2>
            <p className="text-xl text-slate-600 mb-10">
              Book your free site visit today and get a custom quote instantly.
            </p>
            <Link
              href="/contact-us"
              className="inline-flex items-center bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl hover:scale-105 transform duration-200"
            >
              Book Free Site Visit
              <ArrowRight className="ml-2 w-6 h-6" />
            </Link>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
}
