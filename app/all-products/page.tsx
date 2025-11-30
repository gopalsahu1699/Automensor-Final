import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import AllProductsClient from "@/components/Clients/AllProductsClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "All Smart Home Automation Products | autommensor",
  description: "Browse our complete range of smart home automation products. Motion sensors, touch panels, door locks, smart switches, and more. Find the perfect solution for your home.",
  keywords: [
    "smart home products",
    "automation devices",
    "IoT products",
    "smart devices",
    "motion sensors",
    "smart switches",
    "automation solutions",
    "home control products",
  ],
  openGraph: {
    title: "All Smart Home Automation Products | autommensor",
    description: "Complete range of smart home automation products and devices",
    url: "https://autommensor.in/all-products",
    type: "website",
    images: [
      {
        url: "https://autommensor.in/og-image-products.jpg",
        width: 1200,
        height: 630,
        alt: "autommensor Products",
      },
    ],
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://autommensor.in" },
  { name: "All Products", url: "https://autommensor.in/all-products" },
];

export default function AllProductsPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <Navbar />
      <AllProductsClient />
      <Footer />
    </>
  );
}
