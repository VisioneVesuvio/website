import { NextResponse } from 'next/server';
import { createAdminRassegna, listAdminRassegne } from '@/app/services/rassegnaService';

export async function GET() {
    try {
        return NextResponse.json({ rassegne: await listAdminRassegne() });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const rassegna = await createAdminRassegna(await request.json());
        return NextResponse.json({ rassegna }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
