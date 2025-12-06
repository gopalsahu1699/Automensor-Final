import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import GalleryClient from "@/components/Clients/GalleryClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Smart Home Gallery Bilaspur Raipur | Home Automation Projects",
  description: "View Autommensor smart home gallery in Bilaspur Raipur. Real 2BHK/3BHK projects, Alexa Google installations, smart lighting, security systems Chhattisgarh.",
  keywords: [
    "smart home gallery Bilaspur",
    "home automation projects Raipur",
    "smart home installation gallery Chhattisgarh",
    "Alexa Google smart home Raipur Bilaspur",
    "2BHK smart home projects Bilaspur",
    "3BHK home automation gallery Raipur",
    "smart lighting installation photos",
    "Autommensor gallery Bilaspur Raipur",
    "home automation case studies Chhattisgarh",
    "smart home project showcase",
  ],
  openGraph: {
    title: "Smart Home Gallery - Bilaspur Raipur Projects",
    description: "Real-world home automation projects in Bilaspur Raipur. See 2BHK/3BHK smart homes, Alexa installations, lighting automation.",
    url: "https://autommensor.in/gallery",
    type: "website",
    images: [
      {
        url: "https://autommensor.in/gallery/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Autommensor Smart Home Gallery Bilaspur Raipur",
      },
    ],
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://autommensor.in" },
  { name: "Gallery", url: "https://autommensor.in/gallery" },
];

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <Navbar />
      <GalleryClient />
      <Footer />
    </>
  );
}
