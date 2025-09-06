"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Client, Databases, ID } from "appwrite";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "react-toastify";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const PRODUCT_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_DATABASE_ID;
const PRODUCT_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_COLLECTION_ID;

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // Replace with your endpoint
  .setProject(PROJECT_ID);

const databases = new Databases(client);

export const AppContextProvider = ({ children }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "₹";
  const router = useRouter();
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // --- Load Products ---
  useEffect(() => {
    databases
      .listDocuments(PRODUCT_DATABASE_ID, PRODUCT_COLLECTION_ID)
      .then((res) => {
        setProducts(res.documents);
        setLoadingProducts(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoadingProducts(false);
      });
  }, []);

  // Cart-related state and functions have been removed

  return (
    <AppContext.Provider
      value={{
        user,
        currency,
        router,
        products,
        loadingProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
