"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";

/** ✅ Move slides OUTSIDE component (best practice) */
const SLIDES = [
  {
    title: "Interior Friendly Smart switchboard",
    description:
      "Interior-friendly smart panel that blends seamlessly with your décor while delivering effortless, modern control.",
    image: "https://res.cloudinary.com/dn9rohd6h/image/upload/v1768572289/Interior_friendly_yqwrng.webp",
  },
  {
    title: "Scene Creation",
    description:
      "Create personalized scenes that match your mood and transform your space instantly.",
    image: "https://res.cloudinary.com/dn9rohd6h/image/upload/v1768572760/app-section_yctkfw.webp",
  },
  {
    title: "Control Home from anywere",
    description:
      "Control your home from anywhere with seamless, secure access at your fingertips.",
    image: "https://res.cloudinary.com/dn9rohd6h/image/upload/v1768572761/howitworks-1_m1nzsk.webp",
  },
];

const ProductSlider = React.memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);

  /** ✅ Stable slides reference */
  const slides = useMemo(() => SLIDES, []);

  /** ✅ Auto-slide without re-creating interval */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative w-full bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">

        {/* LEFT CONTENT */}
        <div>
          <h3 className="text-blue-700 font-medium text-base sm:text-lg mb-4">
            {slides[currentSlide].title}
          </h3>

          <p className="text-gray-700 text-lg sm:text-xl leading-relaxed max-w-md">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full h-[240px] sm:h-[320px] md:h-[420px] lg:h-[480px]">
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            {...({ fetchPriority: "high" })}
          />
        </div>


      </div>

      {/* DOTS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-all`}
            aria-label={`Show slide ${index + 1}`}
          >
            <div className={`w-3.5 h-3.5 rounded-full transition-all ${index === currentSlide
              ? "bg-blue-600 scale-125"
              : "border-2 border-blue-500 scale-100"
              }`} />
          </button>
        ))}
      </div>
    </section>
  );
});

export default ProductSlider;
