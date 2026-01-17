"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Phone, Mail, Leaf } from "lucide-react";

// Reusable Contact Card
const ContactCard = ({ Icon, href, label }) => (
  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 shadow-lg hover:bg-white/20 transition-all min-w-[250px] group">
    <Icon className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
    <a
      href={href}
      className="font-semibold hover:text-white transition-colors cursor-pointer block w-full"
    >
      {label}
    </a>
  </div>
);

function CallToAction() {
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-16 px-6">
      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-700 via-blue-700 to-indigo-800 text-white rounded-3xl shadow-2xl max-w-7xl mx-auto">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>

        {/* Top Gradient Border */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400"></div>

        <div className="relative z-10 py-20 px-6 md:px-12 lg:px-16">
          {/* Icon Badge */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 shadow-2xl">
                <Leaf className="w-12 h-12 text-cyan-400" />
              </div>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Build a{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-300">
                Smarter Home
              </span>
            </span>{" "}
            with Us
          </motion.h2>

          {/* Subheading */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-cyan-100 text-center mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join hundreds of homeowners who trust Autommensor to make their homes intelligent, secure, and beautiful.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/contact-us"
              className="group inline-flex items-center gap-3 bg-cyan-400 text-gray-900 px-10 py-5 rounded-full font-bold text-lg shadow-lg hover:shadow-cyan-400/50 transform hover:scale-105 transition-all duration-300"
            >
              Contact Us Now
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/all-products"
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 px-10 py-5 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5" />
              Explore Products
            </Link>
          </motion.div>

          {/* Contact Cards */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ContactCard Icon={Phone} href="tel:+918085782471" label="+91-8085782471" />
            <ContactCard Icon={Mail} href="mailto:autommensor@gmail.com" label="autommensor@gmail.com" />
          </motion.div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="rgba(255, 255, 255, 0.1)"
              d="M0,32L48,42.7C96,53,192,75,288,80C384,85,480,75,576,58.7C672,43,768,21,864,21.3C960,21,1056,43,1152,48C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>
    </div>
  );
}

export default CallToAction;
