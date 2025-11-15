"use client";

import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap, Home, Building2, Sparkles, CheckCircle2, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    image: assets.estimate_cost_category_1,
    title: "Smart Home Automation",
    description: "Perfect for residential spaces with complete smart home control",
    route: "/estimate-cost-calculator/estimated-cost-home",
    icon: Home,
    badge: "Popular",
    delay: 0.1,
    color: "from-blue-600 to-blue-500",
    features: ["Easy Installation", "Budget-Friendly", "Home Integration"],
  },
  {
    id: 2,
    image: assets.estimate_cost_category_2,
    title: "Smart Villa Automation",
    description: "Luxury villa automation with premium features and integrations",
    route: "/estimate-cost-calculator/estimated-cost-villa",
    icon: Building2,
    badge: "Premium",
    delay: 0.2,
    color: "from-green-600 to-green-500",
    features: ["Luxury Features", "Advanced Control", "Full Integration"],
  },
  {
    id: 3,
    image: assets.estimate_cost_category_3,
    title: "Hotel Room Automation",
    description: "Commercial-grade hotel room automation systems for hospitality",
    route: "/estimate-cost-calculator/estimated-cost-hotel-room",
    icon: Zap,
    badge: "Commercial",
    delay: 0.3,
    color: "from-purple-600 to-purple-500",
    features: ["Guest Control", "Energy Efficient", "Scalable"],
  },
];

const ProductCard = ({ product }: { product: typeof products[0] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = product.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: product.delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full cursor-pointer bg-white"
    >
      {/* Animated Border */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${product.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none rounded-2xl`}
      />

      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-300 to-slate-400 h-56 sm:h-64">
        <Image
          src={product.image}
          alt={product.title}
          width={800}
          height={600}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isHovered ? "scale-110 brightness-50" : "scale-100 brightness-100"
          }`}
          priority={product.id === 1}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badge */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={isHovered ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`absolute top-4 right-4 bg-gradient-to-r ${product.color} text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg`}
        >
          {product.badge}
        </motion.div>

        {/* Overlay Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
        >
          <motion.div
            animate={isHovered ? { scale: 1.2, rotate: 360 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Icon className="w-12 h-12 text-white" />
          </motion.div>
          <span className="font-semibold text-base text-white text-center px-4">
            Click to customize your solution
          </span>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="bg-white p-6 flex-grow flex flex-col justify-between relative overflow-hidden">
        {/* Accent Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.3 }}
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${product.color} origin-left`}
        />

        {/* Badge and Icon */}
        <div className="mb-4 flex items-center gap-3">
          <div className={`p-2.5 bg-gradient-to-r ${product.color} rounded-lg`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full">
            {product.badge}
          </span>
        </div>

        {/* Title and Description */}
        <div className="mb-6">
          <h3 className="font-bold text-xl sm:text-2xl text-gray-900 leading-snug mb-3 group-hover:text-orange-600 transition-colors duration-300">
            {product.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {product.description}
          </p>

          {/* Features */}
          <div className="space-y-2">
            {product.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={product.route}
          className={`inline-flex items-center justify-center gap-2 font-semibold text-white bg-gradient-to-r ${product.color} hover:shadow-lg hover:shadow-orange-600/40 active:scale-95 rounded-full transition-all duration-300 px-6 py-3 text-base whitespace-nowrap relative overflow-hidden group/btn shadow-md self-start w-full sm:w-auto ${
            isHovered ? "-translate-y-1" : ""
          }`}
          aria-label={`Get personalized estimate for: ${product.title}`}
        >
          {/* Shimmer effect */}
          <motion.span
            initial={{ x: "-100%" }}
            animate={isHovered ? { x: "100%" } : { x: "-100%" }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />

          <span className="relative flex items-center gap-2">
            Get Estimate
            <motion.span
              animate={isHovered ? { x: 4 } : { x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </span>
        </Link>
      </div>
    </motion.article>
  );
};

export default function EstimateCostCalculatorClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  return (
    <section className="relative min-h-screen px-6 sm:px-10 md:px-20 py-16 md:py-24 overflow-hidden bg-white">
      {/* Background Elements - Subtle and Light */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center mb-20"
        >
          {/* Floating Badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mb-6 inline-flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-full border border-orange-200"
          >
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-semibold text-orange-600">
              Instant Cost Calculation
            </span>
          </motion.div>

          {/* Main Heading - Improved Visibility */}
          <div className="mb-6 text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight text-gray-900 mb-4">
              Choose Your
              <br />
              <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                Smart Solution
              </span>
            </h1>
          </div>

          <p className="text-center text-gray-600 max-w-2xl text-base sm:text-lg leading-relaxed mb-8">
            Select the perfect automation solution for your space and get an instant customized cost estimate with real device recommendations
          </p>

          {/* Animated Underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={mounted ? { width: "140px" } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-2 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 rounded-full shadow-lg shadow-orange-500/50"
          />
        </motion.header>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16"
        >
          {[
            { label: "Active Users", value: "10K+", icon: Home },
            { label: "Total Devices", value: "50+", icon: Zap },
            { label: "Success Rate", value: "98%", icon: TrendingUp },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg sm:rounded-xl p-6 text-center border border-gray-200 shadow-sm hover:border-orange-300 hover:shadow-md transition-all"
            >
              <stat.icon className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-16"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 rounded-2xl p-8 sm:p-12 border border-orange-200"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Need Help Choosing?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our automation experts are ready to help you find the perfect solution for your space
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold rounded-full hover:from-orange-700 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Contact Experts
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-orange-600 font-bold rounded-full border-2 border-orange-600 hover:bg-orange-50 transition-all duration-300 shadow-sm"
            >
              View Pricing
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
