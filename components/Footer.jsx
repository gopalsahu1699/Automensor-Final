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
} from "lucide-react";

const RouteLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/about-us",
    label: "About Us",
  },
  {
    href: "/contact-us",
    label: "Contact Us",
  },
  {
    href: "/help",
    label: "Help",
  },
  {
    href: "/privacy-policy",
    label: "Privacy Policy",
  },
];

const socialLinks = [
  {
    href: "https://www.instagram.com/automensor/?igsh=bXdyZW9rdnA0Z3Jn#",
    ariaLabel: "Instagram",
    className: "text-pink-600 hover:text-pink-800 transition-colors",
    Icon: InstagramIcon,
  },
  {
    href: "https://www.youtube.com/channel/yourchannel",
    ariaLabel: "YouTube",
    className: "text-red-600 hover:text-red-800 transition-colors",
    Icon: YoutubeIcon,
  },
  {
    href: "https://www.facebook.com/yourpage",
    ariaLabel: "Facebook",
    className: "text-blue-600 hover:text-blue-800 transition-colors",
    Icon: FacebookIcon,
  },
  {
    href: "https://www.linkedin.com/in/yourprofile",
    ariaLabel: "LinkedIn",
    className: "text-blue-700 hover:text-blue-900 transition-colors",
    Icon: LinkedinIcon,
  },
  {
    href: "https://twitter.com/yourhandle",
    ariaLabel: "Twitter",
    className: "text-blue-400 hover:text-blue-600 transition-colors",
    Icon: TwitterIcon,
  },
];
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-300">
      <div className="container mx-auto flex flex-col md:flex-row items-start justify-between px-6 md:px-16 lg:px-32 py-14 gap-10 text-gray-600">
        <div className="md:w-2/5">
          <Image
            className="w-28 md:w-32"
            src={assets.logo}
            alt="AUTOMENSOR logo"
          />
          <p className="mt-6 text-sm leading-relaxed">
            AUTOMENSOR specializes in innovative, wireless home automation
            solutions designed to enhance comfort, security, and energy
            efficiency. Our modular systems seamlessly integrate to create smart
            homes of the future.
          </p>
        </div>

        <nav className="md:w-1/5">
          <h2 className="mb-5 text-gray-900 font-semibold text-lg">Company</h2>
          <ul className="space-y-3 text-sm">
            {RouteLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="hover:underline transition">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="md:w-1/4 not-italic text-sm">
          <h2 className="mb-5 text-gray-900 font-semibold text-lg">
            Get in Touch
          </h2>
          <p>Phone: +91-8718847083</p>
          <p>Phone: +91-8085782471</p>
          <p>
            <a
              href="https://wa.me/918985602913"
              className=" hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp: support chat
            </a>
          </p>

          <p>
            Email:{" "}
            <a href="mailto:automensor@gmail.com" className="hover:underline">
              automensor@gmail.com
            </a>
          </p>
          <p className="mt-4 text-xs text-gray-500">
            Registered Office: Seepat, Bilaspur, Chhattisgarh , India, Pin Code
            : 495559.
          </p>
        </address>
        <section
          className="md:w-1/4 not-italic text-sm"
          aria-label="Social media links"
        >
          <h2 className="mb-5 text-gray-900 font-semibold text-lg">
            Follow Us on Social Media
          </h2>
          <div className="flex gap-3">
            {socialLinks.map(({ href, ariaLabel, className, Icon }) => (
              <a
                key={ariaLabel}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ariaLabel}
                className={className}
              >
                <Icon />
              </a>
            ))}
          </div>
        </section>
      </div>

      <div className="border-t border-gray-300">
        <p className="py-4 text-center text-xs md:text-sm text-gray-500">
          &copy; 2025 AUTOMENSOR. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
