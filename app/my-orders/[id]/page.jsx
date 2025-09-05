"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import { databases } from "@/lib/appwrite";
import OrderDetails from "../components/OrderDetails";
import { useRouter, usePathname, useSearchParams, useParams } from "next/navigation";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_ORDER_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ORDER_COLLECTION_ID;

export default function OrderDetailsPage() {
  const { currency = "$" } = useAppContext();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams(); // <-- Hook to get route params in app router

  // Extract the order ID from URL params (assuming route: /my-orders/[id])
  const id = params?.id;

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      setLoading(true);
      try {
        const doc = await databases.getDocument(DATABASE_ID, COLLECTION_ID, id);
        let items = [],
          address = {},
          imageIds = [];
        try {
          items = doc.items ? JSON.parse(doc.items) : [];
        } catch {}

        try {
          address = doc.address ? JSON.parse(doc.address) : {};
        } catch {}

        try {
          imageIds = doc.image_ids ? JSON.parse(doc.image_ids) : [];
        } catch {}

        setOrder({ ...doc, items, address, imageIds, amount: parseFloat(doc.amount) || 0 });
      } catch (err) {
        console.error("❌ Failed to fetch order:", err);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 py-6 min-h-screen">
        {loading ? (
          <Loading />
        ) : order ? (
          <OrderDetails order={order} currency={currency} />
        ) : (
          <p>Order not found.</p>
        )}
      </div>
      <Footer />
    </>
  );
}
