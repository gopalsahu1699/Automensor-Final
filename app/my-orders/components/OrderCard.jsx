"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

function getImageUrl(idOrUrl) {
  if (!idOrUrl) return "/upload_area_placeholder.png";
  return idOrUrl.startsWith("http")
    ? idOrUrl
    : `https://fra.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${idOrUrl}/view?project=${PROJECT_ID}`;
}

const OrderCard = ({ order }) => {
  const router = useRouter();
  const firstImage = order.imageIds.length > 0 ? getImageUrl(order.imageIds[0]) : "/upload_area_placeholder.png";
  const productNames = order.items.length > 0
    ? order.items.map(item => item.name || "Unknown item").join(", ")
    : "No items";

  return (
    <div
      onClick={() => router.push(`/my-orders/${order.$id}`)}
      className="cursor-pointer p-4 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition mb-4 flex gap-4"
    >
      <Image
        src={firstImage}
        alt="Order product"
        width={64}
        height={64}
        className="rounded object-cover"
        unoptimized
      />
      <div className="flex flex-col justify-center">
        <p className="font-medium">{productNames}</p>
        <p className="text-sm text-gray-600">Order ID: <code>{order.$id}</code></p>
      </div>
    </div>
  );
};

export default OrderCard;
