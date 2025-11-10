"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  BookImage,
  LogOut,
  User,
  UserRoundSearch,
  PackageSearch,
  FileQuestionMark,
  HouseWifi,
  X as CloseIcon,
  ChevronDown,
  Settings,
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/components/AuthProvider";
import { assets } from "@/assets/assets";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const { isSeller } = useAppContext();
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle loading spinner on route change
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

  const avatarUrl = user?.prefs?.avatar || assets.user_icon;

  // Navigation items
  const navItems = [
    { href: "/", label: "Home", icon: HouseWifi },
    { href: "/all-products", label: "Products", icon: PackageSearch },
    { href: "/about-us", label: "About", icon: Award },
    { href: "/contact-us", label: "Contact", icon: UserRoundSearch },
  ];

  const menuItems = [
    { href: "/", icon: HouseWifi, label: "Home" },
    { href: "/my-account", icon: User, label: "My Account" },
    { href: "/all-products", icon: PackageSearch, label: "Products" },
    { href: "/about-us", icon: Award, label: "About Us" },
    { href: "/contact-us", icon: UserRoundSearch, label: "Contact Us" },
    { href: "/gallery", icon: BookImage, label: "Gallery" },
    { href: "/help", icon: FileQuestionMark, label: "Help" },
  ];

  // Menu item component
  const MenuItem = ({ href, icon: Icon, label, onClick }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        onClick={() => {
          if (onClick) onClick();
          setMenuOpen(false);
          setSidebarOpen(false);
        }}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
          isActive
            ? "bg-blue-50 text-blue-600 font-semibold"
            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
        }`}
        role="menuitem"
      >
        {Icon && <Icon className="w-5 h-5" />}
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Loading Spinner */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <HouseWifi className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-4">
          {/* Logo */}
          <motion.div
            role="button"
            tabIndex={0}
            aria-label="Go to homepage"
            onClick={() => router.push("/")}
            onKeyDown={(e) => e.key === "Enter" && router.push("/")}
            className="cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image src={assets.logo} alt="AUTOMENSOR logo" width={140} height={40} priority />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop & Mobile User Avatar */}
          {user && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all border border-gray-300"
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <span className="hidden md:inline font-medium text-gray-700">
                  {user.name?.split(' ')[0] || 'User'}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl py-2 border border-gray-100"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    role="menu"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>

                    <div className="py-2">
                      {menuItems.map((item) => (
                        <MenuItem key={item.href} {...item} />
                      ))}
                      {isSeller && (
                        <MenuItem href="/seller" icon={Settings} label="Seller Dashboard" />
                      )}
                    </div>

                    <div className="border-t border-gray-100 pt-2">
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          logout();
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 w-full rounded-lg transition-all mx-2"
                        role="menuitem"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Show Login Button if no user */}
          {!user && (
            <Link
              href="/login"
              className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
