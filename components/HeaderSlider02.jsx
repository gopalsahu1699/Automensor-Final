"use client";

import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Smart Home Automation Made Simple & Affordable",
      offer: "Get flat 5% Off On Your First Installation!",
      buttonText1: "Request Quote",
      buttonLink1: "/quotation",
      buttonText2: "Learn More",
      buttonLink2: "/learn-more",
      imgSrc: assets.slide_img_1,
    },
    {
      id: 2,
      title: "Control Every Room with One Tap – Ultimate Comfort",
      offer: "Book Your Free Consultation",
      buttonText1: "Book Now",
      buttonLink1: "/contact-us",
      buttonText2: "View Products",
      buttonLink2: "/all-products",
      imgSrc: assets.slide_img_2,
    },
    {
      id: 3,
      title: "Experience the Future of Smart Living",
      offer: "Get 10% off on First Installation!",
      buttonText1: "Get Started",
      buttonLink1: "/get-started",
      buttonText2: "Explore Plans",
      buttonLink2: "/estimate-cost-calculator",
      imgSrc: assets.slide_img_3,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  return (
    <section className="relative w-full bg-[#f4f5f3] overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="min-w-full"
          >
            <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
              
              {/* LEFT CONTENT */}
              <div>
                <p className="text-orange-600 font-medium mb-3">
                  {slide.offer}
                </p>

                <h1 className="text-3xl md:text-5xl font-semibold text-slate-900 leading-tight max-w-xl">
                  {slide.title}
                </h1>

                <div className="flex items-center mt-8 gap-4">
                  <Link
                    href={slide.buttonLink1}
                    className="px-8 py-3 bg-orange-600 text-white rounded-full font-medium hover:bg-orange-700 transition"
                  >
                    {slide.buttonText1}
                  </Link>

                  <Link
                    href={slide.buttonLink2}
                    className="group flex items-center gap-2 text-slate-900 font-medium"
                  >
                    {slide.buttonText2}
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition"
                    />
                  </Link>
                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div className="relative w-full h-[320px] md:h-[420px] lg:h-[480px]">
                <Image
                  src={slide.imgSrc}
                  alt={slide.title}
                  fill
                  priority={index === currentSlide}
                  className="object-contain"
                />
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* SLIDER DOTS */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition ${
              index === currentSlide
                ? "bg-orange-600"
                : "bg-orange-300/40"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeaderSlider;
