import { NextResponse } from 'next/server';
import { deleteAdminRassegna, updateAdminRassegna } from '@/app/services/rassegnaService';

export async function PUT(request, { params }) {
    try {
        const resolvedParams = await params;
        const rassegna = await updateAdminRassegna(resolvedParams.id, await request.json());

        if (!rassegna) {
            return NextResponse.json({ error: 'Rassegna non trovata' }, { status: 404 });
        }

        return NextResponse.json({ rassegna });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(_request, { params }) {
    try {
        const resolvedParams = await params;
        await deleteAdminRassegna(resolvedParams.id);
        return NextResponse.json({ message: 'Rassegna eliminata' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
