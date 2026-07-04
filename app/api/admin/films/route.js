import { NextResponse } from 'next/server';
import { createAdminFilm, listAdminFilms } from '@/app/services/filmService';

export async function GET() {
    try {
        return NextResponse.json({ films: await listAdminFilms() });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const film = await createAdminFilm(await request.json());
        return NextResponse.json({ film }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
