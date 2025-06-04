'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import '@/app/styles/auth-dropdown.css';

/**
 * Componente `AuthDropdown`
 * - Mostra un bottone "Accedi"
 * - Al passaggio del mouse, mostra un menu a tendina con:
 *    - Link al calendario (/signin)
 *    - Link alla registrazione (/signup)
 * - Rimane aperto per 5 secondi anche dopo l'uscita del mouse (cooldown)
 */
export default function AuthDropdown() {
    // Stato per determinare se il menu è aperto
    const [open, setOpen] = useState(false);

    // Riferimento per gestire il timeout di chiusura
    const timeoutRef = useRef(null);

    // Quando il mouse entra: cancella eventuale timeout e mostra il menu
    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current); // evita la chiusura prematura
        setOpen(true);
    };

    // Quando il mouse esce: imposta timeout per chiusura ritardata
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setOpen(false); // chiudi il menu dopo 1 secondo
        }, 1000); // ⏱️ durata del cooldown
    };

    return (
        <div
            className="auth-dropdown"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Bottone principale */}
            <button className="auth-button">Accedi</button>

            {/* Menu dropdown visibile solo se `open` è true */}
            {open && (
                <div className="auth-dropdown-menu">
                    <Link href="/login">Login</Link>
                    <Link href="/signup">Registrati</Link>
                </div>
            )}
        </div>
    );
}
