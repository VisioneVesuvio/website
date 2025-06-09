// components/FilmGrid.js

import React from 'react';
import Link from 'next/link';
import FlippableCard from './FlippableCard';
import '@/app/styles/flip.css';

const sampleFilmsData = [
    // NOTA: Aggiunto 'youtubeUrl' per il link nel popup
    { id: 1, title: 'In The Mood For Love', frontImage: '/film/in_the_mood_for_love.png', backVideo: '/film/in_the_mood_for_love.mp4', fullVideoSrc: '/film/in_the_mood_for_love.mp4', youtubeUrl: 'https://youtu.be/m8GuedsQnWQ?si=dqUYh6jnDQ9p3Yob', backText: '22 Giugno', locationInfo: 'Villa Floridiana, Napoli.' },
    { id: 2, title: 'Her', frontImage: '/film/her.png', backVideo: '/videos/her_clip.mp4', fullVideoSrc: '/videos/her_full.mp4', youtubeUrl: 'https://www.youtube.com/watch?v=456', backText: '29 Giugno', locationInfo: 'Villa Floridiana, Napoli.' },
    { id: 3, title: 'Ex Machina', frontImage: '/film/ex_machina.png', backVideo: '/film/ex_machina.webm', fullVideoSrc: '/film/ex_machina.mp4', youtubeUrl: 'https://youtu.be/EoQuVnKhxaM?si=zBImMqBMPTVGf9QM', backText: '06 Luglio', locationInfo: 'Villa Floridiana, Napoli' },
    { id: 4, title: 'Annie Hall', frontImage: '/film/hannie_hall.png', backVideo: null, fullVideoSrc: null, youtubeUrl: null, backText: '13 Luglio', locationInfo: 'Villa Floridiana, Napoli.' },
    // ... e così via per gli altri film
    { id: 5, title: 'Alice in Wonderland (1956)', frontImage: '/film/alice.png', backVideo: null, fullVideoSrc: null, youtubeUrl: null, backText: '20 Luglio', locationInfo: 'Villa Floridiana, Napoli.' },
    { id: 6, title: 'Blue Velvet', frontImage: '/film/blue_velvet.png', backVideo: null, fullVideoSrc: null, youtubeUrl: null, backText: '27 Luglio', locationInfo: 'Villa Floridiana, Napoli.' },
    { id: 7, title: 'Brazil', frontImage: '/film/brazil.png', backVideo: '/film/brazil.mp4', fullVideoSrc: '/film/brazil.mp4', youtubeUrl: null, backText: '03 Agosto', locationInfo: 'Villa Floridiana, Napoli.' },
    { id: 8, title: '8½', frontImage: '/film/8_1_2.png', backVideo: null, fullVideoSrc: null, youtubeUrl: null, backText: '07 Settembre', locationInfo: 'Villa Floridiana, Napoli.' },
    { id: 9, title: 'Paris, Texas', frontImage: '/film/paris_texas.png', backVideo: null, fullVideoSrc: null, youtubeUrl: null, backText: '14 Settembre', locationInfo: 'Villa Floridiana, Napoli.' },
];

export default function FilmGrid() {
    const filmsToDisplay = sampleFilmsData;

    return (
        <section className="film-grid-section">
            <h3 className="film-grid-title">FILM IN PROGRAMMAZIONE</h3>
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