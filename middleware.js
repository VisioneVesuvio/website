import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/api/admin/bootstrap')) {
        return NextResponse.next();
    }

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token || token.role !== 'admin') {
        return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/admin/:path*'],
};
