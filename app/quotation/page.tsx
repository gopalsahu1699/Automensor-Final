import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import QuotationClient from "@/components/Clients/QuotationClient";

export const metadata: Metadata = {
  title: "Request Quote | Smart Home Automation | autommensor",
  description: "Get a personalized quote for your smart home automation system. Free consultation and accurate pricing from autommensor.",
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
    title: "Request Your Personalized Quote | autommensor",
    description: "Get custom smart home automation pricing tailored to your needs",
    url: "https://autommensor.in/quotation",
    type: "website",
    images: [
      {
        url: "https://autommensor.in/og-image-quote.jpg",
        width: 1200,
        height: 630,
        alt: "autommensor Quotation",
      },
    ],
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://autommensor.in" },
  { name: "Quotation", url: "https://autommensor.in/quotation" },
];

export default function QuotationPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <QuotationClient />
    </>
  );
}
