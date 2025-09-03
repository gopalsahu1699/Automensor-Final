"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Client, Storage, Databases, ID, Account } from "appwrite";
import { useSearchParams, useRouter } from "next/navigation";

const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_COLLECTION_ID;

// ✅ set your admin email in .env
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

// ---------------- Seller Content ----------------
function SellerContent() {
  const searchParams = useSearchParams(); // ✅ now safe inside Suspense
  const page = searchParams.get("page");
  const editId = searchParams.get("id");
  const isEdit = page === "edit";

  const router = useRouter();

  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Earphone");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const [uploading, setUploading] = useState(false);
  const [databases, setDatabases] = useState(null);
  const [storage, setStorage] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const appwriteClient = new Client()
      .setEndpoint("https://fra.cloud.appwrite.io/v1")
      .setProject(PROJECT_ID);

    const appwriteAccount = new Account(appwriteClient);
    setStorage(new Storage(appwriteClient));
    setDatabases(new Databases(appwriteClient));

    const checkAuth = async () => {
      try {
        const user = await appwriteAccount.get();

        if (user.email === ADMIN_EMAIL) {
          setAllowed(true);
          setIsSignedIn(true);
        } else {
          router.push("/"); // redirect non-admins
        }
      } catch (error) {
        setIsSignedIn(false);
        router.push("/"); // redirect if not signed in
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    if (isEdit && editId && databases) {
      databases
        .getDocument(DATABASE_ID, COLLECTION_ID, editId)
        .then((doc) => {
          setProductToEdit(doc);
          setName(doc.name || "");
          setDescription(doc.description || "");
          setCategory(doc.category || "Earphone");
          setPrice(doc.price || "");
          setOfferPrice(doc.offerPrice || "");
        })
        .catch((err) => console.error("Failed to load product:", err));
    }
  }, [isEdit, editId, databases]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      if (isEdit && productToEdit) {
        await databases.updateDocument(DATABASE_ID, COLLECTION_ID, productToEdit.$id, {
          name,
          description,
          category,
          price,
          offerPrice,
        });
        alert("✅ Product updated!");
      } else {
        const uploadedFiles = await Promise.all(
          files.map(async (file) => {
            const response = await storage.createFile(BUCKET_ID, ID.unique(), file);
            return response.$id;
          })
        );

        const productImages = uploadedFiles.map(
          (fileId) =>
            `https://fra.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}`
        );

        await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
          images: JSON.stringify(productImages),
          name,
          description,
          category,
          price: price.toString(),
          offerPrice: offerPrice.toString(),
        });
        alert("✅ Product added!");
      }

      // reset form
      setFiles([]);
      setName("");
      setDescription("");
      setCategory("Earphone");
      setPrice("");
      setOfferPrice("");
    } catch (error) {
      console.error("Failed to save product:", error);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Checking access…</div>;
  }

  if (!allowed) return null;

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {[...Array(4)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                  }}
                  type="file"
                  id={`image${index}`}
                  hidden
                />
                <img
                  className="max-w-24 cursor-pointer"
                  src={
                    files[index]
                      ? URL.createObjectURL(files[index])
                      : "/upload_area_placeholder.png"
                  }
                  alt="Upload IMG"
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label htmlFor="product-name" className="text-base font-medium">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label htmlFor="product-description" className="text-base font-medium">
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label htmlFor="category" className="text-base font-medium">
              Category
            </label>
            <select
              id="category"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="Earphone">Earphone</option>
              <option value="Headphone">Headphone</option>
              <option value="Watch">Watch</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Camera">Camera</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label htmlFor="product-price" className="text-base font-medium">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label htmlFor="offer-price" className="text-base font-medium">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={uploading || !isSignedIn}
          className="px-8 py-2.5 bg-orange-600 text-white font-medium rounded disabled:opacity-50"
        >
          {uploading ? "Uploading..." : isEdit ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}

// ---------------- Page Wrapper with Suspense ----------------
export default function SellerPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading seller page…</div>}>
      <SellerContent />
    </Suspense>
  );
}
