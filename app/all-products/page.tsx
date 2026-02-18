import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import AllProductsClient from "@/components/Clients/AllProductsClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Smart Home Products Directory | Autommensor Bilaspur Raipur",
  description:
    "Explore our range of smart home products in Bilaspur and Raipur. From digital door locks and video door phones to smart switches and sensors. Best prices in Chhattisgarh.",
  keywords: [
    "smart home products Bilaspur",
    "buy smart switches Raipur",
    "digital door lock price Chhattisgarh",
    "video door phone dealers Bilaspur",
    "smart curtains cost Raipur",
    "motion sensors for home Bilaspur",
    "wifi touch switches Raipur",
    "smart home devices shop Bilaspur",
    "automation sensors Chhattisgarh",
    "smart gate opener price Raipur"
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
