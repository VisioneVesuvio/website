import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getFeaturedProgramEventBySlug, getFeaturedProgramEvents } from '@/app/content/featured-program';

export function generateStaticParams() {
    return getFeaturedProgramEvents().map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const event = getFeaturedProgramEventBySlug(resolvedParams.slug);

    if (!event) {
        return {
            title: 'Film - Visione Vesuvio',
        };
    }

    return {
        title: `${event.title} - Visione Vesuvio`,
        description: event.description,
    };
}

export default async function FilmDetailPage({ params }) {
    const resolvedParams = await params;
    const event = getFeaturedProgramEventBySlug(resolvedParams.slug);

    if (!event) {
        notFound();
    }

    return (
        <article className="film-detail-page">
            <div className="film-detail-hero">
                <Image
                    src={event.hero.src}
                    alt={event.hero.alt}
                    width={event.hero.width}
                    height={event.hero.height}
                    className="film-detail-hero-image"
                    priority
                />
            </div>

            <div className="film-detail-copy">
                <div className="film-detail-tags">
                    {event.categories.map((category) => (
                        <span key={category} className="film-detail-tag">{category}</span>
                    ))}
                </div>

                <h1 className="film-detail-title">{event.title}</h1>
                <p className="film-detail-director">di {event.director}</p>
                <p className="film-detail-description">{event.description}</p>

                <div className="film-detail-actions">
                    <a href={event.ticketUrl} target="_blank" rel="noreferrer" className="film-detail-ticket-link">
                        Biglietti
                    </a>
                    <Link href="/programmazione" className="film-detail-back-link">
                        Torna alla programmazione
                    </Link>
                </div>
            </div>
        </article>
    );
}
