import { NextResponse } from 'next/server';
import { listPublicImages } from '@/app/services/publicImageService';

export async function GET() {
    try {
        return NextResponse.json({ images: await listPublicImages() });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
