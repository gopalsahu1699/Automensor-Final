"use client";

import React from "react";
import Link from "next/link";
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, Star } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-20 lg:pt-48 lg:pb-32">
      {/* Background Visual Elements */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-100 to-indigo-100 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>

      {/* Dynamic Glow Orbs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-100/20 rounded-full blur-[120px] -z-10 animate-pulse transition-all duration-1000"></div>
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-indigo-100/20 rounded-full blur-[80px] -z-10 animate-pulse delay-500"></div>


      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 text-sm font-medium text-blue-600 shadow-sm backdrop-blur-sm">
              <Star className="h-4 w-4 fill-blue-600" />
              <span>Rated #1 in Chhattisgarh | 200+ Projects Completed</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl lg:text-8xl"
          >
            Upgrade Your Home to
            <span className="relative ml-2 inline-block text-blue-600">
              Smart Living
            </span>
            <br />
            <span className="text-slate-800">In Just 24 Hours</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 text-xl leading-relaxed text-slate-600 sm:text-2xl"
          >
            Join 200+ happy families in Chhattisgarh. Control lighting, security, and AC/Fan with a single touch—<strong>No Rewiring Required.</strong>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/contact-us"
              className="group inline-flex h-14 w-full items-center justify-center rounded-full bg-blue-600 px-8 text-lg font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-xl hover:scale-105 sm:w-auto"
            >
              Book Free Site Visit
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/estimate-cost-calculator"
              className="group inline-flex h-14 w-full items-center justify-center rounded-full border-2 border-slate-200 bg-white px-8 text-lg font-semibold text-slate-700 transition-all hover:border-blue-200 hover:bg-blue-50/50 sm:w-auto"
            >
              Calculate Cost
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-slate-500 font-medium"
          >
            {[
              "10-Year Warranty",
              "Free Consultation",
              "No Rewiring Needed",
              "24/7 Local Support"
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>{feature}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
      </div>
    </section>
  );
};

export default HeroSection;
