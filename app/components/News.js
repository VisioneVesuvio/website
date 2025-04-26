'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import '@/app/styles/news.css';

const mockNews = [
    {
        title: 'Nuova Stampante 3D ad Alta Risoluzione lanciata da Evolve',
        image: '/news/stampante_hd.png',
        description:
            'Evolve presenta la sua nuova linea di stampanti 3D ad alta precisione per prototipazione industriale. Velocità, dettaglio e materiali avanzati combinati per ridefinire lo standard della produzione additiva.',
    },
    {
        title: 'Partnership con Università per materiali bio-compatibili',
        image: '/news/biomateriali.png',
        description:
            'Firmata oggi una collaborazione con l’Università Politecnica per lo sviluppo di nuovi filamenti biodegradabili, pensati per la stampa 3D nel settore medicale e alimentare.',
    },
    {
        title: 'Workshop Internazionale sulla Stampa 3D nel Design',
        image: '/news/workshop.png',
        description:
            'Evolve ospita il primo evento europeo dedicato all’uso della stampa 3D nel design d’interni, moda e architettura. Speaker da MIT, Polimi e aziende top del settore.',
    },
    {
        title: 'Disponibile ora: Simulatore AI per progettazione 3D',
        image: '/news/simulator.png',
        description:
            'Una nuova piattaforma proprietaria consente di testare virtualmente la resa meccanica ed estetica di modelli 3D prima della stampa. L’intelligenza artificiale simula carichi, materiali e reazioni ambientali.',
    },
    {
        title: 'Evolve nel Top 10 delle Startup Industriali in Europa',
        image: '/news/award.png',
        description:
            'La rivista EuropeanTech ha inserito Evolve nella classifica delle 10 realtà più promettenti dell’anno, premiando la visione, l’ecosistema modulare e il design sostenibile dei suoi prodotti.',
    }
];


export default function News({ news = mockNews, isBouncing = false }) {
    const [selected, setSelected] = useState(null);
    const [opened, setOpened] = useState(false);

    const openNews = (item) => {
        setSelected(item);
        setOpened(true);
    };

    return (
        <div className="news-wrapper">
            {/* Titolo-bottone */}
            <button
                className={`news-toggle-button ${!opened && isBouncing ? 'news-ring' : ''}`}
                onClick={() => setOpened(!opened)}
            >
                📰 Ultime Notizie dal Mondo Evolve
            </button>

            {/* Galleria notizie (dopo il click) */}
            {opened && (
                <div className="news-gallery">
                    {news.map((item, idx) => (
                        <div className="news-card" key={idx}>
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={80}
                                height={80}
                                className="news-image"
                                onError={(e) => (e.currentTarget.style.display = 'none')}
                            />
                            <div className="news-info">
                                <h3>{item.title}</h3>
                                <button className="news-open" onClick={() => openNews(item)}>
                                    Leggi
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Popup notizia selezionata */}
            {selected && (
                <div className="news-popup popup-in">
                    <button className="news-popup-close" onClick={() => setSelected(null)}>✖</button>
                    <Image src={selected.image} alt={selected.title} width={150} height={150} />
                    <h2>{selected.title}</h2>
                    <div className="news-description">
                        {selected.description.split('\n').map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="news-cta">
                        <button
                            className="news-action"
                            onClick={() => alert('Funzionalità in sviluppo')}
                        >
                            🔗 Scopri di più
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
