import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import EstimateCostCalculatorClient from "@/components/Clients/EstimateCostCalculatorClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Home Automation Cost Calculator Bilaspur Raipur | Autommensor",
  description: "Calculate home automation costs in Bilaspur Raipur. Instant smart home pricing for 2BHK/3BHK apartments, villas. Alexa Google installation costs Chhattisgarh.",
  keywords: [
    "home automation cost Bilaspur",
    "home automation cost Raipur",
    "smart home cost calculator Chhattisgarh",
    "home automation price Raipur Bilaspur",
    "Alexa Google installation cost Raipur",
    "smart home packages Bilaspur",
    "home automation system price Chhattisgarh",
    "2BHK smart home cost Raipur",
    "3BHK home automation price Bilaspur",
    "Autommensor cost calculator",
  ],
  openGraph: {
    title: "Home Automation Cost Calculator - Bilaspur Raipur",
    description: "Instant smart home cost calculator for Bilaspur Raipur. See pricing for Alexa, Google Home, lighting, security automation.",
    url: "https://autommensor.in/estimate-cost-calculator",
    type: "website",
    images: [
      {
        url: "https://autommensor.in/og-image-calculator.jpg",
        width: 1200,
        height: 630,
        alt: "Home Automation Cost Calculator Bilaspur Raipur",
      },
    ],
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://autommensor.in" },
  { name: "Cost Calculator", url: "https://autommensor.in/estimate-cost-calculator" },
];

export default function EstimateCostCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <Navbar />
      <EstimateCostCalculatorClient />
      <Footer />
    </>
  );
}
