import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OrganizationSchema } from "@/components/StructuredData";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2563eb",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://autommensor.in"),
  title: {
    default: "Autommensor - Smart Home Automation Bilaspur Raipur | Best Automation Company",
    template: "%s | Autommensor - Smart Home Automation Bilaspur Raipur",
  },
  description: "Leading smart home automation company in Bilaspur and Raipur, Chhattisgarh. Transform your home with Alexa/Google control, smart lighting, security, and IoT solutions. Trusted by 200+ families with a 10-Year Warranty. Best automation services in CG.",
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
    "hotel automation system Chhattisgarh"
  ],
  authors: [{ name: "Autommensor Automation", url: "https://autommensor.in" }],
  creator: "Autommensor Automation",
  publisher: "Autommensor Automation",
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
  verification: {
    google: 'google5722deaa13644eaa',
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://autommensor.in",
    siteName: "Autommensor Automation",
    title: "Autommensor - Best Home Automation Company in Bilaspur & Raipur",
    description:
      "Transform your home with intelligent automation. We provide smart lighting, security, and control solutions in Bilaspur, Raipur, and across Chhattisgarh.",
    images: [
      {
        url: "https://autommensor.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Autommensor Smart Home Automation Bilaspur Raipur",
        type: "image/jpeg",
      },
      {
        url: "https://autommensor.in/og-image-square.jpg",
        width: 800,
        height: 800,
        alt: "Autommensor Automation Logo",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@autommensor",
    creator: "@autommensor",
    title: "Autommensor - Smart Home Automation Bilaspur Raipur",
    description: "Leading home automation solutions in Bilaspur, Raipur & Chhattisgarh.",
    images: {
      url: "https://autommensor.in/og-image.jpg",
      alt: "Autommensor Automation",
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Autommensor",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
  other: {
    "geo.region": "IN-CT",
    "geo.placename": "Bilaspur",
    "geo.position": "22.0797;82.1409",
    "ICBM": "22.0797, 82.1409"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Character Set and Compatibility */}
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* App Configuration */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* Preconnect to External Domains for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
        />
        <link
          rel="preconnect"
          href="https://www.google-analytics.com"
        />

        {/* Google Analytics */}
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
                    'allow_google_signals': true,
                    'allow_ad_personalization_signals': true
                  });
                `,
              }}
            />
          </>
        )}

        <Script
          id="json-ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "HomeAndConstructionBusiness",
                name: "Autommensor Automation - Bilaspur",
                image: [
                  "https://autommensor.in/logo.png",
                  "https://autommensor.in/og-image.jpg"
                ],
                "@id": "https://autommensor.in/#bilaspur",
                url: "https://autommensor.in",
                telephone: "+91-8718847083",
                email: "contact@autommensor.in",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Vyapar Vihar Rd, Talapara",
                  addressLocality: "Bilaspur",
                  addressRegion: "Chhattisgarh",
                  postalCode: "495001",
                  addressCountry: "IN"
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 22.0797,
                  longitude: 82.1409
                },
                openingHoursSpecification: [
                  {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday"
                    ],
                    opens: "09:00",
                    closes: "20:00"
                  }
                ],
                areaServed: [
                  { "@type": "City", name: "Bilaspur" },
                  { "@type": "Place", name: "Vyapar Vihar" },
                  { "@type": "Place", name: "Talapara" },
                  { "@type": "Place", name: "Civil Lines" },
                  { "@type": "Place", name: "Sarkanda" },
                  { "@type": "Place", name: "Nehru Nagar" }
                ],
                priceRange: "₹₹"
              },
              {
                "@context": "https://schema.org",
                "@type": "HomeAndConstructionBusiness",
                name: "Autommensor Automation - Raipur",
                image: [
                  "https://autommensor.in/logo.png",
                  "https://autommensor.in/og-image.jpg"
                ],
                "@id": "https://autommensor.in/#raipur",
                url: "https://autommensor.in",
                telephone: "+91-8085782471",
                email: "contact@autommensor.in",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Centre Mall, Orange Eye Resort, Mandi Rd, Piche, Devendra Nagar",
                  addressLocality: "Raipur",
                  addressRegion: "Chhattisgarh",
                  postalCode: "492004",
                  addressCountry: "IN"
                },
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 21.2514,
                  longitude: 81.6296
                },
                openingHoursSpecification: [
                  {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday"
                    ],
                    opens: "09:00",
                    closes: "20:00"
                  }
                ],
                areaServed: [
                  { "@type": "City", name: "Raipur" },
                  { "@type": "Place", name: "Shankar Nagar" },
                  { "@type": "Place", name: "Devendra Nagar" },
                  { "@type": "Place", name: "Civil Lines" },
                  { "@type": "Place", name: "Pandri" },
                  { "@type": "Place", name: "Telibandha" },
                  { "@type": "Place", name: "Naya Raipur" }
                ],
                priceRange: "₹₹"
              }
            ]),
          }}
        />

        {/* SEO Meta Tags */}
        <meta name="subject" content="Smart Home Automation" />
        <meta name="copyright" content="autommensor" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="autommensor" />

        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-SV8F3VF6NX"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-SV8F3VF6NX');
    `,
        }} />
      </head>
      <body className={outfit.className}>
        {/* Structured Data Component */}
        <OrganizationSchema />

        {/* Context Provider (No Auth) */}

        {/* Main Content */}
        {children}
        <WhatsAppFloat />
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
            },
            error: {
              duration: 4000,
            },
          }}
        />

        {/* React Toastify Container */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          limit={3}
        />

      </body>
    </html>
  );
}
