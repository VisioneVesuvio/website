import FeaturedProgramSection from '@/app/components/FeaturedProgramSection';
import { getFeaturedProgramEvents } from '@/app/services/filmService';

export const metadata = {
    title: 'Programmazione - Visione Vesuvio',
    description: 'Scopri i film e gli eventi in programmazione.',
};

export default async function ProgrammazionePage() {
    const featuredEvents = await getFeaturedProgramEvents();

    return (
        <div className="program-page">
            <FeaturedProgramSection events={featuredEvents} showSectionFrame />
            <div className="program-page-spacer" />
        </div>
    );
}
