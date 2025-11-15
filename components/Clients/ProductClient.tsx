"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Package,
  Info,
  AlertCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";

const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

interface ProductData {
  $id: string;
  name: string;
  description: string;
  images: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $collectionId: string;
  $databaseId: string;
  [key: string]: any;
}

interface ParsedImages {
  main: string | null;
  all: string[];
}

interface ProductClientProps {
  productId: string;
}

const excludedFields = [
  "$id",
  "name",
  "description",
  "images",
  "$createdAt",
  "$updatedAt",
  "$permissions",
  "$collectionId",
  "$databaseId",
];

export default function ProductClient({ productId }: ProductClientProps) {
  const { products } = useAppContext();

  const [productData, setProductData] = useState<ProductData | null>(null);
  const [parsedImages, setParsedImages] = useState<ParsedImages>({
    main: null,
    all: [],
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Parse images from product data
  const parseProductImages = useCallback((product: ProductData): ParsedImages => {
    const imageUrls: string[] = [];

    try {
      const imagePaths = Array.isArray(product.images)
        ? product.images
        : JSON.parse(product.images || "[]");

      imagePaths.forEach((img: string) => {
        const fullUrl = img.startsWith("http")
          ? img
          : `https://fra.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${img}/view?project=${PROJECT_ID}`;
        imageUrls.push(fullUrl);
      });
    } catch (err) {
      console.error("Error parsing images:", err);
      setLoadError("Failed to load product images");
    }

    return {
      main: imageUrls.length > 0 ? imageUrls[0] : null,
      all: imageUrls,
    };
  }, []);

  // Load product data
  useEffect(() => {
    if (!Array.isArray(products) || products.length === 0) {
      return;
    }

    const product = products.find((p: ProductData) => p.$id === productId);

    if (!product) {
      setLoadError("Product not found");
      return;
    }

    setProductData(product);
    const images = parseProductImages(product);
    setParsedImages(images);
    setCurrentImageIndex(0);
  }, [productId, products, parseProductImages]);

  // Handle escape key for lightbox
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
      }
    };

    if (lightboxOpen) {
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [lightboxOpen]);

  // Image navigation - FIXED
  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? parsedImages.all.length - 1 : prev - 1
    );
  }, [parsedImages.all.length]);

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex(
      (prev) => (prev + 1) % parsedImages.all.length
    );
  }, [parsedImages.all.length]);

  // Auto-update main image when index changes - FIXED
  useEffect(() => {
    if (parsedImages.all.length > 0 && currentImageIndex >= 0) {
      setParsedImages((prev) => ({
        ...prev,
        main: prev.all[currentImageIndex],
      }));
    }
  }, [currentImageIndex, parsedImages.all.length]);

  // Render description with formatting
  const renderDescription = useCallback((text: string | undefined) => {
    if (!text) return <p className="text-gray-700">No description available</p>;

    const paragraphs = text.split(/\n\n+/);

    return paragraphs.map((paragraph, pIndex) => {
      const lines = paragraph.split("\n");
      const isList = lines.every(
        (line) =>
          /^[\s]*[-*•]\s/.test(line) ||
          /^[\s]*\d+\.\s/.test(line) ||
          line.trim() === ""
      );

      if (isList) {
        const isOrdered = /^[\s]*\d+\.\s/.test(lines[0]);
        const ListTag = isOrdered ? "ol" : "ul";

        return (
          <ListTag
            key={pIndex}
            className={`mb-4 ml-6 ${
              isOrdered ? "list-decimal" : "list-disc"
            } text-gray-700 space-y-2`}
          >
            {lines
              .filter((line) => line.trim())
              .map((line, lIndex) => {
                const cleanLine = line
                  .replace(/^[\s]*[-*•]\s/, "")
                  .replace(/^[\s]*\d+\.\s/, "");
                return (
                  <li key={lIndex} className="leading-relaxed">
                    {cleanLine}
                  </li>
                );
              })}
          </ListTag>
        );
      }

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
    });
  }, []);

  if (!productData) {
    return (
      <>
        <Navbar />
        {loadError ? (
          <div className="min-h-screen flex items-center justify-center px-6">
            <div className="max-w-md w-full">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-900">Error</h3>
                  <p className="text-red-700 text-sm mt-1">{loadError}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loading />
        )}
        <Footer />
      </>
    );
  }

  const currentMainImage =
    parsedImages.all.length > 0
      ? parsedImages.all[currentImageIndex]
      : "/upload_area_placeholder.png";

  return (
    <>
      <Navbar />

      <motion.div
        className="px-6 md:px-12 lg:px-24 xl:px-32 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Images Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Main Image with Navigation */}
              <div className="relative group">
                <motion.div
                  onClick={() => setLightboxImage(currentMainImage)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setLightboxImage(currentMainImage);
                      setLightboxOpen(true);
                    }
                  }}
                  className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-6 aspect-square cursor-zoom-in shadow-xl hover:shadow-2xl transition-shadow"
                  role="button"
                  tabIndex={0}
                  aria-label="View larger image"
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                    src={currentMainImage}
                    alt={productData.name}
                    priority
                    fill
                    className="object-contain p-4"
                    draggable={false}
                  />

                  {/* Zoom Icon Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-3"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ZoomIn className="w-6 h-6 text-gray-800" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Image Navigation Arrows */}
                {parsedImages.all.length > 1 && (
                  <>
                    <motion.button
                      onClick={handlePrevImage}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 z-10"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-800" />
                    </motion.button>
                    <motion.button
                      onClick={handleNextImage}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 z-10"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-800" />
                    </motion.button>
                  </>
                )}
              </div>

              {/* Thumbnail Images */}
              {parsedImages.all.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {parsedImages.all.map((img, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => {
                        setCurrentImageIndex(idx);
                      }}
                      onDoubleClick={() => {
                        setLightboxImage(img);
                        setLightboxOpen(true);
                      }}
                      className={`relative rounded-xl overflow-hidden aspect-square bg-gray-100 focus:outline-none transition-all ${
                        currentMainImage === img
                          ? "ring-4 ring-orange-500 scale-105"
                          : "ring-2 ring-gray-200 hover:ring-orange-300"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`View image ${idx + 1}`}
                      aria-pressed={currentMainImage === img}
                      tabIndex={0}
                    >
                      <Image
                        src={img}
                        alt={`${productData.name} view ${idx + 1}`}
                        fill
                        className="object-contain p-2"
                        draggable={false}
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Details Section */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Product Title */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    {productData.name}
                  </h1>
                  <p className="text-gray-500 mt-2 text-sm">
                    Product ID: {productData.$id.slice(-8)}
                  </p>
                </div>
              </div>

              {/* Description */}
              <motion.div
                className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-8 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Info className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Product Description
                  </h2>
                </div>
                <div className="prose prose-lg max-w-none">
                  {renderDescription(productData.description)}
                </div>
              </motion.div>

              {/* Additional Product Data */}
              {Object.entries(productData).some(
                ([key]) => !excludedFields.includes(key)
              ) && (
                <motion.div
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border-2 border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Specifications
                  </h2>
                  <div className="space-y-4">
                    {Object.entries(productData).map(([key, value]) => {
                      if (excludedFields.includes(key)) {
                        return null;
                      }

                      const displayKey = key
                        .replace(/([A-Z])/g, " $1")
                        .trim()
                        .charAt(0)
                        .toUpperCase() + key.replace(/([A-Z])/g, " $1").trim().slice(1);

                      const displayValue =
                        typeof value === "object"
                          ? JSON.stringify(value, null, 2)
                          : String(value || "N/A");

                      return (
                        <div
                          key={key}
                          className="flex flex-col pb-4 border-b border-gray-200 last:border-0"
                        >
                          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            {displayKey}
                          </span>
                          <span className="text-gray-900 text-lg font-medium break-words">
                            {displayValue}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <Footer />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && lightboxImage && (
          <motion.div
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 bg-black/95 flex justify-center items-center z-50 cursor-zoom-out backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
          >
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(false);
              }}
              className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-all focus:outline-none focus:ring-4 focus:ring-white/50 z-10"
              aria-label="Close image"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div
              className="relative w-full max-w-6xl max-h-[90vh] p-8"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage}
                alt="Product large view"
                fill
                className="object-contain"
                draggable={false}
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
