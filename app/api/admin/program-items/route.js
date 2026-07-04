import { NextResponse } from 'next/server';
import { createAdminProgramItem } from '@/app/services/filmService';

export async function POST(request) {
    try {
        const event = await createAdminProgramItem(await request.json());
        return NextResponse.json({ event }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
