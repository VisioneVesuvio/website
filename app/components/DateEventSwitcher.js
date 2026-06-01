// components/DateEventSwitcher.js
'use client';

import React, { useEffect, useRef, useState } from 'react';
import EventCard from './EventCard';
import '@/app/styles/date-event-switcher.css';
import { getVisibleItems } from '@/app/content/utils';

export default function DateEventSwitcher({ events = [] }) {
    const visibleEvents = getVisibleItems(events);
    const [selectedDateId, setSelectedDateId] = useState(visibleEvents[0]?.id ?? null);
    const dateSelectorRef = useRef(null);
    const selectedEventData = visibleEvents.find((dateObj) => dateObj.id === selectedDateId) ?? visibleEvents[0] ?? null;
    const SCROLL_AMOUNT = 150;

    useEffect(() => {
        if (!visibleEvents.length) {
            setSelectedDateId(null);
            return;
        }

        if (!visibleEvents.some((dateObj) => dateObj.id === selectedDateId)) {
            setSelectedDateId(visibleEvents[0].id);
        }
    }, [selectedDateId, visibleEvents]);

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
                    &larr;
                </button>
                <div className="date-selector" ref={dateSelectorRef}>
                    {visibleEvents.map((dateObj) => (
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
                    &rarr;
                </button>
            </div>
            {selectedEventData && <div className="selected-date-display">{selectedEventData.fullDateLabel}</div>}
            {selectedEventData ? (
                <EventCard eventData={selectedEventData} />
            ) : (
                <div className="event-card-placeholder">Seleziona una data per vedere i dettagli dell'evento.</div>
            )}
        </div>
    );
}
