"use client";

import React, { useState } from "react";
import {
  Users,
  Award,
  Lightbulb,
  Leaf,
  Handshake,
  Factory,
  ClipboardCheck,
  Puzzle,
  Store,
  ShieldCheck,
  X,
  TrendingUp,
  Smartphone,
} from "lucide-react";

const Whyautommensor = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedDiff, setSelectedDiff] = useState(null);

  const keyValues = [
    {
      icon: Users,
      title: "Customer Centric Approach",
      description: "Your vision drives our solutions. From site survey to final installation, every decision prioritizes your comfort, budget, and lifestyle needs.",
    },
    {
      icon: Award,
      title: "Quality",
      description: "Premium components from global leaders + rigorous in-house testing = zero compromises. Products built to  Indian conditions.",
    },
    {
      icon: Handshake,
      title: "Trust",
      description: "200+ happy Indian families. 99% repeat business rate. Lifetime support commitment - we're your home automation partner for life.",
    },
  ];

  const differentiators = [
    {
      icon: ClipboardCheck,
      title: "Reliable Support",
      description: "24/7 Indian support team. 2-hour emergency response.",
    },
    {
      icon: Puzzle,
      title: "Customization",
      description: "1BHK, 2BHK, 3BHK packages. Mix premium + budget devices. Calculator auto-generates your perfect custom quote instantly.",
    },
    {
      icon: Store,
      title: "Complete Ecosystem",
      description: "200+ verified smart devices. Lights, switch panel, cameras, locks, Video door phone, curtains - everything interoperable under one app.",
    },
    {
      icon: ShieldCheck,
      title: "10 Year Warranty",
      description: "Industry-best 10-year warranty on  devices + installation. Covers lightning, power surges. Peace of mind guaranteed.",
    },
  ];

  const closePopup = (type) => {
    if (type === 'value') setSelectedValue(null);
    else setSelectedDiff(null);
  };

  const PopupModal = ({ item, type, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-md animate-in fade-in zoom-in duration-300">
      <div className="relative max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl flex items-center justify-center hover:bg-red-50 hover:scale-110 transition-all duration-300 border-4 border-white/80 hover:border-red-200 z-20"
        >
          <X className="w-7 h-7 text-red-500" />
        </button>

        {/* Modal Content */}
        <div className="bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-3xl shadow-2xl border border-blue-100 p-10 relative overflow-hidden">
          {/* Gradient Header Bar */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-orange-500 via-blue-500 to-indigo-600 rounded-t-3xl"></div>
          
          {/* Icon Header */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/50">
              <item.icon size={40} className="text-white drop-shadow-2xl" />
            </div>
          </div>

          <h3 className="text-3xl font-black text-center bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6 px-4 leading-tight">
            {item.title}
          </h3>

          <p className="text-xl text-gray-700 leading-relaxed mb-10 text-center max-w-lg mx-auto px-4">
            {item.description}
          </p>

       
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 py-24  overflow-hidden min-h-screen">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-32 left-20 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-64 right-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-32 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Why autommensor Section */}
        <section className="bg-white/70 backdrop-blur-xl p-10 md:p-16 rounded-3xl mb-20 shadow-2xl border border-white/50">
          <h2 className="text-5xl md:text-7xl font-black mb-12 text-center bg-gradient-to-r from-orange-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
            Why <span className="text-orange-600">autommensor</span>?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {keyValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="group relative cursor-pointer h-full"
                  onClick={() => setSelectedValue(value)}
                >
                  <div className="relative p-10 rounded-3xl bg-gradient-to-br from-white to-orange-50 shadow-xl hover:shadow-2xl border border-orange-100/50 hover:border-orange-200 hover:-translate-y-4 transition-all duration-700 h-full flex flex-col items-center text-center">
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
                    
                    {/* Icon */}
                    <div className="relative z-10 w-20 h-20 mb-6 flex items-center justify-center">
                      <IconComponent 
                        size={48} 
                        className="text-orange-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 stroke-[1.8]"
                      />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors px-2 leading-tight">
                      {value.title}
                    </h3>
                    
                    {/* Hover Spark */}
                    <div className="absolute top-6 right-6 w-12 h-12 bg-orange-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center scale-0 group-hover:scale-100">
                      <TrendingUp className="w-6 h-6 text-orange-500" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* What Makes Us Different Section */}
        <section className="bg-white/80 backdrop-blur-xl p-10 md:p-16 rounded-3xl shadow-2xl border border-white/50">
          <h2 className="text-5xl md:text-7xl font-black mb-12 text-center bg-gradient-to-r from-orange-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
            What Makes Us <span className="text-orange-600">Different</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {differentiators.map((diff, index) => {
              const IconComponent = diff.icon;
              return (
                <div
                  key={index}
                  className="group relative cursor-pointer h-full"
                  onClick={() => setSelectedDiff(diff)}
                >
                  <div className="relative p-10 rounded-3xl bg-gradient-to-br from-gray-50 to-blue-50 shadow-xl hover:shadow-2xl border border-blue-100/50 hover:border-orange-200 hover:-translate-y-4 transition-all duration-700 h-full flex flex-col items-center text-center">
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"></div>
                    
                    {/* Special Warranty Icon */}
                    <div className="relative z-10 w-20 h-20 mb-6 flex items-center justify-center">
                      {diff.title === "10 Year Warranty" ? (
                        <div className="relative">
                          <ShieldCheck size={48} className="text-orange-600 group-hover:scale-110 transition-all duration-500 stroke-[1.8]" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white font-black text-lg bg-orange-600 px-2 py-1 rounded-lg shadow-lg border-2 border-white">
                              10Y
                            </span>
                          </div>
                        </div>
                      ) : (
                        <IconComponent 
                          size={48} 
                          className="text-orange-600 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 stroke-[1.8]"
                        />
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors px-2 leading-tight">
                      {diff.title}
                    </h3>
                    
                    {/* Hover Spark */}
                    <div className="absolute top-6 right-6 w-12 h-12 bg-orange-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center scale-0 group-hover:scale-100">
                      <TrendingUp className="w-6 h-6 text-orange-500" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Popups */}
      {selectedValue && (
        <PopupModal item={selectedValue} type="value" onClose={() => setSelectedValue(null)} />
      )}
      {selectedDiff && (
        <PopupModal item={selectedDiff} type="diff" onClose={() => setSelectedDiff(null)} />
      )}

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
};

export default Whyautommensor;
