"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
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
} from "lucide-react";

const keyValues = [
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

const differentiators = [
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

const coreValues = [
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

const whyChooseUs = [
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

export default function AboutClient() {
  return (
    <>
      <Navbar />
      {/* Background design layers */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-gray-100 opacity-60" />
        <div className="absolute bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 w-72 h-72 -top-16 -left-16 animate-floatSlow" />
        <div className="absolute bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 w-96 h-96 -bottom-24 -right-20 animate-floatSlow animation-delay-2000" />
      </div>

      <div className="relative min-h-screen">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="px-6 py-16 max-w-6xl mx-auto text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-extrabold mb-8 text-gray-900"
          >
            About AUTOMENSOR
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-xl md:text-2xl mb-12 leading-relaxed text-gray-700"
          >
            Welcome to AUTOMENSOR, your trusted partner in smart home and building
            automation. We deliver cutting-edge Wi-Fi-based solutions requiring no
            special wiring, offering seamless integration for smarter, safer, and
            more energy-efficient living.
          </motion.p>
        </motion.section>

        {/* Key Values Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gray-50 py-16 px-6 md:px-16 lg:px-32"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-12 text-center">
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
                  <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                    <IconComponent
                      size={80}
                      className="text-blue-600"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-700">
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
          className="bg-white py-16 px-6 md:px-16 lg:px-32"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-12 text-center">
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
                  <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center mb-4 transition-transform group-hover:scale-110 relative">
                    {diff.badge ? (
                      <div className="relative">
                        <ShieldCheck
                          size={80}
                          className="text-blue-600"
                          strokeWidth={1.5}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-blue-600 font-bold text-xs leading-tight text-center">
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
                        className="text-blue-600"
                        strokeWidth={1.5}
                      />
                    )}
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-700">
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
          className="bg-white bg-opacity-90 px-6 py-16 max-w-6xl mx-auto space-y-16"
        >
          {/* Mission */}
          <section className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-orange-600">
              Our Mission
            </h2>
            <p className="text-gray-700 text-xl md:text-2xl leading-relaxed">
              Revolutionizing the way you live and work by creating innovative,
              secure, and intuitive automation technologies that bring true
              convenience and peace of mind to every home and business.
            </p>
          </section>

          {/* Core Values Grid */}
          <section>
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-orange-600">
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
                    className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <IconComponent
                          size={48}
                          className="text-orange-600"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">
                          {value.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
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
          <section className="bg-blue-50 p-12 rounded-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-blue-600">
              Why Choose AUTOMENSOR?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {whyChooseUs.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <IconComponent className="text-orange-600" size={32} />
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Team */}
          <section className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-orange-600">
              Meet Our Team
            </h2>
            <p className="text-gray-700 text-xl md:text-2xl leading-relaxed">
              A passionate group of engineers, designers, and support specialists
              dedicated to crafting seamless and inspiring smart environments
              tailored for modern lifestyles. Our diverse expertise ensures that
              every product we create meets the highest standards of quality and
              innovation.
            </p>
          </section>
        </motion.div>
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
}
