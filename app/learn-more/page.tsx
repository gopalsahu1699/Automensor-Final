import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import LearnMoreClient from "@/components/Clients/LearnMoreClient";

export const metadata: Metadata = {
  title: "Learn More About Smart Home Automation | autommensor",
  description: "Discover how autommensor smart home automation works. Explore features, technical specifications, and benefits including energy savings, security, and convenience.",
  keywords: [
    "smart home features",
    "home automation benefits",
    "smart home technology",
    "automation specifications",
    "home automation guide",
    "energy savings",
    "home security",
    "autommensor features",
  ],
  openGraph: {
    title: "Learn More About Smart Home Automation | autommensor",
    description: "Transform your home with autommensor smart automation. Features, specs, and benefits explained.",
    url: "https://autommensor.in/learn-more",
    type: "website",
    images: [
      {
        url: "https://autommensor.in/og-image-learn.jpg",
        width: 1200,
        height: 630,
        alt: "autommensor Smart Home Automation",
      },
    ],
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://autommensor.in" },
  { name: "Learn More", url: "https://autommensor.in/learn-more" },
];

export default function LearnMorePage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <LearnMoreClient />
    </>
  );
}
