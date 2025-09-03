"use client";

import React, { useState, useEffect } from "react";
import { Client, Databases, Storage } from "appwrite";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_COLLECTION_ID;
const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;

export default function ProductList() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [databases, setDatabases] = useState(null);
  const [storage, setStorage] = useState(null);
  const [openProduct, setOpenProduct] = useState(null);

  useEffect(() => {
    const client = new Client()
      .setEndpoint("https://fra.cloud.appwrite.io/v1")
      .setProject(PROJECT_ID);
    setDatabases(new Databases(client));
    setStorage(new Storage(client));
  }, []);

  useEffect(() => {
    if (databases) {
      databases
        .listDocuments(DATABASE_ID, COLLECTION_ID)
        .then((res) => setProducts(res.documents))
        .catch((err) => console.error("Error fetching products:", err));
    }
  }, [databases]);

  const handleDelete = async (id, imageIds) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);

      for (const imageId of imageIds) {
        try {
          await storage.deleteFile(BUCKET_ID, imageId);
        } catch (err) {
          console.error("Failed to delete image:", err);
        }
      }

      setProducts(products.filter((p) => p.$id !== id));
      toast.success("🗑️ Product deleted!");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("❌ Failed to delete product");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Product List</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => {
          let imageIds = [];
          try {
            imageIds = product.images ? JSON.parse(product.images) : [];
          } catch {
            imageIds = [];
          }

          const coverIndex = product.coverIndex || 0;
          const coverImage =
            imageIds.length > 0
              ? `https://fra.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${imageIds[coverIndex]}/view?project=${PROJECT_ID}`
              : "/placeholder.png";

          return (
            <div key={product.$id} className="border p-4 rounded shadow-sm">
              {coverImage && (
                <img
                  src={coverImage}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded mb-3 cursor-pointer"
                  onClick={() => setOpenProduct(product)}
                />
              )}

              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="mt-2">
                ₹{product.price}{" "}
                <span className="text-sm text-red-500">
                  ({product.offerPrice})
                </span>
              </p>

              <div className="flex gap-3 mt-3">
                <button
                  onClick={() =>
                    router.push(`/seller?page=edit&id=${product.$id}`)
                  }
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.$id, imageIds)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for all images */}
      {openProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded max-w-3xl w-full">
            <button
              onClick={() => setOpenProduct(null)}
              className="mb-3 text-red-600 font-bold"
            >
              ✖ Close
            </button>
            <div className="grid grid-cols-2 gap-3">
              {(() => {
                let ids = [];
                try {
                  ids = openProduct.images
                    ? JSON.parse(openProduct.images)
                    : [];
                } catch {
                  ids = [];
                }
                return ids.map((id) => (
                  <img
                    key={id}
                    src={`https://fra.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${id}/view?project=${PROJECT_ID}`}
                    alt="product"
                    className="w-full h-40 object-cover rounded"
                  />
                ));
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
