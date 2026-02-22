import { notFound } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import { getServiceSupabase } from '@/lib/supabase';

// Explicitly define Params interface matching Next.js 15 app router expectations for async params
interface Params {
    id: string;
}

export default async function EditProductPage(props: { params: Promise<Params> }) {
    const params = await props.params;
    const supabase = getServiceSupabase();
    const { data: product } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single();

    if (!product) {
        notFound();
    }

    return <ProductForm initialData={product} />;
}
