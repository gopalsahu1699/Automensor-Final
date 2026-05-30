"use client";
import React from "react";

const features = [
  {
    icon: "energy_savings_leaf",
    title: "Smart Energy Management",
    description: "Reduce electricity bills with automated lighting and AC control that adjusts based on occupancy and time of day.",
  },
  {
    icon: "shield_lock",
    title: "Smart Home Security System",
    description: "Protect what matters most with 24/7 monitoring, smart locks, and instant mobile alerts for any unusual activity.",
  },
  {
    icon: "lightbulb",
    title: "Automated everything Solutions",
    description: "Set the perfect mood for every occasion. Create custom scenes for dining, movies, or sleep with elegant touch panels.",
  },
  {
    icon: "mic",
    title: "Voice Controlled Home",
    description: "Seamless integration with Alexa and Google Home. Control your entire environment using simple voice commands.",
  },
  {
    icon: "devices",
    title: "Centralized App Control",
    description: "Manage your Chhattisgarh home from anywhere in the world with our intuitive, high-speed mobile application.",
  },
  {
    icon: "support_agent",
    title: "24/7 Local Presence",
    description: "Experience peace of mind with our dedicated support centers in Bilaspur and Raipur, offering on-site assistance whenever needed.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-10 md:py-stack-xl relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-electric-blue/5 blur-[120px] rounded-full -translate-x-1/2" />
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        {/* Section Title */}
        <div className="text-center mb-stack-md">
          <span className="text-electric-blue font-label-md tracking-[0.1em] md:tracking-[0.3em] uppercase mb-4 block">Engineered for Excellence</span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-6">
            Complete <span className="gradient-text">Smart Home Solutions</span>
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
            Experience a lifestyle of ultimate comfort and efficiency. Our retrofit home automation systems are designed to modernize your space without traditional renovation headaches.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass p-5 md:p-10 rounded-2xl md:rounded-3xl hover:bg-white/10 hover:translate-y-[-8px] transition-all duration-500 group border-white/5"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-electric-blue/10 flex items-center justify-center text-electric-blue mb-4 md:mb-8 group-hover:scale-110 group-hover:primary-gradient group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-[24px] md:text-[36px]">{feature.icon}</span>
              </div>
              <h3 className="text-base md:font-headline-sm text-headline-sm mb-4 group-hover:text-electric-blue transition-colors">
                {feature.title}
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
