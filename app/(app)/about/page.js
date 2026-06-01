import { homePageContent } from '@/app/content/home';
import HorizontalPosterSlider from '@/app/components/HorizontalPosterSlider';

export const metadata = {
    title: 'Chi Siamo - Visione Vesuvio',
    description: 'Scopri la visione e la storia di Visione Vesuvio.',
};

export default function AboutPage() {
    return (
        <div className="about-page-new">
            <section className="about-page-header">
                <h1 className="about-page-title">Chi siamo</h1>
                <p className="about-page-intro">
                    Visione Vesuvio e un progetto culturale indipendente, nato a Napoli con l&apos;intento di costruire un nuovo spazio di incontro per cinefili.
                </p>
            </section>

            <section className="about-page-slider-shell">
                <HorizontalPosterSlider
                    items={homePageContent.horizontalSlider.items}
                    ariaLabel="Momenti Visione Vesuvio"
                />
            </section>

            <section className="about-page-copy">
                <p>
                    Rassegne, retrospettive, proiezioni-evento e collaborazioni con realta culturali del territorio.
                </p>
                <p>
                    Visione Vesuvio promuove la cultura cinematografica, riportando al centro il valore dell&apos;esperienza di visione condivisa.
                </p>
            </section>
        </div>
    );
}
