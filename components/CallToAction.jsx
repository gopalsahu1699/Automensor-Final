"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle2, Calculator } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-blue-50/30 -skew-x-12 transform origin-bottom-right" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/20 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Premium Support in Bilaspur & Raipur
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight"
          >
            Ready to Transform Your Home
            <span className="block text-blue-600 mt-2">in Just 24 Hours?</span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Join <strong>200+ happy families</strong> in Chhattisgarh. Experience the comfort of voice-controlled living with a
            <span className="text-blue-600 font-semibold"> 10-Year Warranty.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link
              href="/contact-us"
              className="group inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-full bg-blue-600 px-8 text-lg font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-xl hover:scale-105"
            >
              Book Free Site Visit
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/estimate-cost-calculator"
              className="group inline-flex h-14 w-full sm:w-auto items-center justify-center rounded-full border-2 border-slate-200 bg-white px-8 text-lg font-semibold text-slate-700 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Calculate Cost
            </Link>
          </motion.div>

          {/* Trust Signals */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm font-medium text-slate-500 border-t border-slate-100 pt-8"
          >
            <div className="flex flex-col items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
              <span>10-Year Warranty</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-blue-500" />
              <span>No Rewiring Needed</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-purple-500" />
              <span>24/7 Local Support</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Phone className="h-6 w-6 text-orange-500" />
              <span>+91-8085782471</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CallToAction;
