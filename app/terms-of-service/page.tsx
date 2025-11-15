import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import TermsOfServiceClient from "@/components/TermsOfServiceClient";

export const metadata: Metadata = {
  title: "Terms of Service | AUTOMENSOR",
  description: "Read AUTOMENSOR's Terms of Service. Understand our policies, user responsibilities, intellectual property rights, and legal terms for using our smart home automation services.",
  keywords: [
    "terms of service",
    "legal agreement",
    "user agreement",
    "terms and conditions",
    "smart home terms",
    "service agreement",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Terms of Service | AUTOMENSOR",
    description: "Legal terms and conditions for AUTOMENSOR services",
    url: "https://automensor.com/terms-of-service",
    type: "website",
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://automensor.com" },
  { name: "Terms of Service", url: "https://automensor.com/terms-of-service" },
];

export default function TermsOfServicePage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <TermsOfServiceClient />
    </>
  );
}
