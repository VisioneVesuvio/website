'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import '@/app/styles/navbar.css';
import { getNavigationItems, headerMarqueeItems } from '@/app/content/site';

export default function Navbar({ marqueeItems = headerMarqueeItems }) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuItems = getNavigationItems();
    const desktopMenuItems = menuItems.filter((item) => item.isPrimaryHeaderItem !== false);
    const leftMenuItems = desktopMenuItems.slice(0, 2);
    const rightMenuItems = desktopMenuItems.slice(2);
    const mobileOverlayItems = [
        { id: 'home', label: 'Home', href: '/' },
        { id: 'programmazione', label: 'Programmazione', href: '/programmazione' },
        { id: 'rassegne', label: 'Rassegne', href: '/rassegne' },
        { id: 'shop', label: 'Shop', href: '/store' },
        { id: 'about', label: 'Chi siamo', href: '/about' },
        { id: 'sostienici', label: 'Sostienici', href: '/contatti' },
    ];
    const marqueeSequence = Array.from({ length: 6 }, (_, index) => ({
        id: `marquee-group-${index}`,
        content: marqueeItems.length ? marqueeItems : headerMarqueeItems,
    }));

    const isActivePath = (href) => {
        if (href === '/') {
            return pathname === '/';
        }

        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const isMobileOverlayItemActive = (item) => {
        if (item.id === 'programmazione' && pathname.startsWith('/film/')) {
            return true;
        }

        return isActivePath(item.href);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';

        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    return (
        <header className="site-header">
            <nav className="navbar">
                <ul className="navbar-menu navbar-menu-desktop navbar-menu-left">
                    {leftMenuItems.map((item) => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={isActivePath(item.href) ? 'active-menu-btn' : ''}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="navbar-logo-container">
                    <Link href="/" className="navbar-logo-link" aria-label="Visione Vesuvio">
                        <Image
                            src="/logo_minimal.png"
                            alt="Logo Visione Vesuvio"
                            width={166}
                            height={184}
                            className="navbar-mark-image"
                            priority
                        />
                    </Link>
                </div>

                <div className="navbar-right-section">
                    <ul className="navbar-menu navbar-menu-desktop navbar-menu-right">
                        {rightMenuItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={isActivePath(item.href) ? 'active-menu-btn' : ''}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <button
                    className="navbar-hamburger-button"
                    aria-label={isMobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
                    aria-expanded={isMobileMenuOpen}
                    onClick={toggleMobileMenu}
                >
                    {isMobileMenuOpen ? 'Chiudi' : 'Menu'}
                </button>
            </nav>

            <div className="navbar-marquee" aria-label="Festival marquee">
                <div className="navbar-marquee-track">
                    {marqueeSequence.map((group) => (
                        <span key={group.id} className="navbar-marquee-group">
                            {group.content.map((item) => (
                                <span key={`${group.id}-${item}`} className="navbar-marquee-item">
                                    {item}
                                </span>
                            ))}
                        </span>
                    ))}
                </div>
            </div>

            <div className={`navbar-mobile-overlay ${isMobileMenuOpen ? 'is-open' : ''}`} aria-hidden={!isMobileMenuOpen}>
                <div className="navbar-mobile-overlay-top">
                    <Link href="/" className="navbar-mobile-overlay-logo" aria-label="Visione Vesuvio">
                        <Image
                            src="/logo_minimal.png"
                            alt="Logo Visione Vesuvio"
                            width={166}
                            height={184}
                            className="navbar-mobile-overlay-mark"
                        />
                    </Link>

                    <button
                        type="button"
                        className="navbar-mobile-overlay-close"
                        aria-label="Chiudi menu"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <span></span>
                        <span></span>
                    </button>
                </div>

                <ul className="navbar-mobile-overlay-list">
                    {mobileOverlayItems.map((item) => (
                        <li key={item.id}>
                            <Link
                                href={item.href}
                                className={[
                                    'navbar-mobile-overlay-link',
                                    isMobileOverlayItemActive(item) ? 'is-active' : '',
                                ].filter(Boolean).join(' ')}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <p className="navbar-mobile-overlay-rights">@VISIONEVESUVIO ALL RIGHTS RESERVED</p>
            </div>
        </header>
    );
}
