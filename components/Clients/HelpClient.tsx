// HelpClient.tsx
"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  HelpCircle,
  Rocket,
  Wifi,
  Smartphone,
  Settings,
  Wrench,
  RefreshCw,
  Download,
  Phone,
  MessageCircle,
  Mail,
  ArrowRight,
} from "lucide-react";

interface HelpItem {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  color: string;
  bgColor: string;
}

interface ContactMethod extends HelpItem {
  details: string[];
  link?: string;
}

const gettingStarted: HelpItem[] = [
  {
    icon: Rocket,
    title: "How to set up your Automensor home automation system",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Wifi,
    title: "Connecting devices to Wi-Fi and configuring controls",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Smartphone,
    title: "Using the mobile app for remote access",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

const troubleshooting: HelpItem[] = [
  {
    icon: Settings,
    title: "Resolving connectivity issues",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: RefreshCw,
    title: "Resetting devices securely",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    icon: Download,
    title: "Firmware updates and installation tips",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
];

const contactMethods: ContactMethod[] = [
  {
    icon: Phone,
    title: "Phone Support",
    details: ["+91-8718847083", "+91-8085782471"],
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    details: ["Chat with our team"],
    link: "https://wa.me/918985602913",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Mail,
    title: "Email Support",
    details: ["automensor@gmail.com"],
    link: "mailto:automensor@gmail.com",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function HelpClient(): React.ReactNode {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100">
      {/* Enhanced Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full bg-gradient-to-br from-blue-200 to-cyan-200 mix-blend-multiply filter blur-3xl opacity-20 w-[600px] h-[600px] -top-20 -left-24 animate-floatSlow" />
        <div className="absolute rounded-full bg-gradient-to-br from-orange-100 to-rose-200 mix-blend-multiply filter blur-3xl opacity-15 w-[500px] h-[500px] -bottom-28 -right-24 animate-floatSlow animation-delay-2000" />
        <div className="absolute inset-0 bg-grid-pattern opacity-3" />
      </div>

      {/* Hero Section */}
      <motion.div
        className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20 px-6 border-b border-purple-400/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/15 backdrop-blur-md border-2 border-white/30 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <HelpCircle className="w-10 h-10" />
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-purple-100"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Help & Support
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Welcome to the AUTOMENSOR Help Center. Find answers to common
            questions, troubleshooting guides, and contact details for further
            assistance.
          </motion.p>
        </div>
      </motion.div>

      <div className="relative px-6 py-16">
        <motion.main
          className="max-w-6xl mx-auto space-y-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Getting Started Section */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-3">
              <Rocket className="w-8 h-8 text-blue-600" />
              Getting Started
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {gettingStarted.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-blue-100 hover:border-blue-300"
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl ${item.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent
                        className={`w-8 h-8 ${item.color}`}
                        strokeWidth={1.5}
                      />
                    </div>
                    <p className="text-slate-800 font-medium leading-relaxed">
                      {item.title}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Troubleshooting Section */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center gap-3">
              <Wrench className="w-8 h-8 text-orange-600" />
              Troubleshooting
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {troubleshooting.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-blue-100 hover:border-blue-300"
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl ${item.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent
                        className={`w-8 h-8 ${item.color}`}
                        strokeWidth={1.5}
                      />
                    </div>
                    <p className="text-slate-800 font-medium leading-relaxed">
                      {item.title}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Contact Support Section */}
          <motion.section
            className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 rounded-3xl p-8 md:p-12 shadow-xl border border-blue-200"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent text-center">
              Contact Support
            </h2>
            <p className="text-slate-700 text-lg mb-12 text-center max-w-2xl mx-auto font-light">
              If you can&apos;t find what you need here, please reach out to our
              support team. We&rsquo;re here to help!
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-300"
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl ${method.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent
                        className={`w-8 h-8 ${method.color}`}
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-slate-900">
                      {method.title}
                    </h3>
                    <div className="space-y-2">
                      {method.details.map((detail, idx) => (
                        <p key={idx} className="text-slate-700 font-medium">
                          {method.link ? (
                            <a
                              href={method.link}
                              className={`${method.color} hover:underline inline-flex items-center gap-2 group/link`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {detail}
                              <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                            </a>
                          ) : (
                            detail
                          )}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        </motion.main>
      </div>

      <style jsx>{`
        @keyframes floatSlow {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(15px);
          }
        }
        .animate-floatSlow {
          animation: floatSlow 8s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .bg-grid-pattern {
          background-image: radial-gradient(
            circle,
            rgba(59, 130, 246, 0.08) 1px,
            transparent 1px
          );
          background-size: 30px 30px;
        }
      `}</style>
    </div>
  );
}
