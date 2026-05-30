"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaBox as Package, FaArrowRight as ArrowRight } from 'react-icons/fa6';

export default function FeaturedProducts({ initialProducts }: { initialProducts: any[] }) {
    // Get up to 4 featured products, fallback to just the first 4 if none are marked featured
    const featuredOnly = initialProducts.filter(p => p.is_featured);
    const displayProducts = featuredOnly.length >= 4
        ? featuredOnly.slice(0, 4)
        : [...featuredOnly, ...initialProducts.filter(p => !p.is_featured)].slice(0, 4);

    return (
        <div className="container mx-auto px-6">

            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                <div>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                        Featured <span className="text-blue-600">Smart Solutions</span>
                    </h2>
                    <p className="text-slate-600 text-base sm:text-lg max-w-xl">
                        Explore our most popular home automation products. Designed for elegance, built for convenience.
                    </p>
                </div>

                <Link
                    href="/all-products"
                    className="group hidden md:inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                    View All Products
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayProducts.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col h-full cursor-pointer hover:-translate-y-1"
                    >
                        <Link href={`/products/${product.slug}`} className="flex flex-col h-full">
                            {/* Image Area */}
                            <div className="relative aspect-square bg-slate-100 overflow-hidden">
                                {product.image_url ? (
                                    <Image
                                        src={product.image_url}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                                        <Package className="w-12 h-12 mb-2 opacity-20" />
                                        <span className="text-sm font-medium">No Image</span>
                                    </div>
                                )}
                            </div>

                            {/* Content Area */}
                            <div className="p-6 flex flex-col flex-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-2 block">
                                    {product.category}
                                </span>

                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-1">
                                    {product.name}
                                </h3>

                                <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">
                                    {product.short_description || "High-quality smart home device to enhance your modern living experience."}
                                </p>

                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                                    <div className="font-bold text-slate-900">
                                        {product.price_range || "Price on Request"}
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white text-blue-600 transition-colors">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Mobile view all button */}
            <div className="mt-8 flex justify-center md:hidden">
                <Link
                    href="/all-products"
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-50 text-blue-600 font-bold rounded-xl active:bg-blue-100 transition-colors"
                >
                    View All Products
                </Link>
            </div>

        </div>
    );
}
