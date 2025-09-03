"use client";

import { Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        {/* ✅ AuthProvider must wrap AppContextProvider */}
        <AuthProvider>
          <AppContextProvider>
            {children}
            <Toaster position="top-right" />
          </AppContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
