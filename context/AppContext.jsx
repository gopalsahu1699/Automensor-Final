"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider"; // Appwrite AuthProvider
import { toast } from "react-toastify";


export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "₹";
  const router = useRouter();
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  // For demo, fetch products from dummy data or API
  useEffect(() => {
    // Replace this with your Appwrite fetch logic if any
    import("@/assets/assets").then((mod) => setProducts(mod.productsDummyData));
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId]) newCart[itemId] += 1;
      else newCart[itemId] = 1;
      return newCart; 
    });
    toast.info("Added to cart");
  };

  const updateCartQuantity = (itemId, quantity) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (quantity <= 0) delete newCart[itemId];
      else newCart[itemId] = quantity;
      return newCart;
    });
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce((a, b) => a + b, 0);

  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (product) total += product.offerPrice * cartItems[itemId];
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
