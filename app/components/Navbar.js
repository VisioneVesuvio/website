'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react'; // Per gestire lo stato del menu mobile
import '@/app/styles/navbar.css';

/**
 * Componente Navbar principale.
 */
export default function Navbar() { // Rimosso authComponent dalle props
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuItems = [
        { label: 'Home', href: '/' },
        { label: 'Estate 2k25', href: '/calendario' },
        { label: 'Rassegne', href: '/rassegne' },
        { label: 'About', href: '/about' },
        { label: 'Store', href: '/store' },
        { label: 'Contatti', href: '/contatti' },
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Chiudi il menu mobile quando si naviga a una nuova pagina
    useEffect(() => {
        if (isMobileMenuOpen) { // Chiudi solo se era aperto
            setIsMobileMenuOpen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]); // Aggiungi isMobileMenuOpen alle dipendenze se la logica diventa più complessa

    return (
        <nav className="navbar">
            <div className="navbar-logo-container">
                <Link href="/" className="navbar-logo-link">
                    <Image
                        src="/logo_visione_vesuvio.png"
                        alt="Logo Visione Vesuvio"
                        width={550}
                        height={94}
                        priority
                        className="navbar-logo-image"
                    />
                </Link>
            </div>

            {/* Il contenitore navbar-right-section ora contiene solo il menu */}
            <div className="navbar-right-section">
                <ul className={`navbar-menu ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
                    {menuItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={pathname === item.href ? 'active-menu-btn' : ''}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <button
                className="navbar-hamburger-button"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
                onClick={toggleMobileMenu}
            >
                <span className="hamburger-bar"></span>
                <span className="hamburger-bar"></span>
                <span className="hamburger-bar"></span>
            </button>
        </nav>
    );
}