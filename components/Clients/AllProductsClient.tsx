"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Grid3x3, LayoutGrid, Package, Sparkles } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useAppContext } from "@/context/AppContext";

interface Product {
  $id: string;
  name: string;
  category?: string;
  [key: string]: any;
}

const AllProductsClient = () => {
  const { products = [], loadingProducts } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Extract unique categories
  const categories = useMemo(() => {
    const typedProducts = (products || []) as Product[];
    const allCategories = typedProducts.map((p) => p.category || "Uncategorized");
    return ["All", ...new Set(allCategories)] as string[];
  }, [products]);

  // Filter products by category first
  const filteredByCategory = useMemo(() => {
    const typedProducts = (products || []) as Product[];
    return selectedCategory === "All"
      ? typedProducts
      : typedProducts.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  // Then filter by search term
  const filteredProducts = useMemo(() => {
    return filteredByCategory.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [filteredByCategory, searchTerm]);

  const categoryButtonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02, 
      boxShadow: "0 8px 25px rgba(15, 23, 42, 0.2)" 
    },
    tap: { scale: 0.98 },
  };

  const productListVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const productItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: "easeOut" as const
      } 
    },
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "All":
        return <LayoutGrid className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const typedProducts = (products || []) as Product[];

  return (
    <>
      {/* Professional Hero Section */}
      <motion.section
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 px-6 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-grid-slate-800/10" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-xl mb-8 shadow-2xl border border-white/20 mx-auto"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Sparkles className="w-12 h-12 text-slate-200" />
          </motion.div>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-slate-100 via-white to-slate-200 bg-clip-text text-transparent mb-6 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Our Products
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-slate-300 max-w-3xl mx-auto leading-relaxed backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Premium smart home automation solutions for modern living
          </motion.p>
        </div>
      </motion.section>

      {/* Main Content */}
      <main className="px-6 md:px-12 lg:px-24 xl:px-32 py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 min-h-screen">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
            {/* Mobile Category Dropdown */}
            <motion.div 
              className="lg:hidden w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-slate-200/50 hover:shadow-3xl transition-all duration-500">
                <label className="flex items-center gap-3 mb-4 font-semibold text-slate-700 text-lg">
                  <Filter className="w-6 h-6 text-slate-600" />
                  Filter by Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border-2 border-slate-200 rounded-2xl py-4 px-6 text-slate-700 font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-slate-900/20 focus:border-slate-900 transition-all bg-slate-50/50 backdrop-blur-sm shadow-inner"
                >
                  {categories.map((cat) => {
                    const count = cat === "All" ? typedProducts.length : typedProducts.filter(p => p.category === cat).length;
                    return (
                      <option key={cat} value={cat}>
                        {cat} ({count})
                      </option>
                    );
                  })}
                </select>
              </div>
            </motion.div>

            {/* Desktop Sidebar */}
            <motion.aside
              className="hidden lg:block w-80 sticky top-32 self-start"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              aria-label="Product Categories"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 p-8 hover:shadow-3xl transition-all duration-500">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl flex items-center justify-center shadow-lg">
                    <Filter className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-black text-slate-900">
                    Categories
                  </h2>
                </div>
                <ul className="space-y-3" role="list">
                  {categories.map((cat) => {
                    const count = cat === "All" ? typedProducts.length : typedProducts.filter(p => p.category === cat).length;
                    return (
                      <li key={cat}>
                        <motion.button
                          onClick={() => setSelectedCategory(cat)}
                          variants={categoryButtonVariants}
                          className={`group w-full flex items-center justify-between px-6 py-4 rounded-2xl font-semibold transition-all duration-400 focus:outline-none focus:ring-4 focus:ring-slate-900/20 ${
                            selectedCategory === cat
                              ? "bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-2xl border-2 border-slate-700/50"
                              : "text-slate-700 hover:bg-slate-50/50 hover:shadow-xl hover:border-slate-300 border border-slate-200/50 bg-white/60"
                          }`}
                          aria-current={selectedCategory === cat ? "page" : undefined}
                        >
                          <div className="flex items-center gap-4">
                            {getCategoryIcon(cat)}
                            <span className="text-lg font-semibold group-hover:translate-x-1 transition-transform">
                              {cat}
                            </span>
                          </div>
                          <span className={`text-sm px-4 py-2 rounded-2xl font-bold min-w-[44px] text-center shadow-lg ${
                            selectedCategory === cat
                              ? "bg-white/30 backdrop-blur-sm text-white"
                              : "bg-slate-100 text-slate-700"
                          }`}>
                            {count}
                          </span>
                        </motion.button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.aside>

            {/* Main Content */}
            <motion.section className="flex-1 min-w-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              
              {/* Search Header */}
              <motion.div
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 p-8 lg:p-12 mb-12 hover:shadow-3xl transition-all duration-500"
                initial={{ y: 30 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                  <div>
                    <motion.h2
                      className="text-3xl lg:text-4xl font-black text-slate-900 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      {selectedCategory === "All" ? "All Products" : selectedCategory}
                    </motion.h2>
                    <motion.p 
                      className="text-slate-600 text-xl mt-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
                    </motion.p>
                  </div>
                </div>

                {/* Professional Search */}
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search products by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-16 pr-6 py-5 border-2 border-slate-200 rounded-3xl text-slate-700 font-semibold text-lg focus:outline-none focus:ring-4 focus:ring-slate-900/20 focus:border-slate-900 transition-all bg-slate-50/50 backdrop-blur-sm shadow-xl hover:shadow-2xl"
                    aria-label="Search products by name"
                  />
                </div>
              </motion.div>

              {/* Products Grid */}
              <AnimatePresence mode="wait">
                {loadingProducts ? (
                  <motion.div
                    key="loading"
                    className="flex flex-col justify-center items-center py-40 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-20 h-20 border-4 border-slate-200 border-t-slate-900 rounded-3xl animate-spin mb-8 shadow-2xl" />
                    <p className="text-slate-600 text-2xl font-semibold">Loading products...</p>
                  </motion.div>
                ) : filteredProducts.length === 0 ? (
                  <motion.div
                    key="empty"
                    className="flex flex-col justify-center items-center py-40 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <div className="w-28 h-28 rounded-3xl bg-slate-100/50 backdrop-blur-xl flex items-center justify-center mb-8 shadow-2xl border border-slate-200/30">
                      <Package className="w-16 h-16 text-slate-400" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4">No products found</h3>
                    <p className="text-xl text-slate-600 max-w-md leading-relaxed">Try adjusting your search terms or category filter</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="products"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8"
                    variants={productListVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {filteredProducts.map((product) => (
                      <motion.div 
                        key={product.$id} 
                        variants={productItemVariants}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
          </div>
        </div>
      </main>

      <style jsx>{`
        .bg-grid-slate-800\\/10 {
          background-image: 
            linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
          background-size: 60px 60px;
        }
      `}</style>
    </>
  );
};

export default AllProductsClient;
