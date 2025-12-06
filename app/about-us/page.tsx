import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import AboutClient from "@/components/Clients/AboutClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Autommensor Automation - Home Automation Bilaspur Raipur",
  description: "Discover Autommensor Automation, Chhattisgarh's leading home automation company in Bilaspur and Raipur. Smart home solutions, Alexa Google installation, and complete automation services for modern homes.",
  keywords: [
    "home automation Bilaspur",
    "home automation Raipur",
    "smart home automation Chhattisgarh",
    "home automation services Raipur Bilaspur",
    "Alexa Google smart home installation Raipur Bilaspur",
    "Autommensor Automation Bilaspur",
    "Autommensor Automation Raipur",
    "smart home company Chhattisgarh",
    "home automation system installation Raipur",
    "about autommensor automation",
  ],
  openGraph: {
    title: "About Autommensor - Smart Home Automation Bilaspur Raipur",
    description: "Leading home automation company serving Bilaspur, Raipur and Chhattisgarh with smart home solutions, Alexa & Google Home integration.",
    url: "https://autommensor.in/about-us",
    type: "website",
    images: [
      {
        url: "https://autommensor.in/og-image-about.jpg",
        width: 1200,
        height: 630,
        alt: "Autommensor Automation - Home Automation Bilaspur Raipur",
      },
    ],
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://autommensor.in" },
  { name: "About Us", url: "https://autommensor.in/about-us" },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <Navbar />
      <AboutClient />
      <Footer />
    </>
  );
}
