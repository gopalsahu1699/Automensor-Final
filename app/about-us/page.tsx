import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import AboutClient from "@/components/AboutClient";

export const metadata: Metadata = {
  title: "About AUTOMENSOR - Smart Home Automation Solutions",
  description: "Learn about AUTOMENSOR, your trusted partner in smart home and building automation. Discover our mission, values, and innovative Wi-Fi-based solutions.",
  keywords: [
    "about AUTOMENSOR",
    "smart home company",
    "automation solutions",
    "company mission",
    "smart living technology",
    "innovation",
    "customer-centric",
  ],
  openGraph: {
    title: "About AUTOMENSOR - Smart Home Automation",
    description: "Revolutionizing smart living with cutting-edge automation technology",
    url: "https://automensor.com/about-us",
    type: "website",
    images: [
      {
        url: "https://automensor.com/og-image-about.jpg",
        width: 1200,
        height: 630,
        alt: "AUTOMENSOR - About Us",
      },
    ],
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://automensor.com" },
  { name: "About Us", url: "https://automensor.com/about-us" },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <AboutClient />
    </>
  );
}
