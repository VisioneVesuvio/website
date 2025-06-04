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
        posterUrl,
        location,
        entryTime,
        startTime,
        description,
        directors, // Array di registi
        ticketLink
    } = eventData;

    return (
        <div className="event-card">
            <div className="event-card-poster-wrapper">
                {posterUrl && (
                    <Image
                        src={posterUrl}
                        alt={`Locandina ${title}`}
                        width={200} // Specifica una larghezza (o usa layout="fill" con un contenitore dimensionato)
                        height={300} // Specifica un'altezza
                        objectFit="cover" // o "contain"
                        className="event-card-poster"
                    />
                )}
            </div>
            <div className="event-card-details">
                <h3 className="event-card-title">{title}</h3>
                <p className="event-card-location-time">
                    {location}.<br />
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
                {ticketLink && (
                    <Link href={ticketLink} legacyBehavior>
                        <a className="event-card-button">
                            Biglietti &rarr;
                        </a>
                    </Link>
                )}
            </div>
        </div>
    );
}