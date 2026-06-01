import Image from 'next/image';
import { getCurrentRassegne, getPastRassegne, rassegnePageContent } from '@/app/content/rassegne';

export const metadata = {
    title: 'Rassegne - Visione Vesuvio',
    description: 'Scopri le rassegne Visione Vesuvio.',
};

function RassegnaRow({ season, showTicket = false }) {
    return (
        <article className="rassegne-list-row">
            <div className="rassegne-list-image">
                <Image
                    src={season.poster.src}
                    alt={season.poster.alt}
                    width={season.poster.width}
                    height={season.poster.height}
                    className="rassegne-list-image-asset"
                />
            </div>

            <div className="rassegne-list-copy">
                <div className="rassegne-list-tags">
                    {season.tags.map((tag) => (
                        <span key={tag} className="rassegne-list-tag">{tag}</span>
                    ))}
                </div>

                <h2 className="rassegne-list-title">{season.title}</h2>
                <p className="rassegne-list-subtitle">{season.subtitle}</p>
                <p className="rassegne-list-description">{season.description}</p>
                {season.lineup && <p className="rassegne-list-lineup">{season.lineup}</p>}
                <p className="rassegne-list-venue">{season.venue}</p>

                {showTicket && season.ticketUrl && (
                    <a href={season.ticketUrl} target="_blank" rel="noreferrer" className="rassegne-list-ticket">
                        Biglietti
                    </a>
                )}
            </div>
        </article>
    );
}

export default function RassegnePage() {
    const currentSeasons = getCurrentRassegne();
    const pastSeasons = getPastRassegne();

    return (
        <div className="rassegne-page-new">
            <section className="rassegne-page-header">
                <h1 className="rassegne-page-title">{rassegnePageContent.title}</h1>
            </section>

            <section className="rassegne-page-section">
                <p className="rassegne-page-section-label">{rassegnePageContent.currentLabel}</p>
                <div className="rassegne-page-list">
                    {currentSeasons.map((season) => (
                        <RassegnaRow key={season.id} season={season} showTicket />
                    ))}
                </div>
            </section>

            <section className="rassegne-page-section">
                <p className="rassegne-page-section-label">{rassegnePageContent.pastLabel}</p>
                <div className="rassegne-page-list">
                    {pastSeasons.map((season) => (
                        <RassegnaRow key={season.id} season={season} />
                    ))}
                </div>
            </section>
        </div>
    );
}
