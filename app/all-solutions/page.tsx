import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import AllSolutionsClient from "@/components/solutions/AllSolutionsClient";


export const metadata: Metadata = {
  title: "Autommensor | Premium Solutions Gallery",
  description:
    "Transform your living spaces with intelligent wireless technology. Discover a seamless blend of high-end design and futuristic automation tailored for your modern lifestyle.",
  alternates: {
    canonical: "https://autommensor.in/all-solutions",
  },
  openGraph: {
    title: "Complete Smart Home Solutions Range | Autommensor",
    description:
      "Browse our catalog of premium home automation devices. Smart living solutions tailored for Indian homes.",
    url: "https://autommensor.in/all-solutions",
    images: ["/assets/og-products.jpg"],
  },
};

export default function AllSolutionsPage() {
  return (
    <>
      <div className="pt-28">
        <BreadcrumbSchema
          items={[
            { name: "Home", url: "/" },
            { name: "All Solutions", url: "/all-solutions" },
          ]}
        />
        <AllSolutionsClient />
      </div>
    </>
  );
}
