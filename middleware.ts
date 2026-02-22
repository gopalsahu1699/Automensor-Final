import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_SESSION_COOKIE } from './lib/admin-auth';

export async function middleware(request: NextRequest) {
    // Only protect /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {

        // Allow access to login page and login API endpoint
        if (
            request.nextUrl.pathname === '/admin/login' ||
            request.nextUrl.pathname.startsWith('/api/admin/login')
        ) {
            return NextResponse.next();
        }

        const session = request.cookies.get(ADMIN_SESSION_COOKIE);

        // Provide a simple protection, the actual check matches the secret string
        // This is basic security. In production, JWT is preferred.
        if (!session || session.value !== process.env.ADMIN_SESSION_SECRET) {
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
