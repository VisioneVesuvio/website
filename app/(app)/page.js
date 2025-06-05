// app/page.js
import Image from 'next/image';
import FilmGrid from '@/app/components/FilmGrid';

export default function HomePage() {
    return (
        <> {/* Questo Fragment è figlio del tag <main> nel tuo RootLayout */}

            {/* --- VIDEO A TUTTA LARGHEZZA --- */}
            <div className="video-container-global">
                <video
                    className="looping-video-global"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    {/* Ricorda di convertire .mov in .mp4 e usare il percorso corretto! */}
                    <source src="/loop_sito.mov" type="video/mp4" />
                    {/* <source src="/loop_sito.webm" type="video/webm" /> */}
                    Il tuo browser non supporta il tag video o i formati forniti.
                </video>
            </div>

            {/* --- NUOVO WRAPPER PER IL CONTENUTO PADDATO DELLA PAGINA --- */}
            <div className="page-content-wrapper">
                <section className="home-section"> {/* Ora figlio di page-content-wrapper */}

                    <div className="event-details-wrapper">
                        <div className="event-details-row">
                            <div className="event-text-left">
                                <p className="event-kicker">Cinefilia partenopea</p>
                                <h2 className="event-headline">ESTATE 2K25</h2>
                            </div>
                            <div className="event-text-right">
                                <p className="event-date-location">Giugno-Settembre, 2025 | Napoli</p>
                            </div>
                        </div>
                    </div>

                    <div className="fullwidth-image-wrapper"> {/* "fullwidth" ora relativo a page-content-wrapper */}
                        <Image
                            src="/S&A.png"
                            alt="Artwork S&A"
                            width={1920} // SOSTITUISCI con LARGHEZZA REALE
                            height={1080} // SOSTITUISCI con ALTEZZA REALE
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                            priority
                        />
                    </div>

                    <FilmGrid />
                </section>
            </div>
        </>
    );
}