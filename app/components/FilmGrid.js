// components/FilmGrid.js

import React from 'react';
import Link from 'next/link';
import FlippableCard from './FlippableCard';
import '@/app/styles/flip.css';

const sampleFilmsData = [
    // NOTA: Abbiamo solo 'youtubeVideoId' per i video.
    { id: 1, title: 'In The Mood For Love', frontImage: '/film/in_the_mood_for_love.png', youtubeVideoId: 'm8GuedsQnWQ?si=dqUYh6jnDQ9p3Yob', backText: '29 Giugno', locationInfo: 'Villa Floridiana, Napoli.' },
    { id: 2, title: 'Her', frontImage: '/film/her.png', youtubeVideoId: 'YzS77icrzD0?si=YEgug53iBlspc6YG', backText: '06 Luglio', locationInfo: 'Villa Floridiana, Napoli.' },
    { id: 3, title: 'Ex Machina', frontImage: '/film/ex_machina.png', youtubeVideoId: 'EoQuVnKhxaM?si=zBImMqBMPTVGf9QM', backText: '13 Luglio', locationInfo: 'Villa Floridiana, Napoli.' },
    { id: 4, title: 'Annie Hall', frontImage: '/film/hannie_hall.png', youtubeVideoId: 'OqVgCfZX-yE?si=ILfA60vJLMdw0m0A', backText: '20 Luglio', locationInfo: 'To be defined.' },
    { id: 5, title: 'Alice in Wonderland (1956)', frontImage: '/film/alice.png', youtubeVideoId: 'XMVwQcjn3NY?si=dsM2B875fma3oSYv', backText: '27 Luglio', locationInfo: 'To be defined.' },
    { id: 6, title: 'Blue Velvet', frontImage: '/film/blue_velvet.png', youtubeVideoId: 'rAA6imfqMYQ', backText: '03 Agosto', locationInfo: 'To be defined.' },
    { id: 7, title: 'Brazil', frontImage: '/film/brazil.png', youtubeVideoId: '4Gqjdscj3e8?si=DK7Asl-4lDDzZObc', backText: '07 Settembre', locationInfo: 'To be defined.' },
    { id: 8, title: '8½', frontImage: '/film/8_1_2.png', youtubeVideoId: 'RmIC9pQ80Fk?si=WFoplnBk-wJkpSUb', backText: '14 Settembre', locationInfo: 'To be defined.' },
    { id: 9, title: 'Paris, Texas', frontImage: '/film/paris_texas.png', youtubeVideoId: '3j8ypqxfiT4?si=SpBDMBw3O4BrwHR9', backText: '21 Settembre', locationInfo: 'To be defined.' },
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
                        Proiezioni Estate 2025 →
                    </a>
                </Link>
            </div>
        </section>
    );
}