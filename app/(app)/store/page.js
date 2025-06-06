// app/negozio/page.js
'use client'; // Necessario per l'handler del bottone e fetch

import React from 'react';

export default function NegozioPage() {

    const handleCheckout = async () => {
        try {
            // Per questo esempio minimale, non passiamo dettagli del prodotto.
            // In un caso reale, manderesti l'ID del prodotto, quantità, ecc.
            const response = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify({ itemId: 'id_del_tuo_prodotto', quantity: 1 }), // Esempio
            });

            const session = await response.json();

            if (session.url) {
                // Reindirizza l'utente alla pagina di checkout di Stripe
                window.location.href = session.url;
            } else {
                console.error('Errore nella creazione della sessione Stripe:', session);
                alert('Errore durante la preparazione del pagamento. Riprova.');
            }
        } catch (error) {
            console.error('Errore fetch:', error);
            alert('Si è verificato un errore. Riprova.');
        }
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h1>BIGLIETTIIIIIIIIIIIIIIIIIII BIGLIETTI PER IL CINEMA</h1>
            <p>Prezzo: 10,00 €</p>
            <button
                onClick={handleCheckout}
                style={{ padding: '10px 20px', fontSize: '1.2em', cursor: 'pointer' }}
            >
                Acquista Ora
            </button>
        </div>
    );
}