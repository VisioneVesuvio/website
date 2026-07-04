import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CommonButton from '@/app/components/CommonButton';
import { getFeaturedProgramEventBySlug, getFeaturedProgramEvents } from '@/app/services/filmService';

export async function generateStaticParams() {
    const events = await getFeaturedProgramEvents();
    return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }) {
    const resolvedParams = await params;
    const event = await getFeaturedProgramEventBySlug(resolvedParams.slug);

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
    const event = await getFeaturedProgramEventBySlug(resolvedParams.slug);

    if (!event) {
        notFound();
    }

    return (
        <article className="film-detail-page">
            <Link href="/programmazione" className="film-detail-program-link">
                &lt;- Programmazione
            </Link>

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

                {event.details.length > 0 && (
                    <dl className="film-detail-meta">
                        {event.details.map((detail) => (
                            <div key={detail.label} className="film-detail-meta-row">
                                <dt>{detail.label}</dt>
                                <dd>{detail.value}</dd>
                            </div>
                        ))}
                    </dl>
                )}

                <p className="film-detail-description">{event.description}</p>

                <div className="film-detail-actions">
                    <CommonButton href={event.ticketUrl} external className="film-detail-ticket-link">
                        Biglietti
                    </CommonButton>
                </div>
            </div>
        </article>
    );
}
