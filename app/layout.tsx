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
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://autommensor.in"),
  title: "autommensor - Smart Home Automation Made in India",
  description:
    "Intelligent home automation solutions for modern living with smart devices and IoT technology. Choose from Basic, Standard, and Advanced packages for homes, villas, and hotels.",
  keywords: [
    "smart home",
    "home automation",
    "IoT",
    "smart devices",
    "home control",
    "made in India",
    "automation packages",
    "smart villa",
    "smart hotel room",
    "home automation India",
    "smart living",
    "home automation solutions",
  ],
  authors: [{ name: "autommensor", url: "https://autommensor.in" }],
  creator: "autommensor",
  publisher: "autommensor",
  category: "Technology",
  classification: "Smart Home Technology",
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
    google: 'google-site-verification: google5722deaa13644eaa.html',
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://autommensor.in",
    siteName: "autommensor",
    title: "autommensor - Smart Home Automation",
    description:
      "Intelligent home automation solutions for modern living with smart IoT devices",
    images: [
      {
        url: "https://autommensor.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "autommensor Smart Home Automation",
        type: "image/jpeg",
      },
      {
        url: "https://autommensor.in/og-image-square.jpg",
        width: 800,
        height: 800,
        alt: "autommensor",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@autommensor",
    creator: "@autommensor",
    title: "autommensor - Smart Home Automation",
    description: "Intelligent home automation solutions made in India",
    images: {
      url: "https://autommensor.in/og-image.jpg",
      alt: "autommensor",
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "autommensor",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
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

        {/* Manifest and App Configuration */}
        <link rel="manifest" href="/manifest.json" />
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

        {/* JSON-LD Structured Data for Rich Snippets */}
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "autommensor",
              url: "https://autommensor.in",
              logo: "https://autommensor.in/logo.png",
              description:
                "Intelligent home automation solutions for modern living",
              email: "autommensor@gmail.com",
              telephone: "+91-8718847083",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              sameAs: [
                "https://www.facebook.com/autommensor",
                "https://www.twitter.com/autommensor",
                "https://www.instagram.com/autommensor",
                "https://www.linkedin.com/company/autommensor",
              ],
            }),
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
