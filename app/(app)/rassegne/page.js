import Image from 'next/image';
import Link from 'next/link';
import { rassegnePageContent } from '@/app/content/rassegne';
import { getRassegneForPublic } from '@/app/services/rassegnaService';

export const metadata = {
    title: 'Rassegne - Visione Vesuvio',
    description: 'Scopri le rassegne Visione Vesuvio.',
};

function RassegnaRow({ season, showTicket = false }) {
    const cover = season.images?.[0] ?? season.poster ?? {
        src: '/film/end_of_the_world.png',
        alt: season.title,
        width: 1200,
        height: 800,
    };

    return (
        <article className="rassegne-list-row">
            <div className="rassegne-list-image">
                <Image
                    src={cover.src}
                    alt={cover.alt}
                    width={cover.width}
                    height={cover.height}
                    className="rassegne-list-image-asset"
                />
            </div>

            <div className="rassegne-list-copy">
                <div className="rassegne-list-topline">
                    <div className="rassegne-list-tags">
                        {season.tags.map((tag) => (
                            <span key={tag} className="rassegne-list-tag">{tag}</span>
                        ))}
                    </div>

                    {showTicket && season.ticketUrl && (
                        <Link href={season.ticketUrl} target="_blank" rel="noreferrer" className="rassegne-list-ticket-link">
                            Biglietti
                        </Link>
                    )}
                </div>

                <h2 className="rassegne-list-title">{season.title}</h2>
                <p className="rassegne-list-subtitle">{season.subtitle}</p>
                <p className="rassegne-list-description">{season.description}</p>
                {season.lineup && <p className="rassegne-list-lineup">{season.lineup}</p>}
                <p className="rassegne-list-venue">{season.venue}</p>

                {showTicket && (
                    <Link href="/programmazione" className="rassegne-list-film-link">
                        FILM -&gt;
                    </Link>
                )}
            </div>
        </article>
    );
}

export default async function RassegnePage() {
    const { current, past } = await getRassegneForPublic();

    return (
        <div className="rassegne-page-new">
            <section className="rassegne-page-header">
                <h1 className="rassegne-page-title">{rassegnePageContent.title}</h1>
            </section>

            <section className="rassegne-page-section">
                <p className="rassegne-page-section-label">{rassegnePageContent.currentLabel}</p>
                <div className="rassegne-page-list">
                    {current.map((season) => (
                        <RassegnaRow key={season.id} season={season} showTicket />
                    ))}
                </div>
            </section>

            <section className="rassegne-page-section">
                <p className="rassegne-page-section-label">Rassegne passate</p>
                <div className="rassegne-page-list">
                    {past.map((season) => (
                        <RassegnaRow key={season.id} season={season} />
                    ))}
                </div>
            </section>
        </div>
    );
}
