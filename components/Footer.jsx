import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Home,
  Info,
  HelpCircle,
  Shield,
  Send,
    ImageIcon,
} from "lucide-react";

const RouteLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about-us", label: "About Us", icon: Info },
  { href: "/contact-us", label: "Contact Us", icon: Send },
  { href: "/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/help", label: "Help", icon: HelpCircle },
  { href: "/privacy-policy", label: "Privacy Policy", icon: Shield },
];

const socialLinks = [
  {
    href: "https://www.instagram.com/autommensor/?igsh=bXdyZW9rdnA0Z3Jn#",
    ariaLabel: "Instagram",
    className: "text-pink-600 hover:text-pink-700 hover:scale-110 transition-all",
    Icon: InstagramIcon,
  },
  {
    href: "https://www.youtube.com/channel/yourchannel",
    ariaLabel: "YouTube",
    className: "text-red-600 hover:text-red-700 hover:scale-110 transition-all",
    Icon: YoutubeIcon,
  },
  {
    href: "https://www.facebook.com/yourpage",
    ariaLabel: "Facebook",
    className: "text-blue-600 hover:text-blue-700 hover:scale-110 transition-all",
    Icon: FacebookIcon,
  },
  {
    href: "https://www.linkedin.com/in/yourprofile",
    ariaLabel: "LinkedIn",
    className: "text-blue-700 hover:text-blue-800 hover:scale-110 transition-all",
    Icon: LinkedinIcon,
  },
  {
    href: "https://twitter.com/yourhandle",
    ariaLabel: "Twitter",
    className: "text-blue-400 hover:text-blue-500 hover:scale-110 transition-all",
    Icon: TwitterIcon,
  },
];

const contactInfo = [
  { icon: Phone, text: "+91-8718847083" },
  { icon: Phone, text: "+91-8085782471" },
  { 
    icon: MessageCircle, 
    text: "WhatsApp Support", 
    link: "https://wa.me/918985602913",
    isLink: true 
  },
  { 
    icon: Mail, 
    text: "autommensor@gmail.com", 
    link: "mailto:autommensor@gmail.com",
    isLink: true 
  },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 md:px-16 lg:px-32 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="lg:col-span-1">
            {/* FIXED: Removed brightness-0 invert classes */}
            <div className="bg-white/10 p-1 rounded-lg inline-block mb-6">
              <Image
                className="w-32 bg-white rounded-lg"
                src={assets.logo}
                width={140}
                height={40}
                alt="autommensor logo"
                priority
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

          {/* Contact Information */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <Phone className="w-5 h-5 text-green-400" />
              Get in Touch
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <li key={index} className="flex items-start gap-3">
                    <IconComponent className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    {item.isLink ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-sm text-gray-400">{item.text}</span>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-gray-500 flex items-start gap-2">
                <MapPin className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Registered Office: Seepat, Bilaspur, Chhattisgarh, India - 495559</span>
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Follow Us</h3>
            <p className="text-sm text-gray-400 mb-6">
              Stay connected and get the latest updates on our smart home solutions
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ href, ariaLabel, className, Icon }) => (
                <a
                  key={ariaLabel}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ariaLabel}
                  className={`w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center border border-white/10 ${className}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="mt-8 space-y-3">
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
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/30">
        <div className="container mx-auto px-6 md:px-16 lg:px-32 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs md:text-sm text-gray-500">
              &copy; 2025 autommensor. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms-of-service" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <span>Made with ❤️ in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
