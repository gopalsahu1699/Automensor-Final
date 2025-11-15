export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AUTOMENSOR",
    url: "https://automensor.com",
    logo: "https://automensor.com/logo.png",
    description: "Smart home automation solutions made in India",
    foundingDate: "2024",
    sameAs: [
      "https://twitter.com/automensor",
      "https://facebook.com/automensor",
      "https://linkedin.com/company/automensor",
      "https://youtube.com/@automensor",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "support@automensor.com",
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
    name: "AUTOMENSOR",
    image: "https://automensor.com/logo.png",
    description: "Smart home automation solutions made in India",
    url: "https://automensor.com",
    telephone: "+91-XXXXXXXXXX",
    email: "support@automensor.com",
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
      name: "AUTOMENSOR",
    },
    image: "https://automensor.com/product-image.jpg",
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
      url: "https://automensor.com/estimate-cost-calculator",
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
          text: "AUTOMENSOR offers three packages - Basic starting from ₹15,000, Standard from ₹40,000, and Advanced from ₹70,000. Use our cost calculator for exact pricing.",
        },
      },
      {
        "@type": "Question",
        name: "Is AUTOMENSOR made in India?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, AUTOMENSOR is 100% made in India with world-class technology and Indian innovation.",
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
