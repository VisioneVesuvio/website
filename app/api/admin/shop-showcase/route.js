import { NextResponse } from 'next/server';
import { getAdminShopItems, updateAdminShopItems } from '@/app/services/shopService';

export async function GET() {
    try {
        return NextResponse.json(await getAdminShopItems());
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const payload = await request.json();
        return NextResponse.json(await updateAdminShopItems(payload.items));
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
