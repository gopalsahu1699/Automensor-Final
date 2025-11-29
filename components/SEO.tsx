"use client";

import { usePathname } from "next/navigation";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  type?: string;
}

export function SEO({
  title,
  description,
  keywords = [],
  image = "https://autommensor.in/og-image.jpg",
  type = "website",
}: SEOProps) {
  const pathname = usePathname();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://autommensor.in";
  const canonicalUrl = `${siteUrl}${pathname}`;

  return (
    <>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={`${title} | autommensor`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="autommensor" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | autommensor`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@autommensor" />
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
    </>
  );
}
