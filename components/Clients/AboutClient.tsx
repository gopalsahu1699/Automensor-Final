"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Award,
  Lightbulb,
  Leaf,
  Handshake,
  Factory,
  ClipboardCheck,
  Puzzle,
  Store,
  ShieldCheck,
  Target,
  Heart,
  Zap,
  Globe,
  Info,
} from "lucide-react";

interface HelpCard {
  icon: React.ComponentType<{
    className?: string;
    size?: number;
    strokeWidth?: number;
  }>;
  title: string;
  description?: string;
  badge?: boolean;
}

const keyValues: HelpCard[] = [
  {
    icon: Users,
    title: "Customer Centric Approach",
  },
  {
    icon: Award,
    title: "Quality",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
  },
  {
    icon: Leaf,
    title: "Sustainability",
  },
  {
    icon: Handshake,
    title: "Trust",
  },
];

const differentiators: HelpCard[] = [
  {
    icon: Factory,
    title: "Manufacturing Unit",
  },
  {
    icon: ClipboardCheck,
    title: "Reliable Support and Service",
  },
  {
    icon: Puzzle,
    title: "Customization Options",
  },
  {
    icon: Store,
    title: "Wide Range of Products",
  },
  {
    icon: ShieldCheck,
    title: "10 Year Warranty",
    badge: true,
  },
];

const coreValues: HelpCard[] = [
  {
    icon: Target,
    title: "Customer-First Experience",
    description: "Every solution is designed with you in mind",
  },
  {
    icon: ShieldCheck,
    title: "Unmatched Reliability & Security",
    description: "Protect your home and data with enterprise-grade security",
  },
  {
    icon: Zap,
    title: "Highly Scalable & Modular",
    description: "Systems that grow with your needs",
  },
  {
    icon: Lightbulb,
    title: "Relentless Innovation",
    description: "Stay at the forefront of smart living technology",
  },
];

const whyChooseUs: HelpCard[] = [
  {
    icon: Zap,
    title: "Easy Installation",
    description: "No special wiring needed - simple Wi-Fi based setup",
  },
  {
    icon: Globe,
    title: "Remote Access",
    description: "Control your home from anywhere in the world",
  },
  {
    icon: Leaf,
    title: "Energy Efficient",
    description: "Reduce energy consumption and lower utility bills",
  },
  {
    icon: ShieldCheck,
    title: "Enhanced Security",
    description: "Advanced encryption and security protocols",
  },
  {
    icon: Heart,
    title: "User-Friendly",
    description: "Intuitive interface designed for everyone",
  },
  {
    icon: Users,
    title: "24/7 Support",
    description: "Dedicated team ready to assist you anytime",
  },
];

export default function AboutClient(): React.ReactNode {
  return (
    <>
      {/* Enhanced Background with Modern Light Theme */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-white via-blue-50 to-slate-100">
        <div className="absolute rounded-full bg-gradient-to-br from-blue-200 to-cyan-200 mix-blend-multiply filter blur-3xl opacity-20 w-[600px] h-[600px] -top-20 -left-24 animate-floatSlow" />
        <div className="absolute rounded-full bg-gradient-to-br from-orange-100 to-rose-200 mix-blend-multiply filter blur-3xl opacity-15 w-[500px] h-[500px] -bottom-28 -right-24 animate-floatSlow animation-delay-2000" />
        <div className="absolute inset-0 bg-grid-pattern opacity-3 pointer-events-none" />
      </div>

      <div className="relative min-h-screen">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20 px-6 border-b border-purple-400/30"
        >
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/15 backdrop-blur-md border-2 border-white/30 mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <Info className="w-10 h-10" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-purple-100"
            >
              About AUTOMENSOR
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
              className="max-w-4xl mx-auto text-lg md:text-2xl mb-12 leading-relaxed text-indigo-100 font-light"
            >
              Welcome to <span className="font-semibold text-blue-100">AUTOMENSOR</span>, your trusted partner in smart home and building automation. We deliver cutting-edge Wi-Fi-based solutions requiring no special wiring, offering seamless integration for smarter, safer, and more energy-efficient living.
            </motion.p>
          </div>
        </motion.section>

        {/* Key Values Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-br from-white via-blue-50 to-cyan-50 py-20 px-6 md:px-16 lg:px-32"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-16 text-center">
            Key Values
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12">
            {keyValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl shadow-sm group-hover:shadow-lg group-hover:from-blue-200 group-hover:to-cyan-200">
                    <IconComponent
                      size={80}
                      className="text-blue-600 group-hover:text-cyan-700 transition-colors"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-slate-800">
                    {value.title}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* What Makes Us Different Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white py-20 px-6 md:px-16 lg:px-32"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-16 text-center">
            What Makes Us Different
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12">
            {differentiators.map((diff, index) => {
              const IconComponent = diff.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 relative bg-gradient-to-br from-orange-100 to-rose-100 rounded-2xl shadow-sm group-hover:shadow-lg group-hover:from-orange-200 group-hover:to-rose-200">
                    {diff.badge ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <ShieldCheck
                          size={80}
                          className="text-orange-600 group-hover:text-red-700 transition-colors"
                          strokeWidth={1.5}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-orange-700 font-bold text-xs leading-tight text-center drop-shadow-sm">
                            10
                            <br />
                            YEAR
                            <br />
                            WARRANTY
                          </div>
                        </div>
                      </div>
                    ) : (
                      <IconComponent
                        size={80}
                        className="text-orange-600 group-hover:text-red-700 transition-colors"
                        strokeWidth={1.5}
                      />
                    )}
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-slate-800">
                    {diff.title}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Mission, Values, Team Sections */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-br from-white via-slate-50 to-blue-50 px-6 py-20 max-w-6xl mx-auto space-y-20"
        >
          {/* Mission */}
          <section className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Our Mission
            </h2>
            <p className="text-slate-700 text-lg md:text-xl leading-relaxed font-light">
              Revolutionizing the way you live and work by creating innovative,
              secure, and intuitive automation technologies that bring true
              convenience and peace of mind to every home and business.
            </p>
          </section>

          {/* Core Values Grid */}
          <section>
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {coreValues.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-300"
                  >
                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-100 to-rose-100 rounded-xl flex items-center justify-center">
                        <IconComponent
                          size={32}
                          className="text-orange-600"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-3 text-slate-900">
                          {value.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed font-light">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 p-12 md:p-16 rounded-3xl border border-blue-200 shadow-lg">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Why Choose AUTOMENSOR?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {whyChooseUs.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="bg-white p-7 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-300 hover:scale-105"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <IconComponent className="text-orange-600" size={24} />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-slate-600 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Team */}
          <section className="text-center max-w-4xl mx-auto bg-gradient-to-br from-orange-50 via-rose-50 to-orange-100 p-12 rounded-3xl border border-orange-200">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <p className="text-slate-700 text-lg md:text-xl leading-relaxed font-light">
              A passionate group of engineers, designers, and support specialists
              dedicated to crafting seamless and inspiring smart environments
              tailored for modern lifestyles. Our diverse expertise ensures that
              every product we create meets the highest standards of quality and
              innovation.
            </p>
          </section>
        </motion.div>
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
    </>
  );
}
