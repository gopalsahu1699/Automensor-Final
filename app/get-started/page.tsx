import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GetStartedClient from "@/components/Clients/GetStartedClient";

export const metadata: Metadata = {
  title: "Home Automation Guide Bilaspur Raipur | Get Started Autommensor",
  description: "Get started with home automation in Bilaspur Raipur. 5-step guide for smart home setup, Alexa Google installation, lighting automation Chhattisgarh.",
  keywords: [
    "home automation guide Bilaspur",
    "get started home automation Raipur",
    "smart home setup Chhattisgarh",
    "Alexa Google installation guide Raipur",
    "home automation installation steps Bilaspur",
    "smart home beginner guide Chhattisgarh",
    "how to automate home Raipur Bilaspur",
    "Autommensor get started guide",
    "2BHK smart home installation process",
    "smart lighting setup tutorial Raipur",
  ],
  openGraph: {
    title: "Get Started Home Automation - Bilaspur Raipur Guide",
    description: "Step-by-step home automation guide for Bilaspur Raipur. Alexa setup, smart lighting, security installation process.",
    url: "https://autommensor.in/get-started",
    type: "website",
    images: [
      {
        url: "https://autommensor.in/og-image-get-started.jpg",
        width: 1200,
        height: 630,
        alt: "Home Automation Guide Bilaspur Raipur - Autommensor",
      },
    ],
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://autommensor.in" },
  { name: "Get Started", url: "https://autommensor.in/get-started" },
];

export default function GetStartedPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <Navbar />
      <GetStartedClient />
      <Footer />
    </>
  );
}
