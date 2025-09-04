"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Client, Databases, ID, Query } from "appwrite";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "react-toastify";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

// ✅ Use separate env vars for Products and Cart
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const PRODUCT_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_DATABASE_ID;
const PRODUCT_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_COLLECTION_ID;

const CART_DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_CART_DATABASE_ID;
const CART_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_CART_COLLECTION_ID;

export const AppContextProvider = ({ children }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "₹";
  const router = useRouter();
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Appwrite client
  const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject(PROJECT_ID);
  const databases = new Databases(client);

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

  // --- Load Cart (per user) ---
  useEffect(() => {
    if (!user) {
      setCartItems({});
      return;
    }

    databases
      .listDocuments(CART_DATABASE_ID, CART_COLLECTION_ID, [
        Query.equal("userId", user.$id),
      ])
      .then((res) => {
        if (res.documents.length > 0) {
          try {
            const stored = res.documents[0].cartItems;
            setCartItems(
              typeof stored === "string" ? JSON.parse(stored) : stored || {}
            );
          } catch {
            setCartItems({});
          }
        } else {
          // fallback from localStorage
          const saved = localStorage.getItem("cartItems");
          if (saved) {
            try {
              setCartItems(JSON.parse(saved));
            } catch {
              setCartItems({});
            }
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching cart from Appwrite:", err);
        // fallback localStorage
        const saved = localStorage.getItem("cartItems");
        if (saved) {
          try {
            setCartItems(JSON.parse(saved));
          } catch {
            setCartItems({});
          }
        }
      });
  }, [user]);

  // --- Sync Cart (localStorage + backend) ---
  useEffect(() => {
    if (!user) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return;
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    databases
      .listDocuments(CART_DATABASE_ID, CART_COLLECTION_ID, [
        Query.equal("userId", user.$id),
      ])
      .then(async (res) => {
        const existing = res.documents[0];
        const payload = {
          userId: user.$id,
          cartItems: JSON.stringify(cartItems), // ✅ save as string
          updatedAt: new Date().toISOString(),
        };

        if (existing) {
          await databases.updateDocument(
            CART_DATABASE_ID,
            CART_COLLECTION_ID,
            existing.$id,
            payload
          );
        } else {
          await databases.createDocument(
            CART_DATABASE_ID,
            CART_COLLECTION_ID,
            ID.unique(),
            payload
          );
        }
      })
      .catch((err) => console.error("Error saving cart to Appwrite:", err));
  }, [cartItems, user]);

  // --- Cart Helpers ---
  const addToCart = (productId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      newCart[productId] = (newCart[productId] || 0) + 1;
      return newCart;
    });
    toast.success("🛒 Added to cart");
  };

  const updateCartQuantity = (productId, quantity) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (quantity <= 0) delete newCart[productId];
      else newCart[productId] = quantity;
      return newCart;
    });
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce((a, b) => a + b, 0);

  const getCartAmount = () => {
    let total = 0;
    for (const productId in cartItems) {
      const product = products.find((p) => p.$id === productId);
      if (product) total += product.offerPrice * cartItems[productId];
    }
    return total.toFixed(2);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        currency,
        router,
        products,
        cartItems,
        setCartItems,
        addToCart,
        updateCartQuantity,
        getCartCount,
        getCartAmount,
        loadingProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
