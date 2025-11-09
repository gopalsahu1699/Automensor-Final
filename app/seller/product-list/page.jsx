"use client";

import React, { useEffect, useState } from "react";
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
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [databases, setDatabases] = useState(null);
  const [storage, setStorage] = useState(null);
  const [openProduct, setOpenProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const client = new Client()
      .setEndpoint("https://fra.cloud.appwrite.io/v1")
      .setProject(PROJECT_ID);
    setDatabases(new Databases(client));
    setStorage(new Storage(client));
  }, []);

  useEffect(() => {
    if (databases) {
      setLoading(true);
      setError(null);
      databases
        .listDocuments(DATABASE_ID, COLLECTION_ID)
        .then((res) => {
          setProducts(res.documents);
          setFilteredProducts(res.documents);
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
          setError("Failed to load products");
        })
        .finally(() => setLoading(false));
    }
  }, [databases]);

  // Auto-filter as user types
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts(products);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.price?.toString().includes(query)
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleDelete = async (id, imageIds) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);

      if (storage && imageIds.length > 0) {
        await Promise.all(
          imageIds.map(async (imageId) => {
            try {
              await storage.deleteFile(BUCKET_ID, imageId);
            } catch (err) {
              console.error("Failed to delete image:", err);
            }
          })
        );
      }

      setProducts((prev) => prev.filter((p) => p.$id !== id));
      setFilteredProducts((prev) => prev.filter((p) => p.$id !== id));
      toast.success("🗑️ Product deleted!");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("❌ Failed to delete product");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-10 text-gray-600">
        Loading products...
      </div>
    );

  if (error)
    return <p className="text-center text-red-600 font-semibold py-10">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Product List</h1>

      {/* Search Bar - Auto-filters as you type */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products by name, description, or price..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchQuery && (
          <p className="text-sm text-gray-500 mt-2">
            Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          {searchQuery ? "No products found matching your search." : "No products found."}
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
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
                  <span className="text-sm text-red-500">({product.offerPrice})</span>
                </p>

                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => router.push(`/seller?page=edit&id=${product.$id}`)}
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
      )}

      {/* Modal for all product images */}
      {openProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded max-w-3xl w-full">
            <button
              onClick={() => setOpenProduct(null)}
              className="mb-3 text-red-600 font-bold"
              aria-label="Close product images modal"
            >
              ✖ Close
            </button>
            <div className="grid grid-cols-2 gap-3">
              {(() => {
                let ids = [];
                try {
                  ids = openProduct.images ? JSON.parse(openProduct.images) : [];
                } catch {
                  ids = [];
                }
                return ids.map((id) => (
                  <img
                    key={id}
                    src={`https://fra.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${id}/view?project=${PROJECT_ID}`}
                    alt={`${openProduct.name} image`}
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
