import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import PrivacyPolicyClient from "@/components/PrivacyPolicyClient";

export const metadata: Metadata = {
  title: "Privacy Policy | AUTOMENSOR - Your Data Protection",
  description: "Learn how AUTOMENSOR protects your privacy and personal data. Our comprehensive privacy policy outlines data collection, protection measures, and your privacy rights.",
  keywords: [
    "privacy policy",
    "data protection",
    "privacy rights",
    "GDPR",
    "data security",
    "personal information",
    "smart home privacy",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy | AUTOMENSOR",
    description: "How we protect and handle your personal data",
    url: "https://automensor.com/privacy-policy",
    type: "website",
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://automensor.com" },
  { name: "Privacy Policy", url: "https://automensor.com/privacy-policy" },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <PrivacyPolicyClient />
    </>
  );
}
