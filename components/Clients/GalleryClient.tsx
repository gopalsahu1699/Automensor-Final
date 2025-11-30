"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  ZoomIn,
  Plus,
  Upload,
  Trash2,
  Package,
  AlertCircle,
} from "lucide-react";
import { Client, Account, Storage, Databases, ID, Query } from "appwrite";

interface GalleryImage {
  $id: string;
  fileId: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
}

type LightboxIndex = number | null;

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const storage = new Storage(client);
const databases = new Databases(client);
const account = new Account(client);

const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_GALLERY_DATABASE_ID!;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_GALLERY_COLLECTION_ID!;
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL!;

export default function GalleryClient() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<LightboxIndex>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    caption: "",
    category: "Smart Home",
    alt: "",
    file: null as File | null,
  });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const getImageUrl = useCallback((fileId: string): string => {
    return `https://fra.cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
  }, []);

  const fetchImages = useCallback(async () => {
    try {
      console.log("🔍 Fetching gallery images...");
      setLoading(true);
      setLoadError(null);
      
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.orderDesc("$createdAt"), Query.limit(100)]
      );
      
      console.log("📊 Found documents:", response.documents.length);
      
      const galleryImages: GalleryImage[] = response.documents
        .filter((doc: any) => doc.fileId && doc.fileId.trim())
        .map((doc: any) => ({
          $id: doc.$id,
          fileId: doc.fileId,
          src: getImageUrl(doc.fileId),
          alt: doc.alt || `${doc.caption || "Gallery image"}`,
          caption: doc.caption || "Smart Home Project",
          category: doc.category || "Smart Home",
        }));

      console.log("🎨 Loaded images:", galleryImages.length);
      setImages(galleryImages);
    } catch (error: any) {
      console.error("❌ Fetch failed:", error);
      setLoadError("Failed to load gallery. Check permissions.");
    } finally {
      setLoading(false);
    }
  }, [getImageUrl]);

  // Check admin status
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const user = await account.get();
        setIsAdmin(user.email === ADMIN_EMAIL);
      } catch {
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, []);

  // Load on mount
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

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
      switch (e.key) {
        case "Escape": closeLightbox(); break;
        case "ArrowLeft": showPrev(); break;
        case "ArrowRight": showNext(); break;
      }
    };
    if (lightboxIndex !== null) {
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
    }
  }, [lightboxIndex, showPrev, showNext]);

  const handleUploadChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUploadForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadForm((prev) => ({ ...prev, file: e.target.files?.[0] || null }));
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.file) return;

    setUploading(true);
    try {
      const file = await storage.createFile(BUCKET_ID, ID.unique(), uploadForm.file);
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        fileId: file.$id,
        caption: uploadForm.caption,
        alt: uploadForm.alt,
        category: uploadForm.category,
      });
      await fetchImages();
      setUploadForm({ caption: "", category: "Smart Home", alt: "", file: null });
      setShowUploadModal(false);
    } catch (error: any) {
      console.error("Upload failed:", error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm("Delete this image?")) return;
    try {
      const doc = await databases.getDocument(DATABASE_ID, COLLECTION_ID, imageId);
      await storage.deleteFile(BUCKET_ID, doc.fileId);
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, imageId);
      await fetchImages();
    } catch (error) {
      alert("Delete failed");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-6" />
          <div className="flex items-center justify-center gap-3 text-slate-600 mb-4">
            <ImageIcon className="w-6 h-6" />
            <p className="text-xl font-semibold">Loading Gallery...</p>
          </div>
          <p className="text-sm text-slate-500">Fetching your projects</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-16">
        <div className="max-w-md w-full text-center">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 flex flex-col items-center gap-4">
            <AlertCircle className="w-12 h-12 text-red-500" />
            <h3 className="text-xl font-bold text-red-900">Gallery Error</h3>
            <p className="text-red-700">{loadError}</p>
            <button
              onClick={fetchImages}
              className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all font-medium"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <motion.div
        className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20 px-6 border-b border-purple-400/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm mb-8 mx-auto shadow-2xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <ImageIcon className="w-12 h-12" />
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Our Gallery
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Real-world smart home automation projects and installations
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="px-6 md:px-12 lg:px-24 xl:px-32 py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          
          {/* Admin Controls */}
          {isAdmin && (
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-12 p-6 bg-blue-50 border-2 border-blue-100 rounded-2xl">
              <div className="flex items-center gap-3 text-sm font-medium text-blue-900">
                <Package className="w-5 h-5" />
                <span>🖼️ {images.length} projects loaded</span>
              </div>
              <div className="flex gap-3">
                <motion.button
                  onClick={fetchImages}
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 font-medium transition-all shadow-md"
                >
                  🔄 Refresh
                </motion.button>
                <motion.button
                  onClick={() => setShowUploadModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-emerald-600 hover:to-green-700 shadow-lg border border-emerald-400/30"
                >
                  <Plus className="w-4 h-4" />
                  Add Project
                </motion.button>
              </div>
            </div>
          )}

          {/* Gallery Grid - OPTIMIZED CARD VIEW */}
          {images.length === 0 ? (
            <div className="text-center py-32">
              <motion.div
                className="w-32 h-32 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <ImageIcon className="w-16 h-16 text-gray-400" />
              </motion.div>
              <motion.h2
                className="text-3xl md:text-4xl font-black text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                No Projects Yet
              </motion.h2>
              <motion.p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
                {isAdmin 
                  ? "Upload your first smart home project using the admin panel above"
                  : "Contact us to see our projects"
                }
              </motion.p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
              }}
            >
              {images.map((image, index) => (
                <motion.div
                  key={image.$id}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 hover:-translate-y-2"
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -12 }}
                >
                  {/* PERFECTED IMAGE CARD */}
                  <div 
                    className="relative aspect-[4/3] cursor-zoom-in overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 group/image"
                    onClick={() => openLightbox(index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLightbox(index);
                      }
                    }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover transition-all duration-700 group-hover/image:scale-110 group-hover/image:brightness-[1.05]"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8Alt4YsFdzH7G1ZqU0e0hP5S2iJ40En//Z"
                      draggable={false}
                      onError={(e) => {
                        console.error("Image failed:", image.src);
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        (target.parentElement as HTMLElement).innerHTML = 
                          '<div class="absolute inset-0 flex items-center justify-center bg-slate-100 rounded-lg"><ImageIcon class="w-12 h-12 text-slate-400" /></div>';
                      }}
                    />
                    
                    {/* ENHANCED HOVER OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                      <div className="flex items-center justify-between w-full mb-3">
                        <div className="bg-white/95 backdrop-blur-xl px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wide text-slate-800 shadow-2xl border border-white/50">
                          {image.category}
                        </div>
                        <motion.div
                          className="w-14 h-14 bg-white/95 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl border-2 border-white/50 opacity-0 group-hover:opacity-100"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", bounce: 0.3 }}
                        >
                          <ZoomIn className="w-6 h-6 text-slate-800" />
                        </motion.div>
                      </div>
                    
                    </div>

                    {/* ADMIN DELETE BUTTON */}
                    {isAdmin && (
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteImage(image.$id);
                        }}
                        className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-red-500/95 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-xl border-2 border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    )}
                  </div>

                  {/* PERFECTED CONTENT SECTION */}
                  <div className="p-8">
                    <motion.h3 
                      className="text-xl font-black text-slate-900 mb-3 leading-tight line-clamp-2 group-hover:text-blue-600 transition-all duration-300 tracking-tight"
                      whileHover={{ scale: 1.02 }}
                    >
                      {image.caption}
                    </motion.h3>
                    <p className="text-base text-slate-600 font-medium line-clamp-2 leading-relaxed">
                      {image.alt}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Load More Button */}
          {images.length > 0 && (
            <div className="text-center pt-20">
              <motion.button
                className="px-12 py-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-black text-xl rounded-3xl hover:from-slate-800 hover:to-slate-700 shadow-2xl hover:shadow-3xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Load More Projects →
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* FIXED FULL VIEW LIGHTBOX - PRODUCT PAGE STYLE */}
      <AnimatePresence>
        {lightboxIndex !== null && images[lightboxIndex!] && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <motion.div
              className="relative max-w-6xl w-full max-h-[95vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* FULL SIZE IMAGE CONTAINER */}
              <div className="relative w-full h-[70vh] lg:h-[75vh] flex items-center justify-center rounded-3xl overflow-hidden shadow-2xl bg-slate-900/20 backdrop-blur-sm border-4 border-white/10">
                <Image
                  src={images[lightboxIndex!].src}
                  alt={images[lightboxIndex!].alt}
                  fill
                  className="object-contain max-w-full max-h-full"
                  sizes="95vw"
                  priority
                  quality={95}
                  draggable={false}
                />
              </div>

              {/* CONTROL BUTTONS - FIXED POSITIONS */}
              <motion.button
                onClick={closeLightbox}
                className="absolute -top-1 right-6 w-16 h-16 bg-white/20 hover:bg-white/40 backdrop-blur-xl rounded-3xl flex items-center justify-center text-white text-2xl font-black shadow-2xl border-2 border-white/30 transition-all duration-300 z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close lightbox"
              >
                <X className="w-7 h-7" />
              </motion.button>

              <motion.button
                onClick={showPrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 hover:bg-white/40 backdrop-blur-xl rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-2xl border-2 border-white/30 transition-all duration-300 z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-7 h-7" />
              </motion.button>

              <motion.button
                onClick={showNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 hover:bg-white/40 backdrop-blur-xl rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-2xl border-2 border-white/30 transition-all duration-300 z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Next image"
              >
                <ChevronRight className="w-7 h-7" />
              </motion.button>

              {/* PERFECTED CAPTION - BOTTOM CENTER */}
<motion.div
  className="mt-6 px-6 py-4 bg-black/40 backdrop-blur-xl rounded-2xl text-white border border-white/20 shadow-xl max-w-3xl mx-auto"
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.1 }}
>
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
    {/* Left: Caption + Description */}
    <div className="flex-1 min-w-0">
      <h2 className="text-lg sm:text-xl md:text-2xl font-black mb-1 leading-tight truncate">
        {images[lightboxIndex!].caption}
      </h2>
      <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">
        {images[lightboxIndex!].alt}
      </p>
    </div>
    
    {/* Right: Category + Counter */}
    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 pt-1 sm:pt-0">
      <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-xl font-bold uppercase tracking-wide text-xs sm:text-sm">
        {images[lightboxIndex!].category}
      </div>
      <div className="text-slate-300 font-mono text-xs bg-black/30 px-2.5 py-1.5 rounded-lg whitespace-nowrap">
        {lightboxIndex! + 1}/{images.length}
      </div>
    </div>
  </div>
</motion.div>



            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-200"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9 }}
            >
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">Add Project</h2>
                  <p className="text-gray-600">Upload to gallery</p>
                </div>
              </div>

              <form onSubmit={handleAddImage} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Project Image *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className="w-full border-2 border-dashed border-blue-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-all bg-gradient-to-br from-blue-50 to-indigo-50 file:mr-6 file:py-3 file:px-6 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-blue-500 file:to-indigo-600 file:text-white file:font-semibold hover:file:from-blue-600 hover:file:to-indigo-700"
                  />
                  {uploadForm.file && (
                    <p className="text-sm text-emerald-600 mt-3 font-medium truncate bg-emerald-50 px-4 py-2 rounded-xl">
                      ✅ {uploadForm.file.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Caption *</label>
                  <input
                    type="text"
                    name="caption"
                    value={uploadForm.caption}
                    onChange={handleUploadChange}
                    placeholder="Smart Door Lock Installation"
                    required
                    className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Alt Text *</label>
                  <textarea
                    name="alt"
                    value={uploadForm.alt}
                    onChange={handleUploadChange}
                    placeholder="Describe the installation for accessibility"
                    required
                    rows={3}
                    className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 resize-vertical transition-all placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <select
                    name="category"
                    value={uploadForm.category}
                    onChange={handleUploadChange}
                    className="w-full border-2 border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  >
                    <option value="Security">🔒 Security</option>
                    <option value="Comfort">🛋️ Comfort</option>
                    <option value="Smart Home">🏠 Smart Home</option>
                    <option value="Lighting">💡 Lighting</option>
                    <option value="Energy">⚡ Energy Management</option>
                    <option value="Other">📷 Other</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-8 py-4 rounded-2xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    disabled={uploading || !uploadForm.file}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 px-8 py-4 rounded-2xl font-black text-white text-lg shadow-xl transition-all ${
                      uploading || !uploadForm.file
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
                    }`}
                  >
                    {uploading ? "⏳ Uploading..." : "✅ Add Project"}
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
