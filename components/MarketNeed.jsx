"use client";

import React from "react";
import {
  Zap,
  Shield,
  Sparkles,
  Smartphone,
  TrendingUp,
  LeafyGreen,
  Users,
  Home,
} from "lucide-react";

const MarketNeed = () => {
  const marketNeeds = [
    {
      icon: Zap,
      title: "Energy Efficiency",
    },
    {
      icon: Shield,
      title: "Enhanced Security",
    },
    {
      icon: Sparkles,
      title: "Luxury Living",
    },
    {
      icon: Smartphone,
      title: "Remote Control",
    },
    {
      icon: TrendingUp,
      title: "Increased Property Value",
    },
    {
      icon: LeafyGreen,
      title: "Eco-Friendly",
    },
    {
      icon: Users,
      title: "Family Comfort",
    },
    {
      icon: Home,
      title: "Smart Integration",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-6 md:px-16 lg:px-32">
      <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-12 text-center">
        Why Smart Homes Are the Future
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
        {marketNeeds.map((need, index) => {
          const IconComponent = need.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <IconComponent
                  size={80}
                  className="text-blue-600"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-700">
                {need.title}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MarketNeed;
