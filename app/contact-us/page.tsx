import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";
import ContactClient from "@/components/Clients/ContactClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact Autommensor Automation | Smart Home Inquiry Bilaspur Raipur",
  description:
    "Get in touch with Autommensor Automation for a free home automation demo in Bilaspur and Raipur. Contact us for smart home quotes, installation, and support in Chhattisgarh.",
  keywords: [
    "contact home automation Bilaspur",
    "smart home dealer Raipur",
    "automation enquiry Chhattisgarh",
    "Autommensor contact number",
    "home automation shop Bilaspur",
    "smart home showroom Raipur",
    "free automation demo Chhattisgarh",
    "smart lock price Bilaspur",
    "home automation quote Raipur",
    "schedule site visit Bilaspur"
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
