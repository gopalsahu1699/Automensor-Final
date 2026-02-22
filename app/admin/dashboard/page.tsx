import React from 'react';
import { getServiceSupabase } from '@/lib/supabase';
import { Package, Users, TrendingUp } from 'lucide-react';

// Force dynamic rendering since we are fetching from DB
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const supabase = getServiceSupabase();

    // Fetch stats concurrently
    const [
        { count: productsCount },
        { count: leadsCount },
        { data: recentLeads }
    ] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('contact_leads').select('*', { count: 'exact', head: true }),
        supabase.from('contact_leads').select('*').order('created_at', { ascending: false }).limit(5)
    ]);

    const stats = [
        { label: 'Total Products', value: productsCount || 0, icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Total Leads', value: leadsCount || 0, icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { label: 'Conversion Rate', value: 'Coming Soon', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
                                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                                </div>
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg}`}>
                                    <Icon className={`w-7 h-7 ${stat.color}`} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Leads Table */}
            <h2 className="text-xl font-bold text-white mb-4 mt-12">Recent Contact Leads</h2>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-800/50 border-b border-slate-800">
                                <th className="py-4 px-6 text-sm font-semibold text-slate-300">Name</th>
                                <th className="py-4 px-6 text-sm font-semibold text-slate-300">Phone</th>
                                <th className="py-4 px-6 text-sm font-semibold text-slate-300">Status</th>
                                <th className="py-4 px-6 text-sm font-semibold text-slate-300">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentLeads && recentLeads.length > 0 ? (
                                recentLeads.map((lead: any) => (
                                    <tr key={lead.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                                        <td className="py-4 px-6 text-sm text-slate-300 font-medium">{lead.name}</td>
                                        <td className="py-4 px-6 text-sm text-slate-400">{lead.phone}</td>
                                        <td className="py-4 px-6">
                                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${lead.status === 'new' ? 'bg-blue-500/10 text-blue-400' :
                                                    lead.status === 'contacted' ? 'bg-yellow-500/10 text-yellow-400' :
                                                        'bg-emerald-500/10 text-emerald-400'
                                                }`}>
                                                {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-slate-400">
                                            {new Date(lead.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="py-8 text-center text-slate-500">
                                        No leads found yet.
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
