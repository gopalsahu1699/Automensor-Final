import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Phone, Mail, Leaf } from "lucide-react";

function CallToAction() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-green-50/30 py-16 px-6">
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 text-white rounded-3xl shadow-2xl max-w-7xl mx-auto">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-lime-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-800/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl"></div>
        </div>

        {/* Organic Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Top Decorative Border */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-lime-400 via-green-400 to-emerald-500"></div>

        <div className="relative z-10 py-20 px-6 md:px-12 lg:px-16">
          {/* Icon Badge with Pulse Animation */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-lime-300/30 rounded-full blur-xl animate-pulse"></div>
              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 shadow-2xl">
                <Leaf className="w-12 h-12 text-lime-300" />
              </div>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Let's Build the{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-lime-300 via-green-200 to-emerald-200">
                Future Together
              </span>
            </span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-green-50 text-center mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join hundreds of innovators who trust autommensor to power smart homes and buildings
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/contact-us"
              className="group inline-flex items-center gap-3 bg-white text-green-700 px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-green-300/50 transform hover:scale-105 transition-all duration-300"
            >
              Contact Us Now
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/all-products"
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/40 px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5" />
              Explore Products
            </Link>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl px-6 py-4 shadow-xl hover:bg-white/20 transition-all min-w-[250px] group">
  <Phone className="w-5 h-5 text-lime-300 group-hover:scale-110 transition-transform" />
  <a 
    href="tel:+918718847083"
    className="font-semibold hover:text-white/90 transition-colors cursor-pointer block w-full"
  >
    +91-8718847083
  </a>
</div>

           <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl px-6 py-4 shadow-xl hover:bg-white/20 transition-all min-w-[250px] group">
  <Mail className="w-5 h-5 text-lime-300 group-hover:scale-110 transition-transform" />
  <a 
    href="mailto:autommensor@gmail.com"
    className="font-semibold hover:text-white/90 transition-colors cursor-pointer block w-full"
  >
    autommensor@gmail.com
  </a>
</div>

          </motion.div>
        </div>

        {/* Bottom Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="rgba(255, 255, 255, 0.1)"
              d="M0,32L48,42.7C96,53,192,75,288,80C384,85,480,75,576,58.7C672,43,768,21,864,21.3C960,21,1056,43,1152,48C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>
    </div>
  );
}

export default CallToAction;
