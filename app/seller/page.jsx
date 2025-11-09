"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { Client, Storage, Databases, ID, Account } from "appwrite";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_COLLECTION_ID;
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

function SellerContent() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const editId = searchParams.get("id");
  const isEdit = page === "edit";
  const router = useRouter();

  const [files, setFiles] = useState([null, null, null, null]);
  const [filePreviews, setFilePreviews] = useState([null, null, null, null]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [uploading, setUploading] = useState(false);

  const [databases] = useState(new Databases(client));
  const [storage] = useState(new Storage(client));
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cleanup created object URLs on files change
  useEffect(() => {
    // Revoke old URLs when files change
    return () => {
      filePreviews.forEach((url) => url && URL.revokeObjectURL(url));
    };
  }, [filePreviews]);

  useEffect(() => {
    const appwriteAccount = new Account(client);

    const checkAuth = async () => {
      try {
        const user = await appwriteAccount.get();
        if (user.email === ADMIN_EMAIL) {
          setAllowed(true);
          setIsSignedIn(true);
        } else {
          router.push("/");
        }
      } catch {
        setIsSignedIn(false);
        router.push("/");
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

          let imgs = [];
          try {
            imgs = doc.images ? JSON.parse(doc.images) : [];
          } catch {
            imgs = [];
          }
          // Preload previews with URLs for editing
          const previews = imgs.map(
            (id) =>
              `https://fra.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${id}/view?project=${PROJECT_ID}`
          );

          setFilePreviews((prev) => {
            const newPreviews = [...prev];
            for (let i = 0; i < previews.length && i < 4; i++) {
              newPreviews[i] = previews[i];
            }
            return newPreviews;
          });
        })
        .catch((err) => console.error("Failed to load product:", err));
    }
  }, [isEdit, editId, databases]);

  const handleFileChange = (index, file) => {
    if (!file) return;
    // Revoke old URL if present to avoid memory leak
    if (filePreviews[index]) {
      URL.revokeObjectURL(filePreviews[index]);
    }
    const newFiles = [...files];
    newFiles[index] = file;
    setFiles(newFiles);

    const newPreviews = [...filePreviews];
    newPreviews[index] = URL.createObjectURL(file);
    setFilePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let newImageIds = [];

      if (isEdit && productToEdit) {
        // Delete old files if new files uploaded
        if (files.some((f) => f !== null)) {
          try {
            const oldImages = JSON.parse(productToEdit.images || "[]");
            for (const oldFileId of oldImages) {
              await storage.deleteFile(BUCKET_ID, oldFileId);
            }
          } catch (err) {
            console.error("Failed to delete old images:", err);
          }

          // Upload new files
          newImageIds = (
            await Promise.all(
              files
                .filter((f) => f !== null)
                .map(async (file) => {
                  const response = await storage.createFile(BUCKET_ID, ID.unique(), file);
                  return response.$id;
                })
            )
          ) || [];
        } else {
          // Keep old images if none uploaded
          newImageIds = JSON.parse(productToEdit.images || "[]");
        }

        await databases.updateDocument(DATABASE_ID, COLLECTION_ID, productToEdit.$id, {
          name,
          description, // Stores exactly as typed with line breaks
          category,
          price,
          offerPrice,
          images: JSON.stringify(newImageIds),
        });

        toast.success("✅ Product updated!");
      } else {
        // New product - upload all files that are non-null
        if (!files.some((f) => f !== null)) {
          toast.error("❌ Please upload at least one image");
          setUploading(false);
          return;
        }

        const uploadedFiles = await Promise.all(
          files
            .filter((f) => f !== null)
            .map(async (file) => {
              const response = await storage.createFile(BUCKET_ID, ID.unique(), file);
              return response.$id;
            })
        );

        await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
          images: JSON.stringify(uploadedFiles),
          name,
          description, // Stores exactly as typed with line breaks
          category,
          price: price.toString(),
          offerPrice: offerPrice.toString(),
        });

        toast.success("✅ Product added!");
      }

      // reset form
      setFiles([null, null, null, null]);
      setFilePreviews([null, null, null, null]);
      setName("");
      setDescription("");
      setCategory("Earphone");
      setPrice("");
      setOfferPrice("");

      router.push("/seller");
    } catch (error) {
      console.error("Failed to save product:", error);
      toast.error("❌ Failed to save product");
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
          <p className="text-base font-medium">Product Images (up to 4)</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {[...Array(4)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  onChange={(e) => handleFileChange(index, e.target.files[0])}
                  accept="image/*"
                  type="file"
                  id={`image${index}`}
                  hidden
                />
                <img
                  className="max-w-24 max-h-24 cursor-pointer"
                  src={filePreviews[index] || "/upload_area_placeholder.png"}
                  alt={`Upload IMG ${index + 1}`}
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
            rows={6}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none whitespace-pre-wrap"
            placeholder="Type here (supports line breaks and formatting)"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Press Enter for new lines. Formatting will be preserved exactly as typed.
          </p>
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
              <option value="" disabled>
                Select Category
              </option>
              <option value="Touch Panel">Touch Panel</option>
              <option value="Door Lock">Door-Lock</option>
              <option value="Motion sensor">Motion sensor</option>
              <option value="OutDoor sensor">OutDoor sensor</option>
              <option value="Wardrobe sensor">Wardrobe sensor</option>
              <option value="Video Door Phone">Video Door Phone</option>
              <option value="Voice Assistance">Voice Assistance</option>
              <option value="Moter">Moter</option>
              <option value="remote controll">remote control</option>
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
              min={0}
              step="0.01"
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
              min={0}
              step="0.01"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={uploading || !isSignedIn}
          className="px-8 py-2.5 bg-orange-600 text-white font-medium rounded disabled:opacity-50 transition"
        >
          {uploading ? "Uploading..." : isEdit ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default function SellerPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading seller page…</div>}>
      <SellerContent />
    </Suspense>
  );
}
