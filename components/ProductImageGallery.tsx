"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductImageGalleryProps {
    images: string[];
    productName: string;
    isFeatured?: boolean;
}

export default function ProductImageGallery({ images, productName, isFeatured }: ProductImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // If no images at all
    if (!images || images.length === 0) {
        return (
            <div className="relative aspect-square rounded-2xl bg-slate-100 overflow-hidden border border-slate-100 flex items-center justify-center text-slate-400">
                No Image Available
            </div>
        );
    }

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image View */}
            <div className="relative aspect-square rounded-2xl bg-slate-100 overflow-hidden border border-slate-100 group">
                <Image
                    src={images[currentIndex]}
                    alt={`${productName} - View ${currentIndex + 1}`}
                    fill
                    className="object-cover transition-all duration-500"
                    priority={currentIndex === 0}
                />

                {isFeatured && (
                    <div className="absolute top-6 left-6 px-4 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg z-10">
                        Featured
                    </div>
                )}

                {/* Navigation Arrows (Only show if multiple images) */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails (Only show if multiple images) */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3 sm:gap-4">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${currentIndex === idx
                                    ? 'border-blue-500 shadow-md scale-[1.02]'
                                    : 'border-transparent hover:border-slate-300 opacity-70 hover:opacity-100'
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
