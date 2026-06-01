import FeaturedProgramSection from '@/app/components/FeaturedProgramSection';

export const metadata = {
    title: 'Programmazione - Visione Vesuvio',
    description: 'Scopri i film e gli eventi in programmazione.',
};

export default function ProgrammazionePage() {
    return (
        <div className="program-page">
            <FeaturedProgramSection showSectionFrame />
            <div className="program-page-spacer" />
        </div>
    );
}
