// app/rassegne/page.js
import React from 'react';
// import Image from 'next/image'; // Potrai usare next/image quando avrai le immagini vere

// Metadata per la pagina
export const metadata = {
    title: 'Rassegne - Visione Vesuvio',
    description: 'Scopri le nostre rassegne cinematografiche, passate e future.',
};

// Componente Helper per i placeholder delle immagini
const ImagePlaceholder = ({ aspectRatio = '2/3', height, text = 'Poster' }) => {
    const style = {
        width: '100%',
        height: height || 'auto', // Usa l'altezza specificata o auto
        aspectRatio: height ? undefined : aspectRatio, // Usa aspectRatio solo se l'altezza non è specificata
        backgroundColor: 'var(--placeholder-bg, #2a2a40)', // Colore di sfondo per il placeholder
        color: 'var(--placeholder-text-color, #777799)', // Colore del testo del placeholder
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px', // Bordi arrotondati
        fontSize: '0.9rem',
        border: '1px dashed var(--placeholder-border-color, #444466)', // Bordo tratteggiato
        padding: '0.5rem',
        boxSizing: 'border-box',
        textAlign: 'center',
    };
    return <div style={style}>{text}</div>;
};


export default function RassegnePage() {
    return (
        <div className="rassegne-page-container">
            <h1 className="rassegne-main-title">RASSEGNE</h1>

            {/* SEZIONE PROSSIMA */}
            <section className="rassegna-section rassegna-prossima">
                <h2 className="rassegna-section-subtitle">PROSSIMA</h2>
                <div className="rassegna-prossima-poster-wrapper">
                    {/* Placeholder per il poster grande della rassegna prossima */}
                    <ImagePlaceholder height="450px" text="Poster Rassegna Futura (Grande)" />
                </div>
            </section>

            {/* SEZIONE PASSATE */}
            <section className="rassegna-section rassegna-passate">
                <h2 className="rassegna-section-subtitle">PASSATE</h2>

                {/* Stagione Invernale 2025 */}
                <div className="rassegna-stagione-block">
                    <h3 className="rassegna-stagione-name">Stagione invernale 2025 al Cinema Plaza</h3>
                    <div className="rassegna-stagione-layout">
                        <div className="rassegna-stagione-large-poster-item">
                            <ImagePlaceholder height="380px" text="Poster Grande Inverno 2025" />
                        </div>
                        <div className="rassegna-stagione-small-grid-items">
                            <ImagePlaceholder text="Poster Piccolo 1" />
                            <ImagePlaceholder text="Poster Piccolo 2" />
                            <ImagePlaceholder text="Poster Piccolo 3" />
                            <ImagePlaceholder text="Poster Piccolo 4" />
                        </div>
                    </div>
                </div>

                {/* Stagione Estiva 2024 */}
                <div className="rassegna-stagione-block">
                    <h3 className="rassegna-stagione-name">Stagione estiva 2024 Cinema all'aperto in Villa Floridiana</h3>
                    <div className="rassegna-stagione-layout">
                        <div className="rassegna-stagione-large-poster-item">
                            <ImagePlaceholder height="380px" text="Poster Grande Estate 2024" />
                        </div>
                        <div className="rassegna-stagione-small-grid-items">
                            <ImagePlaceholder text="Poster Piccolo 5" />
                            <ImagePlaceholder text="Poster Piccolo 6" />
                            <ImagePlaceholder text="Poster Piccolo 7" />
                            <ImagePlaceholder text="Poster Piccolo 8" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}