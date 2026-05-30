"use client";

import Image from "next/image";
import {
  Smartphone,
  Tv,
  Mic,
  Timer,
} from "lucide-react";
import Footer from "@/components/Footer";
import NavbarHero from "@/components/Navbar";

export default function SmartCurtain() {
  const controlMethods = [
    { icon: Smartphone, title: "Mobile App", description: "Control curtains from anywhere." },
    { icon: Tv, title: "Remote", description: "Infrared remote control." },
    { icon: Mic, title: "Voice", description: "Works with Alexa & Google Assistant." },
    { icon: Timer, title: "Scheduling", description: "Set timers for automatic opening & closing." },
  ];

  const compatibleTypes = [
    {
      title: "One Side Opening",
      description: "Curtain opens from one side smoothly.",
      image: "https://res.cloudinary.com/dn9rohd6h/image/upload/v1768652221/one_side_k7pa2l.webp",
    },
    {
      title: "Center Opening",
      description: "Curtain opens from the center to both sides.",
      image: "https://res.cloudinary.com/dn9rohd6h/image/upload/v1768652220/center_open_l3eq4d.webp",
    },
    {
      title: "Blind Opening",
      description: "Compatible with roller/blind style curtains.",
      image: "https://res.cloudinary.com/dn9rohd6h/image/upload/v1768652220/blind_mdb8k2.webp",
    },
  ];

  const technicalSpecs = [
    { label: "Voltage", value: "90V – 230V" },
    { label: "Motor Type", value: "Silent DC Motor" },
    { label: "Remote", value: "IR Remote" },
    { label: "Noise Level", value: "< 35 dB" },
    { label: "Material", value: "Aluminium / Plastic" },
    { label: "Operation Temperature", value: "-10°C to 50°C" },
    { label: "Max Load", value: "10 KG per Motor" },
  ];

  return (
    <>
    <NavbarHero />
      {/* ================= LANDING SECTION ================= */}
      <section className="relative min-h-[70vh] lg:min-h-[90vh] flex items-start lg:items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-70 saturate-60 contrast-90"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dn9rohd6h/image/upload/v1768640842/smart-curtain_1_d0bbyy.webp')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-24 lg:pt-0 w-full">
          <div className="max-w-xl text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide mb-3">
              Smart Curtains
            </h1>
            <p className="text-base sm:text-lg text-white/90">
              Effortless control of natural light and privacy
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONTROL METHODS ================= */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6">
            Control Your Curtains
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-12">
            Choose how you want to control your curtains — simple, smart, and effortless.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {controlMethods.map((item, index) => (
              <ControlCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= COMPATIBILITY ================= */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6">
            Compatible Curtain Types
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-12">
            Works with all modern curtain styles to fit your interior.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {compatibleTypes.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition"
              >
               <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden rounded-lg">
  <Image
    src={item.image}
    alt={item.title}
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 33vw"
    priority={index === 0}
  />
</div>

                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
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

/* ================= CONTROL CARD COMPONENT ================= */
function ControlCard({ icon: Icon, title, description }) {
  return (
    <div className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition text-center">
      <Icon size={46} className="text-blue-500 mx-auto mb-4" />
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </div>
  );
}
