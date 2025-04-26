'use client';

import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';
import '@/app/styles/navbar.css';

export default function Navbar({ menuItems = [], authComponent = null }) {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link href="/" className="navbar-logo">Evolve</Link>
                <ul className="navbar-menu">
                    {menuItems.map((item, index) =>
                        item?.label && item?.href ? (
                            <li key={index}>
                                <Link href={item.href}>{item.label}</Link>
                            </li>
                        ) : null
                    )}
                </ul>
            </div>
            <div className="navbar-right">
                {authComponent}
                <ThemeSwitcher />
            </div>
        </nav>
    );
}
