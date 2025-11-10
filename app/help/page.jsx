"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
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
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Help = () => {
  const gettingStarted = [
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

  const troubleshooting = [
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

  const contactMethods = [
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
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      {/* Background design layers */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-gray-100 opacity-60" />
        <div className="absolute bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 w-72 h-72 -top-16 -left-16 animate-floatSlow" />
        <div className="absolute bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 w-96 h-96 -bottom-24 -right-20 animate-floatSlow animation-delay-2000" />
      </div>

      <Navbar />

      <div className="relative min-h-screen px-6 py-16">
        <motion.main
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-600 mb-6">
              <HelpCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900">
              Help & Support
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Welcome to the Automensor Help Center. Find answers to common
              questions, troubleshooting guides, and contact details for further
              assistance.
            </p>
          </motion.div>

          {/* Getting Started Section */}
          <motion.section
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-blue-600 flex items-center gap-3">
              <Rocket className="w-8 h-8" />
              Getting Started
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {gettingStarted.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className={`w-16 h-16 rounded-full ${item.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className={`w-8 h-8 ${item.color}`} />
                    </div>
                    <p className="text-gray-800 font-medium leading-relaxed">
                      {item.title}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Troubleshooting Section */}
          <motion.section
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-orange-600 flex items-center gap-3">
              <Wrench className="w-8 h-8" />
              Troubleshooting
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {troubleshooting.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className={`w-16 h-16 rounded-full ${item.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className={`w-8 h-8 ${item.color}`} />
                    </div>
                    <p className="text-gray-800 font-medium leading-relaxed">
                      {item.title}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Contact Support Section */}
          <motion.section
            className="bg-white rounded-2xl p-8 md:p-12 shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-600 text-center">
              Contact Support
            </h2>
            <p className="text-gray-700 text-lg mb-10 text-center max-w-2xl mx-auto">
              If you can't find what you need here, please reach out to our
              support team. We're here to help!
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
                    className="group bg-gray-50 rounded-xl p-6 hover:bg-gradient-to-br hover:from-blue-50 hover:to-white transition-all duration-300 hover:shadow-xl"
                  >
                    <div className={`w-16 h-16 rounded-full ${method.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className={`w-8 h-8 ${method.color}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">
                      {method.title}
                    </h3>
                    <div className="space-y-2">
                      {method.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-700 font-medium">
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

      <Footer />

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
      `}</style>
    </>
  );
};

export default Help;
