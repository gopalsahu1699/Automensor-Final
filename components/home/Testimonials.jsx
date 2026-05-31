"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Star } from 'lucide-react';

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .eq('is_active', true)
                .order('sort_order', { ascending: true });

            if (!error && data) {
                setTestimonials(data);
            }
            setLoading(false);
        };
        fetchTestimonials();
    }, []);

    if (loading || testimonials.length === 0) {
        return null;
    }

    return (
        <section className="py-10 md:py-stack-xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-electric-blue/5 blur-[120px] rounded-full -translate-x-1/2" />

            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
                {/* Header */}
                <div className="text-center mb-stack-md">
                    <span className="text-electric-blue font-label-md tracking-[0.3em] uppercase mb-4 block">Customer Stories</span>
                    <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-6">
                        Trusted by <span className="gradient-text">Many Families</span>
                    </h2>
                    <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
                        See what our customers across Chhattisgarh have to say about their smart home experience.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    {testimonials.map((t) => (
                        <div
                            key={t.id}
                            className="glass p-4 md:p-8 rounded-2xl md:rounded-3xl border-white/5 hover:bg-white/5 transition-all duration-500 flex flex-col"
                        >
                            {/* Avatar + Name Row */}
                            <div className="flex items-center gap-4 mb-6">
                                {t.customer_image_url ? (
                                    <img
                                        src={t.customer_image_url}
                                        alt={t.customer_name}
                                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-electric-blue/30"
                                    />
                                ) : (
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-electric-blue/20 border border-electric-blue/30 flex items-center justify-center text-electric-blue font-bold text-lg shrink-0">
                                        {t.customer_name?.charAt(0)?.toUpperCase() || '?'}
                                    </div>
                                )}
                                <div>
                                    <p className="text-on-surface font-bold text-base md:text-lg">{t.customer_name}</p>
                                    {t.customer_location && (
                                        <p className="text-on-surface-variant text-sm">{t.customer_location}</p>
                                    )}
                                </div>
                            </div>

                            {/* Star Rating */}
                            <div className="flex items-center gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-3 h-3 md:w-4 md:h-4 ${star <= t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`}
                                    />
                                ))}
                            </div>

                            {/* Review Text */}
                            <p className="text-on-surface-variant leading-relaxed flex-grow">
                                &ldquo;{t.review_text}&rdquo;
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
