"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";

const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

const Product = () => {
  const { id } = useParams();
  const { products } = useAppContext();

  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  // For Lightbox modal
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    if (Array.isArray(products) && products.length) {
      const prod = products.find((p) => p.$id === id);
      setProductData(prod);

      if (prod && prod.images) {
        let imgs = [];
        try {
          imgs = JSON.parse(prod.images);
        } catch {
          imgs = prod.images;
        }
        if (imgs.length > 0) {
          const firstImg = imgs[0].startsWith("http")
            ? imgs[0]
            : `https://fra.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${imgs[0]}/view?project=${PROJECT_ID}`;
          setMainImage(firstImg);
        }
      }
    }
  }, [id, products]);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    if (lightboxOpen) {
      window.addEventListener("keydown", handleEsc);
    } else {
      window.removeEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [lightboxOpen]);

  if (!productData) return <Loading />;

  let imageUrls = [];
  try {
    imageUrls = productData.images ? JSON.parse(productData.images) : [];
  } catch {
    imageUrls = [];
  }

  const fullImageUrls = imageUrls.map((img) =>
    img.startsWith("http")
      ? img
      : `https://fra.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${img}/view?project=${PROJECT_ID}`
  );

  const openLightbox = (img) => {
    setLightboxImage(img);
    setLightboxOpen(true);
  };

  // Function to render description with proper formatting
  const renderDescription = (text) => {
    if (!text) return null;

    // Split by double line breaks for paragraphs
    const paragraphs = text.split(/\n\n+/);

    return paragraphs.map((paragraph, pIndex) => {
      // Check if it's a list (starts with -, *, •, or numbers)
      const lines = paragraph.split('\n');
      const isList = lines.every(line => 
        /^[\s]*[-*•]\s/.test(line) || /^[\s]*\d+\.\s/.test(line) || line.trim() === ''
      );

      if (isList) {
        // Render as list
        const isOrdered = /^[\s]*\d+\.\s/.test(lines[0]);
        const ListTag = isOrdered ? 'ol' : 'ul';
        
        return (
          <ListTag 
            key={pIndex} 
            className={`mb-4 ml-6 ${isOrdered ? 'list-decimal' : 'list-disc'} text-gray-700 space-y-2`}
          >
            {lines
              .filter(line => line.trim())
              .map((line, lIndex) => {
                // Remove list markers
                const cleanLine = line.replace(/^[\s]*[-*•]\s/, '').replace(/^[\s]*\d+\.\s/, '');
                return (
                  <li key={lIndex} className="leading-relaxed">
                    {cleanLine}
                  </li>
                );
              })}
          </ListTag>
        );
      } else {
        // Render as paragraph with line breaks
        return (
          <p key={pIndex} className="text-gray-700 text-lg leading-relaxed mb-4">
            {lines.map((line, lIndex) => (
              <span key={lIndex}>
                {line}
                {lIndex < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Images */}
          <div className="px-5 lg:px-16 xl:px-20">
            {/* Main Image */}
            <div
              onClick={() => openLightbox(mainImage)}
              className="relative rounded-lg overflow-hidden bg-gray-100 mb-6 aspect-[16/9] cursor-zoom-in"
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === "Enter" && openLightbox(mainImage)}
              aria-label="View larger image"
            >
              <Image
                src={mainImage || "/upload_area_placeholder.png"}
                alt={productData.name}
                priority
                fill
                style={{ objectFit: "contain" }}
                draggable={false}
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {fullImageUrls.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  onDoubleClick={() => openLightbox(img)}
                  className={`relative rounded-lg overflow-hidden aspect-square focus:outline-none focus:ring-2 focus:ring-orange-500 transition-transform ${
                    mainImage === img ? "ring-2 ring-orange-500" : ""
                  } cursor-pointer`}
                  aria-label={`View image ${idx + 1}`}
                  tabIndex={0}
                >
                  <Image
                    src={img}
                    alt={`${productData.name} ${idx + 1}`}
                    fill
                    style={{ objectFit: "contain" }}
                    className="transition-transform duration-300 hover:scale-110"
                    draggable={false}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold text-gray-900 mb-6">
              {productData.name}
            </h1>
            
            {/* Render description with formatting */}
            <div className="prose prose-lg max-w-none">
              {renderDescription(productData.description)}
            </div>

            {/* Display all other product data fields */}
            <div className="mt-8 space-y-4 border-t pt-6">
              {Object.entries(productData).map(([key, value]) => {
                // Skip these fields as they're already displayed
                if (['$id', 'name', 'description', 'images', '$createdAt', '$updatedAt', '$permissions', '$collectionId', '$databaseId'].includes(key)) {
                  return null;
                }

                return (
                  <div key={key} className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="text-gray-800 text-base mt-1">
                      {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 cursor-zoom-out"
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(false);
            }}
            className="absolute top-6 right-6 text-white bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full p-3 text-2xl focus:outline-none focus:ring-4 focus:ring-white"
            aria-label="Close large image"
          >
            &times;
          </button>

          <div className="relative w-full max-w-5xl max-h-[90vh] p-4">
            <Image
              src={lightboxImage}
              alt="Large product view"
              fill
              style={{ objectFit: "contain" }}
              draggable={false}
              priority
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
