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
  productID?: string; // Added Product ID support
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

  // Image navigation
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

  // Auto-update main image when index changes
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
    if (!text) return <p className="text-slate-600">No description available</p>;

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
            className={`mb-6 ml-6 ${
              isOrdered ? "list-decimal" : "list-disc"
            } text-slate-600 space-y-3`}
          >
            {lines
              .filter((line) => line.trim())
              .map((line, lIndex) => {
                const cleanLine = line
                  .replace(/^[\s]*[-*•]\s/, "")
                  .replace(/^[\s]*\d+\.\s/, "");
                return (
                  <li key={lIndex} className="leading-relaxed text-base">
                    {cleanLine}
                  </li>
                );
              })}
          </ListTag>
        );
      }

      return (
        <p key={pIndex} className="text-slate-600 text-base leading-relaxed mb-6">
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
          <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-20">
            <div className="max-w-md w-full text-center">
              <div className="bg-white border-2 border-slate-200 rounded-3xl p-12 shadow-xl">
                <AlertCircle className="w-20 h-20 text-slate-400 mx-auto mb-8" />
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Product Not Found</h3>
                <p className="text-slate-600 mb-8 leading-relaxed">{loadError}</p>
                <a href="/products" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-slate-800 transition-all shadow-lg">
                  ← Back to Products
                </a>
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
      
      {/* Professional Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 px-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-slate-800/20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-xl mb-6 shadow-2xl border border-white/20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <Package className="w-10 h-10 text-slate-200" />
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {productData.name}
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Product ID: <span className="font-mono bg-slate-800/50 px-3 py-1 rounded-lg backdrop-blur-sm">{productData.productID || productData.$id.slice(-8)}</span>
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-6 md:px-12 lg:px-24 xl:px-32 py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Images Section - Professional */}
            <motion.section
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Main Image */}
              <div className="relative group mb-8">
                <motion.div
                  onClick={() => {
                    setLightboxImage(currentMainImage);
                    setLightboxOpen(true);
                  }}
                  className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 aspect-[4/3] lg:aspect-square cursor-zoom-in shadow-2xl hover:shadow-3xl transition-all duration-500 border border-slate-200 hover:border-slate-300"
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
                    className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-105"
                    draggable={false}
                  />

                  {/* Professional Zoom Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                    <motion.div
                      className="bg-white/95 backdrop-blur-xl rounded-3xl p-4 shadow-2xl border border-white/50"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring" }}
                    >
                      <ZoomIn className="w-8 h-8 text-slate-800 font-bold" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Navigation Arrows */}
                {parsedImages.all.length > 1 && (
                  <>
                    <motion.button
                      onClick={handlePrevImage}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white rounded-3xl p-4 shadow-2xl border border-slate-200 hover:border-slate-300 transition-all backdrop-blur-xl z-20"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6 text-slate-800" />
                    </motion.button>
                    <motion.button
                      onClick={handleNextImage}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white rounded-3xl p-4 shadow-2xl border border-slate-200 hover:border-slate-300 transition-all backdrop-blur-xl z-20"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6 text-slate-800" />
                    </motion.button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {parsedImages.all.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {parsedImages.all.map((img, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative rounded-2xl overflow-hidden aspect-square bg-slate-100 shadow-md transition-all border-2 ${
                        currentMainImage === img
                          ? "border-slate-900 ring-4 ring-slate-200 shadow-xl scale-105"
                          : "border-slate-200 hover:border-slate-400 hover:shadow-lg"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Image
                        src={img}
                        alt={`${productData.name} view ${idx + 1}`}
                        fill
                        className="object-cover"
                        draggable={false}
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.section>

            {/* Product Details - Professional */}
            <motion.section
              className="lg:pt-12"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Description Card */}
              <motion.div
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 mb-12 shadow-2xl border border-slate-200/50 hover:shadow-3xl transition-all duration-500"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl flex items-center justify-center shadow-lg">
                    <Info className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-black text-slate-900">
                    Product Description
                  </h2>
                </div>
                <div className="prose prose-lg max-w-none text-slate-700 leading-relaxed">
                  {renderDescription(productData.description)}
                </div>
              </motion.div>

              {/* Product ID Card */}
              {productData.productID && (
                <motion.div
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 backdrop-blur-xl rounded-3xl p-8 mb-12 shadow-2xl border border-blue-200/50 hover:shadow-3xl transition-all duration-500"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900">
                      Product ID
                    </h3>
                  </div>
                  <div className="bg-white/80 px-8 py-6 rounded-2xl shadow-xl border border-blue-100 backdrop-blur-sm">
                    <code className="text-2xl font-mono font-bold text-blue-900 bg-blue-100/50 px-6 py-4 rounded-xl block tracking-wide">
                      {productData.productID}
                    </code>
                  </div>
                </motion.div>
              )}

              {/* Specifications Card */}
              {/* {Object.entries(productData).some(
                ([key]) => !excludedFields.includes(key) && key !== "productID"
              ) && (
                // <motion.div
                //   className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 shadow-2xl border border-slate-200/50 hover:shadow-3xl transition-all duration-500"
                //   initial={{ y: 30, opacity: 0 }}
                //   animate={{ y: 0, opacity: 1 }}
                //   transition={{ delay: 0.5 }}
                // >
                //   <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-200">
                //     <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                //       <Package className="w-6 h-6 text-white" />
                //     </div>
                //     <h2 className="text-2xl lg:text-3xl font-black text-slate-900">
                //       Technical Specifications
                //     </h2>
                //   </div>
                  
                //   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                //     {Object.entries(productData).map(([key, value]) => {
                //       if (excludedFields.includes(key) || key === "productID") return null;

                //       const displayKey = key
                //         .replace(/([A-Z])/g, " $1")
                //         .replace(/^./, str => str.toUpperCase());

                //       const displayValue =
                //         typeof value === "object"
                //           ? JSON.stringify(value, null, 2)
                //           : String(value || "N/A");

                //       return (
                //         <div key={key} className="group space-y-2 p-6 bg-slate-50/50 rounded-2xl border border-slate-200/50 hover:bg-slate-100 hover:border-slate-300 transition-all">
                //           <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide group-hover:text-slate-700">
                //             {displayKey}
                //           </span>
                //           <span className="text-slate-900 text-lg font-semibold break-words leading-tight bg-white/60 px-4 py-2 rounded-xl inline-block shadow-sm">
                //             {displayValue}
                //           </span>
                //         </div>
                //       );
                //     })}
                //   </div>
                // </motion.div>
              )} */}
            </motion.section>
          </div>
        </div>
      </main>

      <Footer />

      {/* Professional Lightbox */}
      <AnimatePresence>
        {lightboxOpen && lightboxImage && (
          <motion.div
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 bg-slate-900/98 backdrop-blur-2xl flex items-center justify-center z-[9999] cursor-zoom-out p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(false);
              }}
              className="absolute top-8 right-8 w-16 h-16 bg-black hover:bg-black backdrop-blur-2xl rounded-3xl flex items-center justify-center text-white text-2xl font-black shadow-2xl border-2 border-white/30 transition-all duration-300 z-10"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Close image"
            >
              <X className="w-8 h-8" />
            </motion.button>

            <motion.div
              className="relative w-full h-[90vh] max-w-6xl mx-auto"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              transition={{ type: "spring", damping: 25 }}
            >
              <Image
                src={lightboxImage}
                alt="Product large view"
                fill
                className="object-contain rounded-3xl shadow-3xl"
                draggable={false}
                priority
                quality={95}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .bg-grid-slate-800\\/20 {
          background-image: 
            linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </>
  );
}
