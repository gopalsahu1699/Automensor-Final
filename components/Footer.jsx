import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import { FacebookIcon,  InstagramIcon,  LinkedinIcon,  TwitterIcon,  YoutubeIcon } from "lucide-react";

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
  <section className="md:w-1/4 not-italic text-sm" aria-label="Social media links">
  <h2 className="mb-5 text-gray-900 font-semibold text-lg">Follow Us on Social Media</h2>
  <div className="flex gap-3">
    <a
      href="https://www.instagram.com/yourprofile"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className="text-pink-600 hover:text-pink-800 transition-colors"
    >
      <InstagramIcon />
    </a>
    <a
      href="https://www.facebook.com/yourpage"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
      className="text-blue-600 hover:text-blue-800 transition-colors"
    >
      <FacebookIcon />
    </a>
    <a
      href="https://www.youtube.com/channel/yourchannel"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="YouTube"
      className="text-red-600 hover:text-red-800 transition-colors"
    >
      <YoutubeIcon />
    </a>
    <a
      href="https://twitter.com/yourhandle"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
      className="text-blue-400 hover:text-blue-600 transition-colors"
    >
      <TwitterIcon />
    </a>
    <a
      href="https://www.linkedin.com/in/yourprofile"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      className="text-blue-700 hover:text-blue-900 transition-colors"
    >
      <LinkedinIcon />
    </a>
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
