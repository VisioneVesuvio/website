import { NextResponse } from 'next/server';
import { createAdminProgramEvent, listAdminProgramEvents } from '@/app/services/filmService';

export async function GET() {
    try {
        return NextResponse.json({ events: await listAdminProgramEvents() });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const event = await createAdminProgramEvent(await request.json());
        return NextResponse.json({ event }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
