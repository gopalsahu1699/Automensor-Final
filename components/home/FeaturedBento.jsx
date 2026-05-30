"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function FeaturedBento() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, slug, category, short_description, image_url, price_range, is_featured')
        .eq('is_active', true)
        .eq('is_featured', true)
        .order('sort_order', { ascending: true })
        .limit(3);

      if (!error && data) {
        setFeatured(data);
      }
      setLoading(false);
    };
    fetchFeatured();
  }, []);

  // Show nothing while loading or if no featured products
  if (loading || featured.length === 0) {
    return null;
  }

  // First product = large card, rest = compact cards
  const largeProduct = featured[0];
  const compactProducts = featured.slice(1);

  return (
    <section className="py-stack-xl">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Heading */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-stack-md gap-6">
          <div className="max-w-2xl">
            <span className="text-electric-blue font-label-md tracking-[0.3em] uppercase mb-4 block">Innovative Hardware</span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-4">
              Elite <span className="gradient-text">Automation Solution</span>
            </h2>
            <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant">
              Aesthetic brilliance meet technical precision. Our panels are the heart of any voice controlled home.
            </p>
          </div>
          <Link href="/all-solutions" className="flex items-center gap-3 text-electric-blue text-xs md:font-label-md text-label-md hover:gap-5 transition-all group">
            Explore Full Range
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {/* Large Card - First Featured Product */}
          {largeProduct && (
            <Link
              href={`/solutions/${largeProduct.slug}`}
              className="md:col-span-2 relative glass rounded-2xl md:rounded-[40px] overflow-hidden group border-white/5 h-[280px] md:h-[500px]"
            >
              {largeProduct.image_url ? (
                <img
                  src={largeProduct.image_url}
                  alt={largeProduct.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-9xl" style={{ fontVariationSettings: "'FILL' 1" }}>devices</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 md:p-12 space-y-4">
                <span className="text-electric-blue font-label-md uppercase tracking-[0.2em]">{largeProduct.category}</span>
                <h3 className="text-lg md:font-headline-md text-on-surface max-w-md">{largeProduct.name}</h3>
                {largeProduct.short_description && (
                  <p className="text-on-surface-variant max-w-sm mb-6">{largeProduct.short_description}</p>
                )}
                {largeProduct.price_range && (
                  <p className="text-on-surface font-semibold text-lg mb-2">{largeProduct.price_range}</p>
                )}
                <span className="inline-block px-8 py-3 rounded-full border border-white/20 glass text-on-surface font-label-md hover:bg-white hover:text-background transition-all">
                  View Details
                </span>
              </div>
            </Link>
          )}

          {/* Compact Cards - Remaining Featured Products */}
          {compactProducts.map((product) => (
            <Link
              key={product.id}
              href={`/solutions/${product.slug}`}
              className="relative glass rounded-2xl md:rounded-[40px] overflow-hidden group border-white/5 h-[240px] md:h-[500px]"
            >
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-glow-cyan text-9xl" style={{ fontVariationSettings: "'FILL' 1" }}>devices</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 md:p-10 space-y-4">
                <span className="text-glow-cyan font-label-md uppercase tracking-[0.2em]">{product.category}</span>
                <h3 className="text-base md:font-headline-sm text-on-surface">{product.name}</h3>
                {product.short_description && (
                  <p className="text-on-surface-variant text-xs md:text-sm mb-6 line-clamp-2">{product.short_description}</p>
                )}
                {product.price_range && (
                  <p className="text-on-surface font-semibold text-sm mb-2">{product.price_range}</p>
                )}
                <span className="inline-block px-8 py-3 rounded-full border border-white/20 glass text-on-surface font-label-md hover:bg-white hover:text-background transition-all">
                  Explore
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
