// app/about/page.js
import React from 'react';
import Image from 'next/image';
// Se hai stili specifici per questa pagina, puoi importarli:
// import './about-page.css';

export const metadata = {
    title: 'Chi Siamo - Visione Vesuvio', // Titolo per la tab del browser e SEO
    description: 'Scopri la visione, la missione e la storia di Visione Vesuvio, la nuova realtà per cinefili a Napoli.',
};

// Dati placeholder per le immagini - SOSTITUISCI CON I TUOI DATI REALI
const heroImageData = {
    src: '/poster.png', // ESEMPIO: metti il tuo file in public/images/about/
    alt: 'Immagine hero Visione Vesuvio',
    intrinsicWidth: 1920,  // LARGHEZZA REALE della tua immagine hero
    intrinsicHeight: 800 // ALTEZZA REALE della tua immagine hero
};

const mapImageData = {
    src: '/mappa.png', // ESEMPIO: metti il tuo file in public/images/about/
    alt: 'Mappa di Napoli stilizzata',
    intrinsicWidth: 1920, // LARGHEZZA REALE della tua mappa
    intrinsicHeight: 800  // ALTEZZA REALE della tua mappa
};

export default function AboutPage() {
    return (
        <> {/* Fragment per permettere un elemento full-bleed e poi il contenuto paddato */}

            {/* 1. IMMAGINE HERO A TUTTA LARGHEZZA */}
            <div className="about-hero-image-container">
                <Image
                    src={heroImageData.src}
                    alt={heroImageData.alt}
                    width={heroImageData.intrinsicWidth}
                    height={heroImageData.intrinsicHeight}
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        maxHeight: '75vh',     // Limita l'altezza massima dell'immagine hero
                        objectFit: 'cover'   // Copre l'area, tagliando se necessario per mantenere le proporzioni
                    }}
                    priority // Se è l'immagine principale "above the fold"
                />
            </div>

            {/* 2. CONTENUTO PRINCIPALE DELLA PAGINA (CON PADDING) */}
            <div className="page-content-wrapper"> {/* Usa la classe standard per padding/max-width */}

                <section className="about-content-section">
                    <h2 className="about-section-title">L'IDEA</h2>

                    <div className="about-map-container">
                        <div className="about-map-image-wrapper">
                            <Image
                                src={mapImageData.src}
                                alt={mapImageData.alt}
                                width={mapImageData.intrinsicWidth}
                                height={mapImageData.intrinsicHeight}
                                style={{width: '100%', height: 'auto', display: 'block', borderRadius: '4px'}}
                            />
                        </div>
                        <p className="map-caption-text">
                            città
                            <span className="map-caption-country-text">DEL CINEMA</span>
                        </p>
                    </div>

                    <div className="about-text-content">
                        <p>
                            Il risveglio turistico degli ultimi anni sta rendendo il centro di Napoli un luogo quasi
                            ostile ai locali, le attività commerciali sembrano in gran parte indirizzate a soddisfare il
                            frenetico viavai di turisti.
                        </p>
                        <p>
                            In questo scenario quasi distopico, la nostra idea è quella di creare offerta culturale per
                            i cittadini partenopei.
                            Dopo aver organizzato una rassegna di cinema all’aperto:
                            Cinema Streetview presso Villa Floridiana la nostra intenzione come associazione è quella di
                            restituire ai cinefili napoletani un luogo di incontro e dialogo.
                        </p>

                    </div>
                </section>

                <section className="about-content-section">
                    <h2 className="about-section-title">UNA NUOVA REALTÀ PER CINEFILI</h2>
                    <div className="about-text-content">
                        <p>
                            Napoli è sempre più protagonista delle produzioni cinematografiche e gli addetti ai lavori
                            partenopei si distaccano per talento. Tuttavia, la città non sembra essere il polo creativo
                            che i dati dimostrano. </p>
                        <p>
                            Organizzare proiezioni a Napoli, oltre a valorizzare luoghi della città poco sfruttati, è
                            l’occasione per creare un evento culturale, riunendo persone di diverse età e background in
                            un ambiente informale e accogliente. I film diventeranno un punto di partenza per
                            discussioni e nuove amicizie, ma anche un modo per guardare, e soprattutto vivere, i luoghi
                            della nostra città in maniera sempre diversa.
                        </p>
                    </div>
                </section>
                <section className="about-content-section">
                    <h2 className="about-section-title">COMMUNITY</h2>
                    <div className="about-text-content">
                        <p>
                            Il nostro progetto è rivolto principalmente ai giovani napoletani. L’idea è di creare uno spazio culturale vibrante, dove i ragazzi possano vivere in maniera nuova il parco e sviluppare nuove idee. Con le proiezioni, intendiamo stimolare la creatività, il dialogo, fortificando il legame tra i giovani e la città, raccogliendo e ispirando le nuove generazioni. </p>
                        
                    </div>
                </section>

            </div>
        </>
    );
}