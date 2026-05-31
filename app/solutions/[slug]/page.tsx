import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { getSolutionBySlug } from '@/lib/solutions';

import { CheckCircle2, PhoneCall, ShieldCheck, ArrowLeft } from 'lucide-react';

import ProductImageGallery from '@/components/ProductImageGallery';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const solution = await getSolutionBySlug(resolvedParams.slug);

    if (!solution) {
        return { title: 'Solution Not Found' };
    }

    return {
        title: `${solution.name} | Autommensor Smart Home`,
        description: solution.short_description,
        openGraph: {
            images: [solution.image_url || '/assets/og-products.jpg'],
        },
    };
}

export default async function SolutionPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const solution = await getSolutionBySlug(params.slug);

    if (!solution) {
        notFound();
    }

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: solution.name,
        description: solution.short_description,
        image: solution.image_url || "https://autommensor.in/logo.png",
        brand: {
            "@type": "Brand",
            name: "Autommensor",
        },
        url: `https://autommensor.in/solutions/${solution.slug}`,
        offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: solution.price_range ? solution.price_range.replace(/[^0-9]/g, '').split('-')[0] : undefined,
            availability: "https://schema.org/InStock",
            seller: {
                "@type": "Organization",
                name: "Autommensor",
            },
        },
    };

    return (
        <div className="min-h-screen bg-background font-sans flex flex-col">
            <Script
                id={`product-schema-${solution.slug}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />

            <main className="flex-1 pt-20 pb-10 md:pt-28 md:pb-20">
                <div className="container mx-auto px-6 max-w-7xl">

                    <Link href="/all-solutions" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-electric-blue transition-colors mb-8 text-sm font-semibold">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Solutions
                    </Link>

                    <div className="bg-surface-container rounded-3xl border border-white/10 p-4 md:p-6 lg:p-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                            {/* Left Column - Image Gallery */}
                            <div className="flex flex-col gap-6">
                                <ProductImageGallery
                                    images={[solution.image_url, ...(solution.gallery_urls || [])].filter(Boolean)}
                                    productName={solution.name}
                                    isFeatured={solution.is_featured}
                                />
                            </div>

                            {/* Right Column - Details */}
                            <div className="flex flex-col">
                                <div className="mb-2">
                                    <span className="text-sm font-bold text-electric-blue uppercase tracking-wider bg-electric-blue/10 px-3 py-1 rounded-full">
                                        {solution.category}
                                    </span>
                                </div>
                                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-on-surface mb-3 md:mb-4">{solution.name}</h1>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-on-surface-variant leading-relaxed mb-3 md:mb-6 border-b border-white/10 pb-4 md:pb-8">
                                    {solution.short_description}
                                </p>

                                <div className="mb-4 md:mb-6 lg:mb-10">
                                    <div className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Price Estimate</div>
                                    <div className="text-xl md:text-2xl lg:text-3xl font-bold text-on-surface">
                                        {solution.price_range || "Price on Request"}
                                    </div>
                                    {!solution.price_range && (
                                        <p className="text-sm text-on-surface-variant mt-1">Price varies based on installation requirements.</p>
                                    )}
                                </div>

                                {solution.features && solution.features.length > 0 && (
                                    <div className="mb-4 md:mb-6 lg:mb-10 flex-1">
                                        <h3 className="text-base md:text-lg font-bold text-on-surface mb-2 md:mb-4">Key Features</h3>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 md:gap-y-4 gap-x-4 md:gap-x-6">
                                            {solution.features.map((feature: string, idx: number) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <CheckCircle2 className="w-5 h-5 text-success-emerald shrink-0 mt-0.5" />
                                                    <span className="text-on-surface-variant font-medium">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row gap-4 mt-auto border-t border-white/10 pt-4 md:pt-8">
                                    <Link
                                        href="/contact-us"
                                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 md:py-3 lg:py-4 px-4 md:px-6 lg:px-8 rounded-xl font-bold text-sm md:text-base lg:text-lg shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
                                    >
                                        <PhoneCall className="w-5 h-5" />
                                        Enquire Now
                                    </Link>
                                    <div className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-on-surface-variant py-2 md:py-3 lg:py-4 px-3 md:px-4 lg:px-6 rounded-xl text-xs md:text-sm lg:text-base font-semibold">
                                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                                        {solution.warranty_details ? solution.warranty_details.split('\n')[0].slice(0, 40) : '10-Year Warranty'}
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Bottom - Full Description */}
                        {solution.full_description && (
                            <div className="mt-8 pt-6 md:mt-16 md:pt-12 border-t border-white/10">
                                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-on-surface mb-2 md:mb-4 lg:mb-6">Solution Details</h2>
                                <div className="prose prose-invert max-w-4xl text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed">
                                    {solution.full_description.split('\n').map((paragraph: string, idx: number) => (
                                        <p key={idx} className="mb-4">{paragraph}</p>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Technical Details */}
                        {solution.technical_details && (
                            <div className="mt-6 pt-4 md:mt-12 md:pt-12 border-t border-white/10">
                                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-on-surface mb-2 md:mb-4 lg:mb-6">Technical Details</h2>
                                <div className="bg-surface-container-lowest p-3 md:p-6 lg:p-8 rounded-xl md:rounded-2xl border border-white/10">
                                    <ul className="list-disc list-outside ml-5 space-y-1 md:space-y-2 text-xs sm:text-sm md:text-base text-on-surface-variant">
                                        {solution.technical_details.split('\n').filter((line: string) => line.trim() !== '').map((paragraph: string, idx: number) => (
                                            <li key={idx} className="pl-2">{paragraph}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Warranty Details */}
                        {solution.warranty_details && (
                            <div className="mt-6 pt-4 md:mt-12 md:pt-12 border-t border-white/10">
                                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-on-surface mb-2 md:mb-4 lg:mb-6">Warranty Details</h2>
                                <div className="bg-surface-container-lowest p-3 md:p-6 lg:p-8 rounded-xl md:rounded-2xl border border-white/10">
                                    <ul className="list-disc list-outside ml-5 space-y-1 md:space-y-2 text-xs sm:text-sm md:text-base text-on-surface-variant">
                                        {solution.warranty_details.split('\n').filter((line: string) => line.trim() !== '').map((line: string, idx: number) => (
                                            <li key={idx} className="pl-2">{line}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
