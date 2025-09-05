"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/components/AuthProvider";
import { databases } from "@/lib/appwrite";
import { useRouter } from "next/navigation";

const USER_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_DATABASE_ID;
const USER_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID;

const ORDER_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_ORDER_DATABASE_ID;
const ORDER_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ORDER_COLLECTION_ID;

/**
 * Generates a 15-digit numeric string to be used as order ID.
 */
const generate15DigitOrderId = () => {
  let id = "";
  while (id.length < 15) {
    // Append random digits until length is 15
    id += Math.floor(Math.random() * 10).toString();
  }
  return id;
};

const OrderSummary = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const {
    currency = "₹",
    getCartCount,
    getCartAmount,
    clearCart,
    products,
    cartItems,
  } = useAppContext();

  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // Fetch addresses from Appwrite
  useEffect(() => {
    if (!user) return;

    const fetchUserAddresses = async () => {
      setLoadingAddresses(true);
      try {
        const response = await databases.listDocuments(
          USER_DATABASE_ID,
          USER_COLLECTION_ID
        );
        const addresses = (response.documents || []).filter(
          (doc) => doc.userId === user.$id
        );
        setUserAddresses(addresses);

        if (addresses.length > 0 && !selectedAddress) {
          setSelectedAddress(addresses[0]);
        }
      } catch (err) {
        console.error("Error fetching addresses:", err);
        setError("Failed to load addresses.");
      } finally {
        setLoadingAddresses(false);
      }
    };

    fetchUserAddresses();
  }, [user, selectedAddress]);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  // Create new order with 15-digit order ID
  const createOrder = async () => {
    setError("");

    if (!selectedAddress) {
      alert("Please select an address before placing the order.");
      return;
    }
    if (!user) {
      router.push("/login");
      return;
    }
    if (getCartCount() === 0) {
      alert("Your cart is empty.");
      return;
    }

    setPlacingOrder(true);
    try {
      // Build cart items with images
      const items = Object.keys(cartItems).map((itemId) => {
        const product = products.find((p) => p.$id === itemId);
        return {
          $id: product.$id,
          name: product.name,
          offerPrice: product.offerPrice,
          quantity: cartItems[itemId],
          images: (() => {
            try {
              return Array.isArray(product.images)
                ? product.images
                : JSON.parse(product.images);
            } catch {
              return product.images ? [product.images] : [];
            }
          })(),
        };
      });

      // Generate a unique 15-digit order ID
      const newOrderId = generate15DigitOrderId();

      // Prepare order document
      const orderDoc = {
        orderId: newOrderId, // custom 15-digit order ID field
        userId: user.$id,
        items: JSON.stringify(items),
        amount: getCartAmount().toString(),
        address: JSON.stringify(selectedAddress),
        date: new Date().toISOString(),
        paymentMethod: "COD",
        paymentStatus: "Pending",
        orderStatus: "Pending",
        image_ids: JSON.stringify(items.flatMap((item) => item.images || [])),
      };

      // Create document using the generated ID
      await databases.createDocument(
        ORDER_DATABASE_ID,
        ORDER_COLLECTION_ID,
        newOrderId,
        orderDoc
      );

      alert(`✅ Order placed successfully! Your Order ID is ${newOrderId}`);

      // Clear cart after successful order placement
      if (typeof clearCart === "function") {
        await clearCart();
      }

      router.push("/my-orders");
    } catch (err) {
      console.error("Failed to create order:", err);
      setError("Failed to place order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  const taxAmount = Math.floor(getCartAmount() * 0.02);
  const totalAmount = getCartAmount() + taxAmount;

  return (
    <div className="w-full md:w-96 bg-gray-50 p-5 rounded-lg shadow-sm border">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700">Order Summary</h2>
      <hr className="border-gray-300 my-5" />

      <div className="space-y-6">
        {/* Address Dropdown */}
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Select Address
          </label>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              disabled={loadingAddresses}
              className="w-full text-left px-4 py-2 bg-white border text-gray-700 focus:outline-none"
            >
              {selectedAddress
                ? `${selectedAddress.fullName ?? "Unknown"}, ${
                    selectedAddress.area ?? ""
                  }, ${selectedAddress.city ?? ""}, ${selectedAddress.state ?? ""}`
                : "Select Address"}
              <span className="float-right">▼</span>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border shadow-md mt-1 z-10 max-h-60 overflow-auto">
                {userAddresses.map((address) => (
                  <li
                    key={address.$id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullName ?? "Unknown"}, {address.area ?? ""},{" "}
                    {address.city ?? ""} {address.state ?? ""}
                  </li>
                ))}
                <li
                  onClick={() => router.push("/add-address")}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-center font-semibold text-orange-600"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Promo Code */}
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Promo Code
          </label>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Enter promo code"
              className="w-full outline-none p-2.5 text-gray-600 border"
            />
            <button
              type="button"
              className="bg-orange-600 text-white px-6 py-2 hover:bg-orange-700 transition"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-4 border-t pt-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-gray-600">Items {getCartCount()}</p>
            <p className="text-gray-800">
              {currency}
              {getCartAmount()}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping Fee</p>
            <p className="font-medium text-gray-800">Free</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Tax (2%)</p>
            <p className="font-medium text-gray-800">
              {currency}
              {taxAmount}
            </p>
          </div>
          <div className="flex justify-between text-lg md:text-xl font-semibold">
            <p>Total</p>
            <p>
              {currency}
              {totalAmount}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={createOrder}
        disabled={placingOrder}
        className={`w-full bg-orange-600 text-white py-3 mt-5 rounded-lg hover:bg-orange-700 transition ${
          placingOrder ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {placingOrder ? "Placing Order..." : "Place Order"}
      </button>

      {error && <p className="mt-3 text-center text-red-600">{error}</p>}
    </div>
  );
};

export default OrderSummary;
