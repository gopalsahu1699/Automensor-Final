"use client";

import Footer from "@/components/Footer";
import NavbarHero from "@/components/Navbar";
import {
  Fingerprint,
  CreditCard,
  KeyRound,
  Smartphone,
  Lock,
  Wifi,
  Video,
  ShieldCheck,
} from "lucide-react";

/* ================= DATA ================= */

const unlockMethods = [
  {
    icon: Fingerprint,
    title: "Fingerprint",
    description: "Fast and secure biometric access.",
  },
  {
    icon: CreditCard,
    title: "RF Card",
    description: "Tap card access for convenience.",
  },
  {
    icon: Lock,
    title: "Password",
    description: "Secure PIN-based unlocking.",
  },
  {
    icon: KeyRound,
    title: "Manual Key",
    description: "Traditional backup key access.",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "Unlock remotely using your phone.",
  },
];

const features = [
  {
    icon: Lock,
    title: "Manual Lock",
    description: "Lock the door manually when required.",
  },
  {
    icon: ShieldCheck,
    title: "Auto Lock",
    description: "Automatically locks after door closure.",
  },
  {
    icon: Video,
    title: "Live Video Feed",
    description: "View visitors in real time.",
  },
  {
    icon: KeyRound,
    title: "OTP Unlock",
    description: "One-time password access for guests.",
  },
  {
    icon: Wifi,
    title: "Wi-Fi Enabled",
    description: "Control and monitor from anywhere.",
  },
];

const technicalSpecs = [
  { label: "Unlock Methods", value: "Fingerprint, RF Card, PIN, App, Key" },
  { label: "Connectivity", value: "Wi-Fi / Bluetooth" },
  { label: "Material", value: "Aluminium Alloy" },
  { label: "Power Supply", value: "Rechargeable Battery" },
  { label: "Emergency Power", value: "USB Backup" },
  { label: "Operating Temp", value: "-20°C to 60°C" },
  { label: "Door Thickness", value: "35mm – 80mm" },
];

/* ================= PAGE ================= */

export default function DigitalDoorLockLanding() {
  return (
    <>
    <NavbarHero />
      {/* ================= HERO ================= */}
      <section className="relative min-h-[70vh] lg:min-h-[90vh] flex items-start lg:items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-70 saturate-60 contrast-90"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dn9rohd6h/image/upload/v1768641943/digital_door_lock_1_hofn7u.webp')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-24 lg:pt-0 w-full">
          <div className="max-w-xl text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide mb-3">
              Digital Door Locks
            </h1>
            <p className="text-base sm:text-lg text-white/90">
              Secure, keyless access for modern homes and offices
            </p>
          </div>
        </div>
      </section>

      {/* ================= UNLOCK METHODS ================= */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6">
            Multiple Unlock Methods
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-14">
            Choose the most convenient way to access your door.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
            {unlockMethods.map((item, index) => (
              <IconCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900">
              Smart Lock Features
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {features.map((item, index) => (
              <FeatureCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= TECHNICAL SPECIFICATIONS ================= */}
      <section className="bg-[#3f3f3f] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-medium text-white mb-14">
            Technical Specifications
          </h2>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-6">
            {technicalSpecs.map((spec, index) => (
              <div
                key={index}
                className="flex justify-between border-b border-white/10 pb-3"
              >
                <span className="text-white/80">{spec.label}</span>
                <span className="text-white text-right">{spec.value}</span>
              </div>
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
