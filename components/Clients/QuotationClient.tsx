"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Calculator,
  Home,
  Zap,
  CheckCircle,
  Clock,
  Award,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { account } from "@/lib/appwrite";

interface Benefit {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

const benefits: Benefit[] = [
  {
    icon: Calculator,
    title: "Accurate Pricing",
    description: "Get detailed cost breakdown for your project",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Clock,
    title: "Quick Response",
    description: "Receive quote within 24 hours",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Award,
    title: "Expert Consultation",
    description: "Free consultation with our specialists",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

const features: string[] = [
   "🏠 FREE home assessment - we come to you",
  "👨‍👩‍👧‍👦Customized automation solutions according to your home layout, room count, and family needs", 
  "💰 No surprises - fully transparent pricing",
  "🛡️ 10-year warranty on  product",
  "🔧 Installation by certified experts",
  "♾️ Lifetime support - we're always here",
];

const processSteps: ProcessStep[] = [
  { step: "1", title: "Submit Request", desc: "Fill out the quotation form" },
  {
    step: "2",
    title: "Free Consultation",
    desc: "Discuss your requirements with our expert",
  },
  {
    step: "3",
    title: "Receive Quote",
    desc: "Get detailed pricing within 24 hours",
  },
  {
    step: "4",
    title: "Get Started",
    desc: "Approve and begin installation",
  },
];

export default function QuotationClient() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check if user is logged in for personalization
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await account.get();
        setIsAdmin(!!user);
      } catch {
        setIsAdmin(false);
      } finally {
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (checkingAuth) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 text-white py-20 px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime-400/20 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-800/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6 border-2 border-white/20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <FileText className="w-10 h-10" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
          >
            Request Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-200 to-emerald-200">
              Personalized Quote
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto"
          >
            Fill out the form below and our expert team will provide a
            customized quote tailored to your smart home needs
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Benefits Cards */}
          <motion.div
            className="grid sm:grid-cols-3 gap-6 mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <div
                    className={`w-14 h-14 rounded-full ${benefit.bgColor} flex items-center justify-center mb-4`}
                  >
                    <IconComponent className={`w-7 h-7 ${benefit.color}`} />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Get Your Quote
                    </h2>
                    <p className="text-gray-600">Fill in your details below</p>
                  </div>
                </div>
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
              {/* What&apos;s Included Card */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <Home className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-900">
                    What&apos;s Included
                  </h3>
                </div>
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How It Works Card */}
              <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-8 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-6">How It Works</h3>
                <div className="space-y-6">
                  {processSteps.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 font-bold text-lg">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">{item.title}</h4>
                        <p className="text-green-100 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100 text-center">
                <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-extrabold text-blue-600 mb-2">
                  2+ Years
                </div>
                <p className="text-gray-700 font-medium">
                  Industry Experience
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Trusted by 200+ homeowners
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
