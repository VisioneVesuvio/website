// components/DateEventSwitcher.js
'use client';

import React, { useState, useRef } from 'react'; // Importato useRef
import EventCard from './EventCard';
import '@/app/styles/date-event-switcher.css'; // Il tuo file CSS per questo componente

// I tuoi dati eventsByDate (assicurati che i percorsi posterUrl siano corretti)
const eventsByDate = [
    {
        id: 'date_22_giu_2025',
        shortLabel: '22 Giu',
        fullDateLabel: 'Domenica 22/06/25',
        event: {
            title: 'IN THE MOOD FOR LOVE',
            posterUrl: '/film/in_the_mood_for_love.png',
            location: '(Luogo della proiezione da specificare)',
            entryTime: 'Ingresso dalle ore (orario da specificare)',
            startTime: 'Inizio proiezione ore (orario da specificare)',
            description: 'Una breve sinossi o descrizione del film "In The Mood For Love..."',
            directors: ['Wong Kar-wai'],
            ticketLink: '/biglietti/in-the-mood-for-love'
        }
    },
    {
        id: 'date_29_giu_2025',
        shortLabel: '29 Giu',
        fullDateLabel: 'Domenica 29/06/25',
        event: {
            title: 'HER',
            posterUrl: '/film/her.png',
            location: '(Luogo della proiezione da specificare)',
            entryTime: 'Ingresso dalle ore (orario da specificare)',
            startTime: 'Inizio proiezione ore (orario da specificare)',
            description: 'Una breve sinossi o descrizione del film "Her..."',
            directors: ['Spike Jonze'],
            ticketLink: '/biglietti/her'
        }
    },
    {
        id: 'date_06_lug_2025',
        shortLabel: '06 Lug',
        fullDateLabel: 'Domenica 06/07/25',
        event: {
            title: 'EX MACHINA',
            posterUrl: '/film/ex_machina.png',
            location: '(Luogo della proiezione da specificare)',
            entryTime: 'Ingresso dalle ore (orario da specificare)',
            startTime: 'Inizio proiezione ore (orario da specificare)',
            description: 'Una breve sinossi o descrizione del film "Ex Machina..."',
            directors: ['Alex Garland'], // Esempio regista
            ticketLink: '/biglietti/ex-machina'
        }
    },
    {
        id: 'date_13_lug_2025',
        shortLabel: '13 Lug',
        fullDateLabel: 'Domenica 13/07/25',
        event: {
            title: 'ANNIE HALL',
            posterUrl: '/film/hannie_hall.png', // Il nome file era "hannie_hall.png"
            location: '(Luogo della proiezione da specificare)',
            entryTime: 'Ingresso dalle ore (orario da specificare)',
            startTime: 'Inizio proiezione ore (orario da specificare)',
            description: 'Una breve sinossi o descrizione del film Annie Hall...',
            directors: ['Woody Allen'], // Esempio regista
            ticketLink: '/biglietti/annie-hall'
        }
    },
    {
        id: 'date_20_lug_2025',
        shortLabel: '20 Lug',
        fullDateLabel: 'Domenica 20/07/25',
        event: {
            title: 'ALICE IN WONDERLAND',
            posterUrl: '/film/alice.png',
            location: '(Luogo della proiezione da specificare, es. VILLA FLORIDIANA)',
            entryTime: 'Ingresso dalle ore (es. 20:15)',
            startTime: 'Inizio proiezione ore (es. 21:00)',
            description: 'Una breve sinossi o descrizione del film "Blue Velvet"...',
            directors: ['David Lynch'], // Esempio regista
            ticketLink: '/biglietti/alice-wonderland'
        }
    },
    {
        id: 'date_27_lug_2025',
        shortLabel: '27 Lug',
        fullDateLabel: 'Domenica 27/07/25',
        event: {
            title: 'BLUE VELVET',
            posterUrl: '/film/blue_velvet.png',
            location: '(Luogo della proiezione da specificare)',
            entryTime: 'Ingresso dalle ore (orario da specificare)',
            startTime: 'Inizio proiezione ore (orario da specificare)',
            description: 'Una breve sinossi o descrizione del film "8½"...',
            directors: ['Federico Fellini'], // Esempio regista
            ticketLink: '/biglietti/blue_velvet'
        }
    },
    {
        id: 'date_03_ago_2025',
        shortLabel: '03 Ago',
        fullDateLabel: 'Domenica 03/08/25',
        event: {
            title: 'BRAZIL',
            posterUrl: '/film/brazil.png',
            location: '(Luogo della proiezione da specificare)',
            entryTime: 'Ingresso dalle ore (orario da specificare)',
            startTime: 'Inizio proiezione ore (orario da specificare)',
            description: 'Una breve sinossi o descrizione del film "Alice Wonderland"...',
            directors: ['Clyde Geronimi', 'Wilfred Jackson', 'Hamilton Luske'], // Esempio registi
            ticketLink: '/biglietti/brazil'
        }
    },
    {
        id: 'date_03_ago_2025',
        shortLabel: '03 Ago',
        fullDateLabel: 'Domenica 03/08/25',
        event: {
            title: '8½',
            posterUrl: '/film/8_1_2.png',
            location: '(Luogo della proiezione da specificare)',
            entryTime: 'Ingresso dalle ore (orario da specificare)',
            startTime: 'Inizio proiezione ore (orario da specificare)',
            description: 'Una breve sinossi o descrizione del film "Brazil"...',
            directors: ['Terry Gilliam'], // Esempio regista
            ticketLink: '/biglietti/8_1_2'
        }
    },
    {
        id: 'date_14_set_2025',
        shortLabel: '14 Set',
        fullDateLabel: 'Domenica 10/08/25',
        event: {
            title: 'PARIS, TEXAS',
            posterUrl: '/film/paris_texas.png',
            location: '(Luogo della proiezione da specificare)',
            entryTime: 'Ingresso dalle ore (orario da specificare)',
            startTime: 'Inizio proiezione ore (orario da specificare)',
            description: 'Una breve sinossi o descrizione del film "Paris, Texas"...',
            directors: ['Wim Wenders'], // Esempio regista
            ticketLink: '/biglietti/paris-texas'
        }
    }
];


export default function DateEventSwitcher() {
    const [selectedDateId, setSelectedDateId] = useState(
        // Cerca l'ID dell'evento con shortLabel '13 Lug', altrimenti usa il primo evento come default
        eventsByDate.find(d => d.shortLabel === '13 Lug')?.id || (eventsByDate.length > 0 ? eventsByDate[0].id : null)
    );
    const dateSelectorRef = useRef(null); // Ref per il contenitore delle date

    const selectedEventData = eventsByDate.find(dateObj => dateObj.id === selectedDateId);

    const SCROLL_AMOUNT = 150; // Quantità di pixel per lo scroll, puoi regolarla

    const handleScrollLeft = () => {
        if (dateSelectorRef.current) {
            dateSelectorRef.current.scrollBy({
                left: -SCROLL_AMOUNT,
                behavior: 'smooth'
            });
        }
    };

    const handleScrollRight = () => {
        if (dateSelectorRef.current) {
            dateSelectorRef.current.scrollBy({
                left: SCROLL_AMOUNT,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="date-event-switcher-container">
            <div className="date-selector-wrapper">
                <button
                    className="date-selector-arrow date-selector-arrow-left"
                    onClick={handleScrollLeft}
                    aria-label="Date precedenti"
                >
                    &larr; {/* Freccia sinistra HTML entity */}
                </button>
                <div className="date-selector" ref={dateSelectorRef}>
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
                <button
                    className="date-selector-arrow date-selector-arrow-right"
                    onClick={handleScrollRight}
                    aria-label="Prossime date"
                >
                    &rarr; {/* Freccia destra HTML entity */}
                </button>
            </div>

            {selectedEventData && (
                <div className="selected-date-display">
                    {selectedEventData.fullDateLabel}
                </div>
            )}

            {/* Gestione del caso in cui un evento potrebbe essere null */}
            {selectedEventData ? (
                <EventCard eventData={selectedEventData.event} />
            ) : (
                <div className="event-card-placeholder">Seleziona una data per vedere i dettagli dell'evento.</div>
            )}
        </div>
    );
}