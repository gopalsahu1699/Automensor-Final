"use client";
import React from "react";
import dynamic from 'next/dynamic';
import HeroSection from "@/components/home/HeroSection";

const HeaderSlider1 = dynamic(() => import("@/components/HeaderSlider01"), { ssr: false });
const HeaderSlider2 = dynamic(() => import("@/components/HeaderSlider02"), { ssr: false });
const Navbar = dynamic(() => import("@/components/Navbar"));
const Footer = dynamic(() => import("@/components/Footer"));
// Below fold components
const EstimateCostCalculator = dynamic(() => import("@/components/EstimateCostCalculator"));
const FAQs = dynamic(() => import("@/components/home/FAQs"));
const FeaturedProducts = dynamic(() => import("@/components/home/FeaturedProducts"));
const WhyChooseUs = dynamic(() => import("@/components/home/WhyChooseUs"));
const CallToAction = dynamic(() => import("@/components/home/CallToAction"));
const ProblemSolution = dynamic(() => import("@/components/home/ProblemToSolution"), { ssr: false });
const ComparisonSection = dynamic(() => import("@/components/home/ComparisonSection"), { ssr: false });
const HowYouCanControl = dynamic(() => import("@/components/home/HowYouCanControl"), { ssr: false });

const HomeClient = ({ initialProducts }) => {
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
                    <FeaturedProducts initialProducts={initialProducts} />
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
