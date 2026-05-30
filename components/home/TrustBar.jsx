"use client";
import React from "react";

const keywords = [
  "smart touch switch bord",
  "Energy Saver",
  "Secured",
  "Chhattisgarh",
];

export default function TrustBar() {
  return (
    <div className="border-y border-white/5 bg-surface-container-lowest/50 backdrop-blur-md py-6 md:py-14">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-wrap justify-center md:justify-between items-center gap-4 md:gap-10 lg:gap-16">
        {keywords.map((keyword, index) => (
          <span
            key={index}
            className="text-sm md:font-headline-sm uppercase tracking-[0.1em] md:tracking-[0.3em] text-white/30 hover:text-electric-blue/40 transition-colors cursor-default"
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}
