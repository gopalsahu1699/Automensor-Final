"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Award,
  BookImage,
  LogOut,
  User,
  UserRoundSearch,
  PackageSearch,
  FileQuestionMark,
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/components/AuthProvider";
import { assets, HomeIcon } from "@/assets/assets";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const { isSeller } = useAppContext();
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
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

  // Menu item reusable
  const MenuItem = ({ href, icon, label }) => (
    <Link
      href={href}
      onClick={() => setMenuOpen(false)}
      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 w-full rounded-md transition"
      role="menuitem"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );

  return (
    <>
      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16" />
          <style jsx>{`
            .loader {
              border-top-color: #2563eb; /* blue-600 */
              animation: spinner 1s linear infinite;
            }
            @keyframes spinner {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}</style>
        </div>
      )}

      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-0 border-b border-gray-200 bg-white text-gray-700 shadow-sm sticky top-0 z-40">
        {/* Logo */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Go to homepage"
          onClick={() => router.push("/")}
          onKeyDown={(e) => e.key === "Enter" && router.push("/")}
          className="cursor-pointer"
        >
          <Image
            src={assets.logo3}
            alt="AUTOMENSOR logo"
            width={140}
            height={40}
            priority
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <MenuItem href="/"  label="Home" />
          <MenuItem href="/all-products" label="Products" />
          <MenuItem href="/about-us" label="About" />
          <MenuItem href="/contact-us" label="Contact" />
          {isSeller && (
            <Link
              href="/seller"
              className="text-sm border border-gray-300 px-4 py-1.5 rounded-full hover:bg-gray-50 transition"
              aria-label="Seller Dashboard"
            >
              Seller Dashboard
            </Link>
          )}
        </div>

        {/* User Menu Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-haspopup="true"
                aria-expanded={menuOpen}
                aria-label="User menu"
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <Image src={avatarUrl} alt="User avatar" width={40} height={40} />
              </button>

              {menuOpen && (
                <div
                  className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg py-2 border border-gray-100 animate-fade-in"
                  role="menu"
                >
                  <MenuItem href="/" icon={<HomeIcon className="w-4 h-4" />} label="Home" />
                  <MenuItem href="/my-account" icon={<User className="w-4 h-4" />} label="My Account" />
                  <MenuItem href="/all-products" icon={<PackageSearch className="w-4 h-4" />} label="Products" />
                  <MenuItem href="/about-us" icon={<Award className="w-4 h-4" />} label="About Us" />
                  <MenuItem href="/contact-us" icon={<UserRoundSearch className="w-4 h-4" />} label="Contact Us" />
                  <MenuItem href="/gallery" icon={<BookImage className="w-4 h-4" />} label="Gallery" />
                  <MenuItem href="/help" icon={<FileQuestionMark  className="w-4 h-4" />} label="Help" />
                  <hr className="my-2 border-gray-200" />
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left rounded-md transition"
                    role="menuitem"
                  >
                    <LogOut width={18} height={18} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 hover:text-blue-600 transition"
              aria-label="Login"
            >
              <Image src={assets.user_icon} alt="User icon" width={28} height={28} />
              <span className="font-medium">Account</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden items-center gap-3">
          {isSeller && (
            <Link
              href="/seller"
              className="text-xs border border-gray-300 px-4 py-1.5 rounded-full hover:bg-gray-50 transition"
            >
              Seller Dashboard
            </Link>
          )}

          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-haspopup="true"
                aria-expanded={menuOpen}
                aria-label="User menu"
                className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <Image src={avatarUrl} alt="User avatar" width={36} height={36} />
              </button>

              {menuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100 animate-fade-in"
                  role="menu"
                >
                  <MenuItem href="/" icon={<HomeIcon className="w-4 h-4" />} label="Home" />
                  <MenuItem href="/my-account" icon={<User className="w-4 h-4" />} label="My Account" />
                  <MenuItem href="/all-products" icon={<PackageSearch className="w-4 h-4" />} label="Products" />
                  <MenuItem href="/about-us" icon={<Award className="w-4 h-4" />} label="About Us" />
                  <MenuItem href="/contact-us" icon={<UserRoundSearch className="w-4 h-4" />} label="Contact Us" />
                  <MenuItem href="/gallery" icon={<BookImage className="w-4 h-4" />} label="Gallery" />
                  <MenuItem href="/help" icon={<FileQuestionMark  className="w-4 h-4" />} label="Help" />
                  <hr className="my-2 border-gray-200" />
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left rounded-md transition"
                    role="menuitem"
                  >
                    <LogOut width={18} height={18} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 hover:text-blue-600 transition"
            >
              <Image src={assets.user_icon} alt="User icon" width={28} height={28} />
              <span className="font-medium">Account</span>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
