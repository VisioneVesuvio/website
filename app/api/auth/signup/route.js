// app/api/auth/signup/route.js

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import User from '@/app/models/User';
import bcrypt from 'bcrypt';

/**
 * API per registrare un nuovo utente
 * - Metodo: POST
 * - Richiede: email + password
 * - Crea utente non approvato con ruolo base "user"
 */
export async function POST(req) {
    try {
        const { email, password } = await req.json();

        // 🔍 Validazione base
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email e password obbligatorie' },
                { status: 400 }
            );
        }

        await connectToDatabase();

        // ⚠️ Verifica esistenza
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: 'Utente già registrato' },
                { status: 400 }
            );
        }

        // 🔐 Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🆕 Crea utente base
        await User.create({
            email,
            password: hashedPassword,
            approved: false,
            role: 'user',
        });

        return NextResponse.json(
            { message: 'Registrazione avvenuta con successo' },
            { status: 201 }
        );
    } catch (err) {
        console.error('Errore durante la registrazione:', err);
        return NextResponse.json(
            { error: 'Errore del server' },
            { status: 500 }
        );
    }
}
