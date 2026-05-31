"use client";

import React from "react";


export default function AboutClient() {
  return (
    <div className="bg-background min-h-screen">

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden pt-28">
        <div className="absolute inset-0 z-0">
          <img
            src="https://abneywcnsdpriagqolvf.supabase.co/storage/v1/object/public/images/screen%20(1).png"
            alt="Modern Living Room Hero"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>
        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-electric-blue font-label-md text-label-md mb-6">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              Rated #1 in Chhattisgarh
            </span>
            <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl mb-6 tracking-tight">
              Modernizing Homes,<br /><span className="text-electric-blue">Empowering Lives.</span>
            </h1>
            <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant mb-10 max-w-xl">
               We are Chhattisgarh&apos;s leading home automation experts, dedicated to bringing futuristic comfort across the Chhattisgarh region.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/contact-us" className="bg-electric-blue text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-label-md text-label-md flex items-center justify-center gap-2 group hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all">
                Book Free Site Visit
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
              <a href="/all-solutions" className="border-2 border-white/20 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                View solutions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-stack-xl bg-surface-container-lowest relative">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-electric-blue/10 blur-3xl rounded-full" />
              <div className="glass-card rounded-3xl overflow-hidden relative aspect-square">
                <img
                  src="https://abneywcnsdpriagqolvf.supabase.co/storage/v1/object/public/images/about-mission.jpg"
                  alt="Smart Control Interface"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-8">Smart Living for Everyone in Chhattisgarh</h2>
              <div className="space-y-6">
                <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant">
                  Our mission is simple: To make smart living accessible to every household across Chhattisgarh without the complexity and mess of traditional installations.
                </p>
                <div className="p-6 glass-card rounded-2xl">
                  <h3 className="font-headline-sm text-lg md:text-headline-sm text-electric-blue mb-2">Zero Rewiring Technology</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    We specialize in home automation. Our wireless systems integrate seamlessly with your current electrical setup, meaning no broken walls or messy cables.
                  </p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us / Key Values - Bento Grid */}
      <section className="py-stack-xl bg-background">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-4">Why Autommensor Stands Out</h2>
            <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant">Market-leading standards built for local needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-gutter h-auto md:h-[600px]">
            {/* 5-Year replacement Warranty */}
            <div className="md:col-span-2 md:row-span-1 glass-card p-8 rounded-3xl flex flex-col justify-between hover:border-electric-blue/50 transition-colors group">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-electric-blue/10 flex items-center justify-center text-electric-blue">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                </div>
                <span className="text-electric-blue font-headline-lg-mobile md:font-headline-xl opacity-20">5y</span>
              </div>
              <div>
                <h3 className="font-headline-md text-base md:text-headline-md mb-2">5-Year replacement Warranty</h3>
                <p className="text-on-surface-variant">Industry-leading coverage that guarantees peace of mind for a decade.</p>
              </div>
            </div>
            {/* Zero Rewiring */}
            <div className="md:col-span-1 md:row-span-1 glass-card p-8 rounded-3xl flex flex-col justify-between hover:border-electric-blue/50 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-glow-cyan/10 flex items-center justify-center text-glow-cyan">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-lg md:text-headline-sm mb-2">Zero Rewiring</h3>
                <p className="text-label-md text-on-surface-variant">No wall damage. No mess.</p>
              </div>
            </div>
            {/* Local Support */}
            <div className="md:col-span-1 md:row-span-1 glass-card p-8 rounded-3xl flex flex-col justify-between hover:border-electric-blue/50 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-success-emerald/10 flex items-center justify-center text-success-emerald">
                <span className="material-symbols-outlined">support_agent</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-lg md:text-headline-sm mb-2">24/7 Local</h3>
                <p className="text-label-md text-on-surface-variant">On-ground team in Chhattisgarh.</p>
              </div>
            </div>
            {/* Expertise Image */}
            <div className="md:col-span-1 md:row-span-1 glass-card rounded-3xl overflow-hidden relative">
              <img src="https://abneywcnsdpriagqolvf.supabase.co/storage/v1/object/public/images/about-expertise.jpg" alt="Professional Installation" className="w-full h-full object-cover opacity-80" />
              <div className="absolute bottom-4 left-4">
                <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-label-sm text-white border border-white/10">Expert Installers</span>
              </div>
            </div>
            {/* Professional Installation */}
            <div className="md:col-span-3 md:row-span-1 glass-card p-12 rounded-3xl flex items-center justify-between bg-gradient-to-br from-electric-blue/10 to-transparent hover:border-electric-blue/50 transition-colors">
              <div className="max-w-md">
                <h3 className="font-headline-md text-base md:text-headline-md mb-4">Certified Expertise</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Every technician is rigorously trained in Bilaspur. We ensure your devices are configured perfectly for security, energy efficiency, and ease of use.
                </p>
              </div>
              <div className="hidden lg:block">
                <span className="material-symbols-outlined text-[40px] md:text-[80px] text-electric-blue/20">award_star</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder/Team Message */}
      <section className="py-stack-xl bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="glass-card p-5 md:p-16 rounded-2xl md:rounded-[40px] flex flex-col md:flex-row gap-12 items-center">
            <div className="w-24 h-24 md:w-48 md:h-48 rounded-full overflow-hidden border-2 md:border-4 border-electric-blue/30 shrink-0 shadow-[0_0_40px_rgba(59,130,246,0.3)]">
              <img
                // src="https://abneywcnsdpriagqolvf.supabase.co/storage/v1/object/public/images/about-founder.jpg"
                alt="#"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="material-symbols-outlined text-electric-blue mb-2 md:mb-4 text-lg md:text-[24px]">format_quote</span>
              <h2 className="font-headline-md text-base md:text-headline-md mb-6 italic leading-snug">&quot;We started Autommensor to bring the future to our home state. Our commitment isn&apos;t just to technology, but to the families in Chhattisgarh who deserve safer, smarter, and more comfortable lives.&quot;</h2>
              <div className="border-l-2 border-electric-blue pl-6">
                <p className="font-headline-sm text-lg md:text-headline-sm text-on-surface">Founding Team</p>
                <p className="text-on-surface-variant">Autommensor | Based in Bilaspur &amp; Raipur</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-stack-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-electric-blue/5" />
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-6">Ready to Transform Your Home?</h2>
            <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant mb-12">
              Join happy families in Chhattisgarh. Experience the comfort of voice-controlled living with our zero-rewiring solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="/contact-us" className="bg-electric-blue text-white px-6 py-3 md:px-10 md:py-5 rounded-full font-label-md text-label-md text-sm md:text-label-md shadow-[0_10px_30px_rgba(59,130,246,0.5)] hover:scale-105 transition-all">
                Book Free Site Visit
              </a>
              <a href="tel:+918085782471" className="flex items-center gap-2 md:gap-3 font-headline-sm text-base md:text-headline-sm text-on-surface hover:text-electric-blue transition-colors">
                <span className="material-symbols-outlined bg-white/10 p-3 rounded-full">call</span>
                +91-8085782471
              </a>
            </div>
            <div className="mt-8 md:mt-16 flex flex-wrap justify-center gap-4 md:gap-8 opacity-60">
              <div className="flex items-center gap-2"><span className="material-symbols-outlined text-electric-blue">verified</span> 5-Year Replacement Warranty</div>
              <div className="flex items-center gap-2"><span className="material-symbols-outlined text-electric-blue">handyman</span> Zero Rewiring</div>
              <div className="flex items-center gap-2"><span className="material-symbols-outlined text-electric-blue">location_on</span> Based in chhattisgarh</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
