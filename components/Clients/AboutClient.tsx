"use client";

import React, { useState } from "react";
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
  X,
  TrendingUp,
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
  popupDescription?: string;
}

const keyValues: HelpCard[] = [
  {
    icon: Users,
    title: "Customer Centric Approach",
    popupDescription: "Every decision prioritizes your comfort, budget, and lifestyle. From site survey to installation, your vision drives our solutions.",
  },
  {
    icon: Award,
    title: "Quality",
    popupDescription: "Premium components from global leaders + rigorous testing = products built to Indian conditions.",
  },
  {
    icon: Handshake,
    title: "Trust",
    popupDescription: "200+ happy families across India. Lifetime partnership commitment for complete peace of mind.",
  },
];

const differentiators: HelpCard[] = [

  {
    icon: ClipboardCheck,
    title: "Reliable Support and Service",
    popupDescription: "24/7 Indian support team with 2-hour emergency response.",
  },
  {
    icon: Puzzle,
    title: "Customization Options",
    popupDescription: "Perfect 1BHK/2BHK/3BHK packages. Mix premium + budget devices with instant calculator-based custom quotes.",
  },
  {
    icon: Store,
    title: "Wide Range of Products",
    popupDescription: "200+ verified smart devices working seamlessly together. Lights, cameras, Door lock, Video door phone, Touch switch panels, Sensor Devices, curtains - one unified ecosystem.",
  },
  {
    icon: ShieldCheck,
    title: "10 Year Warranty",
    popupDescription: "Industry-best coverage for all devices + installation. Protects against lightning, surges, and monsoon damage.",
    // badge: true,
  },
];

const coreValues: HelpCard[] = [
  {
    icon: Target,
    title: "Customer-First Experience",
    description: "Every solution is designed with you in mind",
    popupDescription: "Personalized onboarding + dedicated account manager ensures your smart home matches your exact lifestyle needs.",
  },
  {
    icon: ShieldCheck,
    title: "Unmatched Reliability & Security",
    description: "Protect your home and data with enterprise-grade security",
    popupDescription: "Bank-level encryption + biometric access + automatic threat detection keeps your family 100% protected.",
  },
  {
    icon: Zap,
    title: "Highly Scalable & Modular",
    description: "Systems that grow with your needs",
    popupDescription: "Start with basic lighting, expand to full automation. Modular design grows perfectly with your home and family.",
  },
  {
    icon: Lightbulb,
    title: "Relentless Innovation",
    description: "Stay at the forefront of smart living technology",
    popupDescription: " AI improvements ensure your system stays cutting-edge for the next decade.",
  },
];

const whyChooseUs: HelpCard[] = [
  {
    icon: Zap,
    title: "Easy Installation",
    description: "No special wiring needed - simple Wi-Fi based setup",
    popupDescription: "Professional installation.  Works with existing wiring in any Indian home.",
  },
  {
    icon: Globe,
    title: "Remote Access",
    description: "Control your home from anywhere in the world",
    popupDescription: "Secure app access from Mumbai to New York. Real-time notifications keep you connected wherever you are.",
  },
  {
    icon: Leaf,
    title: "Energy Efficient",
    description: "Reduce energy consumption and lower utility bills",
    popupDescription: "Auto-off unused appliances + smart AC optimization annual electricity savings guaranteed.",
  },
  {
    icon: ShieldCheck,
    title: "Enhanced Security",
    description: "Advanced encryption and security protocols",
    popupDescription: "AI motion detection + face recognition + instant alerts. Monsoon-proof IP67-rated cameras.",
  },
  {
    icon: Heart,
    title: "User-Friendly",
    description: "Intuitive interface designed for everyone",
    popupDescription: "No technical knowledge needed. Voice commands in Hindi/English + one-tap scenes for elders and kids.",
  },
  {
    icon: Users,
    title: "24/7 Support",
    description: "Dedicated team ready to assist you anytime",
    popupDescription: "WhatsApp support + phone + video call assistance. ",
  },
];

export default function AboutClient(): React.ReactNode {
  const [selectedCard, setSelectedCard] = useState<HelpCard | null>(null);

  const closePopup = () => {
    setSelectedCard(null);
  };

  const openPopup = (card: HelpCard) => {
    setSelectedCard(card);
  };

  const PopupModal = ({ card }: { card: HelpCard }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        className="relative max-w-lg w-full max-h-[85vh] overflow-y-auto"
      >
        <button
          onClick={closePopup}
          className="absolute -top-4 -right-4 w-14 h-14 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl flex items-center justify-center hover:bg-red-50 hover:scale-110 transition-all duration-300 border-4 border-white/80 z-20"
        >
          <X className="w-7 h-7 text-red-500" />
        </button>

        <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-3xl shadow-2xl border border-blue-100 p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-t-3xl" />
          
          <div className="flex items-center justify-center mb-8">
            <div className="w-28 h-28 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/50">
              <card.icon size={48} className="text-white drop-shadow-2xl" />
            </div>
          </div>

          <h3 className="text-3xl font-black text-center bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-8 px-4 leading-tight">
            {card.title}
          </h3>

          <p className="text-xl text-slate-700 leading-relaxed mb-10 text-center max-w-lg mx-auto px-4">
            {card.popupDescription}
          </p>

          <div className="flex items-center justify-center space-x-6 text-sm text-slate-500 mb-6">
            <div className="flex items-center space-x-2 bg-blue-50/50 px-4 py-2 rounded-xl">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Made in India</span>
            </div>
            <div className="flex items-center space-x-2 bg-green-50/50 px-4 py-2 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              <span>10+ Years</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <>
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
              About Autommensor
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
              className="max-w-4xl mx-auto text-lg md:text-2xl mb-12 leading-relaxed text-indigo-100 font-light"
            >
              Welcome to <span className="font-semibold text-blue-100">Autommensor</span>, your trusted partner in smart home and building automation. We deliver cutting-edge Wi-Fi-based solutions requiring no special wiring, offering seamless integration for smarter, safer, and more energy-efficient living.
            </motion.p>
          </div>
        </motion.section>

        {/* Key Values Section - Clickable Icons */}
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
                  className="flex flex-col items-center text-center group cursor-pointer relative"
                  onClick={() => openPopup(value)}
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 relative bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl shadow-lg group-hover:shadow-xl group-hover:from-blue-200 group-hover:to-cyan-200 border-2 border-transparent group-hover:border-blue-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-sm" />
                    <IconComponent
                      size={80}
                      className="relative z-10 text-blue-600 group-hover:text-cyan-700 group-hover:rotate-12 transition-all duration-500 stroke-[1.8]"
                      strokeWidth={1.5}
                    />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {value.title}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* What Makes Us Different Section - Clickable Icons */}
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
                  className="flex flex-col items-center text-center group cursor-pointer relative"
                  onClick={() => openPopup(diff)}
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 relative bg-gradient-to-br from-orange-100 to-rose-100 rounded-2xl shadow-lg group-hover:shadow-xl group-hover:from-orange-200 group-hover:to-rose-200 border-2 border-transparent group-hover:border-orange-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-sm" />
                    {diff.badge ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <ShieldCheck
                          size={80}
                          className="relative z-10 text-orange-600 group-hover:text-red-700 group-hover:rotate-12 transition-all duration-500 stroke-[1.8]"
                          strokeWidth={1.5}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-white font-black text-lg bg-orange-600/90 px-3 py-1 rounded-xl shadow-2xl border-2 border-white/50 backdrop-blur-sm">
                            10Y
                          </div>
                        </div>
                      </div>
                    ) : (
                      <IconComponent
                        size={80}
                        className="relative z-10 text-orange-600 group-hover:text-red-700 group-hover:rotate-12 transition-all duration-500 stroke-[1.8]"
                        strokeWidth={1.5}
                      />
                    )}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-slate-800 group-hover:text-orange-600 transition-colors">
                    {diff.title}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Rest of sections remain unchanged but with popup capability */}
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

          {/* Core Values Grid - Clickable */}
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
                    className="group cursor-pointer bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-blue-100 hover:border-blue-300 hover:-translate-y-2"
                    onClick={() => openPopup(value)}
                  >
                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-100 to-rose-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative">
                        <IconComponent
                          size={32}
                          className="text-orange-600 group-hover:rotate-12 transition-all duration-300"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">
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

          {/* Why Choose Us - Clickable */}
          <section className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 p-12 md:p-16 rounded-3xl border border-blue-200 shadow-lg">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Why Choose Autommensor?
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
                    className="group cursor-pointer bg-white p-7 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-blue-100 hover:border-blue-300 hover:scale-105 hover:-translate-y-2"
                    onClick={() => openPopup(item)}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-rose-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300 relative">
                        <IconComponent className="text-orange-600 group-hover:rotate-6" size={24} />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-orange-600 transition-colors flex-1">
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

      {selectedCard && <PopupModal card={selectedCard} />}

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
    </>
  );
}
