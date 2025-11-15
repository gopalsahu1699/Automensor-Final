import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import GalleryClient from "@/components/GalleryClient";

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
    url: "https://automensor.com/gallery",
    type: "website",
    images: [
      {
        url: "https://automensor.com/gallery/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AUTOMENSOR Gallery",
      },
    ],
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://automensor.com" },
  { name: "Gallery", url: "https://automensor.com/gallery" },
];

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <GalleryClient />
    </>
  );
}
