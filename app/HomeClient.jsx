"use client";
import React from "react";
import dynamic from 'next/dynamic';

const HeaderSlider1 = dynamic(() => import("@/components/HeaderSlider01"), { ssr: false });
const HeaderSlider2 = dynamic(() => import("@/components/HeaderSlider02"), { ssr: false });
const Navbar = dynamic(() => import("@/components/Navbar"));
const Footer = dynamic(() => import("@/components/Footer"));
// EstimateCostCalculator is used below fold
const EstimateCostCalculator = dynamic(() => import("@/components/EstimateCostCalculator"));

import HowYouCanControl from "@/components/HowYouCanControl";

import ComparisonSection from "@/components/ComparisonSection";

import HeroSection from "@/components/HeroSection";
import ProblemSolution from "@/components/ProblemToSolution";

// Below fold components
const FAQs = dynamic(() => import("@/components/FAQs"));
const AllProductsClient = dynamic(() => import("@/components/Clients/AllProductsClient"));
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"));
const CallToAction = dynamic(() => import("@/components/CallToAction"));

const HomeClient = () => {
    // Loading state removed for immediate LCP

    return (
        <>
            <Navbar />

            {/* PREMIUM TEXT-ONLY HERO */}

            <section className="bg-white">
                <HeroSection />
            </section>
            <section className="bg-white">
                <ProblemSolution />
            </section>

            <section className="py-20 bg-white">
                <ComparisonSection />
            </section>




            <section className="py-20 bg-white">
                <HowYouCanControl />
            </section>

            <section className="py-20 bg-white">
                <HeaderSlider1 />
            </section>

            {/* Content Sections */}
            <div className="bg-gray-50">
                {/* Additional Interactive Sections */}



                {/* <section className="py-20 bg-white">
        <LightScene />
        </section> */}

                <section className="py-20 bg-white">
                    <AllProductsClient />
                </section>

                <section className="py-20 bg-white">
                    <HeaderSlider2 />
                </section>

                <section className="py-20">
                    <EstimateCostCalculator />
                </section>



                <section className="py-20">
                    <WhyChooseUs />
                </section>


                <section className="py-20">
                    <CallToAction />
                </section>




                <section className="py-20">
                    <FAQs />
                </section>
            </div>

            <Footer />
        </>
    );
};

export default HomeClient;
