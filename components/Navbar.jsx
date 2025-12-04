"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  ShoppingBag,
  Info,
  Mail,
  Images,
  HelpCircle,
  User,
  LogOut,
  Menu,
  X as CloseIcon,
  ChevronDown,
  Settings,
  Zap,
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
  const sidebarRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
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

  // Navigation items - no login required (UPDATED ICONS)
  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/all-products", label: "Products", icon: ShoppingBag },
    { href: "/about-us", label: "About", icon: Info },
    { href: "/contact-us", label: "Contact", icon: Mail },
  ];

  // Sidebar menu items - no login required (UPDATED ICONS)
  const sidebarMenuItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/all-products", icon: ShoppingBag, label: "Products" },
    { href: "/about-us", icon: Info, label: "About Us" },
    { href: "/contact-us", icon: Mail, label: "Contact Us" },
    { href: "/gallery", icon: Images, label: "Gallery" },
    { href: "/help", icon: HelpCircle, label: "Help" },
  ];

  // User menu items - only shown when logged in (UPDATED ICONS)
  const userMenuItems = [
    { href: "/my-account", icon: User, label: "My Account" },
    { href: "/all-products", icon: ShoppingBag, label: "Products" },
    { href: "/about-us", icon: Info, label: "About Us" },
    { href: "/contact-us", icon: Mail, label: "Contact Us" },
    { href: "/gallery", icon: Images, label: "Gallery" },
    { href: "/help", icon: HelpCircle, label: "Help" },
  ];

  // Menu item component with enhanced styling
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
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
          isActive
            ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-md"
            : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
        }`}
        role="menuitem"
      >
        <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
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
                <Zap className="w-6 h-6 text-blue-600 animate-pulse" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Overlay - NO LOGIN REQUIRED */}
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

      {/* Sidebar - NO LOGIN REQUIRED */}
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
            {/* Sidebar Header */}
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

            {/* Sidebar Navigation - NO LOGIN REQUIRED */}
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

            {/* Divider */}
            <div className="border-t border-gray-200 my-4" />

            {/* User Section - CONDITIONAL */}
            {user ? (
              <div className="px-4 pb-6 space-y-4">
                {/* User Info */}
                <motion.div
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600 truncate">{user.email}</p>
                </motion.div>

                {/* User Menu Items */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <MenuItem href="/my-account" icon={User} label="My Account" />
                </motion.div>

                {isSeller && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <MenuItem href="/seller" icon={Settings} label="Seller Dashboard" />
                  </motion.div>
                )}

                {/* Logout Button */}
                <motion.button
                  onClick={() => {
                    setSidebarOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 rounded-lg transition-all font-medium shadow-md hover:shadow-lg group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Logout</span>
                </motion.button>
              </div>
            ) : (
              <motion.div
                className="px-4 pb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  href="/login"
                  onClick={() => setSidebarOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
                >
                  <User className="w-5 h-5" />
                  <span>Login</span>
                </Link>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-4">
          {/* Sidebar Toggle (Mobile) - NO LOGIN REQUIRED */}
          <motion.button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-blue-50 rounded-lg transition-all"
            whileTap={{ scale: 0.95 }}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </motion.button>

          {/* Logo */}
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
            <Image src={assets.logo} alt="autommensor logo" width={140} height={40} priority  />
          </motion.div>

          {/* Desktop Navigation - NO LOGIN REQUIRED (UPDATED ICONS) */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all group ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-transform ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop & Mobile User Avatar / Login */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative hidden md:block" ref={menuRef}>
                <motion.button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all border border-blue-300 shadow-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="User menu"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-md">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="hidden md:inline font-medium text-gray-700">
                    {user.name?.split(" ")[0] || "User"}
                  </span>
                  <motion.div
                    animate={{ rotate: menuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </motion.div>
                </motion.button>

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
                      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-blue-100">
                        <p className="font-semibold text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>

                      <div className="py-2">
                        {userMenuItems.map((item, idx) => (
                          <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.03 }}
                          >
                            <MenuItem {...item} />
                          </motion.div>
                        ))}
                        {isSeller && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 }}
                          >
                            <MenuItem
                              href="/seller"
                              icon={Settings}
                              label="Seller Dashboard"
                            />
                          </motion.div>
                        )}
                      </div>

                      <div className="border-t border-gray-100 pt-2">
                        <motion.button
                          onClick={() => {
                            setMenuOpen(false);
                            logout();
                          }}
                          className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 w-full rounded-lg transition-all mx-2 font-medium group"
                          whileHover={{ x: 4 }}
                          role="menuitem"
                        >
                          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          <span>Logout</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
