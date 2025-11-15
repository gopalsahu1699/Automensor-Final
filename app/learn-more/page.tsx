import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import LearnMoreClient from "@/components/Clients/LearnMoreClient";

export const metadata: Metadata = {
  title: "Learn More About Smart Home Automation | AUTOMENSOR",
  description: "Discover how AUTOMENSOR smart home automation works. Explore features, technical specifications, and benefits including energy savings, security, and convenience.",
  keywords: [
    "smart home features",
    "home automation benefits",
    "smart home technology",
    "automation specifications",
    "home automation guide",
    "energy savings",
    "home security",
    "AUTOMENSOR features",
  ],
  openGraph: {
    title: "Learn More About Smart Home Automation | AUTOMENSOR",
    description: "Transform your home with AUTOMENSOR smart automation. Features, specs, and benefits explained.",
    url: "https://automensor.com/learn-more",
    type: "website",
    images: [
      {
        url: "https://automensor.com/og-image-learn.jpg",
        width: 1200,
        height: 630,
        alt: "AUTOMENSOR Smart Home Automation",
      },
    ],
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://automensor.com" },
  { name: "Learn More", url: "https://automensor.com/learn-more" },
];

export default function LearnMorePage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <LearnMoreClient />
    </>
  );
}
