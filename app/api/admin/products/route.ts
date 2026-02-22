import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { isAdmin } from '@/lib/admin-auth';

export async function POST(request: Request) {
    try {
        const isAuth = await isAdmin();
        if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await request.json();
        const supabase = getServiceSupabase();

        const { error } = await supabase.from('products').insert([body]);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to create product' }, { status: 500 });
    }
}
