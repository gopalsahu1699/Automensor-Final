import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import AllProductsClient from "@/components/products/AllProductsClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getActiveProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Smart Home Products Directory | Autommensor Bilaspur Raipur",
  description:
    "Explore our complete range of smart home automation products including digital door locks, smart panels, active sensors, and motorized curtains available in Bilaspur and Raipur.",
  alternates: {
    canonical: "https://autommensor.in/all-products",
  },
  openGraph: {
    title: "Complete Smart Home Product Range | Autommensor",
    description:
      "Browse our catalog of premium home automation devices. Smart living solutions tailored for Indian homes.",
    url: "https://autommensor.in/all-products",
    images: ["/assets/og-products.jpg"],
  },
};

export const dynamic = 'force-dynamic';

export default async function AllProductsPage() {
  const products = await getActiveProducts();

  return (
    <>
      <Navbar />
      <div className="pt-20"> {/* Add padding for fixed navbar */}
        <BreadcrumbSchema
          items={[
            { name: "Home", url: "/" },
            { name: "All Products", url: "/all-products" },
          ]}
        />
        <AllProductsClient initialProducts={products} />
      </div>
      <Footer />
    </>
  );
}
