"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Plus, Package, ClipboardList } from "lucide-react";

const SideBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true); // sidebar toggle state

  const menuItems = [
    { name: "Add Product", path: "/seller", icon: Plus },
    { name: "Product List", path: "/seller/product-list", icon: Package },
    { name: "Request", path: "/seller/request-list", icon: ClipboardList },
  ];

  return (
    <div className="relative flex">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 right-[-16px] md:right-[-20px] z-20 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full shadow-md"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } transition-all duration-300 border-r min-h-screen text-base border-gray-300 py-4 flex flex-col bg-white`}
      >
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          const IconComponent = item.icon;
          
          return (
            <Link href={item.path} key={item.name}>
              <div
                className={`flex items-center py-3 px-4 gap-3 cursor-pointer ${
                  isActive
                    ? "border-r-4 md:border-r-[6px] bg-orange-600/10 border-orange-500/90"
                    : "hover:bg-gray-100/90 border-white"
                }`}
              >
                <IconComponent 
                  size={28} 
                  className={`${isActive ? 'text-orange-500' : 'text-gray-600'}`}
                />
                {isOpen && <p className="whitespace-nowrap">{item.name}</p>}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
