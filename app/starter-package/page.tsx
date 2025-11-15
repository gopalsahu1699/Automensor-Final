import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import StarterPackageClient from "@/components/Clients/StarterPackageClient";

export const metadata: Metadata = {
  title: "Smart Home Starter Package | AUTOMENSOR - Affordable Home Automation",
  description: "Get started with AUTOMENSOR's affordable Smart Home Starter Package. Smart lighting, mobile control, energy tracking, security sensors, and professional installation. 10% off first installation!",
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
    title: "Smart Home Starter Package | AUTOMENSOR",
    description: "Transform your home with our affordable Smart Home Starter Package - Smart lighting, security, and energy savings",
    url: "https://automensor.com/starter-package",
    type: "website",
    images: [
      {
        url: "https://automensor.com/og-image-starter.jpg",
        width: 1200,
        height: 630,
        alt: "AUTOMENSOR Smart Home Starter Package",
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
  { name: "Home", url: "https://automensor.com" },
  { name: "Starter Package", url: "https://automensor.com/starter-package" },
];

export default function StarterPackagePage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <StarterPackageClient />
    </>
  );
}
