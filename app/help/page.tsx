import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import HelpClient from "@/components/Clients/HelpClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Help & Support Center | autommensor - Smart Home Automation Support",
  description: "Get help with autommensor smart home automation. Find setup guides, troubleshooting tips, and contact support. 24/7 customer support available via phone, email, and WhatsApp.",
  keywords: [
    "help center",
    "support",
    "troubleshooting",
    "smart home help",
    "setup guide",
    "customer support",
    "FAQ",
    "technical support",
    "automation help",
  ],
  openGraph: {
    title: "Help & Support Center | autommensor",
    description: "Get expert help with your smart home automation system. Setup guides, troubleshooting, and 24/7 support.",
    url: "https://autommensor.in/help",
    type: "website",
    images: [
      {
        url: "https://autommensor.in/og-image-help.jpg",
        width: 1200,
        height: 630,
        alt: "autommensor Help & Support",
      },
    ],
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://autommensor.in" },
  { name: "Help & Support", url: "https://autommensor.in/help" },
];

export default function HelpPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <Navbar />
      <HelpClient />
      <Footer />
    </>
  );
}
