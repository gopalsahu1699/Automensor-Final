"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { getProducts } from "@/lib/appwrite";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "₹";
  const router = useRouter();
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Load Products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const docs = await getProducts();
        setProducts(docs);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoadingProducts(false);
      }
    }

    fetchProducts();
  }, []);

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
