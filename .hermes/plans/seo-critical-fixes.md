# SEO Critical Fixes - Automensor

Project path (via junction): C:\auto_proj
Real path: D:\web software developement\automensor\Automensor-Final

Fix ALL of the following 7 items. Do NOT run git push or git commit. After all fixes, run `npx tsc --noEmit`.

---

## FIX 1: robots.ts - Unblock important pages

File: app/robots.ts

Replace the ENTIRE file content with:
```tsx
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/admin',
                '/api',
            ],
        },
        sitemap: 'https://autommensor.in/sitemap.xml',
    };
}
```

---

## FIX 2: StructuredData.tsx - Fix placeholder data

File: components/StructuredData.tsx

Fix ALL placeholders in BOTH OrganizationSchema and LocalBusinessSchema:

In OrganizationSchema function:
- telephone: "+91-XXXXXXXXXX" -> "+91-8085782471"
- email: "support@autommensor.in" -> "autommensor@gmail.com"
- sameAs: Remove the sameAs array entirely (contains fake URLs)
- address.streetAddress: "Your Street Address" -> "Seepat, Talapara"
- address.addressLocality: "Your City" -> "Bilaspur"
- address.addressRegion: "Your State" -> "Chhattisgarh"
- address.postalCode: "Your Postal Code" -> "495001"
- contactPoint.telephone: "+91-XXXXXXXXXX" -> "+91-8085782471"
- contactPoint.email: "support@autommensor.in" -> "autommensor@gmail.com"

In LocalBusinessSchema function:
- telephone: "+91-XXXXXXXXXX" -> "+91-8085782471"
- email: "support@autommensor.in" -> "autommensor@gmail.com"
- address.streetAddress: "Your Street Address" -> "Seepat, Talapara"
- address.addressLocality: "Your City" -> "Bilaspur"
- address.addressRegion: "Your State" -> "Chhattisgarh"
- address.postalCode: "Your Postal Code" -> "495001"

In BOTH schemas, update openingHoursSpecification to Mon-Sat 9AM-8PM:
dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
opens: "09:00"
closes: "20:00"

---

## FIX 3: layout.tsx - Remove duplicate schema, fix warranty text

File: app/layout.tsx

Two changes:
1. In <head> section, REMOVE the entire inline <script id="json-ld-organization" ...> block (the dangerouslySetInnerHTML one). Keep ONLY the <OrganizationSchema /> component from StructuredData.tsx. Keep GA scripts.

2. In metadata.description: change "5-Year Warranty" to "10-Year Warranty"

---

## FIX 4: sitemap.ts - Add city pages

File: app/sitemap.ts

Add these additional city URLs to the sitemap array (in addition to existing URLs):
- /home-automation-bilaspur (priority: 0.8)
- /home-automation-raipur (priority: 0.8)
- /home-automation-durg (priority: 0.6)
- /smart-home-bhilai (priority: 0.6)

---

## FIX 5: Home page - Add FAQ schema component

File: app/page.tsx

Add import: import { FAQSchema } from "@/components/StructuredData";
Add <FAQSchema /> inside the return fragment alongside <HomeClient />.

---

## FIX 6: FAQs component - Expand questions for SEO

File: components/home/FAQs.tsx (read first to understand structure)

ADD these questions (keep existing ones):
1. "How much does home automation cost in Bilaspur?"
2. "Do I need to rewire my house for smart home automation?"
3. "Can I control my smart home with Alexa in India?"
4. "What is the price of a video door phone in Bilaspur?"
5. "What areas do you serve in Chhattisgarh?"
6. "Do you offer warranty on home automation systems?"

Write answers that naturally mention Autommensor, Bilaspur, Raipur, Chhattisgarh, 10-year warranty, wireless, free site visit.

---

## FIX 7: Solution detail page - Add Product schema

File: app/solutions/[slug]/page.tsx

Add a <script type="application/ld+json"> Product schema using solution data (name, description, image, price_range, slug). Import Script from 'next/script' if needed.

---

## VERIFICATION:
1. Run: npx tsc --noEmit (fix any errors)
2. Run: npm run build (verify no build errors)
3. Do NOT run git push or git commit
