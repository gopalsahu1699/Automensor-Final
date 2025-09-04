"use client";

import React from "react";
import Image from "next/image";

const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

function getImageUrl(idOrUrl) {
  if (!idOrUrl) return "/upload_area_placeholder.png";
  return idOrUrl.startsWith("http")
    ? idOrUrl
    : `https://fra.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${idOrUrl}/view?project=${PROJECT_ID}`;
}

const OrderDetails = ({ order, currency }) => {
  if (!order) return null;

  return (
    <div className="max-w-3xl w-full p-6 mx-auto">
      <h3 className="text-xl font-semibold mb-4">Order Details</h3>

      <div className="border rounded p-4 mb-4">
        <h4 className="font-semibold mb-2">Items</h4>
        {order.items && order.items.length > 0 ? (
          <ul className="space-y-2">
            {order.items.map((item, idx) => (
              <li key={idx} className="flex items-center gap-4">
                <Image
                  src={item.images && item.images.length > 0 ? getImageUrl(item.images[0]) : "/upload_area_placeholder.png"}
                  alt={item.name || "Product image"}
                  width={50}
                  height={50}
                  className="rounded object-cover"
                  unoptimized
                />
                <div>
                  <p className="font-medium">{item.name || "Unknown product"}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-sm text-gray-600">Price: {currency}{item.offerPrice || item.price || "-"}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items found.</p>
        )}
      </div>

      <div className="border rounded p-4 mb-4">
        <h4 className="font-semibold mb-2">Shipping Address</h4>
        <p>{order.address?.fullName || "Unknown"}</p>
        <p>{order.address?.area || ""}</p>
        <p>
          {order.address?.city || ""}, {order.address?.state || ""} {order.address?.pincode || ""}
        </p>
        <p>{order.address?.phoneNumber || ""}</p>
      </div>

      <div className="border rounded p-4 mb-4 flex justify-between">
        <div>
          <p><strong>Order ID:</strong> <code>{order.$id}</code></p>
          <p><strong>Order Status:</strong> {order.orderStatus || "Pending"}</p>
          <p><strong>Payment Method:</strong> {order.paymentMethod || "COD"}</p>
          <p><strong>Payment Status:</strong> {order.paymentStatus || "Pending"}</p>
          <p><strong>Order Date:</strong> {order.date ? new Date(order.date).toLocaleDateString() : "Unknown"}</p>
        </div>
        <div className="text-lg font-semibold">
          Total: {currency}{Number.isFinite(order.amount) ? order.amount.toFixed(2) : "-"}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
