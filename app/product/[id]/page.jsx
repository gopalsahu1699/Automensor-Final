"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight, Package, Info } from "lucide-react";
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  const handlePrevImage = () => {
    const prevIndex = (currentImageIndex - 1 + fullImageUrls.length) % fullImageUrls.length;
    setCurrentImageIndex(prevIndex);
    setMainImage(fullImageUrls[prevIndex]);
  };

  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % fullImageUrls.length;
    setCurrentImageIndex(nextIndex);
    setMainImage(fullImageUrls[nextIndex]);
  };

  // Function to render description with proper formatting
  const renderDescription = (text) => {
    if (!text) return null;

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
      } else {
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
                <div
                  onClick={() => openLightbox(mainImage)}
                  className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-6 aspect-square cursor-zoom-in shadow-xl hover:shadow-2xl transition-shadow"
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
                    className="p-4"
                  />
                  
                  {/* Zoom Icon Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-3">
                      <ZoomIn className="w-6 h-6 text-gray-800" />
                    </div>
                  </div>
                </div>

                {/* Image Navigation Arrows */}
                {fullImageUrls.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-800" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-800" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-3">
                {fullImageUrls.map((img, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => {
                      setMainImage(img);
                      setCurrentImageIndex(idx);
                    }}
                    onDoubleClick={() => openLightbox(img)}
                    className={`relative rounded-xl overflow-hidden aspect-square bg-gray-100 focus:outline-none transition-all ${
                      mainImage === img
                        ? "ring-4 ring-orange-500 scale-105"
                        : "ring-2 ring-gray-200 hover:ring-orange-300"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`View image ${idx + 1}`}
                    tabIndex={0}
                  >
                    <Image
                      src={img}
                      alt={`${productData.name} ${idx + 1}`}
                      fill
                      style={{ objectFit: "contain" }}
                      className="p-2"
                      draggable={false}
                    />
                  </motion.button>
                ))}
              </div>
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
                  <p className="text-gray-500 mt-2">Product ID: {productData.$id.slice(-8)}</p>
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Info className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Product Description</h2>
                </div>
                <div className="prose prose-lg max-w-none">
                  {renderDescription(productData.description)}
                </div>
              </div>

              {/* Additional Product Data */}
              {Object.entries(productData).some(
                ([key]) =>
                  !["$id", "name", "description", "images", "$createdAt", "$updatedAt", "$permissions", "$collectionId", "$databaseId"].includes(key)
              ) && (
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border-2 border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Specifications</h2>
                  <div className="space-y-4">
                    {Object.entries(productData).map(([key, value]) => {
                      if (
                        ["$id", "name", "description", "images", "$createdAt", "$updatedAt", "$permissions", "$collectionId", "$databaseId"].includes(key)
                      ) {
                        return null;
                      }

                      return (
                        <div key={key} className="flex flex-col pb-4 border-b border-gray-200 last:border-0">
                          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                          <span className="text-gray-900 text-lg font-medium">
                            {typeof value === "object" ? JSON.stringify(value, null, 2) : String(value)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      <Footer />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(false);
              }}
              className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-all hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/50 z-10"
              aria-label="Close large image"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              className="relative w-full max-w-6xl max-h-[90vh] p-8"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <Image
                src={lightboxImage}
                alt="Large product view"
                fill
                style={{ objectFit: "contain" }}
                draggable={false}
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Product;
