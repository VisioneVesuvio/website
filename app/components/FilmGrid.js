// components/FilmGrid.js
import React from 'react';
import Link from 'next/link';
import FlippableCard from './FlippableCard'; // Assicurati che il percorso sia corretto
import '@/app/styles/flip.css';

// Dati di esempio per le 9 card
// Sostituisci i percorsi delle immagini e i testi con i tuoi dati reali.
// Se un'immagine non è disponibile, usa un colore di sfondo o un testo come placeholder.
const sampleFilmsData = [
    { id: 1, title: 'In The Mood For Love', frontImage: '/film/in_the_mood_for_love.png', frontText: null, backText: '15 Giugno' },
    { id: 2, title: 'Her', frontImage: '/film/her.png', frontText: null, backText: '22 Giugno' },
    { id: 3, title: 'Ex Machina', frontImage: '/film/ex_machina.png', frontText: null, backText: '29 Giugno' },
    { id: 4, title: 'Annie Hall', frontImage: '/film/hannie_hall.png', frontText: null, backText: '06 Luglio' }, // Card solo testo
    { id: 5, title: 'Blue Velvet', frontImage: '/film/blue_velvet.png', frontText: null, backText: '13 Luglio' }, // Card solo testo
    { id: 6, title: '8½', frontImage: '/film/8_1_2.png', frontText: null, backText: '20 Luglio' },
    { id: 7, title: 'Alice Wonderland', frontImage: '/film/alice.png', frontText: null, backText: '27 Luglio' },
    { id: 8, title: 'Brazil', frontImage: '/film/brazil.png', frontText: null, backText: '03 Agosto' }, // Card solo testo
    { id: 9, title: 'Paris, Texas', frontImage: '/film/paris_texas.png', frontText: null, backText: '10 Agosto' },
];
// NOTA: Dovrai creare la cartella /public/images/ e mettere lì le tue immagini locandina.
// Ho usato nomi placeholder come '/images/placeholder-in-the-mood.jpg'.

export default function FilmGrid() {
    // Puoi passare i dati dei film come props se li carichi dinamicamente
    const filmsToDisplay = sampleFilmsData; // o props.films

    return (
        <section className="film-grid-section">
            <h2 className="film-grid-title">FILM IN PROGRAMMAZIONE</h2>
            <div className="film-grid-container">
                {filmsToDisplay.map((film) => (
                    <FlippableCard key={film.id} filmData={film} />
                ))}
            </div>
            <div className="film-grid-button-container">
                <Link href="/calendario" legacyBehavior>
                    <a className="film-grid-button">
                        Proiezioni Estate 2025 &rarr;
                    </a>
                </Link>
            </div>
        </section>
    );
}