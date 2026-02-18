"use client";
import { motion } from "framer-motion";
import {
  Shield,
  Timer,
  Hand,
  Wifi,
  Headphones,
  Plug,
} from "lucide-react";

const features = [
  {
    title: "10-Year Warranty",
    description:
      "Market-leading warranty coverage. We stand by our quality for a decade.",
    icon: Shield,
    color: "bg-violet-500",
  },
  {
    title: "Free Site Visit",
    description:
      "Expert consultation at your doorstep in Bilaspur & Raipur. No obligation.",
    icon: Timer,
    color: "bg-blue-500",
  },
  {
    title: "24/7 Local Support",
    description:
      "We are based in Chhattisgarh. Support is just a phone call away.",
    icon: Headphones,
    color: "bg-gray-700",
  },
  {
    title: "Zero Rewiring Needed",
    description:
      "Upgrade your existing home without breaking a single wall.",
    icon: Plug,
    color: "bg-emerald-500",
  },
  {
    title: "Voice & App Control",
    description:
      "Control your entire home with Alexa, Google Home, or our mobile app.",
    icon: Hand,
    color: "bg-indigo-500",
  },
  {
    title: "Wi-Fi Based System",
    description:
      "Seamless wireless connectivity for a clutter-free smart home.",
    icon: Wifi,
    color: "bg-orange-500",
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
