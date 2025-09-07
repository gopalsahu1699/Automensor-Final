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
  HouseWifi,
  Menu as MenuIcon,
  X as CloseIcon,
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
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar state
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

  // Menu item reusable component
  const MenuItem = ({ href, icon, label, onClick }) => (
    <Link
      href={href}
      onClick={() => {
        if (onClick) onClick();
        setMenuOpen(false);
        setSidebarOpen(false); // close sidebar on navigation
      }}
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

      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-2 border-b border-gray-200 bg-white text-gray-700 shadow-sm sticky top-0 z-40">
        {/* Logo */}
       <div
  role="button"
  tabIndex={0}
  aria-label="Go to homepage"
  onClick={() => router.push("/")}
  onKeyDown={(e) => e.key === "Enter" && router.push("/")}
  className="cursor-pointer bg-transparent"
>
  <Image src={assets.logo} alt="AUTOMENSOR logo" width={140} height={40} priority />
</div>


        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <MenuItem href="/" label="Home" />
          <MenuItem href="/all-products" label="Products" />
          <MenuItem href="/about-us" label="About" />
          <MenuItem href="/contact-us" label="Contact" />
        
        </div>

        {/* User Menu Desktop */}
        <div className="hidden md:flex items-center gap-4">
            <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            className="p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <MenuIcon size={28} />
          </button>
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
                  <MenuItem href="/" icon={<HouseWifi className="w-4 h-4" />} label="Home" />
                  <MenuItem href="/my-account" icon={<User className="w-4 h-4" />} label="My Account" />
                  <MenuItem href="/all-products" icon={<PackageSearch className="w-4 h-4" />} label="Products" />
                  <MenuItem href="/about-us" icon={<Award className="w-4 h-4" />} label="About Us" />
                  <MenuItem href="/contact-us" icon={<UserRoundSearch className="w-4 h-4" />} label="Contact Us" />
                  <MenuItem href="/gallery" icon={<BookImage className="w-4 h-4" />} label="Gallery" />
                  <MenuItem href="/help" icon={<FileQuestionMark className="w-4 h-4" />} label="Help" />
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
          ) : null /* No login link here */}
        </div>

        {/* Mobile Menu & Sidebar Toggle */}
        <div className="flex md:hidden items-center gap-3">

          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            className="p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <MenuIcon size={28} />
          </button>
        </div>
      </nav>

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay background */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />

          {/* Sidebar panel */}
          <aside className="relative bg-white w-64 max-w-full h-full shadow-xl p-6 overflow-y-auto animate-fade-in">
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
              className="absolute top-4 right-4 p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <CloseIcon size={28} />
            </button>

            <div className="mb-8">
              <Image
                src={assets.logo}
                alt="AUTOMENSOR logo"
                width={140}
                height={40}
                priority
              />
            </div>

            <nav className="flex flex-col gap-4 font-medium text-gray-700">
              <MenuItem href="/" icon={<HouseWifi className="w-5 h-5" />} label="Home" onClick={() => setSidebarOpen(false)} />
              <MenuItem href="/my-account" icon={<User className="w-5 h-5" />} label="My Account" onClick={() => setSidebarOpen(false)} />
              <MenuItem href="/all-products" icon={<PackageSearch className="w-5 h-5" />} label="Products" onClick={() => setSidebarOpen(false)} />
              <MenuItem href="/about-us" icon={<Award className="w-5 h-5" />} label="About Us" onClick={() => setSidebarOpen(false)} />
              <MenuItem href="/contact-us" icon={<UserRoundSearch className="w-5 h-5" />} label="Contact Us" onClick={() => setSidebarOpen(false)} />
              <MenuItem href="/gallery" icon={<BookImage className="w-5 h-5" />} label="Gallery" onClick={() => setSidebarOpen(false)} />
              <MenuItem href="/help" icon={<FileQuestionMark className="w-5 h-5" />} label="Help" onClick={() => setSidebarOpen(false)} />
              {isSeller && (
                <MenuItem
                  href="/seller"
                  label="Seller Dashboard"
                  onClick={() => setSidebarOpen(false)}
                  icon={null}
                />
              )}
              {user && (
                <>
                  <hr className="my-4 border-gray-200" />
                  
                  <button
                    onClick={() => {
                      logout();
                      setSidebarOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 mt-4 text-red-600 hover:bg-red-50 rounded-md transition"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </>
              )}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
};

export default Navbar;
