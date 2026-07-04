import { NextResponse } from 'next/server';
import { createFirstAdmin } from '@/app/services/userService';

export async function POST(request) {
    if (!process.env.MONGODB_URI) {
        return NextResponse.json(
            { error: 'Configura MONGODB_URI per MongoDB Atlas prima di creare l admin' },
            { status: 500 },
        );
    }

    try {
        const payload = await request.json();
        await createFirstAdmin(payload);
        return NextResponse.json({ message: 'Admin creato' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
