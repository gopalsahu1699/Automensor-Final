"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, ArrowLeft, ImagePlus, X, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function TestimonialForm({ initialData = null }: { initialData?: any }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        customer_name: initialData?.customer_name || '',
        customer_location: initialData?.customer_location || '',
        customer_image_url: initialData?.customer_image_url || '',
        rating: initialData?.rating || 5,
        review_text: initialData?.review_text || '',
        is_active: initialData?.is_active ?? true,
        sort_order: initialData?.sort_order || 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const isChecked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? isChecked : (name === 'rating' || name === 'sort_order') ? parseInt(value) || 0 : value
        }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image must be less than 5MB');
            return;
        }

        setIsUploading(true);
        try {
            const uploadData = new FormData();
            uploadData.append('file', file);

            const res = await fetch('/api/admin/upload-image', {
                method: 'POST',
                body: uploadData,
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Upload failed');

            setFormData(prev => ({ ...prev, customer_image_url: data.url }));
            toast.success('Image uploaded successfully');
        } catch (error: any) {
            toast.error(error.message || 'Failed to upload image');
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = () => {
        setFormData(prev => ({ ...prev, customer_image_url: '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const url = initialData ? `/api/admin/testimonials/${initialData.id}` : '/api/admin/testimonials';
            const method = initialData ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                toast.success(initialData ? 'Testimonial updated' : 'Testimonial created');
                router.push('/admin/testimonials');
                router.refresh();
            } else {
                const data = await res.json();
                toast.error(data.error || 'Failed to save testimonial');
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
                <Link href="/admin/testimonials" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-300" />
                </Link>
                <h1 className="text-3xl font-bold text-white">
                    {initialData ? 'Edit Testimonial' : 'Add New Testimonial'}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Customer Info */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-white mb-6">Customer Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Customer Name <span className="text-red-500">*</span></label>
                            <input required name="customer_name" value={formData.customer_name} onChange={handleChange} className="w-full px-4 py-3 bg-slate-800 border-slate-700 border text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Rajesh Kumar" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Location</label>
                            <input name="customer_location" value={formData.customer_location} onChange={handleChange} className="w-full px-4 py-3 bg-slate-800 border-slate-700 border text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Bilaspur, Chhattisgarh" />
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-slate-300">Customer Image</label>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                            {formData.customer_image_url ? (
                                <div className="flex items-center gap-4">
                                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-slate-700 shrink-0">
                                        <img src={formData.customer_image_url} alt="Customer" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-slate-300 truncate">{formData.customer_image_url}</p>
                                        <div className="flex gap-2 mt-2">
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                            >
                                                <Upload className="w-3 h-3" />
                                                Change
                                            </button>
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                                            >
                                                <X className="w-3 h-3" />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isUploading}
                                    className="w-full border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-blue-500 transition-colors disabled:opacity-50"
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                            <span className="text-sm">Uploading...</span>
                                        </>
                                    ) : (
                                        <>
                                            <ImagePlus className="w-6 h-6" />
                                            <span className="text-sm font-medium">Click to upload image</span>
                                            <span className="text-xs text-slate-500">JPG, PNG, WEBP (max 5MB)</span>
                                        </>
                                    )}
                                </button>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Rating (1-5)</label>
                            <select name="rating" value={formData.rating} onChange={handleChange} className="w-full px-4 py-3 bg-slate-800 border-slate-700 border text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                                <option value={5}>5 Stars</option>
                                <option value={4}>4 Stars</option>
                                <option value={3}>3 Stars</option>
                                <option value={2}>2 Stars</option>
                                <option value={1}>1 Star</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Sort Order</label>
                            <input type="number" name="sort_order" value={formData.sort_order} onChange={handleChange} className="w-24 px-4 py-3 bg-slate-800 border-slate-700 border text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Review Content */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-white mb-6">Review</h2>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Review Text <span className="text-red-500">*</span></label>
                        <textarea required name="review_text" value={formData.review_text} onChange={handleChange} rows={5} className="w-full px-4 py-3 bg-slate-800 border-slate-700 border text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="What did the customer say..." />
                    </div>
                </div>

                {/* Visibility */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-white mb-6">Visibility</h2>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" name="is_active" checked={formData.is_active} onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))} className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-900" />
                        <div className="flex flex-col">
                            <span className="text-white font-medium">Active (Visible)</span>
                            <span className="text-xs text-slate-400">Show this testimonial on the website</span>
                        </div>
                    </label>
                </div>

                <div className="flex justify-end pt-4 pb-12">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed text-lg"
                    >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {initialData ? 'Update Testimonial' : 'Save Testimonial'}
                    </button>
                </div>
            </form>
        </div>
    );
}
