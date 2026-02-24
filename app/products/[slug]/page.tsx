import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug } from '@/lib/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle2, PhoneCall, ShieldCheck, ArrowLeft } from 'lucide-react';

import ProductImageGallery from '@/components/ProductImageGallery';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const product = await getProductBySlug(resolvedParams.slug);

    if (!product) {
        return { title: 'Product Not Found' };
    }

    return {
        title: `${product.name} | Autommensor Smart Home`,
        description: product.short_description,
        openGraph: {
            images: [product.image_url || '/assets/og-products.jpg'],
        },
    };
}

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const product = await getProductBySlug(params.slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
            <Navbar />

            <main className="flex-1 pt-28 pb-20">
                <div className="container mx-auto px-6 max-w-7xl">

                    <Link href="/all-products" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-8 text-sm font-semibold">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Products
                    </Link>

                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                            {/* Left Column - Image Gallery */}
                            <div className="flex flex-col gap-6">
                                <ProductImageGallery
                                    images={[product.image_url, ...(product.gallery_urls || [])].filter(Boolean)}
                                    productName={product.name}
                                    isFeatured={product.is_featured}
                                />
                            </div>

                            {/* Right Column - Details */}
                            <div className="flex flex-col">
                                <div className="mb-2">
                                    <span className="text-sm font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
                                        {product.category}
                                    </span>
                                </div>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">{product.name}</h1>
                                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-6 border-b border-slate-100 pb-8">
                                    {product.short_description}
                                </p>

                                <div className="mb-10">
                                    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Price Estimate</div>
                                    <div className="text-3xl font-bold text-slate-900">
                                        {product.price_range || "Price on Request"}
                                    </div>
                                    {!product.price_range && (
                                        <p className="text-sm text-slate-500 mt-1">Price varies based on installation requirements.</p>
                                    )}
                                </div>

                                {product.features && product.features.length > 0 && (
                                    <div className="mb-10 flex-1">
                                        <h3 className="text-lg font-bold text-slate-900 mb-4">Key Features</h3>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                                            {product.features.map((feature: string, idx: number) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                                    <span className="text-slate-700 font-medium">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row gap-4 mt-auto border-t border-slate-100 pt-8">
                                    <Link
                                        href="/contact-us"
                                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-bold text-base sm:text-lg shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
                                    >
                                        <PhoneCall className="w-5 h-5" />
                                        Enquire Now
                                    </Link>
                                    <div className="flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 text-slate-700 py-3 sm:py-4 px-4 sm:px-6 rounded-xl text-sm sm:text-base font-semibold">
                                        <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                        10-Year Warranty
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Bottom - Full Description */}
                        {product.full_description && (
                            <div className="mt-16 pt-12 border-t border-slate-100">
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Product Details</h2>
                                <div className="prose prose-slate max-w-4xl text-sm sm:text-base text-slate-600 leading-relaxed">
                                    {product.full_description.split('\n').map((paragraph: string, idx: number) => (
                                        <p key={idx} className="mb-4">{paragraph}</p>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Technical Details */}
                        {product.technical_details && (
                            <div className="mt-12 pt-12 border-t border-slate-100">
                                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6">Technical Details</h2>
                                <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200">
                                    <ul className="list-disc list-outside ml-5 space-y-2 text-sm sm:text-base text-slate-600">
                                        {product.technical_details.split('\n').filter((line: string) => line.trim() !== '').map((paragraph: string, idx: number) => (
                                            <li key={idx} className="pl-2">{paragraph}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
