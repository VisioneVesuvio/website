// app/programmazione/page.js

import Image from 'next/image';
import DateEventSwitcher from '@/app/components/DateEventSwitcher'; // Assicurati che il percorso sia corretto

// Metadata per la pagina
export const metadata = {
    title: 'Programmazione - Visione Vesuvio',
    description: 'Scopri i film e gli eventi in programmazione.',
};

export default function ProgrammazionePage() {
    return (
        // Usiamo la classe .page-content-wrapper definita nel tuo CSS base globale
        // per il padding e la larghezza massima.
        <div className="page-content-wrapper">

            <h2 className="programmazione-page-main-title">PROGRAMMAZIONE</h2>

            <div className="programmazione-decorative-image-wrapper">
                <Image
                    src="/S&A.png"  // Assicurati che S&A.png sia nella cartella /public
                    alt="Artwork decorativo S&A" // Testo alternativo
                    width={1200}  // SOSTITUISCI con la LARGHEZZA REALE di S&A.png
                    height={600} // SOSTITUISCI con l'ALTEZZA REALE di S&A.png
                    style={{ width: '100%', height: 'auto', display: 'block' }} // Per renderla responsiva
                    priority
                />
            </div>

            <DateEventSwitcher />

        </div>
    );
}