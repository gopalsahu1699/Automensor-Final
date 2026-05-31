export function ReviewSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Autommensor - Smart Home Automation Bilaspur",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Rajesh Agrawal" },
        "datePublished": "2025-01-15",
        "reviewRating": { "@type": "Rating", "ratingValue": "5" },
        "reviewBody": "Excellent service! Autommensor transformed our villa in Raipur with smart automation. Local support is outstanding."
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Priya Sharma" },
        "datePublished": "2025-02-20",
        "reviewRating": { "@type": "Rating", "ratingValue": "5" },
        "reviewBody": "The starter package was perfect for our 2BHK in Bilaspur. Installation in just 2 hours!"
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Amit Verma" },
        "datePublished": "2025-03-10",
        "reviewRating": { "@type": "Rating", "ratingValue": "5" },
        "reviewBody": "Best automation company in Chhattisgarh. Fair pricing and the 10-year warranty gives peace of mind."
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
