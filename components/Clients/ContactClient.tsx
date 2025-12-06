"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Zap,
  CheckCircle,
  Loader,
} from "lucide-react";
import { account, databases, ID } from "@/lib/appwrite";

interface ContactInfo {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  details: string[];
  color: string;
  bgColor: string;
  link?: string;
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
    details: ["autommensor@gmail.com"],
    color: "text-green-600",
    bgColor: "bg-green-50",
    link: "mailto:autommensor@gmail.com",
  },
  {
    icon: MapPin,
    title: "Location",
    details: ["Chhattisgarh-India"],
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
  "10 Year Warranty on Products",
  "24/7 Customer Support",
  "Free Installation Consultation",
  "Wi-Fi Based - No Special Wiring required",
  "Custom automation Solutions for Your Home",
];

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
}

export default function ContactClient() {
  const [formData, setFormData] = useState<ContactFormState>({
    name: "",
    email: "",
    phone: "",
    type: "",
    message: "",
  });

  const [userId, setUserId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Get logged-in user ID
  useEffect(() => {
    account
      .get()
      .then((user) => setUserId(user.$id))
      .catch(() => setUserId(null));
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Auto-hide status after 10s
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Sending your message...");

    try {
      const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_REQUEST_DATABASE_ID;
      const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_REQUEST_COLLECTION_ID;

      if (!DATABASE_ID || !COLLECTION_ID) {
        throw new Error("Database configuration missing - check .env.local");
      }

      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          userId: userId || "anonymous",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          type: formData.type || "contact",
          status: "new",
          submittedAt: new Date().toISOString(),
        }
      );

      setStatus("✅ Message sent successfully! We'll respond within 24 hours.");
      setFormData({ name: "", email: "", phone: "", type: "", message: "" });
    } catch (error: any) {
      console.error("Form submission error:", error);
      const errorMsg = error.message || error.toString();
      setStatus(
        errorMsg.includes("permission") || errorMsg.includes("permissions")
          ? "❌ Permission denied. Admin: Check Appwrite collection 'create:guests' permission."
          : errorMsg.includes("Database") || errorMsg.includes("Collection")
          ? "❌ Database config error. Check .env.local variables."
          : "❌ Failed to send message. Please try again or call us directly."
      );
    } finally {
      setLoading(false);
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

      {/* Hero Section */}
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
              Autommensor
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
                  <div className={`w-14 h-14 rounded-2xl ${info.bgColor} flex items-center justify-center mb-4`}>
                    <IconComponent className={`w-7 h-7 ${info.color}`} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => {
                      const isClickable = info.link && idx === 0;
                      const linkUrl = isClickable ? info.link : undefined;
                      return isClickable ? (
                        <a
                          key={idx}
                          href={linkUrl}
                          className="block text-slate-600 font-bold text-sm hover:text-blue-600 hover:underline transition-colors cursor-pointer group"
                        >
                          {detail}
                        </a>
                      ) : (
                        <p key={idx} className="text-slate-600 font-medium text-sm">
                          {detail}
                        </p>
                      );
                    })}
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
                    <p className="text-slate-600 font-light">Fill out the form below</p>
                  </div>
                </div>

               

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-3">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={loading}
                      placeholder="John Doe"
                      className="w-full border-2 border-blue-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 bg-white hover:border-blue-300 text-slate-900 font-medium placeholder-slate-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-3">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={loading}
                      placeholder="your@email.com"
                      className="w-full border-2 border-blue-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 bg-white hover:border-blue-300 text-slate-900 font-medium placeholder-slate-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-3">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={loading}
                      placeholder="+91-XXXXXXXXXX"
                      className="w-full border-2 border-blue-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 bg-white hover:border-blue-300 text-slate-900 font-medium placeholder-slate-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-semibold text-slate-700 mb-3">
                      Property Type *
                    </label>
                    <select
                      id="type"
                      name="type"
                      required
                      value={formData.type}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="w-full border-2 border-blue-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 bg-white hover:border-blue-300 text-slate-900 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Select property type</option>
                      <option value="1bhk">1 BHK</option>
                      <option value="2bhk">2 BHK</option>
                      <option value="3bhk">3 BHK</option>
                      <option value="villa">Villa</option>
                      <option value="hotel">Hotel</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-3">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      disabled={loading}
                      placeholder="Tell us about your project or inquiry..."
                      className="w-full border-2 border-blue-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:border-blue-500 focus:ring-blue-200 bg-white hover:border-blue-300 text-slate-900 font-medium placeholder-slate-400 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={loading ? {} : { scale: 1.02 }}
                    whileTap={loading ? {} : { scale: 0.98 }}
                    className={`w-full py-3.5 rounded-xl font-bold shadow-lg border transition-all flex items-center justify-center gap-2 ${
                      loading
                        ? "bg-gray-400 border-gray-300 cursor-not-allowed opacity-70 text-gray-200"
                        : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border border-green-400/30"
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </motion.button>
                   {/* Status Messages */}
                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-6 p-5 rounded-xl flex items-start gap-4 ${
                      status.includes("✅")
                        ? "bg-green-50 border-l-4 border-green-500"
                        : "bg-red-50 border-l-4 border-red-500"
                    }`}
                  >
                    {status.includes("✅") ? (
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Zap className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-semibold text-slate-800">{status}</p>
                    </div>
                  </motion.div>
                )}
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
                <h3 className="text-2xl font-bold mb-6">Why Choose autommensor?</h3>
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

              {/* Social Proof */}
              <motion.div
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100 text-center"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-5xl font-extrabold text-green-600 mb-2">200+</div>
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
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(15px); }
        }
        .animate-floatSlow { animation: floatSlow 8s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .bg-grid-pattern {
          background-image: radial-gradient(circle, rgba(59, 130, 246, 0.08) 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </div>
  );
}
