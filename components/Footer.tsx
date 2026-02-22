"use client";

import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Home,
  Info,
  Shield,
  Send,
} from "lucide-react";
import {
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter
} from "react-icons/fa6";

/* ------------------ Route Links ------------------ */
const RouteLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about-us", label: "About Us", icon: Info },
  { href: "/contact-us", label: "Contact Us", icon: Send },
  { href: "/privacy-policy", label: "Privacy Policy", icon: Shield },
];

/* ------------------ Social Links ------------------ */
const socialLinks = [
  {
    href: "https://www.instagram.com/autommensor/?igsh=bXdyZW9rdnA0Z3Jn#",
    ariaLabel: "Instagram",
    className: "text-white bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 hover:scale-110 shadow-lg shadow-pink-500/30 transition-all border-0",
    Icon: FaInstagram,
  },
  {
    href: "https://www.youtube.com/channel/yourchannel",
    ariaLabel: "YouTube",
    className: "text-white bg-red-600 hover:bg-red-700 hover:scale-110 shadow-lg shadow-red-600/30 transition-all border-0",
    Icon: FaYoutube,
  },
  {
    href: "https://www.facebook.com/yourpage",
    ariaLabel: "Facebook",
    className: "text-white bg-blue-600 hover:bg-blue-700 hover:scale-110 shadow-lg shadow-blue-600/30 transition-all border-0",
    Icon: FaFacebookF,
  },
  {
    href: "https://www.linkedin.com/in/yourprofile",
    ariaLabel: "LinkedIn",
    className: "text-white bg-blue-700 hover:bg-blue-800 hover:scale-110 shadow-lg shadow-blue-700/30 transition-all border-0",
    Icon: FaLinkedinIn,
  },
  {
    href: "https://twitter.com/yourhandle",
    ariaLabel: "Twitter",
    className: "text-white bg-black hover:bg-gray-900 hover:scale-110 shadow-lg shadow-gray-800/30 transition-all border border-gray-700",
    Icon: FaXTwitter,
  },
];

/* ------------------ Contact Info ------------------ */
const contactInfo = [
  {
    icon: Phone,
    text: "+91-8718847083",
    link: "tel:+918718847083",
  },
  {
    icon: Phone,
    text: "+91-8085782471",
    link: "tel:+918085782471",
  },
  {
    icon: MessageCircle,
    text: "WhatsApp Support",
    link: "https://wa.me/918985602913",
  },
  {
    icon: Mail,
    text: "autommensor@gmail.com",
    link: "mailto:autommensor@gmail.com",
  },
];

/* ------------------ Footer Component ------------------ */
const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 text-gray-300">
      {/* Main Footer Grid */}
      <div className="container mx-auto px-6 md:px-16 lg:px-32 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* About Section */}
        <div>
          <div className="bg-white/10 p-1 rounded-lg inline-block mb-6">
            <Image
              src={assets.logo}
              alt="autommensor logo"
              width={140}
              height={40}
              className="w-32 bg-white rounded-lg"
            />
          </div>
          <p className="text-sm leading-relaxed text-gray-400 mb-6">
            Autommensor specializes in innovative, wireless home automation solutions designed to enhance comfort, security, and energy efficiency.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span>Bilaspur, Chhattisgarh, India</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <Home className="w-5 h-5 text-blue-400" />
            Quick Links
          </h3>
          <ul className="space-y-3">
            {RouteLinks.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition-colors group"
                >
                  <Icon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <Phone className="w-5 h-5 text-green-400" />
            Get in Touch
          </h3>
          <ul className="space-y-4">
            {contactInfo.map(({ icon: IconComponent, text, link }, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <IconComponent className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                {link ? (
                  <a
                    href={link}
                    target={link.startsWith("http") ? "_blank" : undefined}
                    rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {text}
                  </a>
                ) : (
                  <span className="text-sm text-gray-400">{text}</span>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <p className="text-xs text-gray-500 flex items-start gap-2">
              <MapPin className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
              Registered Office: Seepat, Bilaspur, Chhattisgarh, India - 495559
            </p>
          </div>
        </div>

        {/* Social Media & Trust */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6">Follow Us</h3>
          <p className="text-sm text-gray-400 mb-6">
            Stay connected and get the latest updates on our smart home solutions
          </p>
          <div className="flex gap-4 mb-6">
            {socialLinks.map(({ href, ariaLabel, className, Icon }) => (
              <a
                key={ariaLabel}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ariaLabel}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${className}`}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-400">10 Year Warranty</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-400">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-400">200+ Happy Customers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/30">
        <div className="container mx-auto px-6 md:px-16 lg:px-32 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-xs md:text-sm text-gray-500">
              &copy; 2025 Autommensor. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>Developer Gopal Sahu</span>
              <a
                href="https://gksportfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30 px-2.5 py-1 rounded transition-all font-medium"
              >
                Hire
              </a>
            </div>
          </div>
          <div className="flex flex-wrap justify-center md:items-center gap-4 md:gap-6 text-xs text-gray-500">
            <Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">
              Privacy Policy
            </Link>
            <span className="hidden md:inline">•</span>
            <Link href="/terms-of-service" className="hover:text-blue-400 transition-colors">
              Terms of Service
            </Link>
            <span className="hidden md:inline">•</span>
            <span>Made with ❤️ in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
