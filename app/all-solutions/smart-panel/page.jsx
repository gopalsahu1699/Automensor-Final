"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Touchpad,
  Mic,
  Tv,
  Smartphone,
  Wifi,
  Timer,
  Layers,
  ToggleRight,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import NavbarHero from "@/components/Navbar";
import Footer from "@/components/Footer";

// Slider images
const slides = [
  {
    image: "https://res.cloudinary.com/dn9rohd6h/image/upload/v1768572289/Interior_friendly_yqwrng.webp",
    alt: "Smart Touch Panel 1",
  },
  {
    image: "https://res.cloudinary.com/dn9rohd6h/image/upload/v1768650887/auto_task_pcvchd.webp",
    alt: "Smart Touch Panel 2",
  },
  {
    image: "https://res.cloudinary.com/dn9rohd6h/image/upload/v1768651180/shockproof-desktop_pfajub.webp",
    alt: "Smart Touch Panel 3",
  },
];

// ================= SMART TOUCH PANEL FEATURES DATA =================
const smartTouchFeatures = [
  { title: "Wi-Fi Enabled", description: "No hub required. Works directly on Wi-Fi network.", icon: Wifi },
  { title: "Timer & Scheduling", description: "Automate lights and devices with smart schedules.", icon: Timer },
  { title: "Scene Control", description: "Create scenes like Morning, Party, Dinner & Night.", icon: Layers },
  { title: "Lighting & Dimming", description: "Adjust brightness levels smoothly for perfect ambience.", icon: Layers },
  { title: "Time Scheduling", description: "Schedule lights and appliances to turn ON/OFF automatically.", icon: Timer },
  { title: "Surge Protection", description: "Protects devices from sudden power surges.", icon: Zap },
  { title: "High Voltage Protection", description: "Safeguards against voltage fluctuations and overload.", icon: ToggleRight },
  { title: "Real-Time Live Feed", description: "Monitor device status and usage in real time via app.", icon: Smartphone },
  { title: "Shock Proof", description: "Protects users and devices from electric shocks.", icon: Zap },
];

// ================= TECHNICAL SPECIFICATIONS DATA =================
const technicalSpecs = [
  { label: "Voltage", value: "90V to 230V" },
  { label: "Frequency", value: "50Hz – 60Hz" },
  { label: "Remote", value: "IR Remote" },
  { label: "Module Size", value: "As per standard" },
  { label: "Weight", value: "< 1 KG" },
  { label: "Material", value: "ABS / Acrylic / Toughened Glass" },
  { label: "Sound Indication", value: "Buzzer" },
  { label: "Technology", value: "IR, RF, Wi-Fi" },
  { label: "Load Capacity", value: <>Resistive Load: 350W <br />Inductive Load: 150W</> },
  { label: "Security", value: "OOB Algorithm" },
  { label: "Operation Temperature", value: "-40°C to 110°C" },
  { label: "Relative Humidity", value: "5% to 95%" },
];

// ================= IMAGE SLIDER COMPONENT =================
function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  return (
    <section className="relative w-full">
      <div className="relative overflow-hidden">
        {/* Slide Image */}
        <div className="relative w-full h-[320px] md:h-[480px]">
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].alt}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition ${
                currentSlide === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ================= MAIN PAGE COMPONENT =================
export default function SmartSwitchPage() {
  return (
    <>
    <NavbarHero />
      {/* ================= LANDING SECTION ================= */}
      <section className="relative min-h-[70vh] lg:min-h-[90vh] flex items-start lg:items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-70 saturate-60 contrast-90"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dn9rohd6h/image/upload/v1768625549/main_header_2560_t2svis.webp')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-24 lg:pt-0 w-full">
          <div className="max-w-xl text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide mb-3">
              Smart Touch Switches
            </h1>
            <p className="text-base sm:text-lg text-white/90">
              Stylish, modern control for lighting and home automation
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTROL METHODS ================= */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6">
            Multiple Ways to Control
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-20">
            Choose how you want to control your home — simple, smart, and effortless.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <ControlCard icon={Touchpad} title="Touch" description="Instant glass touch response." />
            <ControlCard icon={Mic} title="Voice" description="Works with Alexa & Google." />
            <ControlCard icon={Tv} title="Remote" description="IR remote supported." />
            <ControlCard icon={Smartphone} title="Mobile App" description="Control from anywhere." />
          </div>
        </div>
      </section>

      {/* ================= IMAGE SLIDER ================= */}
      <ImageSlider />

      {/* ================= FEATURES ================= */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-medium text-gray-900">
              Smart Touch Panel Features
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {smartTouchFeatures.map((item, index) => (
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
              <div key={index} className="flex justify-between border-b border-white/10 pb-3">
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

/* ================= CONTROL CARD ================= */
function ControlCard({ icon: Icon, title, description }) {
  return (
    <div className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition text-center">
      <Icon size={46} className="text-blue-500 mx-auto mb-4" />
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </div>
  );
}

/* ================= FEATURE CARD ================= */
function FeatureCard({ title, description, icon: Icon }) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition">
      <Icon size={40} className="text-blue-500 mb-4" />
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
