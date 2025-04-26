'use client';

import News from '@/app/components/News'; // versione centrale della componente
import '@/app/styles/news.css';

export default function NewsPage() {
    return (
        <section className="dashboard-news-page">
            <h1 className="news-title">Ultime Notizie dal Mondo Evolve</h1>
            <div className="news-center">
                <News isBouncing={true} />
            </div>
        </section>
    );
}
