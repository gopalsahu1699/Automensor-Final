"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import WhyChooseUs from "@/components/WhyChooseUs"
import { Users, Award, MapPin, Smile, Star } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="bg-white text-slate-800">

      {/* HERO STORY */}
      <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium mb-6"
          >
            <MapPin size={16} className="text-blue-400" /> Proudly from Bilaspur
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-8 leading-tight"
          >
            Building Chhattisgarh's<br />Smartest Homes 
          </motion.h1>

          <p className="text-xl text-slate-300 leading-relaxed">
            What started as a small project  in Bilaspur has grown into the state's most trusted home automation company. Our mission is simple:
            <span className="text-white font-semibold"> Make luxury living affordable and accessible for every Chhattisgarhiya family.</span>
          </p>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">200+</div>
            <div className="opacity-80">Projects Completed</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">3+</div>
            <div className="opacity-80">Years Experience</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">10 Yr</div>
            <div className="opacity-80">Warranty Support</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">100%</div>
            <div className="opacity-80">Local Teams</div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto items-center">
          <div>
            <h3 className="text-blue-600 font-bold uppercase tracking-wide mb-4">Our Mission</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Democratizing Smart Technology</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              We believe smart homes shouldn't be just for the ultra-rich. By designing our own PCBs and software right here in India, we've cut costs by 40% without compromising on quality.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              We are not just installers; we are engineers who understand every volt that goes through your walls.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 relative">
            <div className="absolute -top-6 -right-6 bg-yellow-400 text-slate-900 w-24 h-24 rounded-full flex items-center justify-center font-bold text-center text-sm shadow-lg rotate-12">
              #1 Rated<br />in CG
            </div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Star className="fill-yellow-400 text-yellow-400" /> Client Obsession
            </h3>
            <p className="text-slate-600 italic">
              "Autommensor transformed our villa in Raipur. The best part is their local support—they showed up in 2 hours when I needed help!"
            </p>
            <div className="mt-4 font-bold text-slate-900">— Rajesh Agrawal, Raipur</div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US COMPONENT */}
      <WhyChooseUs />

    </div>
  );
}
