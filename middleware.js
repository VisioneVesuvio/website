import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/api/admin/bootstrap')) {
        return NextResponse.next();
    }

    const isHttps = request.nextUrl.protocol === 'https:' || request.headers.get('x-forwarded-proto') === 'https';
    const tokenOptions = {
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    };
    const token = await getToken({
        ...tokenOptions,
        secureCookie: isHttps,
    }) ?? await getToken({
        ...tokenOptions,
        secureCookie: !isHttps,
    });

    if (!token || token.role !== 'admin') {
        return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/admin/:path*'],
};
