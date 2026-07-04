import { NextResponse } from 'next/server';
import { deleteAdminFilm, updateAdminFilm } from '@/app/services/filmService';

export async function PUT(request, { params }) {
    try {
        const resolvedParams = await params;
        const film = await updateAdminFilm(resolvedParams.id, await request.json());

        if (!film) {
            return NextResponse.json({ error: 'Film non trovato' }, { status: 404 });
        }

        return NextResponse.json({ film });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(_request, { params }) {
    try {
        const resolvedParams = await params;
        await deleteAdminFilm(resolvedParams.id);
        return NextResponse.json({ message: 'Film eliminato' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
