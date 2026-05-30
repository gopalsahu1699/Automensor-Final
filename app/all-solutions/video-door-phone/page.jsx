"use client";

import Footer from "@/components/Footer";
import NavbarHero from "@/components/Navbar";
import {
  Video,
  Mic,
  Smartphone,
  Unlock,
  ShieldCheck,
  Eye,
  Globe,
  Smile,
  Plug,
  Home,
} from "lucide-react";

/* ================= DATA ================= */

const vdpFeatures = [
  {
    icon: Video,
    title: "Video Calling",
    description: "See visitors clearly before answering the door.",
  },
  {
    icon: Mic,
    title: "Two-Way Talk",
    description: "Talk and listen to visitors in real time.",
  },
  {
    icon: Smartphone,
    title: "Mobile Integration",
    description: "Receive calls and alerts directly on your phone.",
  },
  {
    icon: Unlock,
    title: "Secure Access Release",
    description: "Unlock doors remotely with full control.",
  },
];

const whyVDP = [
  {
    icon: ShieldCheck,
    title: "Better Home Security",
    description: "Know who is outside without opening the door.",
  },
  {
    icon: Globe,
    title: "Comfort & Control Anywhere",
    description: "Monitor and manage visitors from anywhere in the world.",
  },
  {
    icon: Smile,
    title: "Easy to Use",
    description: "Simple interface for all age groups.",
  },
  {
    icon: Plug,
    title: "Seamless Integration",
    description: "Works smoothly with smart locks and automation systems.",
  },
  {
    icon: Home,
    title: "Built for Indian Homes",
    description: "Designed to suit Indian weather, power, and lifestyle.",
  },
];

/* ================= PAGE ================= */

export default function VideoDoorPhoneLanding() {
  return (
    <>
    <NavbarHero />
      {/* ================= HERO ================= */}
      <section className="relative min-h-[70vh] lg:min-h-[90vh] flex items-start lg:items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-70 saturate-60 contrast-90"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dn9rohd6h/image/upload/v1768642243/vdp_2_lsslxx.webp')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-24 lg:pt-0 w-full">
          <div className="max-w-xl text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide mb-3">
              Video Door Phone
            </h1>
            <p className="text-base sm:text-lg text-white/90">
              See, talk, and control access to your home from anywhere
            </p>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6">
            Smart Video Door Phone Features
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-14">
            Advanced communication and security at your doorstep.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
            {vdpFeatures.map((item, index) => (
              <IconCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY VDP ================= */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900">
              Why Video Door Phone for Home?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {whyVDP.map((item, index) => (
              <FeatureCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

/* ================= COMPONENTS ================= */

function IconCard({ icon: Icon, title, description }) {
  return (
    <div className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition text-center">
      <Icon size={44} className="text-blue-500 mx-auto mb-4" />
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition">
      <Icon size={40} className="text-blue-500 mb-4" />
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
