'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import CommonButton from '@/app/components/CommonButton';
import { featuredProgramSection } from '@/app/content/featured-program';

export default function FeaturedProgramSection({ events = [], className = '', showSectionFrame = false }) {
    const featuredEvents = useMemo(() => events, [events]);
    const [activeEventId, setActiveEventId] = useState(featuredEvents[0]?.id ?? null);
    const eventRefs = useRef([]);
    const activeEvent = useMemo(
        () => featuredEvents.find((event) => event.id === activeEventId) ?? featuredEvents[0],
        [activeEventId, featuredEvents],
    );
    const activeVisual = activeEvent?.hero ?? featuredProgramSection.featuredVisual;

    useEffect(() => {
        let animationFrame = null;

        const updateActiveEvent = () => {
            animationFrame = null;
            const eventCards = eventRefs.current.filter(Boolean);

            if (!eventCards.length) {
                return;
            }

            const anchorY = window.innerHeight * 0.36;
            const anchoredCard = eventCards.find((card) => {
                const rect = card.getBoundingClientRect();
                return rect.top <= anchorY && rect.bottom >= anchorY;
            });
            const closestCard = anchoredCard ?? eventCards
                .map((card) => ({
                    card,
                    distance: Math.abs(card.getBoundingClientRect().top - anchorY),
                }))
                .sort((a, b) => a.distance - b.distance)[0]?.card;

            if (closestCard?.dataset.eventId) {
                setActiveEventId(closestCard.dataset.eventId);
            }
        };

        const requestUpdate = () => {
            if (animationFrame !== null) {
                return;
            }

            animationFrame = window.requestAnimationFrame(updateActiveEvent);
        };

        updateActiveEvent();
        window.addEventListener('scroll', requestUpdate, { passive: true });
        window.addEventListener('resize', requestUpdate);

        return () => {
            if (animationFrame !== null) {
                window.cancelAnimationFrame(animationFrame);
            }

            window.removeEventListener('scroll', requestUpdate);
            window.removeEventListener('resize', requestUpdate);
        };
    }, []);

    return (
        <section className={`home-program-section ${className}`.trim()}>
            <div className="home-program-desktop">
                <h2 className="home-program-heading">{featuredProgramSection.title}</h2>
                <div className={`home-program-grid ${showSectionFrame ? 'home-program-grid-framed' : ''}`}>
                    <div className="home-program-visual">
                        <div className="home-program-visual-frame">
                            <Image
                                key={activeVisual.src}
                                src={activeVisual.src}
                                alt={activeVisual.alt}
                                width={activeVisual.width}
                                height={activeVisual.height}
                                className="home-program-visual-image"
                                priority
                            />
                        </div>
                    </div>

                    <div className="home-program-panel">
                        <div className="home-program-event-list">
                            {featuredEvents.map((event, index) => (
                                <article
                                    key={event.id}
                                    ref={(node) => {
                                        eventRefs.current[index] = node;
                                    }}
                                    data-event-id={event.id}
                                    className={`home-program-event-card ${event.id === activeEvent?.id ? 'is-active' : ''}`}
                                    onFocus={() => setActiveEventId(event.id)}
                                >
                                    <div className="home-program-event-meta">
                                        <span className="home-program-pill home-program-pill-time">{event.timeLabel}</span>
                                        {event.voiceLabel && (
                                            <span className="home-program-pill home-program-pill-voice">{event.voiceLabel}</span>
                                        )}
                                        {event.guestLabel && (
                                            <span className="home-program-pill home-program-pill-guest">{event.guestLabel}</span>
                                        )}
                                    </div>

                                    <div className="home-program-event-body">
                                        <div>
                                            <p className="home-program-event-date">{event.date}</p>
                                            <p className="home-program-event-venue">{event.venue}</p>
                                            <p className="home-program-event-title">
                                                <span>{event.title}</span>
                                                {event.originalTitle && <em>{event.originalTitle}</em>}
                                            </p>
                                            <p className="home-program-event-director">di {event.director}</p>
                                        </div>

                                        <div className="home-program-event-bottom">
                                            <Link href={`/film/${event.slug}`} className="home-program-detail-link">
                                                Scheda film -&gt;
                                            </Link>
                                            <CommonButton href={event.ticketUrl} external className="home-program-ticket-link">
                                                Biglietti
                                            </CommonButton>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="home-program-mobile">
                <h2 className="home-program-mobile-heading">{featuredProgramSection.title}</h2>
                <div className="home-program-mobile-list">
                    {featuredEvents.map((event) => (
                        <article key={`${event.id}-mobile`} className="home-program-mobile-card">
                            <p className="home-program-mobile-date">{event.date}</p>
                            <p className="home-program-mobile-venue">{event.venue}</p>
                            <p className="home-program-mobile-time">{event.timeLabel}</p>

                            <Image
                                src={event.hero.src}
                                alt={event.hero.alt}
                                width={event.hero.width}
                                height={event.hero.height}
                                className="home-program-mobile-image"
                            />

                            <div className="home-program-mobile-copy">
                                <div className="home-program-mobile-pills">
                                    {event.voiceLabel && (
                                        <span className="home-program-mobile-pill">{event.voiceLabel}</span>
                                    )}
                                    {event.guestLabel && (
                                        <span className="home-program-mobile-pill">{event.guestLabel}</span>
                                    )}
                                </div>

                                <h3 className="home-program-mobile-title">{event.title}</h3>
                                <p className="home-program-mobile-director">di {event.director}</p>
                                <Link href={`/film/${event.slug}`} className="home-program-mobile-detail">
                                    Scheda film -&gt;
                                </Link>
                            </div>

                            <CommonButton href={event.ticketUrl} external className="home-program-mobile-ticket">
                                Biglietti
                            </CommonButton>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
