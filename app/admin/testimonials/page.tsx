import React from 'react';
import Link from 'next/link';
import { getServiceSupabase } from '@/lib/supabase';
import { Plus, Edit, Trash2, MessageSquare, Star } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminTestimonialsPage() {
    const supabase = getServiceSupabase();
    const { data: testimonials, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('sort_order', { ascending: true });

    if (error) {
        return <div className="text-red-500">Error loading testimonials: {error.message}</div>;
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h1 className="text-3xl font-bold text-white">Testimonials</h1>
                <Link
                    href="/admin/testimonials/new"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg"
                >
                    <Plus className="w-5 h-5" />
                    Add Testimonial
                </Link>
            </div>

            <div className="space-y-4">
                {testimonials && testimonials.length > 0 ? (
                    testimonials.map((t: any) => (
                        <div key={t.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-start">
                            {/* Avatar / Image */}
                            {t.customer_image_url ? (
                                <img
                                    src={t.customer_image_url}
                                    alt={t.customer_name}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-slate-700 shrink-0"
                                />
                            ) : (
                                <div className="w-14 h-14 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-lg shrink-0">
                                    {t.customer_name?.charAt(0)?.toUpperCase() || '?'}
                                </div>
                            )}

                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-white text-lg">{t.customer_name}</h3>
                                    {t.customer_location && (
                                        <span className="text-sm text-slate-400">{t.customer_location}</span>
                                    )}
                                </div>

                                {/* Stars */}
                                <div className="flex items-center gap-1 mb-3">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`w-4 h-4 ${star <= t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`}
                                        />
                                    ))}
                                </div>

                                <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                                    &ldquo;{t.review_text}&rdquo;
                                </p>

                                <div className="flex items-center gap-4 mt-3">
                                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 ${t.is_active ? 'text-green-400 bg-green-500/10' : 'text-slate-400 bg-slate-800'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${t.is_active ? 'bg-green-400' : 'bg-slate-400'}`}></span>
                                        {t.is_active ? 'Active' : 'Hidden'}
                                    </span>
                                    <span className="text-xs text-slate-500">Order: {t.sort_order}</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="shrink-0 flex items-center gap-2">
                                <Link
                                    href={`/admin/testimonials/${t.id}/edit`}
                                    className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                    title="Edit"
                                >
                                    <Edit className="w-4 h-4" />
                                </Link>
                                <Link
                                    href={`/admin/testimonials/${t.id}/delete`}
                                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-12 text-center">
                        <div className="flex flex-col items-center justify-center text-slate-500">
                            <MessageSquare className="w-12 h-12 mb-3 opacity-20" />
                            <p>No testimonials found.</p>
                            <Link href="/admin/testimonials/new" className="text-blue-500 hover:underline mt-2 text-sm">
                                Add your first testimonial
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
