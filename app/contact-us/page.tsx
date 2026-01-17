import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import ContactClient from "@/components/Clients/ContactClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact Autommensor Automation | Home Automation Bilaspur Raipur",
  description:
    "Contact Autommensor Automation for smart home automation solutions in Bilaspur, Raipur & Chhattisgarh. Free site survey, Alexa & Google Home integration, expert installation and support.",
  keywords: [
    "contact autommensor automation",
    "home automation contact Bilaspur",
    "home automation contact Raipur",
    "smart home automation Chhattisgarh",
    "Alexa Google home installation Bilaspur",
    "home automation services Raipur Bilaspur",
    "Autommensor Automation contact number",
    "smart home company Chhattisgarh",
    "home automation consultation Bilaspur",
  ],
  openGraph: {
    title: "Contact Autommensor Automation - Smart Home Experts",
    description:
      "Get in touch with Autommensor Automation for smart home solutions in Bilaspur, Raipur & Chhattisgarh. Free consultation and site survey available.",
    url: "https://autommensor.in/contact-us",
    type: "website",
    images: [
      {
        url: "https://autommensor.in/og-image-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Autommensor Automation - Home Automation Bilaspur Raipur",
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
