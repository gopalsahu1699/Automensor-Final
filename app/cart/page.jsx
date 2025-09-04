"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import OrderSummary from "@/components/OrderSummary";
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/components/AuthProvider";
import { assets } from "@/assets/assets";

const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

function getFirstImage(product) {
  if (!product) return "/upload_area_placeholder.png";

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
}

const Cart = () => {
  const {
    products,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
    setCartItems,
  } = useAppContext();

  const { user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  // Load cartItems from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");
      if (savedCart) setCartItems(JSON.parse(savedCart));
    } catch (err) {
      console.error("Failed to parse cart from localStorage", err);
    }
    setLoading(false);
  }, [setCartItems]);

  // Save cartItems to localStorage on change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

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

  const cartCount = getCartCount();

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-10 px-4 md:px-16 lg:px-32 pt-14 mb-20">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-6">
            <p className="text-2xl md:text-3xl text-gray-800">
              Your <span className="font-medium text-orange-600">Cart</span>
            </p>
            <p className="text-lg md:text-xl text-gray-500/80">
              {cartCount} Items
            </p>
          </div>

          {cartCount === 0 ? (
            <div className="w-full flex justify-center items-center py-20">
              <p className="text-gray-500 text-lg">Your cart is empty</p>
            </div>
          ) : (
            <>
              {/* Table for desktop */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-gray-600 font-medium">
                        Product
                      </th>
                      <th className="px-4 py-3 text-gray-600 font-medium">
                        Price
                      </th>
                      <th className="px-4 py-3 text-gray-600 font-medium">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-gray-600 font-medium">
                        Subtotal
                      </th>
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
                                alt={product.name || "Product"}
                                width={64}
                                height={64}
                                className="w-16 h-16 object-cover rounded"
                                unoptimized
                              />
                            </div>
                            <div>
                              <p className="text-gray-800 font-medium">
                                {product.name}
                              </p>
                              <button
                                className="text-xs text-orange-600 mt-1 hover:underline"
                                onClick={() =>
                                  updateCartQuantity(product.$id, 0)
                                }
                              >
                                Remove
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-gray-600 font-medium">
                            ₹{product.offerPrice}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateCartQuantity(
                                    product.$id,
                                    cartItems[itemId] - 1
                                  )
                                }
                                aria-label="Decrease quantity"
                                className="p-1"
                              >
                                <Image
                                  src={assets.decrease_arrow}
                                  alt="decrease"
                                  className="w-4 h-4"
                                />
                              </button>
                              <input
                                type="number"
                                value={cartItems[itemId]}
                                min={0}
                                onChange={(e) =>
                                  updateCartQuantity(
                                    product.$id,
                                    Math.max(0, Number(e.target.value))
                                  )
                                }
                                className="w-12 border text-center rounded"
                                aria-label="Quantity"
                              />
                              <button
                                onClick={() => addToCart(product.$id)}
                                aria-label="Increase quantity"
                                className="p-1"
                              >
                                <Image
                                  src={assets.increase_arrow}
                                  alt="increase"
                                  className="w-4 h-4"
                                />
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-gray-600 font-medium">
                            ₹{(product.offerPrice * cartItems[itemId]).toFixed(
                              2
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile card layout */}
              <div className="md:hidden flex flex-col gap-4">
                {Object.keys(cartItems).map((itemId) => {
                  const product = products.find((p) => p.$id === itemId);
                  if (!product || cartItems[itemId] <= 0) return null;

                  return (
                    <div
                      key={itemId}
                      className="border border-gray-200 rounded-lg p-4 flex gap-4 items-center"
                    >
                      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 p-2">
                        <Image
                          src={getFirstImage(product)}
                          alt={product.name || "Product"}
                          width={80}
                          height={80}
                          className="object-cover rounded"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium text-lg">
                          {product.name}
                        </p>
                        <p className="text-orange-600 font-semibold mt-1">
                          ₹{product.offerPrice}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateCartQuantity(
                                product.$id,
                                cartItems[itemId] - 1
                              )
                            }
                            aria-label="Decrease quantity"
                            className="p-1"
                          >
                            <Image
                              src={assets.decrease_arrow}
                              alt="decrease"
                              className="w-5 h-5"
                            />
                          </button>
                          <input
                            type="number"
                            value={cartItems[itemId]}
                            min={0}
                            onChange={(e) =>
                              updateCartQuantity(
                                product.$id,
                                Math.max(0, Number(e.target.value))
                              )
                            }
                            className="w-14 border text-center rounded"
                            aria-label="Quantity"
                          />
                          <button
                            onClick={() => addToCart(product.$id)}
                            aria-label="Increase quantity"
                            className="p-1"
                          >
                            <Image
                              src={assets.increase_arrow}
                              alt="increase"
                              className="w-5 h-5"
                            />
                          </button>
                        </div>
                        <button
                          className="text-xs text-orange-600 mt-2 hover:underline"
                          onClick={() => updateCartQuantity(product.$id, 0)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="text-gray-600 font-semibold text-right min-w-[70px]">
                        ₹{(product.offerPrice * cartItems[itemId]).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Continue Shopping */}
          <button
            onClick={() => router.push("/all-products")}
            className="group flex items-center mt-6 gap-2 text-orange-600 font-medium hover:underline"
          >
            <Image
              src={assets.arrow_right_icon_colored}
              alt="arrow"
              className="group-hover:-translate-x-1 transition"
            />
            Continue Shopping
          </button>
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-1/3">
          <OrderSummary
            totalAmount={getCartAmount()}
            totalCount={getCartCount()}
          />
        </div>
      </div>
    </>
  );
};

export default Cart;
