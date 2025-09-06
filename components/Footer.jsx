import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-300">
      <div className="container mx-auto flex flex-col md:flex-row items-start justify-between px-6 md:px-16 lg:px-32 py-14 gap-10 text-gray-600">
        <div className="md:w-2/5">
          <Image className="w-28 md:w-32" src={assets.logo3} alt="AUTOMENSOR logo" />
          <p className="mt-6 text-sm leading-relaxed">
            AUTOMENSOR specializes in innovative, wireless home automation solutions designed to enhance comfort, security, and energy efficiency. Our modular systems seamlessly integrate to create smart homes of the future.
          </p>
        </div>

        <nav className="md:w-1/5">
          <h2 className="mb-5 text-gray-900 font-semibold text-lg">Company</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:underline transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about-us" className="hover:underline transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="hover:underline transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/help" className="hover:underline transition">
                Help
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:underline transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </nav>

        <address className="md:w-1/4 not-italic text-sm">
          <h2 className="mb-5 text-gray-900 font-semibold text-lg">Get in Touch</h2>
          <p>Phone: +91-8085782471</p>
          <p>
            Email:{" "}
            <a href="mailto:automensor@gmail.com" className="hover:underline">
             automensor@gmail.com
            </a>
          </p>
          <p className="mt-4 text-xs text-gray-500">
            Registered Office: Seepat, Bilaspur, Chhattisgarh , India, Pin Code : 495555. 
          </p>
        </address>
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
