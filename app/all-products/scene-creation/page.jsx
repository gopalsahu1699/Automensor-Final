"use client";

import Footer from "@/components/Footer";
import NavbarHero from "@/components/Navbar";
import {
  Sparkles,
  Sofa,
  Film,
  Moon,
  Coffee,
  Mic,
  Smartphone,
  Timer,
  Home,
  Building,
} from "lucide-react";

/* ================= DATA ================= */

const sceneExamples = [
  {
    icon: Sofa,
    title: "Relax Mode",
    description: "Soft lighting, curtains closed, calm ambience.",
  },
  {
    icon: Film,
    title: "Movie Night",
    description: "Dim lights, curtains closed, TV powered on.",
  },
  {
    icon: Coffee,
    title: "Morning Scene",
    description: "Curtains open, lights on, fresh start.",
  },
  {
    icon: Moon,
    title: "Good Night",
    description: "All lights off, doors locked, night mode activated.",
  },
];

const controlMethods = [
  {
    icon: Smartphone,
    title: "One-Tap Control",
    description: "Activate your entire scene with a single tap.",
  },
  {
    icon: Mic,
    title: "Voice Control",
    description: "Works with Alexa & Google Assistant.",
  },
  {
    icon: Timer,
    title: "Scheduled Scenes",
    description: "Scenes trigger automatically at set times.",
  },
];

const benefits = [
  {
    icon: Sparkles,
    title: "Personalized Living",
    description: "Create moods that match your lifestyle.",
  },
  {
    icon: Timer,
    title: "Time Saving",
    description: "Control multiple devices instantly.",
  },
  {
    icon: Home,
    title: "Smart Automation",
    description: "Your home reacts without manual effort.",
  },
];

const useCases = [
  {
    icon: Home,
    title: "Homes & Apartments",
    description: "Living room, bedroom, home theatre.",
  },
  {
    icon: Building,
    title: "Hotels & Villas",
    description: "Luxury ambience for guests.",
  },
  {
    icon: Building,
    title: "Offices & Showrooms",
    description: "Professional lighting and automation.",
  },
];

/* ================= PAGE ================= */

export default function SceneCreationLanding() {
  return (
    <>
    <NavbarHero />
      {/* ================= HERO ================= */}
      <section className="relative min-h-[70vh] lg:min-h-[90vh] flex items-start lg:items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/dn9rohd6h/image/upload/v1768642966/scene_1_fcjdcg.webp')",
          }}
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-24 lg:pt-0 w-full">
          <div className="max-w-xl text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide mb-3">
              Scene Creation
            </h1>
            <p className="text-base sm:text-lg text-white/90">
              Create personalized moods and control multiple devices with one tap
            </p>
          </div>
        </div>
      </section>

      {/* ================= WHAT IS SCENE ================= */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6">
            What Is Scene Creation?
          </h2>
          <p className="text-gray-600 text-lg">
            Scene Creation allows you to control multiple smart devices together.
            Lights, curtains, locks, and appliances work in sync to create the
            perfect environment instantly.
          </p>
        </div>
      </section>

      {/* ================= SCENE EXAMPLES ================= */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-14">
            Popular Smart Scenes
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
            {sceneExamples.map((item, index) => (
              <IconCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-14">
            How You Can Activate Scenes
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {controlMethods.map((item, index) => (
              <FeatureCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-14">
            Benefits of Scene Automation
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {benefits.map((item, index) => (
              <FeatureCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= USE CASES ================= */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-14">
            Where Scene Creation Fits Best
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {useCases.map((item, index) => (
              <IconCard key={index} {...item} />
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
    <div className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition text-center bg-white">
      <Icon size={42} className="text-blue-500 mx-auto mb-4" />
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition bg-white">
      <Icon size={40} className="text-blue-500 mb-4" />
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
