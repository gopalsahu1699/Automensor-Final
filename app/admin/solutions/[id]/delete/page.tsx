import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { getServiceSupabase } from '@/lib/supabase';
import { ArrowLeft, Trash2 } from 'lucide-react';

interface Params {
    id: string;
}

export default async function DeleteSolutionPage(props: { params: Promise<Params> }) {
    const params = await props.params;
    const supabase = getServiceSupabase();

    const { data: solutions } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .limit(1);

    const solution = solutions && solutions.length > 0 ? solutions[0] : null;

    if (!solution) {
        notFound();
    }

    async function handleDelete() {
        'use server';

        const supabase = getServiceSupabase();

        await supabase
            .from('products')
            .delete()
            .eq('id', params.id);

        redirect('/admin/solutions');
    }

    return (
        <div className="max-w-lg mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/solutions" className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-300" />
                </Link>
                <h1 className="text-3xl font-bold text-white">Delete Solution</h1>
            </div>

            <div className="bg-slate-900 border border-red-500/20 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                    <Trash2 className="w-8 h-8 text-red-400" />
                </div>

                <h2 className="text-xl font-bold text-white mb-2">Are you sure?</h2>
                <p className="text-slate-400 mb-8">
                    You are about to delete the solution named <span className="text-white font-semibold">{solution.name}</span>. This action cannot be undone.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/admin/solutions"
                        className="px-8 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors font-semibold"
                    >
                        Cancel
                    </Link>
                    <form action={handleDelete}>
                        <button
                            type="submit"
                            className="px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors shadow-lg shadow-red-600/20"
                        >
                            Yes, Delete
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
