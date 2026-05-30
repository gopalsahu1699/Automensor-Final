"use client";

import React from "react";
import Link from "next/link";

const trustItems = [
  { icon: "verified_user", label: "5-Year replacement Warranty", sub: "Market Leading", color: "text-success-emerald" },
  { icon: "location_on", label: "Local Support", sub: "Bilaspur & Raipur", color: "text-success-emerald" },
  { icon: "build", label: "No Rewiring", sub: "Quick Retrofit", color: "text-success-emerald" },
  { icon: "engineering", label: "Expert Team", sub: "Certified Pros", color: "text-success-emerald" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 md:pt-28 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://abneywcnsdpriagqolvf.supabase.co/storage/v1/object/public/images/hero-home.jpg"
          alt="Premium Wireless Home Automation Chhattisgarh"
          className="w-full h-full object-cover scale-105 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 w-full">
        <div className="max-w-3xl space-y-stack-sm">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass border-white/10 text-electric-blue">
            <span className="material-symbols-outlined text-[20px] fill-1">verified</span>
            <span className="font-label-sm text-label-sm uppercase tracking-[0.15em] font-semibold">Trusted by 200+ Families in Chhattisgarh</span>
          </div>

          {/* Heading */}
          <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-on-surface leading-[1.1] mb-6">
            Premium Wireless<br />
            <span className="gradient-text">Home Automation</span>
          </h1>

          {/* Subtitle */}
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
            Expert installation by certified professionals. Control lighting, security, and climate with a single touch or voice—<span className="text-on-surface font-semibold underline decoration-electric-blue/40 underline-offset-4">Zero Rewiring Required.</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-6 pt-8">
            <Link
              href="/contact-us"
              className="primary-gradient px-6 py-3 md:px-10 md:py-5 rounded-full font-headline-sm text-sm md:text-[20px] flex items-center justify-center gap-3 shadow-2xl shadow-electric-blue/40 hover:scale-105 transition-transform text-white"
            >
              Claim Free Consultation
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link
              href="/estimate-cost-calculator"
              className="px-6 py-3 md:px-10 md:py-5 rounded-full font-headline-sm text-sm md:text-[20px] glass border-white/20 hover:bg-white/10 transition-all flex items-center justify-center gap-3 text-on-surface"
            >
              See Your Savings
              <span className="material-symbols-outlined">calculate</span>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 pt-6 md:pt-12 border-t border-white/10">
            {trustItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3 text-on-surface-variant group">
                <span className={`material-symbols-outlined ${item.color} group-hover:scale-125 transition-transform`}>{item.icon}</span>
                <div className="flex flex-col">
                  <span className="text-xs md:text-sm font-label-sm uppercase tracking-wider font-bold text-on-surface">{item.label}</span>
                  <span className="hidden md:block text-[10px] uppercase opacity-60">{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
