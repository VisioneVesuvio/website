import '../styles/globals.css';
import SessionProviderWrapper from '@/app/providers/SessionProviderWrapper';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import AuthDropdown from '@/app/components/AuthDropdown';

export const metadata = {
    title: 'Nuovo sito di Evolve',
    description: 'Una descrizione è un insieme di indicazioni che determinano la natura della realtà che osserviamo',
};

export default function RootLayout({ children }) {
    return (
        <html lang="it">
        <body>
        <SessionProviderWrapper>
            <Navbar authComponent={<AuthDropdown />} />
            <main>{children}</main>
            <Footer />
        </SessionProviderWrapper>
        </body>
        </html>
    );
}
