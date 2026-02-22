import { cookies } from 'next/headers';

export const ADMIN_SESSION_COOKIE = 'admin_session';

export async function isAdmin() {
    const cookieStore = await cookies();
    const session = cookieStore.get(ADMIN_SESSION_COOKIE);

    if (!session) return false;

    // Verify the cookie value matches our secret
    return session.value === process.env.ADMIN_SESSION_SECRET;
}
