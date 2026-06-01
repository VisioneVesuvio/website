'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import '@/app/styles/navbar.css';
import { getNavigationItems, headerMarqueeItems } from '@/app/content/site';

export default function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuItems = getNavigationItems();
    const desktopMenuItems = menuItems.filter((item) => item.isPrimaryHeaderItem !== false);
    const leftMenuItems = desktopMenuItems.slice(0, 2);
    const rightMenuItems = desktopMenuItems.slice(2);
    const marqueeSequence = Array.from({ length: 6 }, (_, index) => ({
        id: `marquee-group-${index}`,
        content: headerMarqueeItems,
    }));

    const isActivePath = (href) => {
        if (href === '/') {
            return pathname === '/';
        }

        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    }, [pathname, isMobileMenuOpen]);

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
                    aria-label="Toggle menu"
                    aria-expanded={isMobileMenuOpen}
                    onClick={toggleMobileMenu}
                >
                    <span className="hamburger-bar"></span>
                    <span className="hamburger-bar"></span>
                    <span className="hamburger-bar"></span>
                </button>

                <ul className={`navbar-menu navbar-menu-mobile ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
                    {menuItems.map((item) => (
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
        </header>
    );
}
