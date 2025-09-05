"use client";

import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

const product = {
  id: 1,
  image: assets.girl_with_headphone_image,
  title: "Customize Your Smart Home Automation",
  description:
    "Get a personalized estimate for your home automation project based on your home size, room count, and smart device choices. Discover the best solutions to simplify your life and enhance comfort and security.",
};

const EstimateCostCalculator = () => {
  return (
    <div className="mt-14 px-6 md:px-20 max-w-3xl mx-auto">
      <div className="flex flex-col items-center">
        <p className="text-3xl md:text-4xl font-semibold text-center leading-tight mb-3">
          Estimate Your Home Automation Cost
        </p>
        <div className="w-28 h-1 bg-orange-600 rounded mb-10" />
      </div>

      <div className="relative group rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <Image
          src={product.image}
          alt={product.title}
          className="group-hover:brightness-75 transition duration-300 w-full h-auto object-cover rounded-2xl"
          priority
          sizes="(max-width: 640px) 100vw,
                 (max-width: 1024px) 100vw"
        />
        <div className="group-hover:-translate-y-5 transition-transform duration-300 absolute bottom-8 left-8 right-8 text-white space-y-4 bg-black bg-opacity-60 p-6 rounded-2xl">
          <p className="font-semibold text-2xl md:text-3xl">{product.title}</p>
          <p className="text-base leading-relaxed">{product.description}</p>

          <Link
            href="/estimate-cost"
            className="inline-flex items-center gap-3 font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-full transition-colors duration-300 mt-4 px-6 py-3 whitespace-nowrap"
            aria-label="Get your personalized estimate"
          >
            Get Estimate cost
            <Image
              className="h-4 w-4"
              src={assets.redirect_icon}
              alt="Redirect Icon"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EstimateCostCalculator;
