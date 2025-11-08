"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const AllProducts = () => {
  const { products, loadingProducts } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Extract unique categories, include "All" first
  const categories = useMemo(() => {
    const allCategories = products.map((p) => p.category || "Uncategorized");
    return ["All", ...new Set(allCategories)];
  }, [products]);

  // Filter products by category first
  const filteredByCategory =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Then filter by search term in product name (case-insensitive)
  const filteredProducts = filteredByCategory.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categoryButtonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, boxShadow: "0 0 8px rgba(249, 115, 22, 0.6)" },
    tap: { scale: 0.95 },
  };

  const productListVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const productItemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col md:flex-row px-6 md:px-12 lg:px-20 pt-12 md:pt-16 gap-8 min-h-[calc(100vh-160px)] bg-gray-50">
        {/* Mobile category dropdown */}
        <div className="md:hidden mb-6 w-full max-w-sm mx-auto">
          <label
            htmlFor="category-select"
            className="block mb-3 font-semibold text-gray-700 text-lg"
          >
            Choose Category
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-3 px-4 shadow-sm text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop sidebar */}
        <aside
          className="hidden md:block w-56 border-r border-gray-300 py-8 pr-6 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto bg-white rounded-lg shadow-sm"
          aria-label="Product Categories"
        >
          <h2 className="text-2xl font-bold mb-8 text-gray-900 tracking-tight">Categories</h2>
          <ul className="space-y-4" role="list">
            {categories.map((cat) => (
              <li key={cat}>
                <motion.button
                  onClick={() => setSelectedCategory(cat)}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  variants={categoryButtonVariants}
                  className={`w-full text-left px-5 py-3 rounded-lg font-semibold transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    selectedCategory === cat
                      ? "bg-orange-600 text-white shadow-lg shadow-orange-300/50"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  aria-current={selectedCategory === cat ? "true" : undefined}
                  aria-label={`Filter products by ${cat}`}
                >
                  {cat}
                </motion.button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <main className="flex-1 pl-0 md:pl-10 bg-white rounded-lg shadow-sm flex flex-col">
          {/* Section header */}
          <div className="flex flex-col items-start md:items-end mb-8 md:mb-12 px-6 pt-5 space-y-4">
            <motion.h1
              className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight select-none"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              {selectedCategory === "All"
                ? "All Products"
                : `${selectedCategory} Products`}
            </motion.h1>
            <motion.div
              className="w-28 h-1 bg-orange-600 rounded-full mt-3 origin-left shadow-lg"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.45, delay: 0.25 }}
            />
            {/* Search input */}
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-sm border border-gray-300 rounded-lg py-2 px-4 shadow-sm text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              aria-label="Search products by name"
            />
          </div>

          {/* Product listing or messages */}
          {loadingProducts ? (
            <div
              className="flex-grow flex justify-center items-center py-24 px-6"
              aria-live="polite"
            >
              <p className="text-gray-500 text-lg select-none">⏳ Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex-grow flex justify-center items-center py-24 px-6">
              <p className="text-gray-500 text-lg select-none">No products found.</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-6 pb-16"
              variants={productListVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProducts.map((product) => (
                <motion.div key={product.$id} variants={productItemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </main>
      </div>

      <Footer />
    </>
  );
};

export default AllProducts;
