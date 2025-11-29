"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  AlertCircle,
  Lock,
  Users,
  Zap,
  Scale,
  X,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface Section {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  details: string[];
}

const sections: Section[] = [
  {
    title: "Acceptance of Terms",
    icon: FileText,
    description:
      "By accessing and using autommensor's products and services, you agree to be bound by these Terms of Service.",
    details: [
      "You must be at least 18 years old to use our services",
      "You are responsible for maintaining account confidentiality",
      "You agree to use our services only for lawful purposes",
      "Violation of these terms may result in immediate termination",
    ],
  },
  {
    title: "Service Description",
    icon: Zap,
    description:
      "autommensor provides smart home automation products and services designed to enhance your living experience.",
    details: [
      "We offer device configuration and control services",
      "Services include mobile app access and cloud integration",
      "Features may be updated or modified without notice",
      "Some features may require additional subscription fees",
      "Technical support is available during business hours",
    ],
  },
  {
    title: "User Responsibilities",
    icon: Users,
    description:
      "You agree to use our services responsibly and in compliance with all applicable laws and regulations.",
    details: [
      "Maintain the security of your login credentials",
      "Report any unauthorized access immediately",
      "Use services only for personal, non-commercial purposes",
      "Not attempt to reverse-engineer or hack our systems",
      "Not share your account with unauthorized users",
    ],
  },
  {
    title: "Intellectual Property",
    icon: Lock,
    description:
      "All content, software, and technologies used in our services are protected intellectual property.",
    details: [
      "autommensor retains all rights to software and technology",
      "You receive a limited license to use our services",
      "You cannot copy, modify, or distribute our software",
      "Your data remains your property, subject to our privacy policy",
      "Do not reproduce or transmit any content without permission",
    ],
  },
  {
    title: "Limitation of Liability",
    icon: AlertCircle,
    description:
      "autommensor is not liable for indirect, incidental, or consequential damages arising from service use.",
    details: [
      "Services provided &apos;as is&apos; without warranties",
      "We are not liable for data loss or system failures",
      "Liability limited to fees paid in the last 12 months",
      "Some jurisdictions don&apos;t allow liability limitations",
      "Contact support for specific warranty information",
    ],
  },
  {
    title: "Termination",
    icon: X,
    description:
      "Either party may terminate the service agreement under specific circumstances.",
    details: [
      "You may terminate your account at any time",
      "We may terminate for violation of these terms",
      "Immediate termination for illegal activities",
      "Upon termination, your data will be retained per policy",
      "30-day notice may be required for policy changes",
    ],
  },
  {
    title: "Payment Terms",
    icon: Scale,
    description:
      "Payment terms apply to any paid services or subscription plans offered by autommensor.",
    details: [
      "All prices are in the currency specified during checkout",
      "Automatic renewal subscriptions can be cancelled anytime",
      "Refunds are subject to our refund policy",
      "Failed payments may result in service suspension",
      "Invoices are available in your account dashboard",
    ],
  },
  {
    title: "Indemnification",
    icon: FileText,
    description:
      "You agree to defend and indemnify autommensor against any claims arising from your use of our services.",
    details: [
      "You indemnify us for third-party claims",
      "This applies to any unauthorized use of your account",
      "Includes legal fees and damages",
      "Does not apply to our gross negligence",
      "We reserve the right to control defense of claims",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

export default function TermsOfServiceClient() {
  const lastUpdated = new Date(2024, 10).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative px-6 sm:px-10 md:px-20 py-16 md:py-24 overflow-hidden bg-gradient-to-br from-white via-purple-50 to-white"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl mb-6 shadow-lg"
            >
              <FileText className="w-8 h-8 text-white" />
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight text-gray-900 mb-6">
              <span className="text-transparent bg-gradient-to-r from-purple-600 via-orange-600 to-purple-600 bg-clip-text">
                Terms of Service
              </span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Please read these terms carefully. By using autommensor services,
              you agree to comply with all terms and conditions outlined below.
            </p>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "140px" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-purple-600 via-orange-500 to-purple-600 rounded-full mx-auto shadow-lg shadow-purple-500/50"
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 inline-flex items-center gap-2 text-sm text-gray-600 bg-purple-50 px-4 py-2 rounded-full border border-purple-200"
            >
              Last Updated: {lastUpdated}
            </motion.div>
          </div>
        </motion.section>

        {/* Main Content */}
        <section className="max-w-4xl mx-auto px-6 sm:px-10 md:px-20 py-16 md:py-24">
          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-gradient-to-r from-purple-50 to-orange-50 rounded-2xl p-8 border border-purple-200 mb-16"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Table of Contents
            </h2>
            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sections.map((section, idx) => (
                <a
                  key={idx}
                  href={`#section-${idx}`}
                  className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors group"
                >
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>{section.title}</span>
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-red-50 border-l-4 border-red-600 rounded-r-2xl p-6 mb-16"
            role="alert"
          >
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-900 mb-2">Important Notice</h3>
                <p className="text-red-800">
                  These terms constitute a binding legal agreement. If you do not
                  agree to these terms, please do not use our services. Continued
                  use of our services constitutes acceptance of these terms.
                </p>
              </div>
            </div>
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
                  id={`section-${index}`}
                  variants={itemVariants}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200"
                >
                  <div className="p-8 md:p-10">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 bg-gradient-to-br from-purple-100 to-orange-100 rounded-xl group-hover:from-purple-200 group-hover:to-orange-200 transition-colors">
                        <Icon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
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
                          <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Accent Bar */}
                  <div className="h-1 bg-gradient-to-r from-purple-600 via-orange-500 to-transparent" />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Additional Policies Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid md:grid-cols-2 gap-8 mb-16"
          >
            {/* Dispute Resolution */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Scale className="w-5 h-5 text-blue-600" />
                Dispute Resolution
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Any disputes shall be resolved through binding arbitration in
                accordance with the rules of arbitration applicable in your
                jurisdiction.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Good faith negotiation required first</li>
                <li>✓ Binding arbitration as fallback</li>
                <li>✓ Class action waiver applies</li>
              </ul>
            </div>

            {/* Governing Law */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 border border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                Governing Law
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                These terms are governed by the laws of the jurisdiction where
                autommensor is registered, without regard to conflict of law
                principles.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Applicable local laws</li>
                <li>✓ International regulations</li>
                <li>✓ Jurisdiction-specific rights</li>
              </ul>
            </div>
          </motion.div>

          {/* Modifications Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-8 md:p-10 border border-yellow-200 mb-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Modifications to Terms
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              autommensor reserves the right to modify these terms at any time. We
              will notify you of significant changes via email or through the
              service. Your continued use of our services following the posting of
              revised terms means that you accept and agree to the changes.
            </p>
            <div className="bg-white rounded-lg p-4 border border-yellow-300">
              <p className="text-sm font-semibold text-gray-900 mb-2">
                We&apos;ll notify you if:
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Terms affecting your rights or obligations change</li>
                <li>• New fees or charges are introduced</li>
                <li>• Service scope significantly changes</li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-8 md:p-12 text-white text-center shadow-xl mb-8"
          >
            <FileText className="w-12 h-12 mx-auto mb-6 opacity-90" />
            <h3 className="text-3xl font-bold mb-4">
              Questions About Our Terms?
            </h3>
            <p className="text-purple-100 max-w-xl mx-auto mb-8">
              If you have any questions or concerns about these Terms of Service,
              please don&apos;t hesitate to contact our legal team.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:legal@autommensor.com"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-purple-600 font-bold rounded-full hover:bg-purple-50 transition-all duration-300 shadow-lg"
              >
                legal@autommensor.com
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Contact Support
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Footer Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600 pt-8 border-t border-gray-200"
          >
            <Link
              href="/privacy-policy"
              className="hover:text-purple-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link
              href="/contact"
              className="hover:text-purple-600 transition-colors"
            >
              Contact Us
            </Link>
            <span className="hidden sm:inline">•</span>
            <span>© 2024 autommensor. All rights reserved.</span>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
