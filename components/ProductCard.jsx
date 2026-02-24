"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaEye as Eye, FaArrowRight as ArrowRight } from "react-icons/fa6";
import { useAppContext } from "@/context/AppContext";

const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

const ProductCard = ({ product }) => {
  const { router } = useAppContext();

  let imageUrls = [];
  try {
    imageUrls = product.images ? JSON.parse(product.images) : [];
  } catch {
    imageUrls = [];
  }

  const firstImage =
    imageUrls.length > 0
      ? imageUrls[0].startsWith("http")
        ? imageUrls[0]
        : `https://fra.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${imageUrls[0]}/view?project=${PROJECT_ID}`
      : "/upload_area_placeholder.png";

  const handleClick = () => {
    router.push("/product/" + product.$id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      onClick={handleClick}
      className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200 hover:border-orange-400"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <Image
          src={firstImage}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-all duration-300"
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1 }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
              <Eye className="w-6 h-6 text-gray-800" />
            </div>
          </motion.div>
        </div>

        {/* Category Badge */}
        {product.category && (
          <div className="absolute top-3 left-3 bg-orange-700 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            {product.category}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Product Name */}
        <h3 className="font-bold text-base md:text-lg text-gray-900 line-clamp-2 leading-tight group-hover:text-orange-700 transition-colors">
          {product.name}
        </h3>

        {/* Product Description Preview (if available) */}
        {product.description && (
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* View Details Button */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm font-medium text-gray-500">View Details</span>
          <div className="flex items-center gap-2 text-orange-700 font-bold group-hover:gap-3 transition-all">
            <span className="text-sm">Explore</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
