import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import QuotationClient from "@/components/QuotationClient";

export const metadata: Metadata = {
  title: "Request Quote | Smart Home Automation | AUTOMENSOR",
  description: "Get a personalized quote for your smart home automation system. Free consultation and accurate pricing from AUTOMENSOR.",
  keywords: [
    "quotation",
    "quote request",
    "smart home quote",
    "automation pricing",
    "free quote",
    "home automation cost",
    "installation quote",
  ],
  openGraph: {
    title: "Request Your Personalized Quote | AUTOMENSOR",
    description: "Get custom smart home automation pricing tailored to your needs",
    url: "https://automensor.com/quotation",
    type: "website",
    images: [
      {
        url: "https://automensor.com/og-image-quote.jpg",
        width: 1200,
        height: 630,
        alt: "AUTOMENSOR Quotation",
      },
    ],
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://automensor.com" },
  { name: "Quotation", url: "https://automensor.com/quotation" },
];

export default function QuotationPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <QuotationClient />
    </>
  );
}
