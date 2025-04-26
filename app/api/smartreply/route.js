// app/api/smart-reply/route.js

import { NextResponse } from 'next/server';
import { generateSmartReply } from '@/app/lib/openAI_Middleware';

/**
 * API per generare una risposta intelligente da OpenAI,
 * valutando automaticamente quanto contesto usare.
 *
 * Endpoint: POST /api/smart-reply
 * Body: { messages: [ { role, content } ] }
 */
export async function POST(req) {
    try {
        const { messages } = await req.json();

        if (!Array.isArray(messages)) {
            return NextResponse.json({ error: 'Formato non valido' }, { status: 400 });
        }

        const reply = await generateSmartReply(messages);
        return NextResponse.json({ response: reply });
    } catch (err) {
        console.error('❌ Errore smart-reply:', err);
        return NextResponse.json({ error: 'Errore del server OpenAI' }, { status: 500 });
    }
}
