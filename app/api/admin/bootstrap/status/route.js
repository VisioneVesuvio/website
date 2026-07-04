import { NextResponse } from 'next/server';
import { hasUsers } from '@/app/services/userService';

export async function GET() {
    if (!process.env.MONGODB_URI) {
        return NextResponse.json({
            hasMongoUri: false,
            hasUsers: true,
            error: 'MONGODB_URI non configurata',
        });
    }

    try {
        return NextResponse.json({
            hasMongoUri: true,
            hasUsers: await hasUsers(),
        });
    } catch (error) {
        return NextResponse.json(
            { hasMongoUri: true, hasUsers: true, error: error.message },
            { status: 500 },
        );
    }
}
