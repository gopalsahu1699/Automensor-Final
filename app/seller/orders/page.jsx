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

  const [filterType, setFilterType] = useState("all"); // 'all', 'date', 'month', 'year', 'orderId'
  const [filterValue, setFilterValue] = useState(""); // user input for filter

  const router = useRouter();

  const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject(PROJECT_ID);

  const account = new Account(client);
  const databases = new Databases(client);

  // Utility function to check if order date matches filter
  const filterOrderByDate = (orderDateStr) => {
    if (!filterValue) return true; // no filtering
    if (!orderDateStr) return false;
    const orderDate = new Date(orderDateStr);
    if (filterType === "date") {
      return orderDate.toISOString().slice(0, 10) === filterValue;
    }
    if (filterType === "month") {
      return orderDate.toISOString().slice(0, 7) === filterValue;
    }
    if (filterType === "year") {
      return orderDate.getFullYear().toString() === filterValue;
    }
    return true;
  };

  // Filter orders by order ID substring (case insensitive)
  const filterOrderById = (orderId) => {
    if (!filterValue) return true; // no filtering
    if (!orderId) return false;
    return orderId.toLowerCase().includes(filterValue.toLowerCase());
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = await account.get();
        if (user.email !== ADMIN_EMAIL) {
          router.push("/");
          return;
        }
        setIsAdmin(true);

        const response = await databases.listDocuments(
          ORDER_DATABASE_ID,
          ORDER_COLLECTION_ID,
          [Query.orderDesc("$createdAt")]
        );

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

  // Filter orders by date or order ID
  const filteredOrders = orders.filter((order) => {
    if (filterType === "orderId") {
      return filterOrderById(order.$id);
    }
    if (filterType === "all") {
      return true;
    }
    return filterOrderByDate(order.date);
  });

  return (
    <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
      <div className="md:p-10 p-4 space-y-5">
        <h2 className="text-lg font-medium">Orders</h2>

        {/* Filter Controls */}
        <div className="flex gap-4 mb-4 items-center flex-wrap">
          <label className="font-medium">Filter by:</label>
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setFilterValue(""); // reset filter value on type change
            }}
            className="border border-gray-300 rounded p-1"
          >
            <option value="all">All</option>
            <option value="date">Date</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
            <option value="orderId">Order ID</option>
          </select>

          {(filterType === "date" || filterType === "month" || filterType === "year") && (
            <>
              {filterType === "date" && (
                <input
                  type="date"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="border border-gray-300 rounded p-1"
                />
              )}
              {filterType === "month" && (
                <input
                  type="month"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="border border-gray-300 rounded p-1"
                />
              )}
              {filterType === "year" && (
                <input
                  type="number"
                  min="2000"
                  max="2100"
                  placeholder="Year"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="border border-gray-300 rounded p-1 w-24"
                />
              )}
            </>
          )}

          {filterType === "orderId" && (
            <input
              type="text"
              placeholder="Enter Order ID"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="border border-gray-300 rounded p-1"
            />
          )}
        </div>

        <div className="max-w-4xl rounded-md">
          {filteredOrders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            filteredOrders.map((order, index) => {
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
                        Date: {order.date ? new Date(order.date).toLocaleDateString() : "N/A"}
                      </span>
                      <span>Payment : {order.paymentStatus || "Pending"}</span>
                    </p>
                  </div>
                  <div>
                    <select
                      className="border border-gray-300 rounded-md p-2"
                      value={order.orderStatus || "Pending"}
                      onChange={(e) => handleStatusChange(order.$id, e.target.value)}
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
