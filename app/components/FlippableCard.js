// components/FlippableCard.js

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Assicurati che Link sia importato

export default function FlippableCard({ filmData }) {
    const { frontImage, frontText, backText, title, backVideo, fullVideoSrc, locationInfo, youtubeUrl } = filmData;

    const [isModalOpen, setIsModalOpen] = useState(false);
    // NUOVO: Stato per rilevare l'hover sulla card
    const [isHovering, setIsHovering] = useState(false);

    const openModal = (e) => {
        e.stopPropagation();
        if (fullVideoSrc) {
            setIsModalOpen(true);
        }
    };

    const closeModal = (e) => {
        e.stopPropagation();
        setIsModalOpen(false);
    };

    return (
        <>
            {/* Aggiungiamo gli eventi di hover al contenitore principale */}
            <div
                className="flippable-card-container"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <div className="flippable-card-inner">
                    {/* --- FRONTE DELLA CARD --- */}
                    <div className="card-face card-front">
                        {frontImage ? (
                            <Image src={frontImage} alt={`Locandina: ${title}`} layout="fill" objectFit="cover" />
                        ) : (
                            <div className="card-text-content"><span>{frontText || title}</span></div>
                        )}
                    </div>

                    {/* --- RETRO DELLA CARD --- */}
                    <div className="card-face card-back">
                        {frontImage && (
                            <Image src={frontImage} alt="" layout="fill" objectFit="cover" className="card-back-background-image"/>
                        )}

                        {backVideo && (
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

                        {/* NUOVO: Icona del biglietto che appare su hover */}
                        {isHovering && (
                            <Link href="/calendario" className="ticket-link-icon" title="Vai all'acquisto">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M20 12a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4zM8.5 15a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1zm3 0a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1zm3 0a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1zm3 0a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1zM20 7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v1h16V7z"/>
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* --- MODAL / LIGHTBOX (invariato) --- */}
            {isModalOpen && (
                <div className="video-modal" onClick={closeModal}>
                    <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                        <video src={fullVideoSrc} controls autoPlay className="modal-video-player"></video>
                        <button onClick={closeModal} className="video-modal-close-button">×</button>
                        {youtubeUrl && (
                            <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="youtube-link-in-modal" title="Guarda su YouTube">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}