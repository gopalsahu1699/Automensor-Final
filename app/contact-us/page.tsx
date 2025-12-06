import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import ContactClient from "@/components/Clients/ContactClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact Autommensor - Home Automation Bilaspur Raipur",
  description: "Contact Autommensor Automation for home automation services in Bilaspur, Raipur & Chhattisgarh. Free consultation, Alexa Google smart home installation, system support.",
  keywords: [
    "home automation Bilaspur",
    "home automation Raipur",
    "contact home automation Raipur",
    "home automation services Bilaspur",
    "Alexa Google installation Raipur Bilaspur",
    "smart home support Chhattisgarh",
    "Autommensor Automation contact",
    "home automation consultation Raipur",
    "smart home installation Bilaspur",
    "Autommensor Bilaspur Raipur",
  ],
  openGraph: {
    title: "Contact Autommensor - Home Automation Bilaspur Raipur",
    description: "Get free smart home consultation in Bilaspur Raipur. Home automation system installation, Alexa Google setup, 24/7 support.",
    url: "https://autommensor.in/contact-us",
    type: "website",
    images: [
      {
        url: "https://autommensor.in/og-image-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Autommensor Home Automation Bilaspur Raipur",
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
