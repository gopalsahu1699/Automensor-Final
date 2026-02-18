"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Fan,
  Blinds,
  Bell,
  Tv,
  AirVent,
  Hand,
  Smartphone,
  Mic,
  Radio,
} from "lucide-react";

/* WHAT YOU CAN CONTROL */
const whatYouCanControl = [
  { label: "Light", icon: Lightbulb },
  { label: "Fan", icon: Fan },
  { label: "Curtain", icon: Blinds },
  { label: "Bell", icon: Bell },
  { label: "TV", icon: Tv },
  { label: "AC", icon: AirVent },
];

/* HOW YOU CAN CONTROL */
const howYouCanControl = [
  { title: "Touch", icon: Hand },
  { title: "App", icon: Smartphone },
  { title: "Voice", icon: Mic },
  { title: "Remote", icon: Radio },
];

export default function ControlSection() {
  return (
    <section className="bg-white py-0 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">

          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image
              src="https://res.cloudinary.com/dn9rohd6h/image/upload/v1768529052/Panel_2_hqdj14.webp"
              alt="Smart Touch Panel"
              width={520}
              height={320}
              className="rounded-lg shadow-2xl hover:scale-[1.02] transition-transform duration-500"
            />
          </motion.div>

          {/* WHAT YOU CAN CONTROL */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-blue-600 text-2xl font-bold mb-1">WHAT</h3>
              <p className="text-gray-600 uppercase tracking-wide mb-6">
                You can control
              </p>
            </motion.div>

            <div className="grid grid-cols-3 gap-6">
              {whatYouCanControl.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center text-center group cursor-pointer"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-14 h-14 flex items-center justify-center border rounded-lg mb-2 bg-white shadow-sm group-hover:bg-blue-50 group-hover:border-blue-200 transition-all duration-300">
                      <Icon className="w-7 h-7 text-blue-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                      {item.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="px-4 py-8 md:py-12 bg-slate-50 rounded-3xl">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-blue-600 text-xl md:text-2xl font-bold mb-1">
              HOW
            </h3>
            <p className="text-gray-600 uppercase tracking-wide text-sm md:text-base">
              You can control
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {howYouCanControl.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white border text-center p-6 rounded-xl hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                  <p className="text-sm font-semibold text-gray-700">
                    {item.title}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
