"use client";

import React, { useState } from "react";
import {
  Zap,
  Shield,
  Sparkles,
  Smartphone,
  TrendingUp,
  LeafyGreen,
  Users,
  Home,
  X,
} from "lucide-react";

const MarketNeed = () => {
  const [selectedNeed, setSelectedNeed] = useState(null);

  const marketNeeds = [
    {
      icon: Zap,
      title: "Energy Efficiency",
      description: "Cut your electricity bills by up to 40% with intelligent lighting, AC optimization, and real-time energy monitoring that learns your habits.",
    },
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "24/7 protection with smart cameras, motion sensors, and instant alerts. Remote monitoring keeps your family safe from anywhere.",
    },
    {
      icon: Sparkles,
      title: "Luxury Living",
      description: "Elevate your home with voice-controlled curtains, ambient lighting, and automated comfort. Live like the elite with one-touch luxury.",
    },
    {
      icon: Smartphone,
      title: "Smart Control",
      description: "Complete home control from your phone. Adjust lights, temperature, and appliances anywhere, anytime - total convenience in your pocket.",
    },
    {
      icon: TrendingUp,
      title: "Increased Property Value",
      description: "Smart homes sell 30% faster and for 15% higher prices. Future-proof your investment and attract premium buyers.",
    },
    {
      icon: LeafyGreen,
      title: "Eco-Friendly",
      description: "Reduce your carbon footprint with energy-saving automation. Solar integration and green certifications make your home planet-friendly.",
    },
    {
      icon: Users,
      title: "Family Comfort",
      description: "Perfect temperature, fresh air, and safety for every family member. Custom scenes for kids, elders, and guests - personalized comfort.",
    },
    {
      icon: Home,
      title: "Smart Integration",
      description: "All your devices work together seamlessly. One app controls everything from lights to security to entertainment.",
    },
  ];

  const closePopup = () => {
    setSelectedNeed(null);
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-16 text-center leading-tight">
          Why Smart Homes Are 
          <span className="block">The Future</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10 max-w-7xl mx-auto">
          {marketNeeds.map((need, index) => {
            const IconComponent = need.icon;
            return (
              <div
                key={index}
                className="group relative cursor-pointer"
                onClick={() => setSelectedNeed(need)}
              >
                {/* Card with enhanced hover effects */}
                <div className="relative p-6 md:p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 hover:border-blue-200 group-hover:bg-white">
                  {/* Icon container with shine effect */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-pulse"></div>
                    <IconComponent
                      size={48}
                      className="relative z-10 text-blue-600 group-hover:text-indigo-600 transition-all duration-500 stroke-[1.8] group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Title with gradient text */}
                  <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2 px-2 text-center leading-tight">
                    {need.title}
                  </h3>
                  
                  {/* Hover badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sales-focused Popup Modal */}
      {selectedNeed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
          <div className="relative max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={closePopup}
              className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-2xl shadow-2xl flex items-center justify-center hover:bg-red-50 hover:scale-110 transition-all duration-300 border-4 border-white/80 z-20"
            >
              <X className="w-6 h-6 text-red-500" />
            </button>

            {/* Popup content */}
            <div className="bg-gradient-to-b from-white to-blue-50 rounded-3xl shadow-2xl border border-blue-100 p-8 md:p-10 relative overflow-hidden">
              {/* Top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              
              {/* Icon header */}
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <selectedNeed.icon
                    size={32}
                    className="text-white drop-shadow-lg"
                  />
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-center bg-gradient-to-r from-gray-800 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
                {selectedNeed.title}
              </h3>

              <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center max-w-lg mx-auto">
                {selectedNeed.description}
              </p>

            

           
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </section>
  );
};

export default MarketNeed;
