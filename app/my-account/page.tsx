import type { Metadata } from "next";
import MyAccountClient from "@/components/Clients/MyAccountClient";

export const metadata: Metadata = {
  title: {
    default: "My Account | Automensor - Manage Profile & Settings",
    template: "%s | Automensor" // For consistency across app
  },
  description: "Securely manage your Automensor account, update profile, view orders, and adjust home automation settings for smart living.",
  keywords: "automensor account, my profile, order history, home automation settings",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://automensor.in/my-account", // Prevent duplicates
  },
  openGraph: {
    title: "My Account | Automensor",
    description: "Manage your Automensor profile and home automation preferences securely.",
    url: "https://automensor.in/my-account",
    siteName: "Automensor",
    images: [
      {
        url: "https://automensor.in/og-my-account.jpg", // Add branded OG image via Cloudinary
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Account | Automensor",
    description: "Manage your Automensor account profile and settings.",
    images: "https://automensor.in/og-my-account.jpg",
  },
};

export default function MyAccountPage() {
  return <MyAccountClient />;
}
