import type { Metadata } from "next";
import MyAccountClient from "@/components/Clients/MyAccountClient";

export const metadata: Metadata = {
  title: {
    default: "My Account | autommensor - Manage Profile & Settings",
    template: "%s | autommensor" // For consistency across app
  },
  description: "Securely manage your autommensor account, update profile, view orders, and adjust home automation settings for smart living.",
  keywords: "autommensor account, my profile, order history, home automation settings",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://autommensor.in/my-account", // Prevent duplicates
  },
  openGraph: {
    title: "My Account | autommensor",
    description: "Manage your autommensor profile and home automation preferences securely.",
    url: "https://autommensor.in/my-account",
    siteName: "autommensor",
    images: [
      {
        url: "https://autommensor.in/og-my-account.jpg", // Add branded OG image via Cloudinary
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Account | autommensor",
    description: "Manage your autommensor account profile and settings.",
    images: "https://autommensor.in/og-my-account.jpg",
  },
};

export default function MyAccountPage() {
  return <MyAccountClient />;
}
