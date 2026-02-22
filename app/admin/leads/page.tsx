import React from 'react';
import { getServiceSupabase } from '@/lib/supabase';
import { Mail, Phone, MapPin } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminLeadsPage() {
    const supabase = getServiceSupabase();
    const { data: leads, error } = await supabase
        .from('contact_leads')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return <div className="text-red-500">Error loading leads: {error.message}</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Contact Leads</h1>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-800/50 border-b border-slate-800">
                                <th className="py-4 px-6 text-sm font-semibold text-slate-300">Contact Details</th>
                                <th className="py-4 px-6 text-sm font-semibold text-slate-300">Message / Source</th>
                                <th className="py-4 px-6 text-sm font-semibold text-slate-300">Status</th>
                                <th className="py-4 px-6 text-sm font-semibold text-slate-300">Date Received</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads && leads.length > 0 ? (
                                leads.map((lead: any) => (
                                    <tr key={lead.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="font-semibold text-white mb-1">{lead.name}</div>
                                            <div className="flex flex-col gap-1 text-sm text-slate-400">
                                                <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {lead.phone}</span>
                                                {lead.email && <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {lead.email}</span>}
                                                {lead.city && <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {lead.city}</span>}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="text-sm text-slate-300 max-w-xs truncate" title={lead.message}>
                                                {lead.message || <span className="text-slate-500 italic">No message</span>}
                                            </div>
                                            <div className="text-xs text-slate-500 mt-2">Source: {lead.source}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${lead.status === 'new' ? 'bg-blue-500/10 text-blue-400' :
                                                    lead.status === 'contacted' ? 'bg-yellow-500/10 text-yellow-400' :
                                                        'bg-emerald-500/10 text-emerald-400'
                                                }`}>
                                                {lead.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-slate-400">
                                            {new Date(lead.created_at).toLocaleString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="py-8 text-center text-slate-500">
                                        No leads found.
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
