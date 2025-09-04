"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/components/AuthProvider";
import { databases } from "@/lib/appwrite";
import OrderCard from "./components/OrderCard";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_ORDER_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ORDER_COLLECTION_ID;

const OrderListPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      const userOrders = res.documents.filter(doc => doc.userId === user.$id).map(doc => {
        let items = [];
        let address = {};
        let imageIds = [];
        try { items = doc.items ? JSON.parse(doc.items) : []; } catch {}
        try { address = doc.address ? JSON.parse(doc.address) : {}; } catch {}
        try { imageIds = doc.image_ids ? JSON.parse(doc.image_ids) : []; } catch {}
        return { ...doc, items, address, imageIds, amount: parseFloat(doc.amount || "0") };
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
    if (!authLoading && user) fetchOrders();
    else if (!authLoading && !user) setLoading(false);
  }, [user, authLoading]);

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 py-6 min-h-screen">
        <h2 className="text-lg font-medium mt-6">My Orders</h2>
        {authLoading || loading ? (
          <Loading />
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders available.</p>
        ) : (
          <div className="max-w-5xl border-t border-gray-300 text-sm mt-4">
            {orders.map(order => (
              <OrderCard key={order.$id} order={order} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrderListPage;
