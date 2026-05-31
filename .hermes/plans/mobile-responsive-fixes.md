# Mobile-First Responsive Redesign - Automensor Homepage

Project path (junction): C:\auto_proj
Real path: D:\web software developement\automensor\Automensor-Final

Make the ENTIRE homepage mobile-first responsive. Mobile screens (320px-768px) are the PRIMARY target. Desktop (1024px+) should look same as current. Fix components that overflow, have oversized text, oversized buttons, oversized padding, or touch targets too small.

Do NOT run git push or git commit. After all fixes, run `npx tsc --noEmit`.

---

## DESIGN SYSTEM REFERENCE

Tailwind breakpoints: sm=640px, md=768px, lg=1024px, xl=1280px

Font sizes from tailwind.config.mjs:
- headline-xl: 80px/88px (DESKTOP ONLY - use on lg+)
- headline-lg: 56px/64px (DESKTOP)
- headline-lg-mobile: 40px/48px (MOBILE)
- headline-md: 36px/44px (DESKTOP)
- headline-sm: 28px/36px
- body-lg: 20px/32px
- body-md: 16px/26px
- label-md: 14px/20px
- label-sm: 12px/16px

Spacing:
- margin-mobile: 20px
- margin-desktop: 80px
- stack-xl: 120px (desktop) → should be 60px on mobile
- stack-md: 48px (desktop) → should be 32px on mobile

---

## FIX 1: Navbar (components/Navbar.jsx)

Changes:
- Nav bar padding: py-5 → py-3 md:py-5
- Mobile menu button: add text-2xl class for proper icon size
- Sidebar links: py-3 → py-4 md:py-4 for better touch targets
- Sidebar "Book Visit" CTA: py-3 → py-4 for mobile touch target
- Close button: keep as-is (already has aria-label)

---

## FIX 2: HeroSection (components/home/HeroSection.jsx)

This is the most critical fix - the hero is way too big on mobile.

Changes:
1. Hero top padding: pt-28 → pt-20 md:pt-28
2. Heading: The current code has `<br /><br />` between the heading and nothing. Change to a SINGLE `<br />` instead of double. The heading should read:
   "Premium Wireless<br /><span>Home Automation</span>"
3. Trust indicators section:
   - padding top: pt-12 → pt-6 md:pt-12
   - gap: gap-8 → gap-3 md:gap-8
   - Trust sub text (text-[10px]): hide on mobile with `hidden md:block` - too small to read
   - Trust label: add text-xs md:text-sm responsive sizing
4. CTA buttons:
   - Wrapper gap: gap-6 → gap-3 md:gap-6
   - Each button padding: px-10 py-5 → px-6 py-3 md:px-10 md:py-5
   - Each button text: text-[20px] → text-sm md:text-[20px]

---

## FIX 3: TrustBar (components/home/TrustBar.jsx)

Changes:
- Vertical padding: py-14 → py-6 md:py-14
- Font size: font-headline-sm → text-sm md:font-headline-sm
- Gap between items: gap-10 → gap-4 md:gap-10
- Letter spacing: tracking-[0.3em] → tracking-[0.1em] md:tracking-[0.3em]
- Text opacity: text-white/20 → text-white/30 on mobile

---

## FIX 4: WhyChooseUs (components/home/WhyChooseUs.jsx)

Changes:
- Section padding: py-stack-xl → py-10 md:py-stack-xl
- Section heading letter-spacing: tracking-[0.3em] → tracking-[0.1em] md:tracking-[0.3em]
- Cards padding: p-10 → p-5 md:p-10
- Cards border-radius: rounded-3xl → rounded-2xl md:rounded-3xl
- Cards gap (grid): gap-8 → gap-4 md:gap-8
- Feature icon box: w-16 h-16 → w-12 h-12 md:w-16 md:h-16
- Feature icon: text-[36px] → text-[24px] md:text-[36px]
- Feature icon margin-bottom: mb-8 → mb-4 md:mb-8
- Card heading (h3): font-headline-sm → text-base md:font-headline-sm

---

## FIX 5: FeaturedBento (components/home/FeaturedBento.jsx)

CRITICAL - Cards are 500px tall which takes the entire mobile screen.

Changes:
- Large card height: h-[500px] → h-[280px] md:h-[500px]
- Large card content padding: p-12 → p-4 md:p-12
- Large card heading: font-headline-md → text-lg md:font-headline-md
- Compact cards height: h-[500px] → h-[240px] md:h-[500px]
- Compact cards padding: p-10 → p-4 md:p-10
- Compact card heading: font-headline-sm → text-base md:font-headline-sm
- Compact card description: add text-xs on mobile
- Cards border-radius: rounded-[40px] → rounded-2xl md:rounded-[40px]
- Grid gap: gap-8 → gap-4 md:gap-8
- Section heading: use text-headline-lg-mobile on mobile (already exists as class)
- Heading row layout: already flex-col md:flex-row (correct)
- "Explore Full Range" link: font-label-md → text-xs md:font-label-md

---

## FIX 6: ComparisonSection (components/home/ComparisonSection.jsx)

Changes:
- Section padding: py-stack-xl → py-10 md:py-stack-xl
- Card padding: p-12 → p-5 md:p-12
- Card border-radius: rounded-[40px] → rounded-2xl md:rounded-[40px]
- Image max-width: max-w-sm → max-w-[200px] md:max-w-sm
- Badge text: text-label-sm → text-[10px] md:text-label-sm
- List items: justify-center (keep - already centered)
- Image in old way card: add w-full for mobile responsiveness

---

## FIX 7: Testimonials (components/home/Testimonials.jsx)

Changes:
- Section padding: py-stack-xl → py-10 md:py-stack-xl
- Card padding: p-8 → p-4 md:p-8
- Card border-radius: rounded-3xl → rounded-2xl md:rounded-3xl
- Grid gap: gap-8 → gap-4 md:gap-8
- Avatar size: w-12 h-12 → w-10 h-10 md:w-12 md:h-12
- Customer name: text-lg → text-base md:text-lg
- Star icons: w-4 h-4 → w-3 h-3 md:w-4 md:h-4
- Review text: keep text-on-surface-variant but ensure it doesn't overflow
- Section description: text-body-lg → text-body-md md:text-body-lg

---

## FIX 8: FAQs (components/home/FAQs.jsx)

Changes:
- Section padding: py-stack-xl → py-10 md:py-stack-xl
- Section description text: keep as-is
- FAQ item border-radius: rounded-3xl → rounded-xl md:rounded-3xl
- FAQ button padding: p-8 → p-4 md:p-8
- FAQ question text: text-[20px] → text-sm md:text-[20px]
- FAQ content padding: px-8 pb-8 → px-4 pb-4 md:px-8 md:pb-8
- FAQ content text: font-body-md → text-sm md:font-body-md
- "More FAQs" link top margin: mt-12 → mt-6 md:mt-12

---

## FIX 9: CallToAction (components/home/CallToAction.jsx)

CRITICAL - This section is extremely oversized on mobile.

Changes:
- Section padding: py-stack-xl → py-10 md:py-stack-xl
- Card padding: p-16 md:p-32 → p-6 md:p-32
- Card border-radius: rounded-[80px] → rounded-2xl md:rounded-[80px]
- Heading: use text-headline-lg-mobile (40px) instead of text-headline-xl on mobile
  Change: font-headline-xl text-headline-lg-mobile md:text-headline-xl → text-headline-lg-mobile md:text-headline-xl
- Heading margin-bottom: mb-10 → mb-4 md:mb-10
- Description text: text-body-lg → text-body-md md:text-body-lg
- Description margin-bottom: mb-16 → mb-6 md:mb-16
- CTA buttons gap: gap-8 → gap-3 md:gap-8
- Each CTA button: px-14 py-6 text-[24px] → px-6 py-3 text-sm md:px-14 md:py-6 md:text-[24px]
- Trust row top margin: mt-24 → mt-8 md:mt-24
- Trust row gap: gap-10 → gap-3 md:gap-10
- Trust icon size: text-[32px] → text-[20px] md:text-[32px]
- Trust label: font-label-md → text-[10px] md:font-label-md
- Trust label tracking: tracking-widest → tracking-wider md:tracking-widest

---

## FIX 10: EstimateCostCTA (components/home/EstimateCostCTA.jsx)

CRITICAL - 600px min-height on mobile is way too much.

Changes:
- Section padding: py-stack-xl → py-10 md:py-stack-xl
- Card min-height: min-h-[600px] → min-h-[350px] md:min-h-[600px]
- Card padding: px-10 md:px-24 → px-5 md:px-24
- Card border-radius: rounded-[60px] → rounded-2xl md:rounded-[60px]
- Space-y-10: space-y-10 → space-y-4 md:space-y-10
- Heading: text-headline-lg → text-headline-lg-mobile md:text-headline-lg
- Body text: text-body-lg → text-body-md md:text-body-lg
- Button: px-12 py-5 text-[20px] → px-6 py-3 text-sm md:px-12 md:py-5 md:text-[20px]
- Info row gap: gap-10 → gap-4 md:gap-10
- Info label: font-label-md → text-xs md:font-label-md
- Divider height: h-10 → h-6 md:h-10

---

## FIX 11: Footer (components/Footer.tsx)

Changes:
- Footer top padding: pt-stack-xl → pt-10 md:pt-stack-xl
- Footer bottom padding: pb-16 → pb-8 md:pb-16
- Grid gap: gap-gutter → gap-6 md:gap-gutter
- Column 2 left padding: lg:pl-6 md:pl-10 → md:pl-0 lg:pl-6 (remove on mobile)
- Section headings margin-bottom: mb-6 md:mb-8 → mb-3 md:mb-8
- Section list spacing: space-y-4 md:space-y-5 → space-y-2 md:space-y-5
- Trust cards padding: p-4 md:p-6 → p-3 md:p-6
- Trust card text: font-label-md → text-[10px] md:font-label-md
- Trust card icon: text-[24px] → text-[18px] md:text-[24px]
- Trust card gap: gap-3 md:gap-4 → gap-2 md:gap-4
- Bottom bar top margin: mt-stack-md → mt-6 md:mt-stack-md
- Bottom bar padding-top: pt-8 md:pt-12 → pt-4 md:pt-12
- Bottom bar text: text-sm → text-xs md:text-sm
- Bottom bar links gap: gap-6 md:gap-10 → gap-3 md:gap-10

---

## FIX 12: globals.css - Add mobile overflow protection

File: app/globals.css

Add at the END of the file:
```
/* Mobile overflow protection */
@media (max-width: 768px) {
  html, body {
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
}

/* Safe area for notched devices */
@supports (padding: env(safe-area-inset-bottom)) {
  body {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
```

---

## VERIFICATION:
1. npx tsc --noEmit (fix any type errors)
2. npm run build (verify build passes)
3. git diff --name-only (verify all component files changed)
4. Do NOT run git push or git commit
