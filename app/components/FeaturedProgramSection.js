import Image from 'next/image';
import Link from 'next/link';
import { featuredProgramSection, getFeaturedProgramEvents } from '@/app/content/featured-program';

export default function FeaturedProgramSection({ className = '', showSectionFrame = false }) {
    const featuredEvents = getFeaturedProgramEvents();

    return (
        <section className={`home-program-section ${className}`.trim()}>
            <h2 className="home-program-heading">{featuredProgramSection.title}</h2>
            <div className={`home-program-grid ${showSectionFrame ? 'home-program-grid-framed' : ''}`}>
                <div className="home-program-visual">
                    <div className="home-program-visual-frame">
                        <Image
                            src={featuredProgramSection.featuredVisual.src}
                            alt={featuredProgramSection.featuredVisual.alt}
                            width={featuredProgramSection.featuredVisual.width}
                            height={featuredProgramSection.featuredVisual.height}
                            className="home-program-visual-image"
                            priority
                        />
                    </div>
                </div>

                <div className="home-program-panel">
                    <div className="home-program-event-list">
                        {featuredEvents.map((event) => (
                            <article key={event.id} className="home-program-event-card">
                                <div className="home-program-event-meta">
                                    <span className="home-program-pill home-program-pill-time">{event.timeLabel}</span>
                                    <span className={`home-program-pill ${event.voiceLabel ? 'home-program-pill-voice' : 'home-program-pill-empty'}`}>
                                        {event.voiceLabel || ''}
                                    </span>
                                    <a
                                        href={event.ticketUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="home-program-ticket-link"
                                    >
                                        Acquista
                                    </a>
                                </div>

                                <div className="home-program-event-body">
                                    <div>
                                        <p className="home-program-event-title">
                                            <strong>{event.date}</strong>
                                            <span>{event.title}</span>
                                            {event.originalTitle && <em>{event.originalTitle}</em>}
                                        </p>
                                        <p className="home-program-event-director">di {event.director}</p>
                                    </div>

                                    <div className="home-program-event-bottom">
                                        <p className="home-program-event-venue">{event.venue}</p>
                                        <Link href={`/film/${event.slug}`} className="home-program-detail-link">
                                            Scheda film -&gt;
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
