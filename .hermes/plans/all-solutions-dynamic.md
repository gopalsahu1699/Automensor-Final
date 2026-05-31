# Task: Rewrite AllSolutionsClient.tsx to fetch from Supabase

## File to modify:
`D:\web software developement\automensor\Automensor-Final\components\solutions\AllSolutionsClient.tsx`

## What to do:
Rewrite this component to fetch active solutions from Supabase `products` table instead of using hardcoded static data.

## Requirements:

### 1. Fetch data from Supabase
- Import supabase client from `@/lib/supabase` (use `supabase`, the anon client — NOT `getServiceSupabase`)
- On component mount, fetch all products where `is_active = true`, ordered by `sort_order` ASC then `created_at` DESC
- Use `useEffect` + `useState` for the data fetching (it's a "use client" component)
- Show a loading state while fetching (simple text "Loading solutions...")
- Show "No solutions found." if the array is empty

### 2. Map Supabase fields to card display:
- `solution.name` → card title
- `solution.category` → category label (capitalize first letter)
- `solution.image_url` → card image (use `<img>` tag, NOT next/image since URLs are external Cloudinary URLs)
- `solution.short_description` → show as a small paragraph below title
- `solution.features` → array of strings, render as checklist items (use checkmark icon or bullet)
- `solution.slug` → used for the link URL: `/solutions/{slug}`
- `solution.price_range` → show price if available

### 3. Card behavior:
- Each card should be wrapped in a `<Link href={`/solutions/${solution.slug}`}>` so clicking anywhere opens the detail page
- Detail page is already built at `/solutions/[slug]/page.tsx` — just link to it
- Remove the old "Learn More" button since the whole card is now clickable

### 4. Keep the same visual design:
- Keep the hero section (title "Innovation for Every Corner", subtitle, gradient styling) — EXACTLY as-is
- Keep the filter bar section BUT make categories dynamic: extract unique categories from the fetched products data, prepend "All" to the list. Filter products by category when a filter is clicked
- Keep the same grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter`
- Keep the same card styling: `group relative flex flex-col glass-card rounded-2xl overflow-hidden glow-hover transition-all duration-500`
- Keep the image aspect ratio: `aspect-[4/3]`
- Keep the same inner padding/text styling
- Keep the footer at the bottom of the page
- Keep all CSS classes exactly as they are — this is a dark-themed site using glass-card, glow-hover, etc.

### 5. DO NOT:
- Do NOT add Navbar or Footer — those are already in the root layout
- Do NOT change any other files
- Do NOT use next/image for product images (use plain `<img>` since URLs are external)
- Do NOT install any new packages
- Do NOT run git push or git remote commands

### 6. After changes:
- Run `npx tsc --noEmit` from the project root and fix any type errors
- Do NOT commit or push
