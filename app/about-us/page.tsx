import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import AboutClient from "@/components/Clients/AboutClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About autommensor - Smart Home Automation Solutions",
  description: "Learn about autommensor, your trusted partner in smart home and building automation. Discover our mission, values, and innovative Wi-Fi-based solutions.",
  keywords: [
    "about autommensor",
    "smart home company",
    "automation solutions",
    "company mission",
    "smart living technology",
    "innovation",
    "customer-centric",
  ],
  openGraph: {
    title: "About autommensor - Smart Home Automation",
    description: "Revolutionizing smart living with cutting-edge automation technology",
    url: "https://autommensor.in/about-us",
    type: "website",
    images: [
      {
        url: "https://autommensor.in/og-image-about.jpg",
        width: 1200,
        height: 630,
        alt: "autommensor - About Us",
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
