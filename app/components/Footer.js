'use client';

import Image from 'next/image';
import Link from 'next/link';
import '@/app/styles/footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-top">
                <Link href="/" className="footer-logo-link" aria-label="Visione Vesuvio">
                    <Image
                        src="/visione_vesuvio_footer.png"
                        alt="Visione Vesuvio"
                        width={886}
                        height={345}
                        className="footer-logo"
                    />
                </Link>

                <nav className="footer-nav" aria-label="Footer navigation">
                    <Link href="/programmazione">Programmazione</Link>
                    <Link href="/store">Shop</Link>
                    <Link href="/rassegne">Rassegne</Link>
                    <Link href="/about">Chi siamo</Link>
                </nav>

                <nav className="footer-social" aria-label="Social links">
                    <Link href="https://www.instagram.com/visionevesuvio/" target="_blank" rel="noopener noreferrer">
                        Instagram
                    </Link>
                    <Link href="https://www.facebook.com/profile.php?id=61563987746027" target="_blank" rel="noopener noreferrer">
                        Facebook
                    </Link>
                </nav>

                <nav className="footer-legal" aria-label="Legal links">
                    <Link href="/privacy-policy">Privacy Policy</Link>
                    <Link href="/terms-of-use">Terms of use</Link>
                </nav>
            </div>

            <div className="footer-bottom">
                <p>P.IVA ESEMPIO44324</p>
                <p>@VISIONEVESUVIO ALL RIGHTS RESERVED</p>
            </div>
        </footer>
    );
}
