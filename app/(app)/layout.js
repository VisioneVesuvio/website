// app/layout.js (esempio se AuthDropdown non è più usato dalla Navbar)
import '../styles/globals.css';
import SessionProviderWrapper from '@/app/providers/SessionProviderWrapper';
import Navbar from '@/app/components/Navbar'; // Assumendo che questa sia la Navbar che abbiamo modificato
import Footer from '@/app/components/Footer';
import { getHeaderMarqueeItems } from '@/app/services/siteBannerService';
// AuthDropdown non viene più importato se non usato

export const metadata = {
    title: 'Visione Vesuvio',
    description: 'Visione Vesuvio è un’associazione culturale nata a Napoli per promuovere il cinema come esperienza condivisa.\n' +
        'Uno spazio pensato da cinefili per cinefili, dove vedere film, scambiare idee e immaginare nuove visioni.',
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default async function RootLayout({ children }) {
    const marqueeItems = await getHeaderMarqueeItems();

    return (
        <html lang="it">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Six+Caps&family=Space+Grotesk:wght@300;400;500;700&family=Syne:ital,wght@0,400..800;1,400..800&display=swap" rel="stylesheet" />
        </head>
        <body>
        <SessionProviderWrapper>
            {/* Navbar senza la prop authComponent se il componente Navbar non la gestisce più */}
            <Navbar marqueeItems={marqueeItems} />
            <main>{children}</main>
            <Footer />
        </SessionProviderWrapper>
        </body>
        </html>
    );
}
