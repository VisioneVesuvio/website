'use client';

import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import '@/app/styles/dashboard.css';
import '@/app/styles/globals.css'; // corretto reimporto su nuovo layout
import SessionProviderWrapper from '@/app/providers/SessionProviderWrapper';

export default function DashboardLayout({ children }) {
    // 👇 Menu specifico per la dashboard
    const dashboardMenuItems = [
        { label: 'Calendario', href: '/dashboard/calendar' },
        { label: 'Chatbot', href: '/dashboard/chatbot' },
        { label: 'News', href: '/dashboard/news' },
        { label: 'Archivio', href: '/dashboard/archivio' },
        { label: 'Ruota', href: '/dashboard/ruota' },
    ];

    return (
        <html lang="it">
        <body>
        <SessionProviderWrapper>
            <Navbar menuItems={dashboardMenuItems} />
            <main className="dashboard-layout">
                {children}
            </main>
            <Footer />
        </SessionProviderWrapper>
        </body>
        </html>
    );
}
