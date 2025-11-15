import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import AllProductsClient from "@/components/AllProductsClient";

export const metadata: Metadata = {
  title: "All Smart Home Automation Products | AUTOMENSOR",
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
    title: "All Smart Home Automation Products | AUTOMENSOR",
    description: "Complete range of smart home automation products and devices",
    url: "https://automensor.com/all-products",
    type: "website",
    images: [
      {
        url: "https://automensor.com/og-image-products.jpg",
        width: 1200,
        height: 630,
        alt: "AUTOMENSOR Products",
      },
    ],
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://automensor.com" },
  { name: "All Products", url: "https://automensor.com/all-products" },
];

export default function AllProductsPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <AllProductsClient />
    </>
  );
}
