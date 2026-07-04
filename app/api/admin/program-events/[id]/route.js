import { NextResponse } from 'next/server';
import { deleteAdminProgramEvent, updateAdminProgramEvent } from '@/app/services/filmService';

export async function PUT(request, { params }) {
    try {
        const resolvedParams = await params;
        const event = await updateAdminProgramEvent(resolvedParams.id, await request.json());

        if (!event) {
            return NextResponse.json({ error: 'Evento non trovato' }, { status: 404 });
        }

        return NextResponse.json({ event });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(_request, { params }) {
    try {
        const resolvedParams = await params;
        await deleteAdminProgramEvent(resolvedParams.id);
        return NextResponse.json({ message: 'Evento eliminato' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
