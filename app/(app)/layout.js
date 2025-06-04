// app/layout.js (esempio se AuthDropdown non è più usato dalla Navbar)
import '../styles/globals.css';
import SessionProviderWrapper from '@/app/providers/SessionProviderWrapper';
import Navbar from '@/app/components/Navbar'; // Assumendo che questa sia la Navbar che abbiamo modificato
import Footer from '@/app/components/Footer';
// AuthDropdown non viene più importato se non usato

export const metadata = {
    title: 'Visione Vesuvio',
    description: 'Una descrizione è un insieme di indicazioni che determinano la natura della realtà che osserviamo',
};

export default function RootLayout({ children }) {
    return (
        <html lang="it">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Syne:ital,wght@0,400..800;1,400..800&display=swap" rel="stylesheet" />
        </head>
        <body>
        <SessionProviderWrapper>
            {/* Navbar senza la prop authComponent se il componente Navbar non la gestisce più */}
            <Navbar />
            <main>{children}</main>
            <Footer />
        </SessionProviderWrapper>
        </body>
        </html>
    );
}