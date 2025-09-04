"use client";

import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import { Client, Account, Databases, Query } from "appwrite";
import { useRouter } from "next/navigation";

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const ORDER_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_ORDER_DATABASE_ID;
const ORDER_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ORDER_COLLECTION_ID;
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

const Orders = () => {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const router = useRouter();

  const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject(PROJECT_ID);

  const account = new Account(client);
  const databases = new Databases(client);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Check if logged in user is admin
        const user = await account.get();
        if (user.email !== ADMIN_EMAIL) {
          router.push("/");
          return;
        }
        setIsAdmin(true);

        // Fetch orders from Appwrite DB, ordered by created date descending
        const response = await databases.listDocuments(
          ORDER_DATABASE_ID,
          ORDER_COLLECTION_ID,
          [Query.orderDesc("$createdAt")]
        );

        console.log("Fetched orders:", response.documents);
        setOrders(response.documents);
      } catch (error) {
        console.error("Error fetching orders or checking admin:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  console.log("Orders state updated:", orders);

  if (loading) return <Loading />;

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold text-red-600">
          🚫 Access Denied — Admins only
        </p>
      </div>
    );
  }

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await databases.updateDocument(
        ORDER_DATABASE_ID,
        ORDER_COLLECTION_ID,
        orderId,
        { orderStatus: newStatus }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.$id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert("Failed to update order status.");
    }
  };

  return (
    <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
      <div className="md:p-10 p-4 space-y-5">
        <h2 className="text-lg font-medium">Orders</h2>
        <div className="max-w-4xl rounded-md">
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map((order, index) => {
              // Parse JSON fields safely
              let items = [];
              let address = {};
              try {
                items =
                  typeof order.items === "string"
                    ? JSON.parse(order.items)
                    : order.items || [];
              } catch {
                items = [];
              }
              try {
                address =
                  typeof order.address === "string"
                    ? JSON.parse(order.address)
                    : order.address || {};
              } catch {
                address = {};
              }

              return (
                <div
                  key={order.$id || index}
                  className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300"
                >
                  <div className="flex-1 flex gap-5 max-w-80">
                    <Image
                      className="max-w-16 max-h-16 object-cover"
                      src={assets.box_icon}
                      alt="box icon"
                      width={64}
                      height={64}
                    />
                    <p className="flex flex-col gap-3">
                      <span className="font-medium">
                        {items
                          .map((item) => `${item.name} x ${item.quantity}`)
                          .join(", ") || "No items"}
                      </span>
                      <span>Items : {items.length}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      <span className="font-medium">{address.fullName}</span>
                      <br />
                      <span>{address.area}</span>
                      <br />
                      <span>{`${address.city}, ${address.state}`}</span>
                      <br />
                      <span>{address.phoneNumber}</span>
                    </p>
                  </div>
                  <p className="font-medium my-auto">
                    {currency}
                    {order.amount}
                  </p>
                  <div>
                    <p className="flex flex-col">
                      <span>Method : {order.paymentMethod || "COD"}</span>
                      <span>
                        Date:{" "}
                        {order.date
                          ? new Date(order.date).toLocaleDateString()
                          : "N/A"}
                      </span>
                      <span>Payment : {order.paymentStatus || "Pending"}</span>
                    </p>
                  </div>
                  <div>
                    <select
                      className="border border-gray-300 rounded-md p-2"
                      value={order.orderStatus || "Pending"}
                      onChange={(e) =>
                        handleStatusChange(order.$id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Orders;
