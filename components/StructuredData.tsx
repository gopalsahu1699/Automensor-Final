export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "autommensor",
    url: "https://autommensor.in",
    logo: "https://autommensor.in/logo.png",
    description: "Smart home automation solutions made in India",
    foundingDate: "2024",
    sameAs: [
      "https://twitter.com/autommensor",
      "https://facebook.com/autommensor",
      "https://linkedin.com/company/autommensor",
      "https://youtube.com/@autommensor",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "support@autommensor.in",
      telephone: "+91-XXXXXXXXXX",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Your Street Address",
      addressLocality: "Your City",
      addressRegion: "Your State",
      postalCode: "Your Postal Code",
      addressCountry: "IN",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "autommensor",
    image: "https://autommensor.in/logo.png",
    description: "Smart home automation solutions made in India",
    url: "https://autommensor.in",
    telephone: "+91-XXXXXXXXXX",
    email: "support@autommensor.in",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Your Street Address",
      addressLocality: "Your City",
      addressRegion: "Your State",
      postalCode: "Your Postal Code",
      addressCountry: "IN",
    },
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: "IN",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Smart Home Automation Package",
    description: "Complete smart home automation solution with IoT devices",
    brand: {
      "@type": "Brand",
      name: "autommensor",
    },
    image: "https://autommensor.in/product-image.jpg",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: "15000",
      highPrice: "100000",
      availability: "https://schema.org/InStock",
      url: "https://autommensor.in/estimate-cost-calculator",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is smart home automation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Smart home automation is the use of devices and technology to automate your home for convenience, security, and energy efficiency.",
        },
      },
      {
        "@type": "Question",
        name: "How much does smart home automation cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "autommensor offers three packages - Basic starting from ₹15,000, Standard from ₹40,000, and Advanced from ₹70,000. Use our cost calculator for exact pricing.",
        },
      },
      {
        "@type": "Question",
        name: "Is autommensor made in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, autommensor is 100% made in India with world-class technology and Indian innovation.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SiteNavigationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "SiteNavigationElement",
        "position": 1,
        "name": "Products",
        "url": "https://autommensor.in/all-products"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 2,
        "name": "Estimate Cost Calculator",
        "url": "https://autommensor.in/estimate-cost-calculator"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 3,
        "name": "Scene Creation",
        "url": "https://autommensor.in/all-products/scene-creation"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 4,
        "name": "About Us",
        "url": "https://autommensor.in/about-us"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 5,
        "name": "Contact Us",
        "url": "https://autommensor.in/contact-us"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
