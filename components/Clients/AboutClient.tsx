"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import WhyChooseUs from "@/components/WhyChooseUs"
import {
  Users,
  Award,
  Lightbulb,
  ThumbsUp,
  Handshake,
  Puzzle,
  Store,
  ShieldCheck,
  Target,
  Globe,
  Leaf,
  Heart,
} from "lucide-react";

export default function AboutUs() {
  return (
    <div className="bg-[#f7f9fc] text-slate-800">

      {/* HERO */}
      <section className="py-24 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-semibold mb-6"
        >
          About Autommensor
        </motion.h1>

        <p className="max-w-4xl mx-auto text-lg text-slate-600 leading-relaxed">
          Autommensor is a smart home automation company delivering intelligent,
          reliable, and future-ready solutions for modern homes, villas, and
          buildings. Our Wi-Fi based systems require no special wiring and are
          designed for Indian conditions.
        </p>
      </section>

      {/* KEY VALUES */}
      <section className="py-20 px-6 bg-white">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-14">
          Key Values
          <span className="block w-16 h-1 bg-blue-600 mx-auto mt-4" />
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <ValueCard
            icon={Users}
            title="Customer Experience"
            text="Trust and reliability form the foundation of everything we do. We put our customers first and deliver solutions tailored to their needs."
          />
          <ValueCard
            icon={Award}
            title="Quality"
            text="We never compromise on quality. Our solutions are built using premium components designed for long-term performance."
          />
          <ValueCard
            icon={Lightbulb}
            title="Innovation"
            text="We continuously innovate to create user-friendly, energy-efficient, and affordable smart home solutions."
          />
          <ValueCard
            icon={ThumbsUp}
            title="Trust"
            text="Our goal is to be your most reliable and trusted smart home technology partner."
          />
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24 px-6 bg-[#f1f5fb]">
        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto text-center md:text-left">
          <div>
            <h3 className="text-3xl font-semibold mb-4">Our Mission</h3>
            <span className="block w-14 h-1 bg-blue-600 mx-auto md:mx-0 mb-6" />
            <p className="text-slate-600 leading-relaxed text-lg">
              Transforming over <strong>1 lakh+ homes</strong> into smart homes by
              delivering accessible, reliable, and future-ready automation
              solutions.
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-semibold mb-4">Our Vision</h3>
            <span className="block w-14 h-1 bg-blue-600 mx-auto md:mx-0 mb-6" />
            <p className="text-slate-600 leading-relaxed text-lg">
              To lead the Indian smart home industry by fostering a culture of
              research-driven innovation, quality, and customer trust.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="py-20 px-6 bg-white">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-14">
          What Makes Us Different
          <span className="block w-16 h-1 bg-blue-600 mx-auto mt-4" />
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
          <FeatureCard
            icon={ShieldCheck}
            title="Reliable"
            text="6+ years of experience and 1,000+ satisfied customers."
          />
          <FeatureCard
            icon={Handshake}
            title="Sincerity"
            text="Transparent, honest solutions designed around your home."
          />
          <FeatureCard
            icon={Puzzle}
            title="Flexibility"
            text="Solutions that scale from a single room to large buildings."
          />
          <FeatureCard
            icon={Store}
            title="Wide Product Range"
            text="100+ world-class smart home devices."
          />
          <FeatureCard
            icon={Leaf}
            title="Feasibility"
            text="Built and tested for Indian weather and electrical conditions."
          />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 px-6 bg-[#f1f5fb] text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-8">
          Who we are
        </h2>
        <p className="max-w-4xl mx-auto text-slate-600 text-lg leading-relaxed">
          We combine innovation, reliability, and customer-first thinking to
          deliver smart homes that are easy to use, scalable, and built to last —
          supported by expert installation and long-term service.
        </p>
      </section>

<section>
  <WhyChooseUs />
</section>
  

    </div>
  );
}

/* COMPONENTS */

function ValueCard({ icon: Icon, title, text }: any) {
  return (
    <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 hover:shadow-lg transition">
      <Icon className="mx-auto mb-5 text-blue-600" size={44} />
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, text }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 text-center border border-slate-200 hover:border-blue-600 hover:shadow-md transition">
      <Icon className="mx-auto mb-4 text-blue-600" size={36} />
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm text-slate-600">{text}</p>
    </div>
  );
}
