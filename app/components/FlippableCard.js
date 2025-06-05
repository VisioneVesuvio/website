// components/FlippableCard.js
import React from 'react';
import Image from 'next/image';

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
                            objectFit="contain"
                            className="card-image" // Usata per border-radius sull'immagine se necessario
                        />
                    ) : (
                        <div className="card-text-content">
                            <span>{frontText}</span>
                        </div>
                    )}
                </div>
                <div className="card-face card-back">
                    {/* Immagine di sfondo per il retro della card */}
                    {frontImage && (
                        <Image
                            src={frontImage}
                            alt="" // Immagine decorativa, l'alt principale è sul fronte
                            layout="fill"
                            objectFit="cover"
                            className="card-back-background-image" // Nuova classe per l'opacità e z-index
                        />
                    )}
                    {/* Contenuto testuale sopra l'immagine di sfondo */}
                    <div className="card-back-content">
                        <p className="card-back-text">{backText}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}