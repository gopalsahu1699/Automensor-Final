"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import { ImagePlus, X, Save, Loader2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductForm({ initialData = null }: { initialData?: any }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        slug: initialData?.slug || '',
        category: initialData?.category || 'comfort',
        short_description: initialData?.short_description || '',
        full_description: initialData?.full_description || '',
        technical_details: initialData?.technical_details || '',
        price_range: initialData?.price_range || '',
        image_url: initialData?.image_url || '',
        is_active: initialData?.is_active ?? true,
        is_featured: initialData?.is_featured ?? false,
        sort_order: initialData?.sort_order || 0,
        features: initialData?.features?.join(', ') || ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const isChecked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? isChecked : value
        }));

        // Auto-generate slug from name if creating new
        if (name === 'name' && !initialData) {
            setFormData(prev => ({
                ...prev,
                slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
            }));
        }
    };

    const handleUploadSuccess = (result: any) => {
        setFormData(prev => ({
            ...prev,
            image_url: result.info.secure_url
        }));
        toast.success("Image uploaded successfully");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const payload = {
                ...formData,
                features: formData.features.split(',').map((f: string) => f.trim()).filter(Boolean)
            };

            const url = initialData ? `/api/admin/products/${initialData.id}` : '/api/admin/products';
            const method = initialData ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                toast.success(initialData ? 'Product updated' : 'Product created');
                router.push('/admin/products');
                router.refresh();
            } else {
                const data = await res.json();
                toast.error(data.error || 'Failed to save product');
            }
        } catch (error) {
            toast.error('An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/products" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-300" />
                </Link>
                <h1 className="text-3xl font-bold text-white">
                    {initialData ? 'Edit Product' : 'Add New Product'}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* Basic Info Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-white mb-6">Basic Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Product Name <span className="text-red-500">*</span></label>
                            <input required name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-slate-800 border-slate-700 border text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">URL Slug (e.g. smart-touch-panel) <span className="text-red-500">*</span></label>
                            <input required name="slug" value={formData.slug} onChange={handleChange} className="w-full px-4 py-3 bg-slate-800/50 border-slate-700 border text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Category <span className="text-red-500">*</span></label>
                            <select required name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 bg-slate-800 border-slate-700 border text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                                <option value="comfort">Comfort & Luxury</option>
                                <option value="security">Safety & Security</option>
                                <option value="control">Control Systems</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Price Range (e.g. ₹4,999 - ₹12,999)</label>
                            <input name="price_range" value={formData.price_range} onChange={handleChange} className="w-full px-4 py-3 bg-slate-800 border-slate-700 border text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Leave empty for 'Price varies'" />
                        </div>
                    </div>
                </div>

                {/* Media & Details Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 drop-shadow-sm">
                    <h2 className="text-xl font-bold text-white mb-6">Media & Content</h2>

                    <div className="space-y-6">
                        <div className="space-y-2 flex flex-col">
                            <label className="text-sm font-medium text-slate-300">Main Image</label>
                            {formData.image_url ? (
                                <div className="relative w-48 h-48 rounded-xl overflow-hidden border border-slate-700 group">
                                    <Image src={formData.image_url} alt="Product" fill className="object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button type="button" onClick={() => setFormData(p => ({ ...p, image_url: '' }))} className="p-2 bg-red-500 text-white rounded-full">
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <CldUploadWidget
                                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "automensor_gallery"}
                                    onSuccess={handleUploadSuccess}
                                    options={{ maxFiles: 1 }}
                                >
                                    {({ open }) => (
                                        <button type="button" onClick={() => open()} className="w-48 h-48 border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-blue-500 transition-colors bg-slate-800/30 font-medium">
                                            <ImagePlus className="w-8 h-8 mb-2" />
                                            Upload Image
                                        </button>
                                    )}
                                </CldUploadWidget>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Short Description</label>
                            <textarea name="short_description" value={formData.short_description} onChange={handleChange} rows={2} className="w-full px-4 py-3 bg-slate-800 border-slate-700 border text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="A brief summary for the product card..." />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Features (comma-separated)</label>
                            <textarea name="features" value={formData.features} onChange={handleChange} rows={2} className="w-full px-4 py-3 bg-slate-800 border-slate-700 border text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Voice Control, Retrofit, Wi-Fi Built-in..." />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Full Description</label>
                            <textarea name="full_description" value={formData.full_description} onChange={handleChange} rows={6} className="w-full px-4 py-3 bg-slate-800 border-slate-700 border text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Detailed product overview..." />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Technical Details</label>
                            <textarea name="technical_details" value={formData.technical_details} onChange={handleChange} rows={6} className="w-full px-4 py-3 bg-slate-800 border-slate-700 border text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Technical specifications like voltage, dimensions, connectivity..." />
                        </div>
                    </div>
                </div>

                {/* Visibility Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 drop-shadow-sm">
                    <h2 className="text-xl font-bold text-white mb-6">Visibility & Ordering</h2>
                    <div className="flex flex-col sm:flex-row gap-8">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900" />
                            <div className="flex flex-col">
                                <span className="text-white font-medium">Active (Visible)</span>
                                <span className="text-xs text-slate-400">Show this product on the website</span>
                            </div>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900" />
                            <div className="flex flex-col">
                                <span className="text-white font-medium">Featured</span>
                                <span className="text-xs text-slate-400">Highlight on the home page</span>
                            </div>
                        </label>

                        <div className="space-y-2 sm:ml-auto">
                            <label className="text-sm font-medium text-slate-300">Sort Order</label>
                            <input type="number" name="sort_order" value={formData.sort_order} onChange={handleChange} className="w-24 px-4 py-2 bg-slate-800 border-slate-700 border text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4 pb-12">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed text-lg"
                    >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {initialData ? 'Update Product' : 'Save Product'}
                    </button>
                </div>
            </form>
        </div>
    );
}
