"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, ZoomIn, Plus, Upload, Trash2 } from "lucide-react";
import { Account } from "appwrite";

interface GalleryImage {
  id?: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
}

type LightboxIndex = number | null;

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export default function GalleryClient() {
  const [images, setImages] = useState<GalleryImage[]>([
    {
      src: "/images/gallery3.jpg",
      alt: "Smart Door Lock - Advanced security with biometric access",
      caption: "Smart Door Lock",
      category: "Security",
    },
    {
      src: "/images/gallery4.jpg",
      alt: "Automated Blinds - Smart window control system",
      caption: "Automated Blinds",
      category: "Comfort",
    },
    {
      src: "/images/gallery5.jpg",
      alt: "Voice Assistant Device - Smart home control center",
      caption: "Voice Assistant Device",
      category: "Smart Home",
    },
  ]);

  const [lightboxIndex, setLightboxIndex] = useState<LightboxIndex>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    caption: "",
    category: "Smart Home",
    imageUrl: "",
    alt: "",
  });
  const [uploading, setUploading] = useState(false);

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { Account, Client } = await import("appwrite");
        const client = new Client()
          .setEndpoint("https://fra.cloud.appwrite.io/v1")
          .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
        const account = new Account(client);
        const user = await account.get();
        if (user.email === ADMIN_EMAIL) {
          setIsAdmin(true);
        }
      } catch {
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === 0 ? images.length - 1 : (prev as number) - 1
    );
  }, [images.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === images.length - 1 ? 0 : (prev as number) + 1
    );
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;

      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [lightboxIndex, showPrev, showNext]);

  // Handle image upload
  const handleUploadChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUploadForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const newImage: GalleryImage = {
        id: Date.now().toString(),
        src: uploadForm.imageUrl,
        alt: uploadForm.alt,
        caption: uploadForm.caption,
        category: uploadForm.category,
      };

      setImages((prev) => [newImage, ...prev]);
      setUploadForm({
        caption: "",
        category: "Smart Home",
        imageUrl: "",
        alt: "",
      });
      setShowUploadModal(false);
      alert("Image added successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to add image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = (index: number) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      setImages((prev) => prev.filter((_, i) => i !== index));
      if (lightboxIndex === index) {
        closeLightbox();
      }
    }
  };

  return (
    <>
      

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6 border-2 border-white/20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <ImageIcon className="w-10 h-10" />
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Our Gallery
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Explore our smart home automation solutions in action
          </motion.p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Admin Add Image Button */}
        {isAdmin && (
          <div className="mb-8 flex justify-end">
            <motion.button
              onClick={() => setShowUploadModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add New Image
            </motion.button>
          </div>
        )}

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {images.map((image, index) => (
            <motion.div
              key={image.id || index}
              className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -8 }}
            >
              {/* Image Container */}
              <div
                className="relative aspect-[4/3] bg-gray-200 overflow-hidden cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-gray-800" />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {image.category}
                </div>

                {/* Delete Button (Admin Only) */}
                {isAdmin && (
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteImage(index);
                    }}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-600/80 hover:bg-red-700 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Delete image"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                )}
              </div>

              {/* Caption */}
              <div className="p-4 bg-white">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                  {image.caption}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Click to view full size
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeLightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox viewer"
          >
            <motion.div
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              {/* Image */}
              <div className="relative aspect-video">
                <Image
                  src={images[lightboxIndex].src}
                  alt={images[lightboxIndex].alt}
                  fill
                  className="max-w-full max-h-[80vh] mx-auto rounded-lg shadow-2xl object-contain"
                  sizes="90vw"
                  priority
                />
              </div>

              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Close image viewer"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={showPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="View previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={showNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="View next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              {/* Caption */}
              <div className="absolute -bottom-16 left-0 right-0 text-center">
                <p className="text-white text-xl font-semibold mb-2">
                  {images[lightboxIndex].caption}
                </p>
                <p className="text-gray-400 text-sm">
                  {lightboxIndex + 1} / {images.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowUploadModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Add New Image
                </h2>
              </div>

              <form onSubmit={handleAddImage} className="space-y-4">
                {/* Image URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={uploadForm.imageUrl}
                    onChange={handleUploadChange}
                    placeholder="https://example.com/image.jpg"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                {/* Caption */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Caption
                  </label>
                  <input
                    type="text"
                    name="caption"
                    value={uploadForm.caption}
                    onChange={handleUploadChange}
                    placeholder="e.g., Smart Door Lock"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                {/* Alt Text */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Alt Text
                  </label>
                  <textarea
                    name="alt"
                    value={uploadForm.alt}
                    onChange={handleUploadChange}
                    placeholder="Describe the image for accessibility"
                    required
                    rows={2}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={uploadForm.category}
                    onChange={handleUploadChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 bg-white"
                  >
                    <option value="Security">Security</option>
                    <option value="Comfort">Comfort</option>
                    <option value="Smart Home">Smart Home</option>
                    <option value="Lighting">Lighting</option>
                    <option value="Energy">Energy Management</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    disabled={uploading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 px-4 py-2 rounded-lg font-semibold text-white transition-all ${
                      uploading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                    }`}
                  >
                    {uploading ? "Adding..." : "Add Image"}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

   
    </>
  );
}
