"use client";

import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    image: assets.smart_home,
    title: "Customize Your Smart Home Automation",
    route: "/estimate-cost-calculator/estimated-cost",
  },
  {
    id: 2,
    image: assets.villa,
    title: "Customize Your Smart Villa Automation",
    route: "/estimate-cost-calculator/estimated-cost-villa",
  },
  {
    id: 3,
    image: assets.Hotel_room,
    title: "Customize Your Smart Hotel Room Automation",
    route: "/estimate-cost-calculator/estimated-cost-hotel-room",
  },
];

const EstimateCostCalculator = () => {
  return (
   
    <section className="mt-14 px-6 sm:px-10 md:px-20 max-w-5xl mx-auto">
      <header className="flex flex-col items-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center leading-tight">
          Select Your Category
        </h2>
        <div className="w-28 h-1 bg-orange-600 rounded mt-4" />
      </header>

      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map(({ id, image, title, description, route }) => (
          <article
            key={id}
            className="group rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            <div className="relative">
              <Image
                src={image}
                alt={title}
                className="group-hover:brightness-75 transition duration-300 w-full h-56 sm:h-64 md:h-48 lg:h-56 object-cover rounded-t-2xl"
                priority
                sizes="(max-width: 640px) 100vw,
                       (max-width: 1024px) 50vw,
                       33vw"
              />
            </div>
            <div className="bg-black bg-opacity-70 text-white p-6 rounded-b-2xl space-y-4 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-xl sm:text-2xl">{title}</h3>
                <p className="text-sm sm:text-base leading-relaxed mt-2">{description}</p>
              </div>
              <Link
                href={route}
                className="inline-flex items-center gap-3 font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-full transition-colors duration-300 mt-6 px-5 py-2 whitespace-nowrap self-start"
                aria-label={`Get personalized estimate for: ${title}`}
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
        ))}
      </div>
    </section>
  
  );
};

export default EstimateCostCalculator;
