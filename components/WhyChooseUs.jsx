"use client";
import { motion } from "framer-motion";
import {
  Diamond,
  Timer,
  Hand,
  Wifi,
  Headphones,
  Plug,
} from "lucide-react";

const features = [
  {
    title: "Premium Quality",
    description:
      "10-year warranty on products ensuring durability and reliability.",
    icon: Diamond,
    color: "bg-violet-500",
  },
  {
    title: "Free consultation ",
    description:
      "Free installation consultation with quick execution.",
    icon: Timer,
    color: "bg-blue-500",
  },
  {
    title: "Local Support",
    description:
      "Reliable local service and on-site technical support.",
    icon: Headphones,
    color: "bg-gray-700",
  },
  {
    title: "Easy Controll",
    description:
      "Easy controll with voice and simple mobile app UI",
    icon: Hand,
    color: "bg-emerald-500",
  },
  {
    title: "Easy Installation",
    description:
      "Wi-Fi based automation with no special wiring required.",
    icon: Plug,
    color: "bg-emerald-500",
  },
  {
    title: "Smart Connectivity",
    description:
      "Control your home using mobile and smart devices.",
    icon: Wifi,
    color: "bg-indigo-500",
  },

];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

export default function FeaturesSection() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-medium text-gray-900">
            Why Choose Autommmensor
          </h2>
          <p className="mt-4 text-gray-600">
            Designed for comfort, reliability, and modern living
          </p>
        </motion.div>

        {/* Features List */}
        <motion.div
          className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} variants={item} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}

/* ================= Feature Card ================= */
function FeatureCard({ title, description, icon: Icon, color, variants }) {
  return (
    <motion.div
      variants={variants}
      className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-transparent hover:border-gray-100"
    >

      {/* Icon */}
      <div
        className={`w-12 h-12 shrink-0 flex items-center justify-center rounded-xl ${color} shadow-md`}
      >
        <Icon size={24} className="text-white" />
      </div>

      {/* Content */}
      <div>
        <h3 className="text-lg font-bold text-gray-900">
          {title}
        </h3>
        <p className="text-gray-600 mt-2 text-sm leading-relaxed">
          {description}
        </p>
      </div>

    </motion.div>
  );
}
