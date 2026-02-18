import type { Metadata } from "next";
import Script from "next/script";
import { BreadcrumbSchema } from "@/components/StructuredData";
import AboutClient from "@/components/Clients/AboutClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Autommensor Automation - Best Home Automation in Bilaspur & Raipur",
  description: "Learn about Autommensor Automation, the leading smart home company in Bilaspur and Raipur. We offer expert installation of Alexa, Google Home, and IoT solutions across Chhattisgarh.",
  keywords: [
    "home automation company Bilaspur",
    "smart home installers Raipur",
    "about Autommensor",
    "automation services Chhattisgarh",
    "best home automation Bilaspur",
    "IoT experts Raipur",
    "home cinema installation Bilaspur",
    "smart office solutions Raipur",
    "Autommensor team",
    "home automation consultation Bilaspur"
  ],
  openGraph: {
    title: "About Autommensor - Smart Home Automation Bilaspur Raipur",
    description: "Leading home automation company serving Bilaspur, Raipur and Chhattisgarh with smart home solutions, Alexa & Google Home integration.",
    url: "https://autommensor.in/about-us",
    type: "website",
    images: [
      {
        url: "https://autommensor.in/og-image-about.jpg",
        width: 1200,
        height: 630,
        alt: "Autommensor Automation - Home Automation Bilaspur Raipur",
      },
    ],
  },
};

const breadcrumbs = [
  { name: "Home", url: "https://autommensor.in" },
  { name: "About Us", url: "https://autommensor.in/about-us" },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <section>
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Do you provide home automation services in Bilaspur?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, Autommensor is a leading home automation company based in Bilaspur, offering complete smart home solutions and installation services."
                  }
                },
                {
                  "@type": "Question",
                  name: "Do you serve Raipur and other parts of Chhattisgarh?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Absolutely! We provide home automation services in Raipur and throughout Chhattisgarh, including site visits and installation."
                  }
                },
                {
                  "@type": "Question",
                  name: "What brands of smart home devices do you use?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We use high-quality, reliable smart home devices that work seamlessly with Amazon Alexa and Google Home for voice control."
                  }
                }
              ]
            })
          }}
        />
      </section>
      <Navbar />
      <AboutClient />
      <Footer />
    </>
  );
}
