'use client';

import { useState } from 'react';
import '@/app/styles/calendar.css';

/**
 * Mock dati eventi — può essere sostituito da un'API in futuro
 */
const mockEvents = [
    {
        date: '2025-04-16',
        title: 'Webinar: Intelligenza Artificiale nella Prototipazione',
        description: 'Come l’IA sta rivoluzionando la stampa 3D e i processi di prototipazione.',
    },
    {
        date: '2025-04-20',
        title: 'Laboratorio Aperto - Stampa 3D Live',
        description: 'Partecipa in sede o online a una sessione live di stampa con i nostri tecnici.',
        bookable: true,
    },
    {
        date: '2025-04-27',
        title: 'Tech Talk: Evoluzione dei Materiali per Additive Manufacturing',
        description: 'Focus sui nuovi materiali biodegradabili e ad alte performance.',
    },
    {
        date: '2025-05-05',
        title: 'Prenota una Demo su Microstampa 3D',
        description: 'Sessione 1-to-1 con un nostro tecnico sul controllo di precisione.',
        bookable: true,
    },
    {
        date: '2025-05-14',
        title: 'Open Day Virtuale - Evolve Lab',
        description: 'Visita virtuale del nostro laboratorio R&D con Q&A live.',
        bookable: true,
    },
    {
        date: '2025-05-25',
        title: 'Workshop Avanzato: Modellazione Parametrica',
        description: 'Impara a progettare per la stampa 3D in modo efficiente con software parametrici.',
    },
    {
        date: '2025-06-03',
        title: 'Tech Night: Stampa 3D & Settore Medicale',
        description: 'Dialogo interdisciplinare tra ingegneri e professionisti sanitari.',
    },
    {
        date: '2025-06-12',
        title: 'Prenota una Consulenza su Prototipazione Rapida',
        description: 'Slot privati con un product engineer Evolve.',
        bookable: true,
    },
];


export default function Calendar() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isClosing, setIsClosing] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const today = new Date();
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Genera i giorni del mese corrente con eventi
    const days = Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const event = mockEvents.find(e => e.date === dateStr);
        const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
        return { day, dateStr, event, isToday };
    });

    const handleClosePopup = () => {
        setIsClosing(true);
        setTimeout(() => {
            setSelectedEvent(null);
            setIsClosing(false);
        }, 400);
    };

    const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));
    const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));

    return (
        <div className="calendar-container">
            {/* Bottone toggle */}
            <button className="calendar-toggle" onClick={() => setIsOpen(!isOpen)}>
                📅 Calendario Eventi
            </button>

            {isOpen && (
                <div className="calendar-panel">
                    {/* Navigazione mese */}
                    <div className="calendar-header">
                        <button onClick={prevMonth}>⟵</button>
                        <span>
              {currentMonth.toLocaleDateString('it-IT', {
                  month: 'long',
                  year: 'numeric',
              })}
            </span>
                        <button onClick={nextMonth}>⟶</button>
                    </div>

                    {/* Griglia giorni */}
                    <div className="calendar-grid">
                        {days.map(({ day, dateStr, event, isToday }, idx) => (
                            <div
                                key={idx}
                                className={`calendar-day ${event ? 'event' : ''} ${event?.bookable ? 'bookable' : ''} ${isToday ? 'today' : ''}`}
                                onClick={() => event && setSelectedEvent({ ...event, date: dateStr })}
                                title={event?.title || ''}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Popup evento */}
            {selectedEvent && (
                <div className={`calendar-popup ${isClosing ? 'popup-out' : 'popup-in'}`}>
                    <button className="calendar-popup-close" onClick={handleClosePopup}>✖</button>
                    <h2>{selectedEvent.title}</h2>
                    <p className="calendar-date">{selectedEvent.date}</p>
                    <p>{selectedEvent.description}</p>
                    {selectedEvent.bookable && (
                        <button
                            className="calendar-book"
                            onClick={() => alert('Prenotazione (placeholder)')}
                        >
                            ✅ Prenotati
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
