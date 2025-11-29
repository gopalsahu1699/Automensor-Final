import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import StarterPackageClient from "@/components/Clients/StarterPackageClient";

export const metadata: Metadata = {
  title: "Smart Home Starter Package | autommensor - Affordable Home Automation",
  description: "Get started with autommensor's affordable Smart Home Starter Package. Smart lighting, mobile control, energy tracking, security sensors, and professional installation. 10% off first installation!",
  keywords: [
    "starter package",
    "affordable smart home",
    "home automation package",
    "smart lighting",
    "home security",
    "energy management",
    "beginner automation",
    "smart home installation",
  ],
  openGraph: {
    title: "Smart Home Starter Package | autommensor",
    description: "Transform your home with our affordable Smart Home Starter Package - Smart lighting, security, and energy savings",
    url: "https://autommensor.in/starter-package",
    type: "website",
    images: [
      {
        url: "https://autommensor.in/og-image-starter.jpg",
        width: 1200,
        height: 630,
        alt: "autommensor Smart Home Starter Package",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://autommensor.in" },
  { name: "Starter Package", url: "https://autommensor.in/starter-package" },
];

export default function StarterPackagePage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <StarterPackageClient />
    </>
  );
}
