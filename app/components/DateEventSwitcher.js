// components/DateEventSwitcher.js
'use client';

import React, { useState, useRef } from 'react';
import EventCard from './EventCard';
import '@/app/styles/date-event-switcher.css'; // O il percorso del tuo file CSS

// I tuoi dati completi per i film
const eventsByDate = [
    { id: 'date_22_giu_2025', shortLabel: '22 Giu', fullDateLabel: 'Domenica 22/06/25', event: { title: 'IN THE MOOD FOR LOVE', posterUrl: '/film/in_the_mood_for_love.png', location: 'Villa Floridiana, Napoli', entryTime: 'Ingresso dalle ore 20:00', startTime: 'Inizio proiezione ore 21:00', description: 'A Hong Kong negli anni ’60 due anime ferite si incontrano nell’intimità di corridoi e sguardi rubati. In un crescendo di desiderio trattenuto, l’amore nasce dove non può compiersi.', directors: ['Wong Kar-wai'], ticketLink: '/biglietti/in-the-mood-for-love' }},
    { id: 'date_29_giu_2025', shortLabel: '29 Giu', fullDateLabel: 'Domenica 29/06/25', event: { title: 'HER', posterUrl: '/film/her.png', location: 'Villa Floridiana, Napoli', entryTime: 'Ingresso dalle ore 20:00', startTime: 'Inizio proiezione ore 21:00', description: 'In un futuro vicino, un uomo solitario si innamora di un\'intelligenza artificiale. Un racconto toccante sull\'amore, la tecnologia e la solitudine.', directors: ['Spike Jonze'], ticketLink: '/biglietti/her' }},
    { id: 'date_06_lug_2025', shortLabel: '06 Lug', fullDateLabel: 'Domenica 06/07/25', event: { title: 'EX MACHINA', posterUrl: '/film/ex_machina.png', location: 'Villa Floridiana, Napoli', entryTime: 'Ingresso dalle ore 20:00', startTime: 'Inizio proiezione ore 21:00', description: 'Un giovane programmatore partecipa a un test sull\'intelligenza artificiale in una villa isolata. La linea tra umano e artificiale si fa inquietante.', directors: ['Alex Garland'], ticketLink: '/biglietti/ex-machina' }},
    { id: 'date_13_lug_2025', shortLabel: '13 Lug', fullDateLabel: 'Domenica 13/07/25', event: { title: 'ANNIE HALL', posterUrl: '/film/hannie_hall.png', location: 'Villa Floridiana, Napoli', entryTime: 'Ingresso dalle ore 20:00', startTime: 'Inizio proiezione ore 21:00', description: 'Un comico nevrotico di New York ripercorre la sua storia d\'amore con la stravagante Annie. Ironico e profondo, è un cult della commedia romantica.', directors: ['Woody Allen'], ticketLink: '/biglietti/annie-hall' }},
    { id: 'date_20_lug_2025', shortLabel: '20 Lug', fullDateLabel: 'Domenica 20/07/25', event: { title: 'ALICE IN WONDERLAND (1951)', posterUrl: '/film/alice.png', location: 'Villa Floridiana, Napoli', entryTime: 'Ingresso dalle ore 20:00', startTime: 'Inizio proiezione ore 21:00', description: 'Il classico d\'animazione Disney che segue la curiosa Alice nel suo viaggio in un mondo assurdo e incantato. Un\'esplosione di fantasia e immaginazione.', directors: ['Clyde Geronimi', 'Wilfred Jackson', 'Hamilton Luske'], ticketLink: '/biglietti/alice-wonderland' }},
    { id: 'date_27_lug_2025', shortLabel: '27 Lug', fullDateLabel: 'Domenica 27/07/25', event: { title: 'BLUE VELVET', posterUrl: '/film/blue_velvet.png', location: 'Villa Floridiana, Napoli', entryTime: 'Ingresso dalle ore 20:00', startTime: 'Inizio proiezione ore 21:00', description: 'Un giovane scopre un misterioso orecchio umano in un campo. Lynch mescola noir e incubo in un’indagine sul lato oscuro della provincia americana.', directors: ['David Lynch'], ticketLink: '/biglietti/blue_velvet' }},
    { id: 'date_03_ago_2025', shortLabel: '03 Ago', fullDateLabel: 'Domenica 03/08/25', event: { title: 'BRAZIL', posterUrl: '/film/brazil.png', location: 'Villa Floridiana, Napoli', entryTime: 'Ingresso dalle ore 20:00', startTime: 'Inizio proiezione ore 21:00', description: 'Un impiegato vive in un futuro distopico dominato dalla burocrazia. Tra sogno e incubo, una satira grottesca del controllo e della libertà.', directors: ['Terry Gilliam'], ticketLink: '/biglietti/brazil' }},
    { id: 'date_07_set_2025', shortLabel: '07 Set', fullDateLabel: 'Domenica 07/09/25', event: { title: '8½', posterUrl: '/film/8_1_2.png', location: 'Villa Floridiana, Napoli', entryTime: 'Ingresso dalle ore 20:00', startTime: 'Inizio proiezione ore 21:00', description: 'Un regista in crisi creativa si perde nei suoi sogni, ricordi e fantasie. Fellini firma un capolavoro sul caos interiore dell’artista.', directors: ['Federico Fellini'], ticketLink: '/biglietti/8_1_2' }},
    { id: 'date_14_set_2025', shortLabel: '14 Set', fullDateLabel: 'Domenica 14/09/25', event: { title: 'PARIS, TEXAS', posterUrl: '/film/paris_texas.png', location: 'Villa Floridiana, Napoli', entryTime: 'Ingresso dalle ore 20:00', startTime: 'Inizio proiezione ore 21:00', description: 'Un uomo ricompare dopo anni di assenza, cercando di ricostruire il rapporto con il figlio. Un viaggio silenzioso e toccante tra solitudine e redenzione.', directors: ['Wim Wenders'], ticketLink: '/biglietti/paris-texas' }}
];

export default function DateEventSwitcher() {
    const [selectedDateId, setSelectedDateId] = useState(
        eventsByDate.find(d => d.shortLabel === '13 Lug')?.id || (eventsByDate.length > 0 ? eventsByDate[0].id : null)
    );
    const dateSelectorRef = useRef(null);
    const selectedEventData = eventsByDate.find(dateObj => dateObj.id === selectedDateId);
    const SCROLL_AMOUNT = 150;

    const handleScroll = (scrollOffset) => {
        if (dateSelectorRef.current) {
            dateSelectorRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
        }
    };

    return (
        <div className="date-event-switcher-container">
            <div className="date-selector-wrapper">
                <button
                    className="date-selector-arrow date-selector-arrow-left"
                    onClick={() => handleScroll(-SCROLL_AMOUNT)}
                    aria-label="Date precedenti"
                >
                    &larr; {/* Freccia sinistra */}
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
                    onClick={() => handleScroll(SCROLL_AMOUNT)}
                    aria-label="Prossime date"
                >
                    &rarr; {/* Freccia destra */}
                </button>
            </div>
            {selectedEventData && <div className="selected-date-display">{selectedEventData.fullDateLabel}</div>}
            {selectedEventData && selectedEventData.event ? (
                <EventCard eventData={selectedEventData.event} />
            ) : (
                <div className="event-card-placeholder">Seleziona una data per vedere i dettagli dell'evento.</div>
            )}
        </div>
    );
}