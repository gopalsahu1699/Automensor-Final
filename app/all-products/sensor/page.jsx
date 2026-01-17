"use client";

import Footer from "@/components/Footer";
import NavbarHero from "@/components/Navbar";
import {
  Radar,
  Sun,
  Zap,
  ShieldCheck,
  Lightbulb,
  Home,
  Building,
  Factory,
} from "lucide-react";

/* ================= DATA ================= */

const sensorFeatures = [
  {
    icon: Radar,
    title: "Motion Detection",
    description: "Detects human movement instantly for automation and security.",
  },
  {
    icon: Sun,
    title: "Outdoor Photon Sensor",
    description: "Automatically controls lights based on sunlight levels.",
  },
  {
    icon: ShieldCheck,
    title: "Intrusion Alert",
    description: "Enhances security by detecting unauthorized movement.",
  },
  {
    icon: Zap,
    title: "Smart Automation",
    description: "Triggers lights, alarms, or devices automatically.",
  },
];

const sensorBenefits = [
  {
    icon: Lightbulb,
    title: "Electricity Bill Saving",
    description: "Lights turn off automatically when no movement is detected.",
  },
  {
    icon: Home,
    title: "Hands-Free Comfort",
    description: "Enjoy automatic lighting without switches.",
  },
  {
    icon: ShieldCheck,
    title: "Improved Safety",
    description: "Detects motion in restricted or dark areas.",
  },
];

const sensorUseCases = [
  {
    icon: Home,
    title: "Homes & Apartments",
    description: "Bedrooms, bathrooms, balconies, staircases.",
  },
  {
    icon: Building,
    title: "Offices & Shops",
    description: "Cabins, corridors, washrooms, entry points.",
  },
  {
    icon: Factory,
    title: "Warehouses & Parking",
    description: "Energy-efficient lighting and security monitoring.",
  },
];

/* ================= PAGE ================= */

export default function SensorsLanding() {
  return (
    <>
    <NavbarHero />
      {/* ================= HERO ================= */}
      <section className="relative min-h-[70vh] lg:min-h-[90vh] flex items-start lg:items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-70 saturate-60 contrast-90"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dn9rohd6h/image/upload/v1768642765/sensor_2_nqeqnv.webp')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-24 lg:pt-0 w-full">
          <div className="max-w-xl text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide mb-3">
              Smart Sensors
            </h1>
            <p className="text-base sm:text-lg text-white/90">
              Intelligent sensing for safety, automation, and energy efficiency
            </p>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6">
            Smart Sensor Features
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-14">
            Advanced sensors designed for smart homes and buildings.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
            {sensorFeatures.map((item, index) => (
              <IconCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6">
            Why Use Smart Sensors?
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 mt-14">
            {sensorBenefits.map((item, index) => (
              <FeatureCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= USE CASES ================= */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900">
              Ideal Applications
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {sensorUseCases.map((item, index) => (
              <UseCaseCard key={index} {...item} />
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

function UseCaseCard({ icon: Icon, title, description }) {
  return (
    <div className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition text-center">
      <Icon size={42} className="text-blue-500 mx-auto mb-4" />
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </div>
  );
}
