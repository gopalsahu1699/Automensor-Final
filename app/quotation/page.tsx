import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import QuotationClient from "@/components/Clients/QuotationClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free Home Automation Quote Bilaspur Raipur | Autommensor",
  description: "Get free home automation quote in Bilaspur Raipur. Instant smart home pricing for 2BHK/3BHK, Alexa Google installation costs Chhattisgarh.",
  keywords: [
    "home automation quote Bilaspur",
    "home automation quote Raipur",
    "free smart home quote Chhattisgarh",
    "Alexa Google installation quote Raipur",
    "smart home quotation Bilaspur",
    "2BHK home automation price quote",
    "3BHK smart home quote Raipur",
    "Autommensor free quote",
    "home automation cost estimate Chhattisgarh",
    "get smart home quote Bilaspur Raipur",
  ],
  openGraph: {
    title: "Free Home Automation Quote - Bilaspur Raipur",
    description: "Instant quote for smart home automation in Bilaspur Raipur. 2BHK/3BHK pricing, Alexa Google installation costs.",
    url: "https://autommensor.in/quotation",
    type: "website",
    images: [
      {
        url: "https://autommensor.in/og-image-quote.jpg",
        width: 1200,
        height: 630,
        alt: "Free Home Automation Quote Bilaspur Raipur Autommensor",
      },
    ],
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://autommensor.in" },
  { name: "Get Quote", url: "https://autommensor.in/quotation" },
];

export default function QuotationPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <Navbar />
      <QuotationClient />
      <Footer />
    </>
  );
}
