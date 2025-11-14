"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Users, Mail, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

function PrivacyPolicy() {
  const sections = [
    {
      title: "Information We Collect",
      icon: Eye,
      description: "We collect information you provide directly to us, such as your name, email address, and usage data from your devices to deliver personalized smart home experiences.",
      details: [
        "Personal identification information (name, email, phone)",
        "Device usage data and automation preferences",
        "Payment and billing information",
        "Communication preferences and feedback",
      ],
    },
    {
      title: "How We Use Your Information",
      icon: Users,
      description: "Your information helps us provide and improve our services, manage your account, communicate important updates, and ensure security.",
      details: [
        "Deliver and improve our automation services",
        "Manage and support your account",
        "Send important security and service updates",
        "Personalize your smart home experience",
        "Comply with legal requirements",
      ],
    },
    {
      title: "Data Protection",
      icon: Lock,
      description: "We implement strict security measures to safeguard your data from unauthorized access and ensure compliance with applicable privacy laws.",
      details: [
        "End-to-end encryption for all communications",
        "Regular security audits and updates",
        "Secure data storage with access controls",
        "Compliance with GDPR and international standards",
      ],
    },
    {
      title: "Your Rights",
      icon: Shield,
      description: "You have the right to access, correct, or delete your personal information. For any privacy-related requests, please contact our support team.",
      details: [
        "Access your personal data anytime",
        "Request corrections or updates",
        "Delete your account and data",
        "Opt-out of marketing communications",
        "Data portability requests",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative px-6 sm:px-10 md:px-20 py-16 md:py-24 overflow-hidden bg-gradient-to-br from-white via-blue-50 to-white"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl mb-6 shadow-lg"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>

            <h1 className="text-5xl sm:text-6xl font-black leading-tight text-gray-900 mb-6">
              Your Privacy Matters
              <span className="block text-transparent bg-gradient-to-r from-blue-600 via-orange-600 to-blue-600 bg-clip-text mt-2">
                to Us
              </span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              At AUTOMENSOR, we're committed to protecting your personal information and ensuring transparency in how we handle your data. This Privacy Policy outlines our practices.
            </p>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-blue-600 via-orange-500 to-blue-600 rounded-full mx-auto shadow-lg shadow-blue-500/50"
            />
          </div>
        </motion.section>

        {/* Main Content */}
        <section className="max-w-4xl mx-auto px-6 sm:px-10 md:px-20 py-16 md:py-24">
          {/* Quick Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-8 border border-blue-200 mb-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              At AUTOMENSOR, your privacy is paramount. We collect minimal necessary information to deliver personalized smart home experiences, implement industry-leading security measures, and give you full control over your data. We never sell your information and comply with all international privacy regulations.
            </p>
          </motion.div>

          {/* Sections Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8 md:gap-10 mb-16"
          >
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
                >
                  <div className="p-8 md:p-10">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-orange-100 rounded-xl group-hover:from-blue-200 group-hover:to-orange-200 transition-colors">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {section.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {section.description}
                    </p>

                    {/* Details List */}
                    <div className="space-y-3">
                      {section.details.map((detail, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Accent Bar */}
                  <div className="h-1 bg-gradient-to-r from-blue-600 via-orange-500 to-transparent" />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid md:grid-cols-2 gap-8 mb-16"
          >
            {/* Third Party Services */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-600" />
                Third-Party Services
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We may share limited information with trusted third-party services only when necessary to provide our services. All third parties are bound by strict confidentiality agreements and comply with privacy regulations.
              </p>
            </div>

            {/* Cookies & Tracking */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 border border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-green-600" />
                Cookies & Analytics
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We use cookies to improve your experience and understand how you interact with our services. You can control cookie preferences in your browser settings anytime.
              </p>
            </div>
          </motion.div>

          {/* Data Retention */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100 mb-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We retain your personal information only as long as necessary to provide our services and comply with legal obligations. You can request deletion of your data at any time, and we will comply within 30 days as per applicable regulations.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Some information may be retained for legal, tax, or accounting purposes for the period required by law.
              </p>
            </div>
          </motion.div>

          {/* International Compliance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 md:p-10 border border-orange-200 mb-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">International Compliance</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: "GDPR", desc: "European privacy standards" },
                { label: "CCPA", desc: "California privacy rights" },
                { label: "ISO 27001", desc: "Information security certified" },
              ].map((compliance, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-2">{compliance.label}</div>
                  <p className="text-sm text-gray-600">{compliance.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl"
          >
            <Mail className="w-12 h-12 mx-auto mb-6 opacity-90" />
            <h3 className="text-3xl font-bold mb-4">Questions About Your Privacy?</h3>
            <p className="text-blue-100 max-w-xl mx-auto mb-8">
              We're here to help! If you have any questions about this Privacy Policy or how we handle your data, please reach out to our privacy team.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:privacy@automensor.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg"
              >
                <Mail className="w-4 h-4" />
                privacy@automensor.com
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Contact Us
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Last Updated */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="text-center text-gray-600 text-sm mt-12"
          >
            Last Updated: November 2024 | This policy is subject to change. We'll notify you of major updates.
          </motion.p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default PrivacyPolicy;
