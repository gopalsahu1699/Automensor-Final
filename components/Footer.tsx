"use client";

import React from "react";
import Link from "next/link";
import { FaInstagram, FaYoutube, FaFacebook, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";

const solutions = [
  "Lighting Automation",
  "Smart Security Systems",
  "Climate Control",
  "Retrofit Tech",
];

export default function Footer() {
  return (
    <footer className="bg-surface-dim pt-10 md:pt-stack-xl pb-8 md:pb-16 border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Column 1: Logo + Description + Social */}
        <div className="space-y-6 md:space-y-10">
          <div className="bg-white rounded-lg p-2 inline-block">
            <img
              src="https://abneywcnsdpriagqolvf.supabase.co/storage/v1/object/public/images/logo.png"
              alt="Autommensor Chhattisgarh"
              className="h-10"
            />
          </div>
          <p className="text-on-surface-variant font-body-md text-body-md leading-relaxed">
            Autommensor is Chhattisgarh&apos;s premier provider of wireless home automation. We specialize in retrofitting modern smart technology into existing homes to enhance security, luxury, and energy efficiency.
          </p>
          <div className="flex gap-4 md:gap-5">
            <a
              href="https://www.instagram.com/autommensor/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#E1306C]/20 hover:text-[#E1306C] hover:border-[#E1306C]/30 transition-all"
              aria-label="Instagram"
            >
              <FaInstagram className="text-[20px] md:text-[24px]" />
            </a>
            <a
              href="https://www.youtube.com/@autommensor"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FF0000]/20 hover:text-[#FF0000] hover:border-[#FF0000]/30 transition-all"
              aria-label="YouTube"
            >
              <FaYoutube className="text-[20px] md:text-[24px]" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1877F2]/20 hover:text-[#1877F2] hover:border-[#1877F2]/30 transition-all"
              aria-label="Facebook"
            >
              <FaFacebook className="text-[20px] md:text-[24px]" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0A66C2]/20 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 transition-all"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-[20px] md:text-[24px]" />
            </a>
            <a
              href="mailto:autommensor@gmail.com"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-electric-blue/20 hover:text-electric-blue hover:border-electric-blue/30 transition-all"
              aria-label="Email"
            >
              <Mail className="text-[20px] md:text-[24px]" />
            </a>
          </div>
        </div>

        {/* Column 2: Solutions */}
        <div className="md:pl-0 lg:pl-6">
          <h4 className="font-outfit text-lg md:text-headline-sm text-lg md:text-headline-sm mb-3 md:mb-8">Solutions</h4>
          <ul className="space-y-2 md:space-y-5">
            {solutions.map((item) => (
              <li key={item}>
                <a
                  href="/all-solutions"
                  className="text-on-surface-variant hover:text-electric-blue transition-colors font-label-md text-label-md"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Local Support */}
        <div>
          <h4 className="font-outfit text-lg md:text-headline-sm text-lg md:text-headline-sm mb-3 md:mb-8">Local Support</h4>
          <ul className="space-y-2 md:space-y-5 text-on-surface-variant">
            <li className="flex items-start gap-3 md:gap-4">
              <span className="material-symbols-outlined text-electric-blue text-[20px] md:text-[24px] flex-shrink-0">call</span>
              <div className="font-body-md text-body-md">
                <a href="tel:+917****4261" className="hover:text-electric-blue transition-colors block">+91-7987814261</a>
                <a href="tel:+918****2471" className="hover:text-electric-blue transition-colors block">+91-8085782471</a>
              </div>
            </li>
            <li className="flex items-start gap-3 md:gap-4">
              <span className="material-symbols-outlined text-electric-blue text-[20px] md:text-[24px] flex-shrink-0">mail</span>
              <a href="mailto:autommensor@gmail.com" className="hover:text-electric-blue transition-colors font-body-md text-body-md">
                autommensor@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-3 md:gap-4">
              <span className="material-symbols-outlined text-electric-blue text-[20px] md:text-[24px] flex-shrink-0">location_on</span>
              <span className="font-body-md text-body-md">Seepat, Bilaspur &amp; Raipur,<br />Chhattisgarh, India - 495559</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Why Trust Us */}
        <div>
          <h4 className="font-outfit text-lg md:text-headline-sm text-lg md:text-headline-sm mb-3 md:mb-8">Why Trust Us</h4>
          <div className="space-y-2 md:space-y-5">
            <div className="glass p-3 md:p-6 rounded-2xl flex items-center gap-2 md:gap-4">
              <span className="material-symbols-outlined text-success-emerald text-[18px] md:text-[28px]">verified</span>
              <span className="text-[10px] md:font-label-md text-label-md uppercase tracking-wider">5 year replacement Warranty</span>
            </div>
            <div className="glass p-3 md:p-6 rounded-2xl flex items-center gap-2 md:gap-4">
              <span className="material-symbols-outlined text-electric-blue text-[18px] md:text-[28px]">groups</span>
              <span className="text-[10px] md:font-label-md text-label-md uppercase tracking-wider">200+ Projects Completed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-6 md:mt-stack-md pt-4 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 text-xs md:text-sm text-on-surface-variant">
        <p className="font-body-md text-body-md">&copy; 2026 AUTOMMENSOR - Premium Home Automation Chhattisgarh.</p>
        <div className="flex flex-wrap justify-center gap-3 md:gap-10">
          <Link href="/privacy-policy" className="font-body-md text-body-md hover:text-electric-blue transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="font-body-md text-body-md hover:text-electric-blue transition-colors">
            Terms of Service
          </Link>
          <span className="flex items-center gap-2 font-body-md text-body-md">
            Made with <span className="text-error">❤️</span> in Chhattisgarh
          </span>
        </div>
      </div>
    </footer>
  );
}
