"use client";
import React from "react";

const oldItems = ["Messy Wall Cutting", "Limited Control Options", "High Maintenance Risks"];
const newItems = ["No Wall Cutting Required", "Installs in Existing Switch Boxes", "100% Reliable Wireless Connectivity"];

export default function ComparisonSection() {
  return (
    <section className="py-10 md:py-stack-xl bg-surface-container-lowest/30">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Heading */}
        <div className="text-center mb-stack-md">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-4">
            The Future of <span className="gradient-text">Living</span>
          </h2>
          <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Upgrade from legacy manual switches to the convenience of intelligent automation.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Old Way */}
          <div className="relative glass rounded-2xl md:rounded-[40px] p-5 md:p-12 overflow-hidden group grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <div className="absolute top-8 left-8 px-5 py-2 rounded-full bg-white/10 text-white font-label-md text-[10px] md:text-label-sm uppercase tracking-widest">Old Way</div>
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="relative">
                <img
                  src="https://abneywcnsdpriagqolvf.supabase.co/storage/v1/object/public/images/old-switch.jpg"
                  alt="Traditional Old Switchboard"
                  className="relative z-10 w-full max-w-[200px] md:max-w-sm rounded-2xl"
                />
              </div>
              <div className="space-y-4">
                <h4 className="text-base md:font-headline-md text-on-surface">Manual Switching</h4>
                <ul className="space-y-4 font-body-md text-on-surface-variant">
                  {oldItems.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 justify-center">
                      <span className="material-symbols-outlined text-error">cancel</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* New Way */}
          <div className="relative rounded-[40px] p-1 py-1 primary-gradient shadow-2xl shadow-electric-blue/20">
            <div className="bg-[#0b1323] rounded-[38px] p-5 md:p-12 overflow-hidden relative">
              <div className="absolute top-8 right-8 px-5 py-2 rounded-full primary-gradient text-white font-label-md text-[10px] md:text-label-sm uppercase tracking-widest animate-pulse">Better Way</div>
              <div className="flex flex-col items-center text-center space-y-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-electric-blue/30 blur-[40px] rounded-full" />
                  <img
                    src="https://abneywcnsdpriagqolvf.supabase.co/storage/v1/object/public/images/smart-panel.jpg"
                    alt="Premium Retrofit Home Automation छत्तीसगढ़"
                    className="relative z-10 w-full max-w-[200px] md:max-w-sm rounded-2xl animate-float"
                  />
                </div>
                <div className="space-y-4">
                  <h4 className="text-base md:font-headline-md text-on-surface">Seamless Touch Technology</h4>
                  <ul className="space-y-4 font-body-md text-on-surface">
                    {newItems.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 justify-center font-semibold text-electric-blue">
                        <span className="material-symbols-outlined fill-1">check_circle</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
