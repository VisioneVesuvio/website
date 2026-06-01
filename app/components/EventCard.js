// components/EventCard.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '@/app/styles/date-event-switcher.css';

export default function EventCard({ eventData }) {
    if (!eventData) {
        return <div className="event-card-placeholder">Nessun evento selezionato.</div>;
    }

    const {
        title,
        poster,
        posterUrl,
        venue,
        location,
        entryTime,
        startTime,
        description,
        directors,
        ticketLink,
        ticketUrl,
    } = eventData;

    return (
        <div className="event-card">
            <div className="event-card-poster-wrapper">
                {(poster?.src || posterUrl) && (
                    <Image
                        src={poster?.src ?? posterUrl}
                        alt={poster?.alt ?? `Locandina ${title}`}
                        width={poster?.width ?? 200}
                        height={poster?.height ?? 300}
                        style={{ objectFit: 'cover' }}
                        className="event-card-poster"
                    />
                )}
            </div>
            <div className="event-card-details">
                <h3 className="event-card-title">{title}</h3>
                <p className="event-card-location-time">
                    {(venue ?? location)}.<br />
                    {entryTime}. {startTime}.
                </p>
                <p className="event-card-description">
                    {description}
                    {directors && directors.length > 0 && (
                        <>
                            <br />
                            Regia di {directors.join(', ')}.
                        </>
                    )}
                </p>
                {(ticketUrl ?? ticketLink) && (
                    <Link href={ticketUrl ?? ticketLink} legacyBehavior>
                        <a className="event-card-button">
                            Biglietti &rarr;
                        </a>
                    </Link>
                )}
            </div>
        </div>
    );
}
