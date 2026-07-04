// components/FilmGrid.js

import React from 'react';
import FlippableCard from './FlippableCard';
import CommonButton from './CommonButton';
import '@/app/styles/flip.css';
import { getVisibleItems } from '@/app/content/utils';

export default function FilmGrid({
    films = [],
    title = 'FILM IN PROGRAMMAZIONE',
    ctaLabel = 'Proiezioni Estate 2025 ->',
    ctaHref = '/calendario',
}) {
    const filmsToDisplay = getVisibleItems(films);

    return (
        <section className="film-grid-section">
            <h3 className="film-grid-title">{title}</h3>
            <div className="film-grid-container">
                {filmsToDisplay.map((film) => (
                    <FlippableCard key={film.id} filmData={film} />
                ))}
            </div>
            <div className="film-grid-button-container">
                <CommonButton href={ctaHref} className="film-grid-button">
                    {ctaLabel}
                </CommonButton>
            </div>
        </section>
    );
}
