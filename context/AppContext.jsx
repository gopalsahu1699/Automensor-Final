// AppContext.jsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Client, Databases } from "appwrite";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "react-toastify";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PRODUCT_COLLECTION_ID;

export const AppContextProvider = ({ children }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "₹";
  const router = useRouter();
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const client = new Client()
      .setEndpoint("https://fra.cloud.appwrite.io/v1")
      .setProject(PROJECT_ID);
    const databases = new Databases(client);

    databases
      .listDocuments(DATABASE_ID, COLLECTION_ID)
      .then((res) => {
        setProducts(res.documents);
        setLoadingProducts(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoadingProducts(false);
      });
  }, []);

  const addToCart = (productId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[productId]) newCart[productId] += 1;
      else newCart[productId] = 1;
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
