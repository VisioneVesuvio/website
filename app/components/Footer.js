'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getContactBlocks } from '@/app/content/contacts';
import '@/app/styles/footer.css';

export default function Footer() {
    const contactBlocks = getContactBlocks();
    const association = contactBlocks.find((block) => block.type === 'association');
    const email = contactBlocks.find((block) => block.type === 'email');

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
                <div className="footer-contact-info" aria-label="Informazioni di contatto">
                    {email?.value ? (
                        <a href={`mailto:${email.value}`}>{email.value}</a>
                    ) : null}
                    {association?.pIva ? (
                        <p>P.IVA {association.pIva}</p>
                    ) : null}
                    <p>
                        Made by{' '}
                        <a href="https://evolvecompany.tech" target="_blank" rel="noopener noreferrer">
                            Evolve
                        </a>
                    </p>
                </div>
                <p>@VISIONEVESUVIO ALL RIGHTS RESERVED</p>
            </div>
        </footer>
    );
}
