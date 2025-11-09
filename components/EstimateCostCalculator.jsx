"use client";

import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

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
    <section className="mt-14 px-6 sm:px-10 md:px-20 max-w-3xl mx-auto">
      <header className="flex flex-col items-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center leading-tight">
          Estimate Your Automation Cost
        </h2>
        <div className="w-28 h-1 bg-orange-600 rounded mt-4" />
      </header>

      <article className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col max-w-xl mx-auto">
        <div className="relative">
          <Image
            src={product.image}
            alt={product.title}
            className="hover:brightness-75 transition duration-300 w-full h-64 object-cover rounded-t-2xl"
            priority
            sizes="(max-width: 640px) 100vw,
                   (max-width: 1024px) 50vw,
                   33vw"
          />
        </div>
        <div className="bg-black bg-opacity-70 text-white p-6 rounded-b-2xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-2xl">{product.title}</h3>
            <p className="text-base leading-relaxed mt-2">{product.description}</p>
          </div>
          <Link
            href={product.route}
            className="inline-flex  items-center gap-3 font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-full transition-colors duration-300 mt-6 px-5 py-2 whitespace-nowrap self-center"
            aria-label={`Get personalized estimate for: ${product.title}`}
          >
            Get Estimate cost
            <Image
              className="h-4 w-4"
              src={assets.redirect_icon}
              alt="Redirect Icon"
              aria-hidden="true"
            />
          </Link>
        </div>
      </article>
    </section>
  );
};

export default EstimateCostCalculator;
