// components/FlippableCard.js
import React from 'react';
import Image from 'next/image'; // Useremo next/image per le locandine
import '@/app/styles/flip.css';

export default function FlippableCard({ filmData }) {
    const { frontImage, frontText, backText, title } = filmData;

    return (
        <div className="flippable-card-container">
            <div className="flippable-card-inner">
                <div className="card-face card-front">
                    {frontImage ? (
                        <Image
                            src={frontImage}
                            alt={title || 'Locandina film'}
                            layout="fill"
                            objectFit="cover"
                            className="card-image"
                        />
                    ) : (
                        <div className="card-text-content">
                            <span>{frontText}</span>
                        </div>
                    )}
                </div>
                <div className="card-face card-back">
                    <p className="card-back-text">{backText}</p>
                </div>
            </div>
        </div>
    );
}