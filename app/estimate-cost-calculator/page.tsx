import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import EstimateCostCalculatorClient from "@/components/Clients/EstimateCostCalculatorClient";

export const metadata: Metadata = {
  title: "Smart Home Automation Cost Calculator | AUTOMENSOR",
  description: "Calculate your smart home automation costs instantly. Choose from Basic, Standard, and Advanced packages. Get personalized estimates for homes, villas, and hotels.",
  keywords: [
    "cost calculator",
    "automation pricing",
    "smart home cost",
    "home automation packages",
    "smart home price estimation",
  ],
  openGraph: {
    title: "Smart Home Automation Cost Calculator",
    description: "Calculate your smart home automation costs instantly",
    url: "https://autommensor.in/estimate-cost-calculator",
    type: "website",
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://autommensor.in" },
  { name: "Estimate Cost", url: "https://autommensor.in/estimate-cost-calculator" },
];

export default function EstimateCostCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <EstimateCostCalculatorClient />
    </>
  );
}
