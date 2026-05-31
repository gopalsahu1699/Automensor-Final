import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { isAdmin } from '@/lib/admin-auth';

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const isAuth = await isAdmin();
        if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const params = await props.params;
        const body = await request.json();
        const supabase = getServiceSupabase();

        const { error } = await supabase
            .from('testimonials')
            .update(body)
            .eq('id', params.id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to update testimonial' }, { status: 500 });
    }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const isAuth = await isAdmin();
        if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const params = await props.params;
        const supabase = getServiceSupabase();

        const { error } = await supabase
            .from('testimonials')
            .delete()
            .eq('id', params.id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || 'Failed to delete testimonial' }, { status: 500 });
    }
}
