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
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;


function getImageUrl(idOrUrl) {
  if (!idOrUrl) return "/upload_area_placeholder.png";
  return idOrUrl.startsWith("http")
    ? idOrUrl
    : `https://fra.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${idOrUrl}/view?project=${PROJECT_ID}`;
}


const MyOrders = () => {
  const { currency = "$" } = useAppContext();
  const { user, loading: authLoading } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //checking database 

  

  // ✅ Fetch user orders
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
 console.log("📦 Raw Appwrite response:", res); //
      const userOrders = res.documents
        .filter((order) => order.userId === user.$id)
        .map((order) => {
          console.log("📝 Raw order document:", order);
          let items = [];
          let address = {};
          let imageIds = [];

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

          try {
            imageIds = order.image_ids ? JSON.parse(order.image_ids) : [];
          } catch {
            imageIds = [];
          }

          return {
            ...order,
            items,
            address,
            imageIds,
            amount: parseFloat(order.amount || "0"),
          };
        });

      setOrders(userOrders);
    } catch (err) {
      console.error("❌ Failed to load orders:", err);
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
                  {/* ✅ Product Image + Items */}
                  <div className="flex-1 flex gap-5 max-w-80">
                    <Image
                      className="w-16 h-16 object-cover rounded"
                      src={
                        order.imageIds.length > 0
                          ? getImageUrl(order.imageIds[0])
                          : "/upload_area_placeholder.png"
                      }
                      alt="Order product"
                      width={64}
                      height={64}
                      unoptimized
                    />

                    <p className="flex flex-col gap-3">
                      <span className="font-medium text-base">
                        {order.items.length > 0
                          ? order.items
                              .map((item) =>
                                item.name
                                  ? `${item.name} x ${item.quantity}`
                                  : "Unknown item"
                              )
                              .join(", ")
                          : "No items"}
                      </span>
                      <span>Items: {order.items.length}</span>
                    </p>
                  </div>

                  {/* ✅ Shipping Address */}
                  <div>
                    <p>
                      <span className="font-medium">
                        {order.address?.fullName || "Unknown"}
                      </span>
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

                  {/* ✅ Total Amount */}
                  <p className="font-medium my-auto">
                    {currency}
                    {Number.isFinite(order.amount)
                      ? order.amount.toFixed(2)
                      : "-"}
                  </p>

                  {/* ✅ Payment Info */}
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
