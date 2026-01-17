"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home, Zap, Shield, Wifi } from "lucide-react";

const ProblemSolution = () => {
  const items = [
    {
      problem: "Managing multiple devices is confusing and time-consuming.",
      solution: "Autommensor centralizes all your smart home devices in one intuitive app.",
      icon: Zap,
    },
    {
      problem: "Worry about security and safety at home.",
      solution: "Get intelligent security systems with instant alerts and monitoring.",
      icon: Shield,
    },
    {
      problem: "Manual control of lighting and appliances is inefficient.",
      solution: "Automated lighting, climate, and appliance control saves energy and effort.",
      icon: Home,
    },
    
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Problems Homeowners Face & Our Solutions
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                className="flex items-start gap-4 bg-blue-50 p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
              >
                <Icon className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <p className="text-lg font-semibold text-slate-900">{item.problem}</p>
                  <p className="text-sm text-slate-600 mt-2">{item.solution}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
