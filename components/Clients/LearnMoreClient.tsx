"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Smartphone,
  Clock,
  Zap,
  Shield,
  Mic,
  Check,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}

interface TechnicalSpec {
  label: string;
  value: string;
}

interface Benefit {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Smartphone,
    text: "Easy mobile app control from anywhere",
  },
  {
    icon: Clock,
    text: "Automated lighting and climate schedules",
  },
  {
    icon: Zap,
    text: "Energy consumption monitoring",
  },
  {
    icon: Shield,
    text: "Smart security sensors and alerts",
  },
  {
    icon: Mic,
    text: "Seamless integration with voice assistants",
  },
];

const technicalSpecs: TechnicalSpec[] = [
  { label: "Connectivity", value: "Wi-Fi 802.11 b/g/n, Zigbee, Z-Wave" },
  { label: "Power Source", value: "110-240V AC / Battery backup" },
  { label: "Compatibility", value: "iOS & Android mobile apps" },
  { label: "Installation", value: "Professional quick setup" },
  {
    label: "Data Security",
    value: "End-to-end encryption with GDPR compliance",
  },
];

const benefits: Benefit[] = [
  {
    icon: Zap,
    title: "Reduce Energy Bills by 30%",
    description: "Monitor and optimize your energy consumption automatically",
  },
  {
    icon: Smartphone,
    title: "Control with Voice & Phone",
    description: "Effortless control from anywhere, anytime with your device",
  },
  {
    icon: Shield,
    title: "Real-Time Security Alerts",
    description: "Improve home security with instant notifications",
  },
  {
    icon: Clock,
    title: "Customizable Ambiance",
    description: "Set perfect lighting and temperature for any mood",
  },
  {
    icon: TrendingUp,
    title: "Increase Property Value",
    description: "Smart tech upgrades enhance your home&apos;s market appeal",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function LearnMoreClient() {
  return (
    <>
      <Navbar />

      <main className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 min-h-screen py-12 px-6 md:px-12 lg:px-24">
        <motion.section
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-indigo-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-6 text-center leading-tight"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              autommensor: Smart Home Solutions
            </motion.h1>

            <motion.p
              className="text-lg text-gray-700 text-center mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Unlock the full potential of your home with autommensor&apos;s reliable,
              modern, and user-friendly home automation packages. Below is
              everything you need to know to get started and transform how you
              live.
            </motion.p>
          </motion.div>

          <motion.section
            className="mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-8 flex items-center gap-3">
              <Smartphone className="w-8 h-8 text-indigo-600" />
              Key Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl border border-indigo-100 transition-all group hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-3 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                        <IconComponent className="w-6 h-6 text-indigo-600" />
                      </div>
                      <p className="text-gray-800 font-semibold leading-relaxed">
                        {feature.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          <motion.section
            className="mb-12 bg-white rounded-2xl shadow-lg border border-indigo-100 p-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-8">
              Technical Specifications
            </h2>
            <div className="space-y-4">
              {technicalSpecs.map((spec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-200 hover:border-indigo-300 transition-colors"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <p className="font-bold text-indigo-900 text-lg md:col-span-1">
                      {spec.label}
                    </p>
                    <div className="hidden md:block text-indigo-300">→</div>
                    <p className="text-gray-700 md:col-span-1">{spec.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            className="mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-8 flex items-center gap-3">
              <Check className="w-8 h-8 text-green-600" />
              Benefits
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl border border-green-100 transition-all group hover:-translate-y-1"
                  >
                    <div className="p-3 bg-green-100 rounded-lg mb-4 w-fit group-hover:bg-green-200 transition-colors">
                      <IconComponent className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold px-12 py-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                Contact Us to Get Started
                <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>
      </main>

      <Footer />
    </>
  );
}
