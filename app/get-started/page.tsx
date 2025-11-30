// app/get-started/page.tsx
import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GetStartedClient from "@/components/Clients/GetStartedClient";

export const metadata: Metadata = {
  title: "Get Started | autommensor - Smart Home Automation Guide",
  description: "Start your smart home journey with autommensor. Learn how to automate lights, fans, ACs, gates & more in 5 simple steps. Free consultation available.",
  keywords: [
    "get started autommensor",
    "smart home automation guide",
    "home automation setup",
    "smart home installation",
    "automate my home",
    "smart home beginner guide",
    "home automation india",
  ],
  openGraph: {
    title: "Get Started with autommensor - Smart Home Automation",
    description: "Step-by-step guide to automate your home with autommensor. Control lights, fans, ACs & gates from your phone.",
    url: "https://autommensor.in/get-started",
    type: "website",
    images: [
      {
        url: "https://autommensor.in/og-image-get-started.jpg",
        width: 1200,
        height: 630,
        alt: "Get Started with autommensor Smart Home Automation",
      },
    ],
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://autommensor.in" },
  { name: "Get Started", url: "https://autommensor.in/get-started" },
];

export default function GetStartedPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <Navbar />
      <GetStartedClient />
      <Footer />
    </>
  );
}
