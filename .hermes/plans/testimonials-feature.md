# Task: Complete the testimonials feature for Automensor

## What's already done (DO NOT change these):
- `schema-testimonials.sql` — SQL to create the testimonials table (user runs this in Supabase Dashboard)
- `components/admin/TestimonialForm.tsx` — Admin form for add/edit testimonials
- `app/admin/testimonials/page.tsx` — Admin list page
- `app/admin/testimonials/new/page.tsx` — Add testimonial page
- `app/admin/testimonials/[id]/edit/page.tsx` — Edit testimonial page

## What OpenCode needs to do:

### 1. Create API routes for testimonials admin CRUD

**File: `app/api/admin/testimonials/route.ts`** (POST — create new testimonial)
- Check admin auth via `isAdmin()` from `@/lib/admin-auth`
- Get body from request.json()
- Insert into `testimonials` table using `getServiceSupabase()`
- Return `{ success: true }` or error

**File: `app/api/admin/testimonials/[id]/route.ts`** (PUT + DELETE)
- PUT: update testimonial by id
- DELETE: delete testimonial by id
- Both check admin auth
- Use `getServiceSupabase()`

Follow the exact same pattern as `app/api/admin/products/route.ts` and `app/api/admin/products/[id]/route.ts` — just change table name from `products` to `testimonials`.

### 2. Create the Testimonials section component for the home page

**File: `components/home/Testimonials.jsx`**

A "use client" component that:
- Fetches active testimonials from Supabase using the anon client (`supabase` from `@/lib/supabase`)
- Query: `.from('testimonials').select('*').eq('is_active', true).order('sort_order', { ascending: true })`
- Shows a loading state, then displays testimonials in a horizontal scroll or grid

Design requirements (match the existing dark theme):
- Section label: "Customer Stories" in `text-electric-blue font-label-md tracking-[0.3em] uppercase`
- Heading: "Trusted by <span className=\"gradient-text\">200+ Families</span>" in `font-headline-lg`
- Subtitle: "See what our customers across Chhattisgarh have to say about their smart home experience."
- Each testimonial card: `glass p-8 rounded-3xl border-white/5` — dark translucent card
- Show star rating (1-5) using `<Star>` from lucide-react, filled for rating count
- Show review text in `text-on-surface-variant`
- Show customer name in `text-on-surface font-semibold`
- Show location in `text-on-surface-variant text-sm`
- Show customer avatar: if `customer_image_url` exists use `<img>`, else show a circle with the first initial of the name (like the admin list page does)
- Use a grid: 3 columns on desktop, 2 on tablet, 1 on mobile
- Add subtle background glow: `absolute top-1/2 left-0 w-[500px] h-[500px] bg-electric-blue/5 blur-[120px] rounded-full` (same pattern as WhyChooseUs)

### 3. Add Testimonials to the home page

**File: `app/HomeClient.jsx`**
- Import Testimonials component
- Add `<Testimonials />` between `<FeaturedBento />` and `<EstimateCostCTA />`

### 4. Add Testimonials link to Admin Sidebar

**File: `components/admin/AdminSidebar.jsx`**
- Add `{ label: 'Testimonials', icon: MessageSquare, href: '/admin/testimonials' }` to the menu array
- Import `MessageSquare` from lucide-react (add to existing import)

### 5. After all changes:
- Run `npx tsc --noEmit` from project root `D:\web software developement\automensor\Automensor-Final`
- Fix any type errors
- Do NOT commit or push to git
