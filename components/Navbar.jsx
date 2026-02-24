"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHouse as Home,
  FaBagShopping as ShoppingBag,
  FaCircleInfo as Info,
  FaEnvelope as Mail,
  FaBars as Menu,
  FaXmark as CloseIcon,
  FaBolt as Zap,
  FaShieldHalved as Shield,
  FaWifi as Wifi,
  FaArrowRight as ArrowRight
} from "react-icons/fa6";
import { assets } from "@/assets/assets";

const NavbarHero = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname);
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Loading on route change
  useEffect(() => {
    if (pathname !== currentPath) {
      setLoading(true);
      const timeout = setTimeout(() => {
        setLoading(false);
        setCurrentPath(pathname);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [pathname, currentPath]);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/all-products", label: "Products", icon: ShoppingBag },
    { href: "/estimate-cost-calculator", label: "Cost Calculator", icon: Zap },
    { href: "/about-us", label: "About", icon: Info },
    { href: "/contact-us", label: "Contact", icon: Mail },
  ];

  const sidebarMenuItems = navItems;

  const MenuItem = ({ href, icon: Icon, label }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        onClick={() => setSidebarOpen(false)}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${isActive
          ? "bg-gradient-to-r from-blue-700 to-blue-600 text-white font-semibold shadow-md"
          : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
          }`}
      >
        <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
        <span>{label}</span>
      </Link>
    );
  };

  const trustItems = [
    { value: "10+", label: "Years Warranty", icon: Shield },
    { value: "200+", label: "Homes Automated", icon: Home },
    { value: "100%", label: "Wi-Fi Based", icon: Wifi },
  ];

  return (
    <>



      {/* Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
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
            className="fixed left-0 top-0 h-full w-72 bg-white z-40 shadow-2xl overflow-y-auto"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">Menu</h3>
              </div>
              <motion.button
                onClick={() => setSidebarOpen(false)}
                className="p-1 hover:bg-blue-200 rounded-lg transition-all"
                whileTap={{ scale: 0.95 }}
                aria-label="Close sidebar"
              >
                <CloseIcon className="w-6 h-6 text-gray-600" />
              </motion.button>
            </div>

            <div className="py-6 space-y-2 px-4">
              {sidebarMenuItems.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <MenuItem {...item} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-4">
          <motion.button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-blue-50 rounded-lg transition-all"
            whileTap={{ scale: 0.95 }}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </motion.button>

          <motion.div
            role="button"
            tabIndex={0}
            aria-label="Go to homepage"
            onClick={() => router.push("/")}
            onKeyDown={(e) => e.key === "Enter" && router.push("/")}
            className="cursor-pointer flex-1 md:flex-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image src={assets.logo} alt="autommensor logo" width={140} height={40} priority />
          </motion.div>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all group ${isActive
                    ? "bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-lg"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                >
                  <Icon className={`w-4 h-4 transition-transform ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact-us"
              className="ml-4 hidden lg:inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 hover:shadow-xl hover:scale-105 active:scale-95"
            >
              Book Free Site Visit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </nav>


    </>
  );
};

export default NavbarHero;
