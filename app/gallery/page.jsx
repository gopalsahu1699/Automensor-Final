"use client";

import React, { useState } from "react";

const images = [
  {
    src: "/images/gallery1.jpg",
    alt: "Smart Home Controller",
    caption: "Smart Home Controller",
  },
  {
    src: "/images/gallery2.jpg",
    alt: "Intelligent Lighting System",
    caption: "Intelligent Lighting System",
  },
  {
    src: "/images/gallery3.jpg",
    alt: "Smart Door Lock",
    caption: "Smart Door Lock",
  },
  {
    src: "/images/gallery4.jpg",
    alt: "Automated Blinds",
    caption: "Automated Blinds",
  },
  {
    src: "/images/gallery5.jpg",
    alt: "Voice Assistant Device",
    caption: "Voice Assistant Device",
  },
  {
    src: "/images/gallery6.jpg",
    alt: "Integrated Security Cameras",
    caption: "Integrated Security Cameras",
  },
];

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showPrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const showNext = () => {
    setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="max-w-6xl mx-auto p-6 sm:p-10">
      <h1 className="text-4xl font-extrabold text-center mb-10">Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="cursor-pointer overflow-hidden rounded-lg shadow-lg"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
            <p className="text-center mt-2 text-gray-700">{image.caption}</p>
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <div
            className="relative max-w-4xl max-h-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              className="max-w-full max-h-[80vh] rounded-lg"
            />
            <button
              onClick={closeLightbox}
              className="absolute top-2 right-2 text-white text-3xl font-bold hover:text-red-500"
              aria-label="Close lightbox"
            >
              &times;
            </button>
            <button
              onClick={showPrev}
              className="absolute top-1/2 left-2 -translate-y-1/2 text-white text-4xl font-bold hover:text-orange-500"
              aria-label="Previous image"
            >
              &#8249;
            </button>
            <button
              onClick={showNext}
              className="absolute top-1/2 right-2 -translate-y-1/2 text-white text-4xl font-bold hover:text-orange-500"
              aria-label="Next image"
            >
              &#8250;
            </button>
            <p className="text-center text-white mt-4">
              {images[lightboxIndex].caption}
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Gallery;
