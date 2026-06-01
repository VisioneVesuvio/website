// components/FlippableCard.js

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import YouTube from 'react-youtube';

export default function FlippableCard({ filmData }) {
    const poster = filmData?.poster;
    const frontImage = poster?.src ?? filmData?.frontImage;
    const frontImageAlt = poster?.alt ?? `Locandina: ${filmData?.title}`;
    const frontText = filmData?.frontText;
    const backText = filmData?.programLabel ?? filmData?.shortLabel ?? filmData?.fullDateLabel ?? filmData?.backText;
    const title = filmData?.title;
    const youtubeVideoId = filmData?.trailer?.youtubeVideoId ?? filmData?.youtubeVideoId;
    const locationInfo = filmData?.venue ?? filmData?.locationInfo;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const openModal = (e) => {
        e.stopPropagation();
        if (youtubeVideoId) {
            setIsModalOpen(true);
        }
    };

    const closeModal = (e) => {
        e.stopPropagation();
        setIsModalOpen(false);
    };

    const playerOptions = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
            controls: 1,
            modestbranding: 1,
        },
    };

    return (
        <>
            <div
                className="flippable-card-container"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <div className="flippable-card-inner">
                    <div className="card-face card-front">
                        {frontImage ? (
                            <Image src={frontImage} alt={frontImageAlt} fill style={{ objectFit: 'cover' }} />
                        ) : (
                            <div className="card-text-content"><span>{frontText || title}</span></div>
                        )}
                    </div>

                    <div className="card-face card-back">
                        {frontImage && (
                            <Image
                                src={frontImage}
                                alt=""
                                fill
                                style={{ objectFit: 'cover' }}
                                className="card-back-background-image"
                            />
                        )}

                        {youtubeVideoId && (
                            <div className="play-button-container" onClick={openModal}>
                                <div className="play-button-icon">
                                    <svg viewBox="0 0 100 100"><path d="M 30,20 L 70,50 L 30,80 Z" /></svg>
                                </div>
                            </div>
                        )}

                        <div className="card-back-content">
                            <p className="card-back-text">{backText}</p>
                        </div>

                        <div className="card-back-location-info">
                            <p>{locationInfo}</p>
                        </div>

                        {isHovering && (
                            <Link href="/calendario" className="ticket-link-icon" title="Acquista Biglietti">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M20 12a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4zM8.5 15a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1zm3 0a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1zm3 0a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1zm3 0a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1zM20 7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v1h16V7z"/>
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="video-modal" onClick={closeModal}>
                    <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                        <YouTube videoId={youtubeVideoId} opts={playerOptions} className="modal-video-player" />
                        <button onClick={closeModal} className="video-modal-close-button">x</button>
                    </div>
                </div>
            )}
        </>
    );
}
