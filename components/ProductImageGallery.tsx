"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

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
            <div className="relative aspect-square rounded-2xl bg-surface-container overflow-hidden border border-white/10 flex items-center justify-center text-on-surface-variant">
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
            <div className="relative aspect-square rounded-2xl bg-surface-container overflow-hidden border border-white/10 group">
                {images[currentIndex].match(/\.(mp4|mov|webm|avi|mkv)(\?|$)/i) ? (
                    <video
                        src={images[currentIndex]}
                        className="w-full h-full object-contain bg-black"
                        controls
                        autoPlay={false}
                        playsInline
                    />
                ) : (
                    <Image
                        src={images[currentIndex]}
                        alt={`${productName} - View ${currentIndex + 1}`}
                        fill
                        className="object-cover transition-all duration-500"
                        priority={currentIndex === 0}
                    />
                )}

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
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails (Only show if multiple images) */}
            {images.length > 1 && (
                <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 w-16 sm:w-20 ${currentIndex === idx
                                    ? 'border-electric-blue shadow-md scale-[1.02]'
                                    : 'border-transparent hover:border-white/20 opacity-70 hover:opacity-100'
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                fill
                                className="object-cover"
                            />
                            {img.match(/\.(mp4|mov|webm|avi|mkv)(\?|$)/i) && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                    <Play className="w-6 h-6 text-white fill-white" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
