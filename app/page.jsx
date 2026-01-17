"use client";

import React, { useState, useEffect } from "react";
import HeaderSlider1 from "@/components/HeaderSlider01";
import HeaderSlider2 from "@/components/HeaderSlider02";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EstimateCostCalculator from "../components/EstimateCostCalculator";

import HowYouCanControl from "@/components/HowYouCanControl";


import Loading from "@/components/Loading";
import ComparisonSection from "@/components/ComparisonSection";

import HeroSection from "@/components/HeroSection";
import ProblemSolution from "@/components/ProblemToSolution";
import FAQs from "@/components/FAQs";
import AllProductsClient from "@/components/Clients/AllProductsClient";
import WhyChooseUs from "@/components/WhyChooseUs";

import CallToAction from "@/components/CallToAction";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

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

export default Home;
