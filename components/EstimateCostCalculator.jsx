"use client";

import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const product = {
  id: 1,
  image: assets.estimate_cost_home,
  title: "Customize Your Smart Automation",
  description:
    "Get a personalized estimate for your automation project based on your home size, room count, and smart device choices. Discover the best solutions to simplify your life and enhance comfort and security.",
  route: "/estimate-cost-calculator",
};

const EstimateCostCalculator = () => {
  return (
    <section className="py-16 px-6 md:px-16 lg:px-32">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col items-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center leading-tight text-gray-900">
            Estimate Your Automation Cost
          </h2>
          <div className="w-28 h-1 bg-orange-600 rounded mt-4" />
        </header>

        {/* Card Container - Responsive Layout */}
        <article className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
          {/* Desktop: Side by Side | Mobile: Stacked */}
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="relative lg:w-1/2">
              <Image
                src={product.image}
                alt={product.title}
                width={800}
                height={600}
                className="hover:scale-105 transition-transform duration-500 w-full h-64 lg:h-full object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Content Section */}
            <div className="lg:w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8 md:p-10 lg:p-12 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl leading-tight">
                  {product.title}
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-gray-200">
                  {product.description}
                </p>
              </div>

              {/* CTA Button */}
              <Link
                href={product.route}
                className="inline-flex items-center justify-center gap-3 font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-full transition-all duration-300 mt-8 px-8 py-4 text-lg shadow-lg hover:shadow-xl hover:scale-105 group"
                aria-label={`Get personalized estimate for: ${product.title}`}
              >
                Get Estimate Cost
                <ArrowRight 
                  className="h-5 w-5 transition-transform group-hover:translate-x-1" 
                  aria-hidden="true" 
                />
              </Link>

              {/* Optional: Feature Pills */}
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
                  Free Estimate
                </span>
                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
                  Free consultation
                </span>
                
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default EstimateCostCalculator;
