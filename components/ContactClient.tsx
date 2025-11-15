"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, MessageCircle, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  details: string[];
  color: string;
  bgColor: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+91-8718847083", "+91-8085782471"],
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["automensor@gmail.com"],
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: MapPin,
    title: "Location",
    details: ["India"],
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon - Sat: 9AM - 6PM"],
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

const whyChooseItems = [
  "10 Year Warranty on All Products",
  "24/7 Customer Support",
  "Free Installation Consultation",
  "Wi-Fi Based - No Special Wiring",
  "Custom Solutions for Your Home",
];

export default function ContactClient() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6 border-2 border-white/20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <MessageCircle className="w-10 h-10" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
          >
            Get in Touch With{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-cyan-200">
              AUTOMENSOR
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto"
          >
            Have questions or want a personalized solution? Our expert team is ready to help you build your smart home future
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Contact Info Cards */}
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div
                    className={`w-14 h-14 rounded-full ${info.bgColor} flex items-center justify-center mb-4`}
                  >
                    <IconComponent className={`w-7 h-7 ${info.color}`} />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-3">
                    {info.title}
                  </h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 font-medium">
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Contact Form Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Send Us a Message
                    </h2>
                    <p className="text-gray-600">Fill out the form below</p>
                  </div>
                </div>
                {/* ✅ FIXED: Removed userId prop */}
                <ContactForm />
              </div>
            </motion.div>

            {/* Right: Additional Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {/* Why Choose Us Card */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-6">
                  Why Choose AUTOMENSOR?
                </h3>
                <ul className="space-y-4">
                  {whyChooseItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs">✓</span>
                      </div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Response Card */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-orange-600" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Quick Response
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We typically respond to all inquiries within 2-4 hours during
                  business hours. For urgent matters, please call us directly.
                </p>
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                  <p className="text-sm font-semibold text-orange-800 mb-1">
                    Emergency Support
                  </p>
                  <p className="text-orange-600 font-bold">+91-8985602913</p>
                </div>
              </div>

              {/* Social Proof */}
              <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-green-600 mb-2">
                    500+
                  </div>
                  <p className="text-gray-700 font-medium">Happy Customers</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Join hundreds of satisfied homeowners
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
