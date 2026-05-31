# Fix navbar overlap on remaining pages

The fixed navbar is ~80px tall. Some pages still have insufficient top padding.

Replace these exact strings:

1. app/all-solutions/page.tsx line 25:
   `pt-20` → `pt-28`

2. components/Clients/ContactClient.tsx line 40:
   `pt-20` → `pt-28`

3. components/home/HeroSection.jsx line 15:
   `pt-24` → `pt-28`

4. app/faq/page.jsx line 68:
   `py-16` → `pt-28 pb-16`

5. app/privacy-policy/page.tsx line 116:
   `<main className="bg-white min-h-screen">` → `<main className="bg-white min-h-screen pt-28">`

6. app/terms-of-service/page.tsx line 161:
   `<main className="bg-white min-h-screen">` → `<main className="bg-white min-h-screen pt-28">`

7. Delete .next/types folder: rm -rf .next/types

8. Run npx tsc --noEmit after
9. Do NOT git push
