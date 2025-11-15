// ContactClient.tsx
"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Zap,
  CheckCircle,
} from "lucide-react";

interface ContactInfo {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
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

const whyChooseItems: string[] = [
  "10 Year Warranty on All Products",
  "24/7 Customer Support",
  "Free Installation Consultation",
  "Wi-Fi Based - No Special Wiring",
  "Custom Solutions for Your Home",
];

interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactClient(): React.ReactNode {
  const [formData, setFormData] = useState<ContactFormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100">
      {/* Enhanced Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full bg-gradient-to-br from-blue-200 to-cyan-200 mix-blend-multiply filter blur-3xl opacity-20 w-[600px] h-[600px] -top-20 -left-24 animate-floatSlow" />
        <div className="absolute rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 mix-blend-multiply filter blur-3xl opacity-15 w-[500px] h-[500px] -bottom-28 -right-24 animate-floatSlow animation-delay-2000" />
        <div className="absolute inset-0 bg-grid-pattern opacity-3 pointer-events-none" />
      </div>

      {/* Hero Section - BLUE TO PURPLE GRADIENT */}
      <motion.div
        className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20 px-6 border-b border-purple-400/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/15 backdrop-blur-md border-2 border-white/30 mb-6"
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
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4"
          >
            Get in Touch With{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
              AUTOMENSOR
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto font-light"
          >
            Have questions or want a personalized solution? Our expert team is
            ready to help you build your smart home future
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative py-16 px-6">
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
                  className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-blue-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${info.bgColor} flex items-center justify-center mb-4`}
                  >
                    <IconComponent
                      className={`w-7 h-7 ${info.color}`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-3">
                    {info.title}
                  </h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-slate-600 font-medium text-sm">
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
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100 overflow-hidden">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      Send Us a Message
                    </h2>
                    <p className="text-slate-600 font-light">
                      Fill out the form below
                    </p>
                  </div>
                </div>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 bg-green-50 border-l-4 border-green-500 rounded-xl p-5 flex items-start gap-4"
                    role="alert"
                  >
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-800">
                        Message Sent!
                      </p>
                      <p className="text-green-700 text-sm font-light">
                        We&rsquo;ll respond within 2-4 hours during business hours.
                      </p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-slate-700 mb-3"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="John Doe"
                      className="w-full border-2 border-blue-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 bg-white hover:border-blue-300 text-slate-900 font-medium placeholder-slate-400 transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-700 mb-3"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your@email.com"
                      className="w-full border-2 border-blue-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 bg-white hover:border-blue-300 text-slate-900 font-medium placeholder-slate-400 transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-slate-700 mb-3"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="How can we help?"
                      className="w-full border-2 border-blue-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 bg-white hover:border-blue-300 text-slate-900 font-medium placeholder-slate-400 transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-slate-700 mb-3"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      placeholder="Tell us about your project or inquiry..."
                      className="w-full border-2 border-blue-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 bg-white hover:border-blue-300 text-slate-900 font-medium placeholder-slate-400 transition-all resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3.5 rounded-xl font-bold shadow-lg border border-green-400/30 transition-all"
                  >
                    Send Message
                  </motion.button>
                </form>
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
              <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-2xl border border-purple-400/30">
                <h3 className="text-2xl font-bold mb-6">
                  Why Choose AUTOMENSOR?
                </h3>
                <ul className="space-y-4">
                  {whyChooseItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold">✓</span>
                      </div>
                      <span className="leading-relaxed font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Response Card */}
              <motion.div
                className="bg-white rounded-3xl p-8 shadow-lg border border-blue-100"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-orange-600" strokeWidth={1.5} />
                  <h3 className="text-xl font-bold text-slate-900">
                    Quick Response
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed mb-4 font-light">
                  We typically respond to all inquiries within 2-4 hours during
                  business hours. For urgent matters, please call us directly.
                </p>
                <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                  <p className="text-sm font-semibold text-orange-800 mb-1">
                    Emergency Support
                  </p>
                  <p className="text-orange-600 font-bold">+91-8985602913</p>
                </div>
              </motion.div>

              {/* Social Proof */}
              <motion.div
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100 text-center"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-5xl font-extrabold text-green-600 mb-2">
                  500+
                </div>
                <p className="text-slate-700 font-semibold">Happy Customers</p>
                <p className="text-sm text-slate-600 mt-2 font-light">
                  Join hundreds of satisfied homeowners
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
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
