// app/page.js (o il percorso della tua homepage)
import Image from 'next/image'; // Importa il componente Image
import FilmGrid from '@/app/components/FilmGrid';

export default function HomePage() {
    return (
        <section className="home-section"> {/* Contenitore principale per i contenuti della homepage */}

            {/* --- CONTENITORE DEL VIDEO --- */}
            <div className="video-container-global">
                <video
                    className="looping-video-global"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    {/* ATTENZIONE: Il tipo "video/mp4" con un src ".mov" è errato.
                        Dovresti convertire loop_sito.mov in loop_sito.mp4 e usare:
                        <source src="/loop_sito.mp4" type="video/mp4" />
                        Per ora lascio il tuo src, ma è probabile che non funzioni correttamente.
                    */}
                    <source src="/loop_sito.mov" type="video/mp4" />
                    {/* <source src="/loop_sito.webm" type="video/webm" /> */}
                    Il tuo browser non supporta il tag video o i formati forniti.
                </video>
            </div>

            {/* --- SEZIONE DETTAGLI EVENTO --- */}
            <div className="event-details-wrapper">
                <div className="event-details-row">
                    <div className="event-text-left">
                        <p className="event-kicker">Cinefilia partenopea</p>
                        <h2 className="event-headline">ESTATE 2K25</h2>
                    </div>
                    <div className="event-text-right">
                        {/* Data aggiornata come da tuo ultimo JSX */}
                        <p className="event-date-location">Giugno-Settembre, 2025 | Napoli</p>
                    </div>
                </div>
            </div>

            {/* --- NUOVA SEZIONE IMMAGINE FULLWIDTH --- */}
            <div className="fullwidth-image-wrapper">
                <Image
                    src="/S&A.png"  // Assicurati che S&A.png sia nella cartella /public
                    alt="Artwork S&A" // Testo alternativo descrittivo
                    width={1920} // SOSTITUISCI con la LARGHEZZA REALE della tua immagine S&A.png
                    height={1080} // SOSTITUISCI con l'ALTEZZA REALE della tua immagine S&A.png
                    style={{ width: '100%', height: 'auto', display: 'block' }} // Per renderla responsiva
                    priority // Aggiungi se l'immagine è critica per il Largest Contentful Paint (LCP)
                />
            </div>

            <FilmGrid />

        </section>
    );
}