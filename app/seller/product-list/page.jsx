"use client";

import React, { useEffect, useState } from "react";
import { Client, Databases, ID, Account } from "appwrite";
import Image from "next/image";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_COLLECTION_ID;

// ✅ Your admin email (only this user can access)
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject(PROJECT_ID);

  const databases = new Databases(client);
  const account = new Account(client);

  // ✅ Check if logged in user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const user = await account.get();
        if (user.email === ADMIN_EMAIL) {
          setIsAdmin(true);
          fetchSellerProduct();
        } else {
          router.push("/"); // redirect non-admin users
        }
      } catch (error) {
        console.error("Not logged in:", error);
        router.push("/"); // redirect if not logged in
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  const fetchSellerProduct = async () => {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      setProducts(response.documents);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, productId);
      fetchSellerProduct();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleEditClick = (productId) => {
    router.push(`/seller?page=edit&id=${productId}`);
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

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="w-2/5 px-4 py-3 font-medium truncate">Product</th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden">Category</th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden">Description</th>
                <th className="px-4 py-3 font-medium truncate">Price</th>
                <th className="px-4 py-3 font-medium truncate">Offer Price</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.map((product) => {
                let imagesArray = [];
                try {
                  imagesArray = product.images ? JSON.parse(product.images) : [];
                } catch (e) {
                  console.error("Failed to parse images JSON", e);
                }
                const firstImage =
                  imagesArray.length > 0 ? imagesArray[0] : "/upload_area_placeholder.png";

                return (
                  <tr key={product.$id} className="border-t border-gray-500/20">
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                      <div className="bg-gray-500/10 rounded p-2">
                        <Image
                          src={firstImage}
                          alt="product Image"
                          className="w-16"
                          width={1280}
                          height={720}
                        />
                      </div>
                      <span className="truncate w-full">{product.name}</span>
                    </td>
                    <td className="px-4 py-3 max-sm:hidden">{product.category}</td>
                    <td className="px-4 py-3 max-sm:hidden">{product.description || "-"}</td>
                    <td className="px-4 py-3">${product.price}</td>
                    <td className="px-4 py-3">${product.offerPrice}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleEditClick(product.$id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.$id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;
