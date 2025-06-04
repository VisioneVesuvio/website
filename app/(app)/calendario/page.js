// app/programmazione/page.js

import Image from 'next/image'; // Importa il componente Image
import DateEventSwitcher from '@/app/components/DateEventSwitcher'; // Assicurati che il percorso sia corretto

// Metadata per la pagina
export const metadata = {
    title: 'Programmazione - Visione Vesuvio',
    description: 'Scopri i film e gli eventi in programmazione.',
};

export default function ProgrammazionePage() {
    return (
        <div className="programmazione-page-wrapper"> {/* Wrapper per il padding generale della pagina */}
            <div className="programmazione-page-content"> {/* Contenitore per il contenuto principale, centrato e con max-width */}

                <h1 className="programmazione-page-main-title">PROGRAMMAZIONE</h1>

                <div className="programmazione-decorative-image-wrapper">
                    <Image
                        src="/S&A.png"  // Assicurati che S&A.png sia nella cartella /public
                        alt="Artwork decorativo S&A" // Testo alternativo
                        width={1200}  // SOSTITUISCI con la LARGHEZZA REALE di S&A.png
                        height={600} // SOSTITUISCI con l'ALTEZZA REALE di S&A.png
                        style={{ width: '100%', height: 'auto', display: 'block' }} // Per renderla responsiva
                        priority // Considera di aggiungerlo se l'immagine è importante per il caricamento visivo iniziale
                    />
                </div>

                <DateEventSwitcher />

            </div>
        </div>
    );
}