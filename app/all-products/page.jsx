"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Grid3x3, LayoutGrid, Package, Sparkles } from "lucide-react";
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
    hover: { scale: 1.02, boxShadow: "0 4px 12px rgba(249, 115, 22, 0.3)" },
    tap: { scale: 0.98 },
  };

  const productListVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const productItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  // Get category icon (you can expand this)
  const getCategoryIcon = (category) => {
    switch (category) {
      case "All":
        return <LayoutGrid className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <motion.div
        className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Sparkles className="w-10 h-10" />
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Our Products
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Discover our complete range of smart automation solutions
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile category dropdown */}
          <div className="lg:hidden w-full">
            <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
              <label
                htmlFor="category-select"
                className="flex items-center gap-2 mb-3 font-semibold text-gray-700 text-lg"
              >
                <Filter className="w-5 h-5 text-orange-600" />
                Category
              </label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg py-3 px-4 text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition bg-gray-50"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat} {cat === "All" ? `(${products.length})` : `(${products.filter(p => p.category === cat).length})`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop sidebar */}
          <aside
            className="hidden lg:block w-72 sticky top-24 self-start"
            aria-label="Product Categories"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Filter className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
              </div>
              <ul className="space-y-2" role="list">
                {categories.map((cat) => {
                  const count = cat === "All" ? products.length : products.filter(p => p.category === cat).length;
                  return (
                    <li key={cat}>
                      <motion.button
                        onClick={() => setSelectedCategory(cat)}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                        variants={categoryButtonVariants}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                          selectedCategory === cat
                            ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg"
                            : "text-gray-700 hover:bg-gray-50 border border-gray-200"
                        }`}
                        aria-current={selectedCategory === cat ? "true" : undefined}
                        aria-label={`Filter products by ${cat}`}
                      >
                        <div className="flex items-center gap-3">
                          {getCategoryIcon(cat)}
                          <span>{cat}</span>
                        </div>
                        <span className={`text-sm px-2.5 py-1 rounded-full ${
                          selectedCategory === cat
                            ? "bg-white/20"
                            : "bg-gray-100"
                        }`}>
                          {count}
                        </span>
                      </motion.button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {/* Search and Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <motion.h2
                    className="text-2xl md:text-3xl font-bold text-gray-900"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {selectedCategory === "All"
                      ? "All Products"
                      : selectedCategory}
                  </motion.h2>
                  <p className="text-gray-600 mt-1">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                  </p>
                </div>
              </div>

              {/* Search input */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition bg-gray-50"
                  aria-label="Search products by name"
                />
              </div>
            </div>

            {/* Product listing or messages */}
            <AnimatePresence mode="wait">
              {loadingProducts ? (
                <motion.div
                  key="loading"
                  className="flex flex-col justify-center items-center py-32 bg-white rounded-2xl shadow-lg border border-gray-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600 text-lg font-medium">Loading products...</p>
                </motion.div>
              ) : filteredProducts.length === 0 ? (
                <motion.div
                  key="empty"
                  className="flex flex-col justify-center items-center py-32 bg-white rounded-2xl shadow-lg border border-gray-200"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <Package className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-600 text-lg font-medium mb-2">No products found</p>
                  <p className="text-gray-500 text-sm">Try adjusting your search or filter</p>
                </motion.div>
              ) : (
                <motion.div
                  key="products"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
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
            </AnimatePresence>
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AllProducts;
