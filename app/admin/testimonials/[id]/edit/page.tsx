import { notFound } from 'next/navigation';
import TestimonialForm from '@/components/admin/TestimonialForm';
import { getServiceSupabase } from '@/lib/supabase';

interface Params {
    id: string;
}

export default async function EditTestimonialPage(props: { params: Promise<Params> }) {
    const params = await props.params;
    const supabase = getServiceSupabase();
    const { data: testimonials, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', params.id)
        .limit(1);

    const testimonial = testimonials && testimonials.length > 0 ? testimonials[0] : null;

    if (!testimonial || error) {
        notFound();
    }

    return <TestimonialForm initialData={testimonial} />;
}
