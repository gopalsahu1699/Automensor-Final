"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import { Client, Account, Databases, Query } from "appwrite";

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const ORDER_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_ORDER_DATABASE_ID;
const ORDER_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ORDER_COLLECTION_ID;
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

const ORDER_STATUSES = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const Orders = () => {
  const { currency } = useAppContext();
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [filterType, setFilterType] = useState("all");
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const client = useMemo(() => {
    return new Client()
      .setEndpoint("https://fra.cloud.appwrite.io/v1")
      .setProject(PROJECT_ID);
  }, []);

  const account = useMemo(() => new Account(client), [client]);
  const databases = useMemo(() => new Databases(client), [client]);

  useEffect(() => {
    let isMounted = true;

    const fetchOrders = async () => {
      try {
        const user = await account.get();
        if (user.email !== ADMIN_EMAIL) {
          router.push("/");
          return;
        }
        if (!isMounted) return;
        setIsAdmin(true);

        const response = await databases.listDocuments(
          ORDER_DATABASE_ID,
          ORDER_COLLECTION_ID,
          [Query.orderDesc("$createdAt")]
        );

        if (!isMounted) return;
        setOrders(response.documents);
      } catch (error) {
        console.error("Failed to fetch orders or permission denied", error);
        router.push("/");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchOrders();

    return () => {
      isMounted = false;
    };
  }, [account, databases, router]);

  const filterByDate = (orderDateStr) => {
    if (!filterValue) return true;
    if (!orderDateStr) return false;

    const orderDate = new Date(orderDateStr);
    if (isNaN(orderDate)) return false;

    switch (filterType) {
      case "date":
        return orderDate.toISOString().slice(0, 10) === filterValue;
      case "month":
        return orderDate.toISOString().slice(0, 7) === filterValue;
      case "year":
        return orderDate.getFullYear().toString() === filterValue;
      default:
        return true;
    }
  };

  const filterByOrderId = (orderId) => {
    if (!filterValue) return true;
    if (!orderId) return false;
    return orderId.toLowerCase().includes(filterValue.toLowerCase());
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (filterType === "orderId") {
        if (!filterByOrderId(order.$id)) return false;
      } else if (filterType !== "all") {
        if (!filterByDate(order.date)) return false;
      }

      if (statusFilter !== "all") {
        const orderStatusNormalized = String(order.orderStatus || "").toLowerCase();
        const statusFilterNormalized = statusFilter.toLowerCase();
        if (orderStatusNormalized !== statusFilterNormalized) {
          return false;
        }
      }

      return true;
    });
  }, [orders, filterType, filterValue, statusFilter]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await databases.updateDocument(
        ORDER_DATABASE_ID,
        ORDER_COLLECTION_ID,
        orderId,
        { orderStatus: newStatus }
      );
      setOrders((prev) =>
        prev.map((order) =>
          order.$id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert("Failed to update order status. Please try again.");
    }
  };

  if (loading) return <Loading />;

  if (!isAdmin) {
    return (
      <main className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold text-red-600" role="alert">
          🚫 Access Denied — Admins only
        </p>
      </main>
    );
  }

  return (
    <main className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
      <section className="md:p-10 p-4 space-y-5" aria-label="Orders management section">
        <h2 className="text-lg font-medium">Orders</h2>

        <form
          className="flex gap-4 mb-4 items-center flex-wrap"
          aria-label="Filter orders"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="filterType" className="font-medium">
            Filter by:
          </label>
          <select
            id="filterType"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setFilterValue("");
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
                  id="filterValue"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="border border-gray-300 rounded p-1"
                  aria-label="Filter by date"
                />
              )}
              {filterType === "month" && (
                <input
                  type="month"
                  id="filterValue"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="border border-gray-300 rounded p-1"
                  aria-label="Filter by month"
                />
              )}
              {filterType === "year" && (
                <input
                  type="number"
                  id="filterValue"
                  min="2000"
                  max="2100"
                  placeholder="Year"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="border border-gray-300 rounded p-1 w-24"
                  aria-label="Filter by year"
                />
              )}
            </>
          )}

          {filterType === "orderId" && (
            <input
              type="text"
              id="filterValue"
              placeholder="Enter Order ID"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="border border-gray-300 rounded p-1"
              aria-label="Filter by order ID"
            />
          )}

          <label htmlFor="statusFilter" className="font-medium">
            Order Status:
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded p-1"
            aria-label="Filter by order status"
          >
            <option value="all">All</option>
            {ORDER_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </form>

        <div className="max-w-4xl rounded-md" role="region" aria-live="polite">
          {filteredOrders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            filteredOrders.map((order) => {
              let items = [];
              let address = {};
              try {
                items =
                  typeof order.items === "string"
                    ? JSON.parse(order.items)
                    : Array.isArray(order.items)
                    ? order.items
                    : [];
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
                <article
                  key={order.$id}
                  className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300"
                  aria-label={`Order ID ${order.$id}`}
                >
                  <div className="flex-1 flex gap-5 max-w-80">
                    <Image
                      className="max-w-16 max-h-16 object-cover"
                      src={assets.box_icon}
                      alt="Order box icon"
                      width={64}
                      height={64}
                    />
                    <p className="flex flex-col gap-3">
                      <span className="font-medium">
                        {items.map((i) => `${i.name} x ${i.quantity}`).join(", ") || "No items"}
                      </span>
                      <span>Items: {items.length}</span>
                    </p>
                  </div>
                  <address>
                    <p>
                      <span className="font-medium">{address.fullName || "-"}</span>
                      <br />
                      <span>{address.area || "-"}</span>
                      <br />
                      <span>{address.city || "-"}, {address.state || "-"}</span>
                      <br />
                      <span>{address.phoneNumber || "-"}</span>
                    </p>
                  </address>
                  <p className="font-medium my-auto" aria-label="Order amount">
                    {currency}
                    {order.amount ?? "-"}
                  </p>
                  <div>
                    <p className="flex flex-col" aria-label="Payment details">
                      <span>Method: {order.paymentMethod || "COD"}</span>
                      <span>Date: {order.date ? new Date(order.date).toLocaleDateString() : "N/A"}</span>
                      <span>Payment: {order.paymentStatus || "Pending"}</span>
                    </p>
                  </div>
                  <div>
                    <label htmlFor={`order-status-${order.$id}`} className="sr-only">
                      Change order status
                    </label>
                    <select
                      id={`order-status-${order.$id}`}
                      className="border border-gray-300 rounded-md p-2"
                      value={order.orderStatus || "Pending"}
                      onChange={(e) => handleStatusChange(order.$id, e.target.value)}
                      aria-live="polite"
                    >
                      {ORDER_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Orders;
