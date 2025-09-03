"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/components/AuthProvider";
import { assets, HomeIcon, BagIcon, BoxIcon, CartIcon } from "@/assets/assets";
import { useRouter, usePathname } from "next/navigation";

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

  // Detect pathname changes to toggle loading spinner
  useEffect(() => {
    // If pathname changes and is different from currentPath
    if (pathname !== currentPath) {
      setLoading(true);
      // Simulate a loading delay (remove this if your page loading is handled by Next.js suspense)
      const timeout = setTimeout(() => {
        setLoading(false);
        setCurrentPath(pathname);
      }, 500); // Adjust time as needed

      return () => clearTimeout(timeout);
    }
  }, [pathname, currentPath]);

  const avatarUrl = user?.prefs?.avatar || assets.user_icon;

  // Helper to handle menu click and close dropdown
  const handleMenuClick = (path) => {
    setMenuOpen(false);
    router.push(path);
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
          <style jsx>{`
            .loader {
              border-top-color: #3b82f6; /* blue-500 */
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

      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
        {/* Logo */}
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <Image src={assets.logo} alt="logo" width={128} height={32} />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <button onClick={() => router.push("/")} className="hover:text-gray-900 transition">
            Home
          </button>
          <button onClick={() => router.push("/all-products")} className="hover:text-gray-900 transition">
            Shop
          </button>
          <button onClick={() => router.push("/about-us")} className="hover:text-gray-900 transition">
            About Us
          </button>
          <button onClick={() => router.push("/contact-us")} className="hover:text-gray-900 transition">
            Contact
          </button>
          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="text-xs border px-4 py-1.5 rounded-full hover:bg-gray-100"
            >
              Seller Dashboard
            </button>
          )}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpen(!menuOpen)} className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
                <Image src={avatarUrl} alt="avatar" width={40} height={40} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg py-2 z-50">
                  <MenuItem onClick={() => handleMenuClick("/")} icon={<HomeIcon />} label="Home" />
                  <MenuItem onClick={() => handleMenuClick("/my-account")} icon={<User />} label="My Account" />
                  <MenuItem onClick={() => handleMenuClick("/all-products")} icon={<BoxIcon />} label="Products" />
                  <MenuItem onClick={() => handleMenuClick("/cart")} icon={<CartIcon />} label="Cart" />
                  <MenuItem onClick={() => handleMenuClick("/my-orders")} icon={<BagIcon />} label="My Orders" />
                  <hr className="my-2" />
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      logout();
                    }}
                    className="px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => router.push("/login")} className="flex items-center gap-2 hover:text-gray-900 transition">
              <Image src={assets.user_icon} alt="user icon" width={32} height={32} />
              Account
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden items-center gap-3">
          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="text-xs border px-4 py-1.5 rounded-full"
            >
              Seller Dashboard
            </button>
          )}

          {user ? (
            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpen(!menuOpen)} className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
                <Image src={avatarUrl} alt="avatar" width={40} height={40} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <MenuItem onClick={() => handleMenuClick("/")} icon={<HomeIcon />} label="Home" />
                  <MenuItem onClick={() => handleMenuClick("/my-account")} icon={<User />} label="My Account" />
                  <MenuItem onClick={() => handleMenuClick("/all-products")} icon={<BoxIcon />} label="Products" />
                  <MenuItem onClick={() => handleMenuClick("/cart")} icon={<CartIcon />} label="Cart" />
                  <MenuItem onClick={() => handleMenuClick("/my-orders")} icon={<BagIcon />} label="My Orders" />
                  <hr className="my-2" />
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      logout();
                    }}
                    className="px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => router.push("/login")} className="flex items-center gap-2 hover:text-gray-900 transition">
              <Image src={assets.user_icon} alt="user icon" width={32} height={32} />
              Account
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

const MenuItem = ({ onClick, icon, label }) => (
  <button onClick={onClick} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full">
    {icon} {label}
  </button>
);

export default Navbar;
