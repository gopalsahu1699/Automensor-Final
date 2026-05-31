"use client";

import React from "react";
import Link from "next/link";
import { FaInstagram, FaYoutube, FaFacebook, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";

const solutions = [
  "Lighting Automation",
  "Smart Security Systems",
  "Smart Gate Automation",
  "Energy Management",
  "Voice Control Integration",
  "Remote Access Solutions",
];

export default function Footer() {
  return (
   <footer className="bg-surface-dim pt-10 md:pt-16 pb-8 md:pb-12 border-t border-white/5">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 px-4 md:px-8 max-w-container-max mx-auto">
    
    {/* Column 1 */}
    <div className="space-y-4 md:space-y-6">
      <div className="rounded-lg p-2 inline-block">
       



<div className="inline-flex items-center bg-gradient-to-r from-white/5 via-white/15 to-white/40 backdrop-blur-xl border border-white/15 rounded-2xl px-4 py-2 shadow-lg">
  <img
    src="https://abneywcnsdpriagqolvf.supabase.co/storage/v1/object/public/images/logo.png"
    alt="Autommensor"
    className="h-8 md:h-10 w-auto object-contain"
  />
</div>

      </div>

      <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
        Autommensor is Chhattisgarh&apos;s premier provider of wireless home
        automation. We specialize in modern smart technology solutions that
        enhance security, comfort, luxury, and energy efficiency.
      </p>

      <div className="flex gap-3 flex-wrap">
        {/* Social Icons */}
        <a
          href="https://www.instagram.com/autommensor/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
        >
          <FaInstagram className="text-lg" />
        </a>

        <a
          href="https://www.youtube.com/@autommensor"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
        >
          <FaYoutube className="text-lg" />
        </a>

        <a
          href="#"
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
        >
          <FaFacebook className="text-lg" />
        </a>

        <a
          href="#"
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
        >
          <FaLinkedin className="text-lg" />
        </a>

        <a
          href="mailto:autommensor@gmail.com"
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
        >
          <Mail size={18} />
        </a>
      </div>
    </div>

    {/* Column 2 */}
    <div>
      <h4 className="text-base md:text-xl font-semibold mb-4">
        Solutions
      </h4>

      <ul className="space-y-3">
        {solutions.map((item) => (
          <li key={item}>
            <a
              href="/all-solutions"
              className="text-sm md:text-base text-on-surface-variant hover:text-electric-blue transition-colors"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>

    {/* Column 3 */}
    <div>
      <h4 className="text-base md:text-xl font-semibold mb-4">
        Premium Support
      </h4>

      <ul className="space-y-4 text-on-surface-variant">
        <li className="flex items-start gap-3">
          <span className="material-symbols-outlined text-electric-blue flex-shrink-0">
            call
          </span>

          <div className="text-sm md:text-base">
            <a
              href="tel:+917987814261"
              className="block hover:text-electric-blue"
            >
              +91 7987814261
            </a>

            <a
              href="tel:+918085782471"
              className="block hover:text-electric-blue"
            >
              +91 8085782471
            </a>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <span className="material-symbols-outlined text-electric-blue flex-shrink-0">
            mail
          </span>

          <a
            href="mailto:autommensor@gmail.com"
            className="text-sm md:text-base break-all hover:text-electric-blue"
          >
            autommensor@gmail.com
          </a>
        </li>

        <li className="flex items-start gap-3">
          <span className="material-symbols-outlined text-electric-blue flex-shrink-0">
            location_on
          </span>

          <span className="text-sm md:text-base">
            Seepat, Bilaspur & Raipur,
            <br />
            Chhattisgarh, India - 495559
          </span>
        </li>
      </ul>
    </div>

    {/* Column 4 */}
    <div>
      <h4 className="text-base md:text-xl font-semibold mb-4">
        Why Trust Us
      </h4>

      <div className="space-y-4">
        <div className="glass p-4 rounded-2xl flex items-center gap-3">
          <span className="material-symbols-outlined text-success-emerald">
            verified
          </span>

          <span className="text-xs md:text-sm uppercase tracking-wide">
            5 Year Replacement Warranty
          </span>
        </div>

        <div className="glass p-4 rounded-2xl flex items-center gap-3">
          <span className="material-symbols-outlined text-electric-blue">
            groups
          </span>

          <span className="text-xs md:text-sm uppercase tracking-wide">
            200+ Projects Completed
          </span>
        </div>
      </div>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="max-w-container-max mx-auto px-4 md:px-8 mt-8 pt-6 border-t border-white/5">
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
      <p className="text-xs sm:text-sm text-on-surface-variant">
        © 2026 AUTOMMENSOR - Premium Home Automation Chhattisgarh.
      </p>

      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        <Link
          href="/privacy-policy"
          className="text-xs sm:text-sm hover:text-electric-blue transition-colors"
        >
          Privacy Policy
        </Link>

        <Link
          href="/terms-of-service"
          className="text-xs sm:text-sm hover:text-electric-blue transition-colors"
        >
          Terms of Service
        </Link>

        <span className="text-xs sm:text-sm flex items-center gap-1">
          Made with ❤️ in Chhattisgarh
        </span>
      </div>
    </div>
  </div>
</footer>
  );
}
