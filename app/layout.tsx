import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { OrganizationSchema, SiteNavigationSchema } from "@/components/StructuredData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-outfit",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
});

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0b1323",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://autommensor.in"),
  title: {
    default: "AUTOMMENSOR | Premium Wireless Home Automation in Chhattisgarh",
    template: "%s | AUTOMMENSOR",
  },
  description: "India's most trusted smart home automation company in Bilaspur & Raipur, Chhattisgarh. 10-Year Warranty • 200+ Happy Families • Alexa & Google Home Control • Zero Rewiring. Get a free site visit today!",
  keywords: [
    "smart home automation Bilaspur",
    "home automation Raipur",
    "smart home Chhattisgarh",
    "automation company Bilaspur",
    "smart home installers Raipur",
    "Home Automation Company in Chhattisgarh",
    "Smart Home Installation Services",
    "Best Home Automation System Raipur",
    "Security System Dealers Bilaspur",
    "Automatic Lighting Control Chhattisgarh",
    "Smart Door Lock Dealers Raipur",
    "Home Theatre Installation Bilaspur",
    "Wireless Home Automation Chhattisgarh",
    "smart home devices Bilaspur",
    "video door phone dealers Raipur",
    "digital door lock Bilaspur",
    "curtain automation Raipur",
    "smart lighting control Chhattisgarh",
    "Alexa home automation Bilaspur",
    "Google Home automation Raipur",
    "best home automation company Bilaspur",
    "smart villa automation Raipur",
    "hotel automation system Chhattisgarh",
  ],
  authors: [{ name: "Autommensor", url: "https://autommensor.in" }],
  creator: "Autommensor",
  publisher: "Autommensor",
  category: "Technology",
  classification: "Smart Home Technology Service",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://autommensor.in",
    languages: {
      "en-IN": "https://autommensor.in",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://autommensor.in",
    siteName: "AUTOMMENSOR",
    title: "AUTOMMENSOR | Premium Wireless Home Automation in Chhattisgarh",
    description: "Transform your home with intelligent automation. Smart lighting, security, and control solutions in Bilaspur, Raipur, and across Chhattisgarh.",
    images: [
      {
        url: "https://res.cloudinary.com/dn9rohd6h/image/upload/v1762664809/home_kjbuox.webp",
        width: 1200,
        height: 630,
        alt: "Autommensor Smart Home Automation Bilaspur Raipur",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AUTOMMENSOR | Smart Home Automation Bilaspur Raipur",
    description: "Leading home automation solutions in Bilaspur, Raipur & Chhattisgarh.",
    images: {
      url: "https://res.cloudinary.com/dn9rohd6h/image/upload/v1762664809/home_kjbuox.webp",
      alt: "Autommensor Automation",
    },
  },
  other: {
    "geo.region": "IN-CT",
    "geo.placename": "Bilaspur",
    "geo.position": "22.0797;82.1409",
    "ICBM": "22.0797, 82.1409",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

        {GA_TRACKING_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
              id="google-analytics-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    'send_page_view': true,
                    'anonymize_ip': true,
                  });
                `,
              }}
            />
          </>
        )}


      </head>
      <body className={`${outfit.variable} ${plusJakarta.variable} font-jakarta text-body-md`}>
        <OrganizationSchema />
        <SiteNavigationSchema />
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#18202f",
              color: "#dbe2f8",
              border: "1px solid rgba(255,255,255,0.08)",
            },
          }}
        />
      </body>
    </html>
  );
}
