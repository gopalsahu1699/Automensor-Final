import React from 'react';
import Link from 'next/link';
import { getServiceSupabase } from '@/lib/supabase';
import { Plus, Edit, Image as ImageIcon, Package } from 'lucide-react';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
    const supabase = getServiceSupabase();
    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return <div className="text-red-500">Error loading products: {error.message}</div>;
    }

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h1 className="text-3xl font-bold text-white">Products</h1>
                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg"
                >
                    <Plus className="w-5 h-5" />
                    Add Product
                </Link>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-800/50 border-b border-slate-800">
                                <th className="py-4 px-6 text-sm font-semibold text-slate-300">Product</th>
                                <th className="py-4 px-6 text-sm font-semibold text-slate-300">Category</th>
                                <th className="py-4 px-6 text-sm font-semibold text-slate-300">Price</th>
                                <th className="py-4 px-6 text-sm font-semibold text-slate-300">Status</th>
                                <th className="py-4 px-6 text-sm font-semibold text-slate-300 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.length > 0 ? (
                                products.map((product: any) => (
                                    <tr key={product.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-slate-800 overflow-hidden flex-shrink-0 relative border border-slate-700">
                                                    {product.image_url ? (
                                                        <Image src={product.image_url} alt={product.name} fill className="object-cover" sizes="48px" />
                                                    ) : (
                                                        <div className="flex items-center justify-center w-full h-full text-slate-500">
                                                            <ImageIcon className="w-5 h-5" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-white">{product.name}</div>
                                                    <div className="text-xs text-slate-500">{product.slug}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-medium border border-slate-700 capitalize">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-slate-300">{product.price_range || '-'}</td>
                                        <td className="py-4 px-6">
                                            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 w-fit ${product.is_active ? 'text-green-400 bg-green-500/10' : 'text-slate-400 bg-slate-800'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${product.is_active ? 'bg-green-400' : 'bg-slate-400'}`}></span>
                                                {product.is_active ? 'Active' : 'Hidden'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/admin/products/${product.id}/edit`}
                                                    className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-500">
                                            <Package className="w-12 h-12 mb-3 opacity-20" />
                                            <p>No products found.</p>
                                            <Link href="/admin/products/new" className="text-blue-500 hover:underline mt-2 text-sm">
                                                Add your first product
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
