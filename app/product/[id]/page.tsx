import type { Metadata } from "next";
import { BreadcrumbSchema, ProductSchema } from "@/components/StructuredData";
import ProductClient from "@/components/Clients/ProductClient";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Await params in Next.js 15+
  const { id } = await params;

  return {
    title: "Product | AUTOMENSOR - Smart Home Automation",
    description: "Browse our smart home automation products and solutions.",
    openGraph: {
      title: "Product | AUTOMENSOR",
      description: "Explore smart home automation products",
      url: `https://automensor.com/product/${id}`,
      type: "website",
    },
  };
}

const breadcrumbs = [
  { name: "Home", url: "https://automensor.com" },
  { name: "Products", url: "https://automensor.com/products" },
  { name: "Product Detail", url: "https://automensor.com/product/[id]" },
];

export default async function ProductPage({ params }: Props) {
  // Await params in Next.js 15+
  const { id } = await params;

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ProductSchema />
      <ProductClient productId={id} />
    </>
  );
}
