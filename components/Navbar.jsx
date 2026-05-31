"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/all-solutions", label: "Solutions" },
  { href: "/about-us", label: "About Us" },
  { href: "/contact-us", label: "Contact" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            ref={sidebarRef}
            className="fixed left-0 top-0 h-full w-72 bg-surface-container z-40 shadow-2xl overflow-y-auto border-r border-white/5"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5">
         
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 hover:bg-white/10 rounded-lg transition-all"
                aria-label="Close sidebar"
              >
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            </div>
            <div className="py-6 space-y-2 px-4">
              {navItems.map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center px-4 py-4 md:py-4 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-electric-blue/10 text-electric-blue font-semibold"
                          : "text-on-surface-variant hover:text-electric-blue hover:bg-white/5"
                      }`}
                    >
                      <span className="font-label-md text-label-md">{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
              <div className="pt-4 px-4">
                <Link
                  href="/contact-us"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center justify-center gap-2 primary-gradient text-white px-8 py-4 rounded-full font-label-md text-label-md shadow-xl shadow-electric-blue/20 hover:brightness-110 active:scale-95 transition-all w-full"
                >
                  Book Site Visit
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-nav border-b border-white/5">
        <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-3 md:py-5 max-w-container-max mx-auto">
          {/* Logo */}
          <div
            role="button"
            tabIndex={0}
            aria-label="Go to homepage"
            onClick={() => router.push("/")}
            onKeyDown={(e) => e.key === "Enter" && router.push("/")}
            className="cursor-pointer flex items-center gap-2"
          >

<div className="inline-flex items-center bg-gradient-to-r from-white/5 via-white/15 to-white/50 backdrop-blur-2xl border border-white/10 rounded-2xl px-4 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
  <Image
    src="https://abneywcnsdpriagqolvf.supabase.co/storage/v1/object/public/images/logo.png"
    alt="Autommensor"
    width={140}
    height={40}
    className="h-8 md:h-10 w-auto object-contain"
  />
</div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-label-md text-label-md transition-colors relative group ${
                    isActive
                      ? "text-on-surface hover:text-electric-blue"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-electric-blue transition-all group-hover:w-full"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/contact-us")}
              className="hidden md:block primary-gradient text-white px-8 py-3 rounded-full font-label-md text-label-md shadow-xl shadow-electric-blue/20 hover:brightness-110 active:scale-95 transition-all"
            >
              Book Site Visit
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-on-surface p-2"
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
