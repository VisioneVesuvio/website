'use client';

import Link from 'next/link';
import '@/app/styles/footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p className="footer-text">© {new Date().getFullYear()} Evolve. Tutti i diritti riservati.</p>
                <div className="footer-social">
                    <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</Link>
                    <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</Link>
                    <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</Link>
                </div>
            </div>
        </footer>
    );
}
