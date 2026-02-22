import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE } from '@/lib/admin-auth';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        const validEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
        const validPassword = process.env.ADMIN_PASSWORD;

        if (!validEmail || !validPassword) {
            return NextResponse.json(
                { error: 'Admin credentials not configured on server' },
                { status: 500 }
            );
        }

        if (email === validEmail && password === validPassword) {
            // Set cookie
            const cookieStore = await cookies();
            cookieStore.set(ADMIN_SESSION_COOKIE, process.env.ADMIN_SESSION_SECRET || 'secret', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/',
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
