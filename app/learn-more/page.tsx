import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import LearnMoreClient from "@/components/Clients/LearnMoreClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Smart Home Automation Guide Bilaspur Raipur | Autommensor Features",
  description: "Learn about home automation benefits in Bilaspur Raipur. Smart lighting, Alexa Google integration, security features, energy savings Chhattisgarh.",
  keywords: [
    "smart home automation Bilaspur",
    "home automation features Raipur",
    "Alexa Google home automation Chhattisgarh",
    "smart home benefits Bilaspur",
    "home automation technology Raipur",
    "smart lighting features Chhattisgarh",
    "home security automation Bilaspur",
    "energy saving smart home Raipur",
    "Autommensor smart home features",
    "how smart home works Chhattisgarh",
  ],
  openGraph: {
    title: "Smart Home Features Guide - Bilaspur Raipur",
    description: "Complete guide to home automation technology, Alexa integration, security features, energy savings in Chhattisgarh.",
    url: "https://autommensor.in/learn-more",
    type: "website",
    images: [
      {
        url: "https://autommensor.in/og-image-learn.jpg",
        width: 1200,
        height: 630,
        alt: "Smart Home Automation Features Bilaspur Raipur",
      },
    ],
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://autommensor.in" },
  { name: "Learn More", url: "https://autommensor.in/learn-more" },
];

export default function LearnMorePage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <Navbar />
      <LearnMoreClient />
      <Footer />
    </>
  );
}
