"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/components/AuthProvider";
import { databases } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import { ID } from "appwrite";


//FOR USER ADDRESS DATABASE
const USER_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_DATABASE_ID;
const USER_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID;

//FOR ORDER DATABASE
const ORDER_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_ORDER_DATABASE_ID;
const ORDER_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ORDER_COLLECTION_ID;

const OrderSummary = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Call hooks here at component level
  const {
    currency = "$",
    getCartCount = () => 0,
    getCartAmount = () => 0,
    clearCart,
    products,
    cartItems,
  } = useAppContext();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }

    if (user) {
      const fetchUserAddresses = async () => {
        setLoadingAddresses(true);
        try {
          const response = await databases.listDocuments(USER_DATABASE_ID, USER_COLLECTION_ID);
          const addresses = (response.documents || []).filter((doc) => doc.userId === user.$id);
          setUserAddresses(addresses);
          if (addresses.length > 0 && !selectedAddress) {
            setSelectedAddress(addresses[0]);
          }
        } catch (error) {
          console.error("Error fetching addresses:", error);
          setError("Failed to load addresses.");
        } finally {
          setLoadingAddresses(false);
        }
      };

      fetchUserAddresses();
    }
  }, [user, authLoading, selectedAddress, router]);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {
    setError("");
    if (!selectedAddress) {
      alert("Please select an address before placing the order.");
      return;
    }
    if (!user) {
      alert("You must be logged in to place an order.");
      router.push("/login");
      return;
    }
    if (getCartCount() === 0) {
      alert("Your cart is empty.");
      return;
    }

    setPlacingOrder(true);
    try {
      // Prepare items array with product details and quantity
      const items = Object.keys(cartItems).map((itemId) => {
        const product = products.find((p) => p.$id === itemId);
        return {
          product: {
            $id: product.$id,
            name: product.name,
            offerPrice: product.offerPrice,
          },
          quantity: cartItems[itemId],
        };
      });

      const orderDoc = {
        userId: user.$id,
        items: JSON.stringify(items),
        amount: getCartAmount().toString(),
        address: JSON.stringify(selectedAddress),
        date: new Date().toISOString(),
        paymentMethod: "COD",
        paymentStatus: "Pending",
      };

      await databases.createDocument(ORDER_DATABASE_ID, ORDER_COLLECTION_ID, ID.unique(), orderDoc);

      alert(`Order placed successfully for ${selectedAddress.fullName}`);

      if (typeof clearCart === "function") clearCart();

      router.push("/my-orders");
    } catch (err) {
      console.error("Failed to create order:", err);
      setError("Failed to place order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700">Order Summary</h2>
      <hr className="border-gray-500/30 my-5" />

      <div className="space-y-6">
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">Select Address</label>
          <div className="relative inline-block w-full text-sm border">
            <button
              className="peer w-full text-left px-4 pr-2 py-2 bg-white text-gray-700 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              disabled={loadingAddresses}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
              type="button"
            >
              <span>
                {selectedAddress
                  ? `${selectedAddress.fullName ?? "Unknown"}, ${selectedAddress.area ?? ""}, ${
                      selectedAddress.city ?? ""
                    }, ${selectedAddress.state ?? ""}`
                  : "Select Address"}
              </span>
              <svg
                className={`w-5 h-5 inline float-right transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-0" : "-rotate-90"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6B7280"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul
                className="absolute w-full bg-white border shadow-md mt-1 z-10 py-1.5 max-h-60 overflow-auto"
                role="listbox"
                tabIndex={-1}
              >
                {userAddresses.map((address, index) => (
                  <li
                    key={address.$id || index}
                    className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer"
                    onClick={() => handleAddressSelect(address)}
                    role="option"
                    aria-selected={selectedAddress === address}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") handleAddressSelect(address);
                    }}
                  >
                    {address.fullName ?? "Unknown"}, {address.area ?? ""}, {address.city ?? ""}{" "}
                    {address.state ?? ""}
                  </li>
                ))}
                <li
                  onClick={() => router.push("/add-address")}
                  className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer text-center font-semibold text-orange-600"
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") router.push("/add-address");
                  }}
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">Promo Code</label>
          <div className="flex flex-col items-start gap-3">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-grow w-full outline-none p-2.5 text-gray-600 border"
              aria-label="Promo code input"
            />
            <button className="bg-orange-600 text-white px-9 py-2 hover:bg-orange-700" type="button">
              Apply
            </button>
          </div>
        </div>

        <hr className="border-gray-500/30 my-5" />

        <div className="space-y-4">
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
              {Math.floor(getCartAmount() * 0.02)}
            </p>
          </div>
          <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">
            <p>Total</p>
            <p>
              {currency}
              {getCartAmount() + Math.floor(getCartAmount() * 0.02)}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={createOrder}
        disabled={placingOrder}
        className={`w-full bg-orange-600 text-white py-3 mt-5 hover:bg-orange-700 ${
          placingOrder ? "opacity-50 cursor-not-allowed" : ""
        }`}
        type="button"
      >
        {placingOrder ? "Placing Order..." : "Place Order"}
      </button>

      {error && <p className="mt-2 text-center text-red-600">{error}</p>}
    </div>
  );
};

export default OrderSummary;
