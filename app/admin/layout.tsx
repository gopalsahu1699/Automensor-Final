"use client";

import React, { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Don't show sidebar on login page
    if (pathname === '/admin/login') {
        return <div className="bg-slate-950 min-h-screen text-slate-200">{children}</div>;
    }

    // Prevent hydration errors by not rendering the shell until mounted
    if (!isClient) {
        return <div className="min-h-screen bg-slate-950 flex items-center justify-center">Loading Admin...</div>;
    }

    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-200 font-sans">
            <AdminSidebar />
            <main className="flex-1 ml-0 md:ml-0 h-screen overflow-y-auto w-full">
                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-lg">A</span>
                        </div>
                        Autommensor
                    </h2>
                    {/* A real mobile menu button goes here, keeping it simple for now */}
                </div>

                <div className="p-4 md:p-8 lg:p-12 w-full max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
