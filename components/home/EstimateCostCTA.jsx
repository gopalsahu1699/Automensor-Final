"use client";
import React from "react";
import Link from "next/link";

export default function EstimateCostCTA() {
  return (
    <section className="py-10 md:py-stack-xl">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="relative rounded-2xl md:rounded-[60px] overflow-hidden min-h-[350px] md:min-h-[600px] flex items-center px-5 md:px-24">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://abneywcnsdpriagqolvf.supabase.co/storage/v1/object/public/images/hero-home.jpg"
              alt="Calculate Home Automation Cost Chhattisgarh"
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-[#0b1323]/90 md:bg-gradient-to-r md:from-[#0b1323] md:via-[#0b1323]/80 md:to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-2xl space-y-4 md:space-y-10">
            <span className="text-electric-blue font-label-md uppercase tracking-[0.4em] block">Smart Financials</span>
            <h2 className="text-headline-lg-mobile md:text-headline-lg text-on-surface">
              See Your&nbsp;&nbsp;<span className="gradient-text">Investment</span>
            </h2>
            <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant leading-relaxed">
              Planning your smart home doesn&apos;t have to be guesswork. Use our calculator to find the exact cost for your 2BHK, 3BHK or Bungalow in Chhattisgarh and see how much you&apos;ll save on energy bills.
            </p>
            <div className="flex flex-wrap gap-8 items-center">
              <Link href="/estimate-cost-calculator" className="primary-gradient px-6 py-3 md:px-12 md:py-5 rounded-full text-lg md:font-headline-sm text-sm md:text-[20px] shadow-2xl shadow-electric-blue/40 flex items-center gap-4 group text-white">
                Estimate&nbsp; Cost Calculator
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">trending_flat</span>
              </Link>
              <div className="flex items-center gap-4 md:gap-10">
                <div className="flex flex-col">
                  <span className="text-xs md:font-label-md text-on-surface">Instant Quote</span>
                  <span className="text-label-sm text-on-surface-variant">Online Estimate</span>
                </div>
                <div className="w-px h-6 md:h-10 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-xs md:font-label-md text-on-surface">Local Expert</span>
                  <span className="text-label-sm text-on-surface-variant">Free Visit Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
