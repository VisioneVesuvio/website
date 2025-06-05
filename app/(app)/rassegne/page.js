// app/rassegne/page.js
import React from 'react';
import Image from 'next/image';

export const metadata = {
    title: 'Rassegne - Visione Vesuvio',
    description: 'Scopri le nostre rassegne cinematografiche, passate e future.',
};

// DATI DELLE RASSEGNE
// Definisci qui i percorsi e le dimensioni REALI (intrinseche) delle tue immagini.
// Questi dati sono per Next.js per l'ottimizzazione. Il CSS controllerà le dimensioni VISUALIZZATE.
const rassegneData = {
    prossima: {
        poster: {
            src: '/festival/poster_now.png', // SOSTITUISCI CON IL TUO PERCORSO REALE
            alt: 'Locandina rassegna futura SVONNE AMMORADN',
            intrinsicWidth: 800,  // LARGHEZZA REALE ORIGINALE
            intrinsicHeight: 1132 // ALTEZZA REALE ORIGINALE
        }
    },
    passate: [
        {
            id: 'invernale2025',
            title: 'Stagione invernale 2025 al Cinema Plaza',
            largePoster: {
                src: '/festival/poster_winter_2024.png', // SOSTITUISCI
                alt: 'Locandina principale Stagione Invernale 2025',
                intrinsicWidth: 700,  // LARGHEZZA REALE
                intrinsicHeight: 1000 // ALTEZZA REALE
            },
            smallPosters: [
                { id: 'inv25_1', src: '/film/end_of_the_world.png', alt: 'Poster piccolo 1', intrinsicWidth: 400, intrinsicHeight: 600 },
                { id: 'inv25_2', src: '/film/hong_kong_express.png', alt: 'Poster piccolo 2', intrinsicWidth: 400, intrinsicHeight: 600 },
                { id: 'inv25_3', src: '/film/souffle.png', alt: 'Poster piccolo 3', intrinsicWidth: 400, intrinsicHeight: 600 },
                { id: 'inv25_4', src: '/film/fire_of_love.png', alt: 'Poster piccolo 4', intrinsicWidth: 400, intrinsicHeight: 600 },
            ]
        },
        {
            id: 'invernale2025-tarantino',
            title: 'Visione Vesuvio Presenta',
            largePoster: {
                src: '/festival/poster_tarantino.png', // SOSTITUISCI
                alt: 'Locandina principale Stagione Invernale 2025',
                intrinsicWidth: 700,  // LARGHEZZA REALE
                intrinsicHeight: 1000 // ALTEZZA REALE
            },
            smallPosters: [
                { id: 'inv25_1', src: '/film/kill_bill_1.png', alt: 'Poster piccolo 1', intrinsicWidth: 400, intrinsicHeight: 600 },
                { id: 'inv25_2', src: '/film/kill_bill_2.png', alt: 'Poster piccolo 2', intrinsicWidth: 400, intrinsicHeight: 600 },
                { id: 'inv25_3', src: '/film/reservoir_dogs.png', alt: 'Poster piccolo 3', intrinsicWidth: 400, intrinsicHeight: 600 },
                { id: 'inv25_4', src: '/film/inglorious_bastards.png', alt: 'Poster piccolo 4', intrinsicWidth: 400, intrinsicHeight: 600 },
            ]
        },
        {
            id: 'estiva2024',
            title: 'Stagione estiva 2024 Cinema all\'aperto in Villa Floridiana',
            largePoster: {
                src: '/festival/poster_summer_2024.png', // SOSTITUISCI
                alt: 'Locandina principale Stagione Estiva 2024',
                intrinsicWidth: 700,  // LARGHEZZA REALE
                intrinsicHeight: 1000 // ALTEZZA REALE
            },
            smallPosters: [
                { id: 'est24_1', src: '/film/city_of_god.png', alt: 'Poster piccolo 5', intrinsicWidth: 400, intrinsicHeight: 600 },
                { id: 'est24_2', src: '/film/fallen_angels.png', alt: 'Poster piccolo 6', intrinsicWidth: 400, intrinsicHeight: 600 },
                { id: 'est24_3', src: '/film/la_hane.png', alt: 'Poster piccolo 7', intrinsicWidth: 400, intrinsicHeight: 600 },
                { id: 'est24_4', src: '/film/gomorra.png', alt: 'Poster piccolo 8', intrinsicWidth: 400, intrinsicHeight: 600 },
            ]
        }
    ]
};

export default function RassegnePage() {
    return (
        <div className="rassegne-page-container">
            <h1 className="rassegne-main-title">RASSEGNE</h1>

            {/* SEZIONE PROSSIMA */}
            <section className="rassegna-section rassegna-prossima">
                <h2 className="rassegna-section-subtitle">PROSSIMA</h2>
                <div className="rassegna-prossima-poster-wrapper"> {/* Controlla la larghezza max dell'area poster */}
                    {rassegneData.prossima.poster && (
                        <div className="image-wrapper prossima-grande-display"> {/* Controlla le dimensioni esatte di visualizzazione */}
                            <Image
                                src={rassegneData.prossima.poster.src}
                                alt={rassegneData.prossima.poster.alt}
                                fill
                                objectFit="cover" // o "contain" se preferisci non tagliare
                                sizes="(max-width: 768px) 90vw, 380px" // ADATTA ai tuoi breakpoint e alla larghezza di .rassegna-prossima-poster-wrapper
                                priority
                            />
                        </div>
                    )}
                </div>
            </section>

            {/* SEZIONE PASSATE */}
            <section className="rassegna-section rassegna-passate">
                <h2 className="rassegna-section-subtitle">PASSATE</h2>
                {rassegneData.passate.map((stagione) => (
                    <div key={stagione.id} className="rassegna-stagione-block">
                        <h3 className="rassegna-stagione-name">{stagione.title}</h3>
                        <div className="rassegna-stagione-layout">
                            <div className="rassegna-stagione-large-poster-item"> {/* Controlla la larghezza dell'area poster */}
                                {stagione.largePoster && (
                                    <div className="image-wrapper passate-grande-display"> {/* Controlla le dimensioni esatte di visualizzazione */}
                                        <Image
                                            src={stagione.largePoster.src}
                                            alt={stagione.largePoster.alt}
                                            fill
                                            objectFit="cover"
                                            sizes="(max-width: 768px) 90vw, 300px" // ADATTA
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="rassegna-stagione-small-grid-items">
                                {stagione.smallPosters.map((poster) => (
                                    <div key={poster.id} className="image-wrapper passate-piccolo-display"> {/* Controlla l'aspect-ratio */}
                                        <Image
                                            src={poster.src}
                                            alt={poster.alt}
                                            fill
                                            objectFit="cover"
                                            sizes="(max-width: 480px) 45vw, 20vw" // ADATTA
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}