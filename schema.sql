-- Drop existing tables and policies if they exist (Be careful if you have production data!)
drop table if exists products cascade;
drop table if exists contact_leads cascade;
drop table if exists faqs cascade;

-- Products table
create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  category text not null,      -- 'security' | 'comfort' | 'control'
  short_description text,
  full_description text,
  technical_details text,
  price_range text,            -- e.g. "₹4,999 – ₹12,999"
  features text[],             -- array of feature strings
  image_url text,              -- Cloudinary URL
  gallery_urls text[],         -- array of additional image URLs
  is_featured boolean default false,
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Contact leads table
create table contact_leads (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  email text,
  city text,
  message text,
  source text default 'contact-form',
  status text default 'new',   -- 'new' | 'contacted' | 'converted'
  created_at timestamptz default now()
);

-- FAQs table
create table faqs (
  id uuid default gen_random_uuid() primary key,
  question text not null,
  answer text not null,
  sort_order int default 0,
  is_active boolean default true
);

-- RLS Policies (public read, admin write via service key)
alter table products enable row level security;
alter table contact_leads enable row level security;
alter table faqs enable row level security;

create policy "Public can read active products"
  on products for select using (is_active = true);

create policy "Public can read active faqs"
  on faqs for select using (is_active = true);

create policy "Anyone can insert contact lead"
  on contact_leads for insert with check (true);
