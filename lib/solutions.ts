import { getServiceSupabase } from './supabase';

export async function getActiveSolutions() {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching solutions:', error);
        return [];
    }

    return data;
}

export async function getSolutionBySlug(slug: string) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

    if (error) {
        console.error(`Error fetching solution ${slug}:`, error);
        return null;
    }

    return data;
}
