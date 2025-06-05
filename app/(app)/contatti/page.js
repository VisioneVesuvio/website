// app/contatti/page.js
// NESSUNA direttiva "use client"; QUI ALL'INIZIO DEL FILE

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// Se hai stili specifici in un file .css per questa pagina, importali:
// import './contatti-page.module.css'; // Esempio se usi CSS Modules
// Altrimenti, si affiderà a globals.css

// Definisci i componenti SVG per le icone social qui o importali


// Esportazione dei metadati - questo è consentito solo se non c'è "use client" nel file
export const metadata = {
    title: 'Contatti - Visione Vesuvio',
    description: 'Mettiti in contatto con l\'associazione Visione Vesuvio.',
};

export default function ContattiPage() {


    const logoDisplayWidth = 600;
    // Calcola l'altezza mantenendo l'aspect ratio originale del tuo logo (es. 550x94)
    const logoOriginalWidth = 420;
    const logoOriginalHeight = 94;
    const logoDisplayHeight = (logoDisplayWidth * logoOriginalHeight) / logoOriginalWidth;

    return (
        <div className="page-content-wrapper">
            <h1 className="contatti-page-title">CONTATTI</h1>
            <p>.</p>

            <section className="contact-section-layout">
                <div className="contact-block">
                    <h2 className="contact-block-heading">ASSOCIAZIONE</h2>
                    <div className="contact-logo-container">
                        <Image
                            src="/logo_visione_vesuvio.png"
                            alt="Logo Associazione Visione Vesuvio"
                            width={logoDisplayWidth}
                            height={logoDisplayHeight}
                        />
                    </div>
                    <p>.</p>
                    <p className="contact-info-text contact-piva">Partita IVA 10621671212</p>
                    <p>.</p>
                </div>


                <div className="contact-block">
                    <h2 className="contact-block-heading">EMAIL</h2>
                    <a href="mailto:associazione.visionevesuvio@gmail.com" className="contact-email-address">
                        associazione.visionevesuvio@gmail.com
                    </a>
                </div>
            </section>
        </div>
    );
}