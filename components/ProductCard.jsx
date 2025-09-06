"use client";

import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";

const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

const ProductCard = ({ product }) => {
  const { currency, router, addToCart } = useAppContext();

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

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product.$id); // Use $id here
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCart(product.$id);
    router.push("/cart");
  };

  return (
    <div
      onClick={() => {
        router.push("/product/" + product.$id); // Use $id
        scrollTo(0, 0);
      }}
      className="flex flex-col bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer max-w-[240px] w-full overflow-hidden pt-2 pb-4 px-3"
    >
      {/* Product Image */}
      <div className="relative w-full h-36 flex items-center justify-center overflow-hidden rounded-md">
        <Image
          src={firstImage}
          alt={product.name}
          className="object-contain w-full h-full"
          width={220}
          height={200}
        />
        {/* <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-orange-50 transition"
        >
          <Image src={assets.heart_icon} alt="wishlist" width={20} height={20} />
        </button> */}
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-1 mt-2">
        <p className="font-semibold text-base text-gray-800 truncate">{product.name}</p>
        {/* <div className="flex items-center gap-1 text-sm">
          <span className="text-gray-700 font-medium">4.5</span>
          <span className="flex gap-0.5 pt-0.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                width="15"
                height="15"
                viewBox="0 0 20 20"
                fill={i < 4.5 ? "#F97316" : "#E5E7EB"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="10,1 12.4,7.5 19,7.5 13.5,11.5 15.7,17.8 10,13.9 4.3,17.8 6.5,11.5 1,7.5 7.6,7.5" />
              </svg>
            ))}
          </span>
        </div> */}
        {/* <p className="font-bold text-lg text-gray-900 mt-1">
          {currency}{product.offerPrice}
        </p> */}
        {/* <div className="flex gap-2 mt-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 border border-gray-300 font-medium rounded-full py-[6px] text-sm hover:bg-gray-100 transition"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-orange-600 rounded-full py-[6px] text-sm font-semibold text-white hover:bg-orange-700 transition"
          >
            Buy Now
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ProductCard;
