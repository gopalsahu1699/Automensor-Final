"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  short_description: string | null;
  full_description: string | null;
  technical_details: string | null;
  price_range: string | null;
  features: string[] | null;
  image_url: string | null;
  gallery_urls: string[] | null;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export default function AllSolutionsClient() {
  const [solutions, setSolutions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const fetchSolutions = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (!error && data) {
        setSolutions(data);
      }
      setLoading(false);
    };
    fetchSolutions();
  }, []);

  // Build dynamic categories from fetched data
  const categories = ["All", ...Array.from(new Set(solutions.map((s) => s.category)))];

  // Filter solutions by active category
  const filteredSolutions =
    activeFilter === "All"
      ? solutions
      : solutions.filter((s) => s.category === activeFilter);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-on-surface-variant text-lg">Loading solutions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative pt-24 pb-10 md:pt-40 md:pb-20 hero-mesh overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <div className="inline-flex items-center px-4 py-1.5 mb-8 rounded-full bg-primary/10 border border-primary/20 text-primary font-label-sm">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Wireless Technology Showroom
          </div>
          <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl mb-6 tracking-tight leading-tight max-w-4xl mx-auto">
            Innovation for <span className="text-gradient">Every Corner</span>
          </h1>
          <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
            Transform your living spaces with intelligent wireless technology. Discover a seamless blend of high-end design and futuristic automation tailored for your modern lifestyle.
          </p>
        </div>
      </header>

      {/* Filter Bar */}
      <section className="sticky top-20 z-40 bg-background/60 backdrop-blur-md border-b border-white/5 py-4">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-full font-label-md whitespace-nowrap transition-all ${
                  activeFilter === category
                    ? 'bg-primary text-on-primary'
                    : 'glass-card text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Grid */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-6 md:py-10 lg:py-stack-lg">
        {filteredSolutions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {filteredSolutions.map((solution) => (
              <Link
                key={solution.id}
                href={`/solutions/${solution.slug}`}
                className="group relative flex flex-col glass-card rounded-2xl overflow-hidden glow-hover transition-all duration-500"
              >
                {solution.image_url ? (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={solution.image_url}
                      alt={solution.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-surface-container flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-3xl animate-pulse"></div>
                      <span className="material-symbols-outlined text-primary text-9xl relative z-10" style={{ fontVariationSettings: "'FILL' 1" }}>devices</span>
                    </div>
                  </div>
                )}
                <div className="p-4 md:p-6 lg:p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-headline-sm text-lg md:text-headline-sm mb-1">{solution.name}</h3>
                      <p className="font-label-sm text-primary capitalize">{solution.category}</p>
                    </div>
                    <span className="material-symbols-outlined text-primary">arrow_forward</span>
                  </div>
                  {solution.short_description && (
                    <p className="text-on-surface-variant font-body-md mb-4 line-clamp-2">
                      {solution.short_description}
                    </p>
                  )}
                  {solution.price_range && (
                    <p className="text-sm font-semibold text-on-surface mb-4">{solution.price_range}</p>
                  )}
                  {solution.features && solution.features.length > 0 && (
                    <ul className="space-y-2 mb-4 md:mb-6 lg:mb-8 flex-grow">
                      {solution.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center text-on-surface-variant font-body-md">
                          <span className="material-symbols-outlined text-success-emerald mr-2 text-sm">check_circle</span>
                          {feature}
                        </li>
                      ))}
                      {solution.features.length > 3 && (
                        <li className="text-on-surface-variant font-body-md text-sm">
                          +{solution.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  )}
                  <span className="w-full py-3 rounded-xl bg-white/5 border border-white/10 font-label-md text-center group-hover:bg-primary group-hover:text-on-primary transition-all">
                    View Details
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-on-surface-variant font-body-lg">
              {activeFilter === "All"
                ? "No solutions available yet. Check back soon!"
                : `No solutions found in "${activeFilter}" category.`}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant w-full mt-stack-xl">
      </footer>
    </div>
  );
}
