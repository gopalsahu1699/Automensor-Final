"use client";

import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";

const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

const Cart = () => {
  const { products, cartItems, addToCart, updateCartQuantity, getCartCount, getCartAmount } = useAppContext();
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (products && Object.keys(cartItems).length >= 0) {
      setLoading(false);
    }
  }, [products, cartItems]);

  // Helper to get product image URL
  const getFirstImage = (product) => {
    let imageUrls = [];
    try {
      imageUrls = product.images ? JSON.parse(product.images) : [];
    } catch {
      imageUrls = [];
    }
    if (imageUrls.length === 0) return "/upload_area_placeholder.png";
    const first = imageUrls[0];
    return first.startsWith("http")
      ? first
      : `https://fra.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${first}/view?project=${PROJECT_ID}`;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-[70vh]">
          <p className="text-gray-500 text-lg">Loading cart...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 lg:px-32 pt-14 mb-20">
        {/* Cart Table */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-6">
            <p className="text-2xl md:text-3xl text-gray-800">
              Your <span className="font-medium text-orange-600">Cart</span>
            </p>
            <p className="text-lg md:text-xl text-gray-500/80">{getCartCount()} Items</p>
          </div>

          {getCartCount() === 0 ? (
            <div className="w-full flex justify-center items-center py-20">
              <p className="text-gray-500 text-lg">Your cart is empty</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-gray-600 font-medium">Product</th>
                    <th className="px-4 py-3 text-gray-600 font-medium">Price</th>
                    <th className="px-4 py-3 text-gray-600 font-medium">Quantity</th>
                    <th className="px-4 py-3 text-gray-600 font-medium">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Object.keys(cartItems).map((itemId) => {
                    const product = products.find((p) => p.$id === itemId);
                    if (!product || cartItems[itemId] <= 0) return null;

                    return (
                      <tr key={itemId} className="hover:bg-gray-50 transition">
                        <td className="flex items-center gap-4 px-4 py-4">
                          <div className="rounded-lg overflow-hidden bg-gray-100 p-2">
                            <Image
                              src={getFirstImage(product)}
                              alt={product.name}
                              className="w-16 h-16 object-cover"
                              width={64}
                              height={64}
                            />
                          </div>
                          <div>
                            <p className="text-gray-800 font-medium">{product.name}</p>
                            <button
                              className="text-xs text-orange-600 mt-1 hover:underline"
                              onClick={() => updateCartQuantity(product.$id, 0)}
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-gray-600 font-medium">${product.offerPrice}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateCartQuantity(product.$id, cartItems[itemId] - 1)
                              }
                            >
                              <Image src={assets.decrease_arrow} alt="decrease" className="w-4 h-4" />
                            </button>
                            <input
                              type="number"
                              value={cartItems[itemId]}
                              min={0}
                              onChange={(e) =>
                                updateCartQuantity(product.$id, Math.max(0, Number(e.target.value)))
                              }
                              className="w-12 border text-center rounded"
                            />
                            <button onClick={() => addToCart(product.$id)}>
                              <Image src={assets.increase_arrow} alt="increase" className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-gray-600 font-medium">
                          ${(product.offerPrice * cartItems[itemId]).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {error && <p className="text-red-600 mt-4">{error}</p>}

          {/* Continue Shopping */}
          <button
            onClick={() => router.push("/all-products")}
            className="group flex items-center mt-6 gap-2 text-orange-600 font-medium hover:underline"
          >
            <Image
              className="group-hover:-translate-x-1 transition"
              src={assets.arrow_right_icon_colored}
              alt="arrow"
            />
            Continue Shopping
          </button>
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-1/3">
          <OrderSummary totalAmount={getCartAmount()} totalCount={getCartCount()} />
        </div>
      </div>
    </>
  );
};

export default Cart;
