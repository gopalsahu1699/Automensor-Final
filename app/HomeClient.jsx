"use client";
import React from "react";
import dynamic from "next/dynamic";

const HeroSection = dynamic(() => import("@/components/home/HeroSection"));
const TrustBar = dynamic(() => import("@/components/home/TrustBar"));
const WhyChooseUs = dynamic(() => import("@/components/home/WhyChooseUs"));
const ComparisonSection = dynamic(() => import("@/components/home/ComparisonSection"), { ssr: false });
const FeaturedBento = dynamic(() => import("@/components/home/FeaturedBento"));
const Testimonials = dynamic(() => import("@/components/home/Testimonials"));
const EstimateCostCTA = dynamic(() => import("@/components/home/EstimateCostCTA"));
const FAQs = dynamic(() => import("@/components/home/FAQs"));
const CallToAction = dynamic(() => import("@/components/home/CallToAction"));

const HomeClient = () => {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ComparisonSection />
      <FeaturedBento />
      <Testimonials />
      <EstimateCostCTA />
      <WhyChooseUs />
      <CallToAction />
      <FAQs />
    </>
  );
};

export default HomeClient;
