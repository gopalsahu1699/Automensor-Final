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

  const categories = useMemo(() => {
    const allCategories = products.map((p) => p.category || "Uncategorized");
    return ["All", ...new Set(allCategories)];
  }, [products]);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

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
        {/* Mobile dropdown with styled select */}
        <div className="md:hidden mb-4 w-full max-w-sm mx-auto">
          <label
            htmlFor="category-select"
            className="block mb-2 font-semibold text-gray-700"
          >
            Choose Category
          </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2.5 px-3 shadow-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sidebar for desktop - reduce width */}
        <aside
          className="hidden md:block w-48 border-r border-gray-300 py-6 md:py-16 pr-4 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto bg-white rounded-lg shadow-sm"
          aria-label="Product Categories"
        >
          <h2 className="text-xl font-semibold mb-6 text-gray-900 tracking-tight">
            Categories
          </h2>
          <ul className="space-y-3" role="list">
            {categories.map((cat) => (
              <li key={cat}>
                <motion.button
                  onClick={() => setSelectedCategory(cat)}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  variants={categoryButtonVariants}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    selectedCategory === cat
                      ? "bg-orange-600 text-white shadow-lg shadow-orange-300/50"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  aria-current={selectedCategory === cat ? "true" : "false"}
                >
                  {cat}
                </motion.button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <main className="flex-1 pl-0 md:pl-8 bg-white rounded-lg shadow-sm flex flex-col">
          {/* Page Header */}
          <div className="flex flex-col items-start md:items-end mb-6 md:mb-10 px-4 pt-4">
            <motion.p
              className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight select-none"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {selectedCategory === "All"
                ? "All Products"
                : `${selectedCategory} Products`}
            </motion.p>
            <motion.div
              className="w-24 h-1 bg-orange-600 rounded-full mt-2 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          </div>

          {/* Loading / No Products */}
          {loadingProducts ? (
            <div className="flex-grow flex justify-center items-center py-20 px-4">
              <p className="text-gray-500 text-lg select-none">
                ⏳ Loading products...
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex-grow flex justify-center items-center py-20 px-4">
              <p className="text-gray-500 text-lg select-none">No products found</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 pb-16"
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
