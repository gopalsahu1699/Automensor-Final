import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import ContactClient from "@/components/Clients/ContactClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact Us | autommensor - Smart Home Automation Support",
  description: "Get in touch with autommensor's expert team. We're here to help with your smart home automation questions, free consultation, and 24/7 support.",
  keywords: [
    "contact autommensor",
    "smart home support",
    "customer service",
    "automation consultation",
    "contact us",
    "customer support",
    "get in touch",
  ],
  openGraph: {
    title: "Contact autommensor - Get Expert Help",
    description: "Reach out to our team for smart home automation solutions and support",
    url: "https://autommensor.in/contact-us",
    type: "website",
    images: [
      {
        url: "https://autommensor.in/og-image-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact autommensor",
      },
    ],
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://autommensor.in" },
  { name: "Contact Us", url: "https://autommensor.in/contact-us" },
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <Navbar />
      <ContactClient />
      <Footer />
    </>
  );
}
