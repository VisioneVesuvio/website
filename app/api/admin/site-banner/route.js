import { NextResponse } from 'next/server';
import { getAdminHeaderMarquee, updateAdminHeaderMarquee } from '@/app/services/siteBannerService';

export async function GET() {
    try {
        return NextResponse.json(await getAdminHeaderMarquee());
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const payload = await request.json();
        return NextResponse.json(await updateAdminHeaderMarquee(payload.items));
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
