import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import GalleryClient from "@/components/Clients/GalleryClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Gallery - Smart Home Automation Projects | AUTOMENSOR",
  description: "Browse our portfolio of smart home automation projects. See real-world examples of smart door locks, automated blinds, voice assistants, and more.",
  keywords: [
    "smart home gallery",
    "automation projects",
    "smart home examples",
    "portfolio",
    "smart devices showcase",
    "installation examples",
    "automation showcase",
  ],
  openGraph: {
    title: "Smart Home Automation Gallery | AUTOMENSOR",
    description: "Explore our real-world smart home automation projects and installations",
    url: "https://autommensor.in/gallery",
    type: "website",
    images: [
      {
        url: "https://autommensor.in/gallery/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AUTOMENSOR Gallery",
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
