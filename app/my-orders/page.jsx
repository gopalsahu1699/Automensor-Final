"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import { useAuth } from "@/components/AuthProvider";
import { databases } from "@/lib/appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_ORDER_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ORDER_COLLECTION_ID;

const MyOrders = () => {
  const { currency = "$" } = useAppContext();
  const { user, loading: authLoading } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Defensive fetch for authenticated user's orders
  const fetchOrders = async () => {
    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);

      // Defensive JSON parsing for each order
      const userOrders = res.documents
        .filter((order) => order.userId === user.$id)
        .map((order) => {
          // Use try/catch for JSON parse to avoid runtime error on corrupt/incomplete data
          let items = [];
          let address = {};
          try {
            items = order.items ? JSON.parse(order.items) : [];
          } catch {
            items = [];
          }
          try {
            address = order.address ? JSON.parse(order.address) : {};
          } catch {
            address = {};
          }
          return {
            ...order,
            items,
            address,
            amount: parseFloat(order.amount || "0"),
          };
        });
      setOrders(userOrders);
    } catch (err) {
      console.error("Failed to load orders:", err);
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user) {
      fetchOrders();
    } else if (!authLoading && !user) {
      setOrders([]);
      setLoading(false);
    }
  }, [user, authLoading]);

  if (authLoading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-[70vh]">
          <Loading />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
        <div className="space-y-5">
          <h2 className="text-lg font-medium mt-6">My Orders</h2>

          {loading ? (
            <Loading />
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : orders.length === 0 ? (
            <p className="text-center text-gray-500">No orders available.</p>
          ) : (
            <div className="max-w-5xl border-t border-gray-300 text-sm">
              {orders.map((order, index) => (
                <div
                  key={order.$id || index}
                  className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300"
                >
                  <div className="flex-1 flex gap-5 max-w-80">
                    <Image
                      className="max-w-16 max-h-16 object-cover"
                      src="/box_icon.svg"
                      alt="box_icon"
                      width={64}
                      height={64}
                      unoptimized
                    />
                    <p className="flex flex-col gap-3">
                      <span className="font-medium text-base">
                        {order.items && order.items.length > 0
                          ? order.items
                              .map((item) =>
                                item.product && item.product.name
                                  ? `${item.product.name} x ${item.quantity}`
                                  : "Unknown item"
                              )
                              .join(", ")
                          : "No items"}
                      </span>
                      <span>Items: {order.items ? order.items.length : 0}</span>
                    </p>
                  </div>

                  <div>
                    <p>
                      <span className="font-medium">{order.address?.fullName || "Unknown"}</span>
                      <br />
                      <span>{order.address?.area || ""}</span>
                      <br />
                      <span>
                        {order.address?.city || ""}, {order.address?.state || ""}
                      </span>
                      <br />
                      <span>{order.address?.phoneNumber || ""}</span>
                    </p>
                  </div>

                  <p className="font-medium my-auto">
                    {currency}
                    {Number.isFinite(order.amount) ? order.amount.toFixed(2) : "-"}
                  </p>

                  <div>
                    <p className="flex flex-col">
                      <span>Method: {order.paymentMethod || "COD"}</span>
                      <span>
                        Date:{" "}
                        {order.date
                          ? new Date(order.date).toLocaleDateString()
                          : "Unknown"}
                      </span>
                      <span>Payment: {order.paymentStatus || "Pending"}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
