import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import TermsOfServiceClient from "@/components/Clients/TermsOfServiceClient";

export const metadata: Metadata = {
  title: "Terms of Service | autommensor",
  description: "Read autommensor's Terms of Service. Understand our policies, user responsibilities, intellectual property rights, and legal terms for using our smart home automation services.",
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
    title: "Terms of Service | autommensor",
    description: "Legal terms and conditions for autommensor services",
    url: "https://autommensor.in/terms-of-service",
    type: "website",
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://autommensor.in" },
  { name: "Terms of Service", url: "https://autommensor.in/terms-of-service" },
];

export default function TermsOfServicePage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <TermsOfServiceClient />
    </>
  );
}
