import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import HelpClient from "@/components/HelpClient";

export const metadata: Metadata = {
  title: "Help & Support Center | AUTOMENSOR - Smart Home Automation Support",
  description: "Get help with AUTOMENSOR smart home automation. Find setup guides, troubleshooting tips, and contact support. 24/7 customer support available via phone, email, and WhatsApp.",
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
    title: "Help & Support Center | AUTOMENSOR",
    description: "Get expert help with your smart home automation system. Setup guides, troubleshooting, and 24/7 support.",
    url: "https://automensor.com/help",
    type: "website",
    images: [
      {
        url: "https://automensor.com/og-image-help.jpg",
        width: 1200,
        height: 630,
        alt: "AUTOMENSOR Help & Support",
      },
    ],
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://automensor.com" },
  { name: "Help & Support", url: "https://automensor.com/help" },
];

export default function HelpPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <HelpClient />
    </>
  );
}
