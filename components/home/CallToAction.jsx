"use client";
import React from "react";
import Link from "next/link";

const trustItems = [
  { icon: "verified", label: "5-Year replacement Warranty" },
  { icon: "bolt", label: "No Rewiring Required" },
  { icon: "support", label: "Local Support Center" },
  { icon: "call", label: "+91-8085782471" },
];

export default function CallToAction() {
  return (
    <section className="py-10 md:py-stack-xl relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-electric-blue/10 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-glow-cyan/10 blur-[150px] rounded-full -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="glass p-6 md:p-32 rounded-2xl md:rounded-[80px] border-white/10 bg-gradient-to-b from-surface-container-high/80 to-surface-container-lowest text-center">
          <span className="text-electric-blue font-label-md tracking-[0.5em] uppercase mb-4 md:mb-10 block">Elevate Your Lifestyle</span>

          <h2 className="text-headline-lg-mobile md:text-headline-xl mb-4 md:mb-10 leading-tight">
            Claim Your Free <br /><span className="gradient-text">Smart Home Consultation</span>
          </h2>

          <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant max-w-3xl mx-auto mb-6 md:mb-16 leading-relaxed">
            Join <span className="text-on-surface font-bold">200+ happy families</span> across Chhattisgarh who chose Autommensor for a smarter, safer, and more energy-efficient life.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-8 justify-center items-center">
            <Link href="/contact-us" className="primary-gradient px-6 py-3 md:px-14 md:py-6 rounded-full font-headline-sm text-sm md:text-[24px] shadow-2xl shadow-electric-blue/40 hover:scale-105 transition-all text-white">
              Book Free Site Visit
            </Link>
            <Link href="/estimate-cost-calculator" className="px-6 py-3 md:px-14 md:py-6 rounded-full border-2 border-white/20 font-headline-sm text-sm md:text-[24px] glass hover:bg-white/10 transition-all text-on-surface">
              Get Estimate Cost
            </Link>
          </div>

          {/* Trust Row */}
          <div className="mt-8 md:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-10 opacity-70">
            {trustItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-3">
                <span className="material-symbols-outlined text-electric-blue text-[20px] md:text-[32px]">{item.icon}</span>
                <span className="font-label-md text-[10px] md:font-label-md uppercase tracking-wider md:tracking-widest font-bold">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
