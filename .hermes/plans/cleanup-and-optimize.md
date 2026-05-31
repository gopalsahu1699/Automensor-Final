# Task: Clean up dead code + upload all images to Supabase Storage for optimization

This is a BIG optimization task. Do ALL of the following in order:

## PART 1: Delete dead/unused files

### Dead pages (all import NavbarHero which doesn't exist — crash if visited):
Delete these ENTIRE folders:
- `app/all-solutions/digital-door-lock/` (whole folder)
- `app/all-solutions/scene-creation/` (whole folder)
- `app/all-solutions/sensor/` (whole folder)
- `app/all-solutions/smart-curtain/` (whole folder)
- `app/all-solutions/smart-panel/` (whole folder)
- `app/all-solutions/video-door-phone/` (whole folder)

### Dead components (never imported anywhere):
Delete these files:
- `components/home/FeaturedSolutions.tsx`
- `components/home/HowYouCanControl.jsx`
- `components/home/ProblemToSolution.jsx`
- `components/home/AnimeHeroScene.tsx`
- `components/home/TestimonialsSection.tsx`

### Dead old components:
- `components/DigitalDoorLock.jsx`
- `components/SceneCreation.jsx`
- `components/SensorsSection.jsx`
- `components/SmartCurtain.jsx`
- `components/HeaderSlider02.jsx`
- `components/SapphireSeriesPage.jsx`
- `components/home/FeaturedSolutions.tsx` (already listed above)

### Dead utility files:
- `public/sitemap-generator.js` (should not be in public/)
- `lib/products.ts` — check if used anywhere first with grep, if not used delete it

## PART 2: Upload all local images to Supabase Storage

Images to upload from `public/images/`:
- about-expertise.jpg
- about-founder.jpg
- about-hero.jpg
- about-mission.jpg
- bento-bedroom.jpg
- bento-kitchen.jpg
- contact-hero.jpg
- hero-home.jpg
- logo.png
- logo2.png
- map-bilaspur.jpg
- old-switch.jpg
- smart-panel.jpg

Use the Supabase service client (`getServiceSupabase()` from `@/lib/supabase`) to upload.
Create a Node.js script at `scripts/upload-images.js` that:
1. Reads each image from `public/images/`
2. Uploads to Supabase Storage `images/` bucket with the same filename
3. Gets the public URL for each
4. Outputs a JSON map of { localPath: supabaseUrl }

Then update the NEXT_PUBLIC_SUPABASE_URL env to construct image URLs like:
`${SUPABASE_URL}/storage/v1/object/public/images/filename.jpg`

## PART 3: Replace local image references with Supabase URLs

After uploading, find all `<img src="/images/...">` and `backgroundImage: "url('/images/...")` across the entire codebase and replace with the Supabase Storage public URLs.

Use NEXT_PUBLIC_SUPABASE_URL to construct URLs:
`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/filename.jpg`

## PART 4: Remove local images from public/

After confirming all references are updated, delete all images from `public/images/` EXCEPT keep logo.png and logo2.png for now (used in Navbar with white bg).

## PART 5: Performance optimizations

1. Add `priority` prop to all `<Image>` components that are above the fold (hero images, logo)
2. Add `loading="lazy"` to below-the-fold images
3. In `next.config.mjs`, ensure image optimization is enabled for Supabase domain:
   ```js
   images: {
     remotePatterns: [
       { protocol: 'https', hostname: '*.supabase.co' },
     ],
   }
   ```
4. Add proper `sizes` prop to all Image components for responsive loading
5. Remove unused CSS — check if any Tailwind classes are generated but never used

## PART 6: Final verification

1. Run `npx tsc --noEmit` — zero errors
2. Run `npm run build` — check for build errors
3. Verify no dead imports remain
4. Do NOT git push or commit
