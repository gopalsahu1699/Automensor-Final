# Task: Fix footer social media icons — colorful brand logos

## Current state (components/Footer.tsx lines 29-55)
Three social links use generic Material Symbols icons:
- Instagram: `public` icon (looks like a globe — not recognizable)
- YouTube: `smart_display` icon (looks like a TV — not recognizable)
- Email: `alternate_email` icon

All hover to the same `electric-blue` color — not distinctive.

## What to change

Replace the generic material icons with proper colorful social media icons. Use `lucide-react` brand icons which are already available:

**Lucide-react social icons (import from 'lucide-react'):**


If lucide-react doesn't have brand icons, use inline SVG with the official brand colors:

| Platform | Brand Color | Hex |
|----------|-------------|-------------|
| Instagram | Gradient (pink→orange) | #E1306C → #F77737 |
| YouTube | Red | #FF0000 |
| Facebook | Blue | #1877F2 |
| LinkedIn | Blue | #0A66C2 |

### Implementation:
1. Run `npm list react-icons` to check if react-icons is installed (it's in package.json)
2. If react-icons is available, use:
   - `FaInstagram` from `react-icons/fa` brand icons
   - `FaYoutube` from `react-icons/fa`
   - `FaFacebook` from `react-icons/fa`
   - `FaLinkedin` from `react-icons/fa`

   If react-icons is NOT available, install it: `npm install react-icons`

3. Replace the social icon section with 4 colorful icons (Instagram, YouTube, Facebook, LinkedIn)
4. Each icon gets its own brand color on hover:
   - Instagram: hover:text-[#E1306C] or pink gradient
   - YouTube: hover:text-[#FF0000]
   - Facebook: hover:text-[#1877F2]
   - LinkedIn: hover:text-[#0A66C2]
5. Keep the email link with a simple mail icon (lucide-react Mail icon) or skip email entirely — the 4 social icons are enough
6. Icons should be ~22-24px on mobile, ~28px on desktop
7. Keep the rounded-full circle style but remove the glass class — use a simple dark circle with border

Example pattern:
```jsx
<a href="https://www.instagram.com/autommensor/" target="_blank" rel="noopener noreferrer"
   className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#E1306C]/20 hover:text-[#E1306C] hover:border-[#E1306C]/30 transition-all"
   aria-label="Instagram">
  <FaInstagram className="text-[20px] md:text-[24px]" />
</a>
```

Same pattern for each with their own brand hover color.

### Links to use:
- Instagram: https://www.instagram.com/autommensor/
- YouTube: https://www.youtube.com/@autommensor
- Facebook: (ask user or use # if no link)
- LinkedIn: (ask user or use # if no link)
- Keep email: mailto:autommensor@gmail.com with Mail icon from lucide-react

Run npx tsc --noEmit after. Do NOT git push.
