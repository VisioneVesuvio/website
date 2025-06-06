// app/api/checkout_sessions/route.js
import { NextResponse } from 'next/server';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    // In un'applicazione reale, prenderesti i dettagli dell'ordine dal corpo della richiesta:
    // const body = await request.json();
    // const { itemId, quantity } = body;
    // E poi recupereresti i dettagli del prodotto (prezzo, nome) dal tuo DB o da una config.

    const YOUR_DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    try {
        // Per questo esempio minimale, creiamo una sessione con un prodotto fisso.
        const session = await stripe.checkout.sessions.create({
            // MODIFICA QUI per aggiungere/cambiare i metodi di pagamento
            payment_method_types: [
                'card',         // Carte di credito/debito
                'paypal',    // PayPal (se abilitato e configurato nel tuo account Stripe)
                'klarna',    // Klarna (Paga dopo, Paga a rate - richiede configurazione aggiuntiva)
                'revolut_pay'// Google Pay (richiede configurazione aggiuntiva)
                // Aggiungi altri metodi supportati da Stripe e rilevanti per i tuoi clienti
            ],
            line_items: [
                {
                    price_data: {
                        currency: 'eur', // Valuta
                        product_data: {
                            name: 'Ticket per il Cinema',
                            // images: ['https://example.com/t-shirt.png'], // Opzionale
                        },
                        unit_amount: 1000, // Prezzo in centesimi (10,00 €)
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/successo?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${YOUR_DOMAIN}/annullato`,
            // automatic_tax: { enabled: true }, // Abilita tasse automatiche se configurate su Stripe
            // customer_email: 'cliente@esempio.com', // Puoi precompilare l'email se la conosci
            // O chiedi a Stripe di collezionarla (è il default se non la passi e non c'è un customer ID)
        });

        // Restituisci l'URL della sessione a cui il frontend reindirizzerà
        // Oppure puoi restituire solo session.id se usi stripe.js sul client per il redirect
        return NextResponse.json({ url: session.url });
        // return NextResponse.json({ id: session.id }); // Se usi redirectToCheckout con Stripe.js

    } catch (err) {
        console.error("Errore Stripe API:", err.message);
        // In produzione, potresti voler loggare l'errore in modo più strutturato
        return NextResponse.json({ error: { message: err.message } }, { status: 500 });
    }
}