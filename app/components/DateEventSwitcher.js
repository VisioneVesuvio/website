// components/DateEventSwitcher.js
'use client'; // Necessario per usare useState

import React, { useState } from 'react';
import EventCard from './EventCard'; // Assicurati che il percorso sia corretto
import '@/app/styles/date-event-switcher.css';


const eventsByDate = [
    {
        id: 'date_15_giu_2025',
        shortLabel: '15 Giu',
        fullDateLabel: 'Domenica 15/06/25',
        event: {
            title: 'IN THE MOOD FOR LOVE',
            posterUrl: '/film/in_the_mood_for_love.jpg',
            location: '(Luogo della proiezione da specificare)',
            entryTime: 'Ingresso dalle ore (orario da specificare)',
            startTime: 'Inizio proiezione ore (orario da specificare)',
            description: 'Una breve sinossi o descrizione del film "In The Mood For Love',
            directors: ['Wong Kar-wai'], // Puoi lasciare questo o rimuoverlo se metti i registi nella descrizione
            ticketLink: '/biglietti/in-the-mood-for-love' // Link placeholder
        }
    },
    {
        id: 'date_22_giu_2025',
        shortLabel: '22 Giu',
        fullDateLabel: 'Domenica 22/06/25',
        event: {
            title: 'HER',
            posterUrl: '/film/her.jpg',
            location: '(Luogo della proiezione da specificare)',
            entryTime: 'Ingresso dalle ore (orario da specificare)',
            startTime: 'Inizio proiezione ore (orario da specificare)',
            description: 'Una breve sinossi o descrizione del film "Her"',
            directors: ['Spike Jonze'],
            ticketLink: '/biglietti/her'
        }
    },
    {
        id: 'date_29_giu_2025',
        shortLabel: '29 Giu',
        fullDateLabel: 'Domenica 29/06/25',
        event: {
            title: 'EX MACHINA',
            posterUrl: '/film/ex-machina.jpg',
            location: '(Luogo della proiezione da specificare)',
            entryTime: 'Ingresso dalle ore (orario da specificare)',
            startTime: 'Inizio proiezione ore (orario da specificare)',
            description: 'Una breve sinossi o descrizione del film "Ex Machina',
            directors: ['(Registi da specificare)'],
            ticketLink: '/biglietti/ex-machina'
        }
    },
    {
        id: 'date_06_lug_2025',
        shortLabel: '6 Lug', // Modificato da "06 Luglio" per coerenza con gli altri shortLabel
        fullDateLabel: 'Domenica 06/07/25',
        event: {
            title: 'ANNIE HALL',
            posterUrl: '/film/hannie_hall.jpg', // Come da tua lista
            location: '(Luogo della proiezione da specificare)',
            entryTime: 'Ingresso dalle ore (orario da specificare)',
            startTime: 'Inizio proiezione ore (orario da specificare)',
            description: 'Una breve sinossi o descrizione del film Annie Hall',
            directors: ['(Registi da specificare)'],
            ticketLink: '/biglietti/annie-hall'
        }
    },
    {
        id: 'date_13_lug_2025',
        shortLabel: '13 Lug', // Modificato da "13 Luglio"
        fullDateLabel: 'Domenica 13/07/25',
        event: {
            title: 'BLUE VELVET', // Film cambiato rispetto al tuo primo esempio, basandomi sulla tua lista di 9 film
            posterUrl: '/film/blue_velvet.jpg',
            location: '(Luogo della proiezione da specificare, es. VILLA FLORIDIANA)',
            entryTime: 'Ingresso dalle ore (es. 20:15)',
            startTime: 'Inizio proiezione ore (es. 21:00)',
            description: 'Una breve sinossi o descrizione del film "Blue Velvet". (Testo da inserire, es. ',
            directors: ['(Registi da specificare)'],
            ticketLink: '/biglietti/blue-velvet'
        }
    },
    {
        id: 'date_20_lug_2025',
        shortLabel: '20 Lug', // Modificato da "20 Luglio"
        fullDateLabel: 'Domenica 20/07/25',
        event: {
            title: '8½',
            posterUrl: '/film/8_1_2.jpg',
            location: '(Luogo della proiezione da specificare)',
            entryTime: 'Ingresso dalle ore (orario da specificare)',
            startTime: 'Inizio proiezione ore (orario da specificare)',
            description: 'Una breve sinossi o descrizione del film "8½". (Testo da inserire). Registi: (Nomi dei registi da specificare).',
            directors: ['(Registi da specificare)'],
            ticketLink: '/biglietti/otto-e-mezzo'
        }
    },
    {
        id: 'date_27_lug_2025',
        shortLabel: '27 Lug', // Modificato da "27 Luglio"
        fullDateLabel: 'Domenica 27/07/25',
        event: {
            title: 'ALICE WONDERLAND', // Film cambiato rispetto al tuo primo esempio ("FILM DA DEFINIRE")
            posterUrl: '/film/alice.jpg',
            location: '(Luogo della proiezione da specificare)',
            entryTime: 'Ingresso dalle ore (orario da specificare)',
            startTime: 'Inizio proiezione ore (orario da specificare)',
            description: 'Una breve sinossi o descrizione del film "Alice Wonderland". (Testo da inserire). Registi: (Nomi dei registi da specificare).',
            directors: ['(Registi da specificare)'], // Nota: il tuo primo esempio aveva una lista di registi per Alice, puoi ripristinarla.
            ticketLink: '/biglietti/alice-wonderland'
        }
    },
    {
        id: 'date_03_ago_2025',
        shortLabel: '3 Ago', // Modificato da "03 Agosto"
        fullDateLabel: 'Domenica 03/08/25',
        event: {
            title: 'BRAZIL',
            posterUrl: '/film/brazil.jpg',
            location: '(Luogo della proiezione da specificare)',
            entryTime: 'Ingresso dalle ore (orario da specificare)',
            startTime: 'Inizio proiezione ore (orario da specificare)',
            description: 'Una breve sinossi o descrizione del film "Brazil". (Testo da inserire). Registi: (Nomi dei registi da specificare).',
            directors: ['(Registi da specificare)'],
            ticketLink: '/biglietti/brazil'
        }
    },
    {
        id: 'date_10_ago_2025',
        shortLabel: '10 Ago', // Modificato da "10 Agosto"
        fullDateLabel: 'Domenica 10/08/25',
        event: {
            title: 'PARIS, TEXAS',
            posterUrl: '/film/paris_texas.jpg',
            location: '(Luogo della proiezione da specificare)',
            entryTime: 'Ingresso dalle ore (orario da specificare)',
            startTime: 'Inizio proiezione ore (orario da specificare)',
            description: 'Una breve sinossi o descrizione del film "Paris, Texas". (Testo da inserire). Registi: (Nomi dei registi da specificare).',
            directors: ['(Registi da specificare)'],
            ticketLink: '/biglietti/paris-texas'
        }
    }
];

// Puoi esportare questo array se lo definisci in un file separato:
// export { eventsByDate };
// NOTA: Come prima, crea /public/images/ e metti le locandine lì.

export default function DateEventSwitcher() {
    // Imposta la data iniziale selezionata (es. la prima, o una specifica come 'date_13_lug')
    const [selectedDateId, setSelectedDateId] = useState(eventsByDate.find(d => d.shortLabel === '13 Lug')?.id || eventsByDate[0]?.id);

    const selectedEventData = eventsByDate.find(dateObj => dateObj.id === selectedDateId);

    return (
        <div className="date-event-switcher-container">
            <div className="date-selector-wrapper">
                <div className="date-selector">
                    {eventsByDate.map((dateObj) => (
                        <button
                            key={dateObj.id}
                            className={`date-selector-item ${selectedDateId === dateObj.id ? 'active' : ''}`}
                            onClick={() => setSelectedDateId(dateObj.id)}
                        >
                            {dateObj.shortLabel}
                        </button>
                    ))}
                </div>

            </div>

            {selectedEventData && (
                <div className="selected-date-display">
                    {selectedEventData.fullDateLabel}
                </div>
            )}

            {selectedEventData ? (
                <EventCard eventData={selectedEventData.event} />
            ) : (
                <div className="event-card-placeholder">Seleziona una data per vedere i dettagli dell'evento.</div>
            )}
        </div>
    );
}