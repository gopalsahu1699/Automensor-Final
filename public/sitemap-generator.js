const fs = require("fs");
const path = require("path");

const SITE_URL = "https://automensor.com";

const pages = [
  "/",
  "/all-products",
  "/about-us",
  "/contact-us",
  "/estimate-cost-calculator",
  "/estimate-cost-calculator/estimated-cost-home",
  "/estimate-cost-calculator/estimated-cost-villa",
  "/estimate-cost-calculator/estimated-cost-hotel-room",
  "/privacy-policy",
  "/terms-of-service",
  "/made-in-india",
  "/gallery",
  "/help",
];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages
  .map(
    (page) => `
  <url>
    <loc>${SITE_URL}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${page === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

  fs.writeFileSync(path.join(__dirname, "sitemap.xml"), sitemap);
  console.log("✅ Sitemap generated successfully!");
};

generateSitemap();
