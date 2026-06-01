import { getVisibleItems } from '@/app/content/utils';

export const rassegnePageContent = {
    title: 'Rassegne',
    currentLabel: 'In corso',
    pastLabel: 'Passate',
};

export const rassegneSeasons = [
    {
        id: 'suonne-e-ammore',
        slug: 'suonne-e-ammore',
        status: 'current',
        order: 10,
        isVisible: true,
        title: 'Suonne e Ammore',
        subtitle: 'con il Cinema Plaza',
        poster: {
            src: '/film/ex_machina.png',
            alt: 'Still Suonne e Ammore',
            width: 200,
            height: 300,
        },
        tags: ['Cinema all\'aperto', 'Villa Floridiana', 'DJ set'],
        venue: 'Villa Floridiana, Napoli',
        description: 'Visione Vesuvio presenta: Suonne e Ammore, seconda edizione del cinema all\'aperto che accompagna l\'estate partenopea. Appuntamento ogni domenica da fine giugno per tutta l\'estate con grandi classici senza tempo, sospesi tra desiderio e sguardo. Il grande schermo si accende, l\'estate prende forma.',
        lineup: 'In the mood for love - Her - Ex Machina - Annie Hall - Blue Velvet - 8 e mezzo - Alice in Wonderland',
        ticketUrl: 'https://floridiana.plazanapoli.18tickets.it/',
    },
    {
        id: 'stagione-invernale-2025',
        slug: 'stagione-invernale-2025',
        status: 'past',
        order: 20,
        isVisible: true,
        title: 'Stagione invernale 2025',
        subtitle: 'con il Cinema Plaza',
        poster: {
            src: '/film/end_of_the_world.png',
            alt: 'Still Stagione invernale 2025',
            width: 400,
            height: 600,
        },
        tags: ['Cinema Plaza', 'DJ set'],
        venue: 'Villa Floridiana, Napoli',
        description: 'Visione Vesuvio presenta: Suonne e Ammore, seconda edizione del cinema all\'aperto che accompagna l\'estate partenopea. Appuntamento ogni domenica da fine giugno per tutta l\'estate con grandi classici senza tempo, sospesi tra desiderio e sguardo.',
        lineup: '',
        ticketUrl: '',
    },
    {
        id: 'stagione-estiva-2024',
        slug: 'stagione-estiva-2024',
        status: 'past',
        order: 30,
        isVisible: true,
        title: 'Stagione estiva 2024',
        subtitle: 'con il Cinema Plaza',
        poster: {
            src: '/film/end_of_the_world.png',
            alt: 'Still Stagione estiva 2024',
            width: 400,
            height: 600,
        },
        tags: ['Cinema all\'aperto', 'Villa Floridiana', 'DJ set'],
        venue: 'Villa Floridiana, Napoli',
        description: 'Visione Vesuvio presenta: Suonne e Ammore, seconda edizione del cinema all\'aperto che accompagna l\'estate partenopea. Appuntamento ogni domenica da fine giugno per tutta l\'estate con grandi classici senza tempo, sospesi tra desiderio e sguardo.',
        lineup: '',
        ticketUrl: '',
    },
    {
        id: 'suonne-e-ammore-archive',
        slug: 'suonne-e-ammore-archive',
        status: 'past',
        order: 40,
        isVisible: true,
        title: 'Suonne e Ammore',
        subtitle: 'con il Cinema Plaza',
        poster: {
            src: '/film/end_of_the_world.png',
            alt: 'Still archivio Suonne e Ammore',
            width: 400,
            height: 600,
        },
        tags: ['Cinema all\'aperto', 'Villa Floridiana', 'DJ set'],
        venue: 'Villa Floridiana, Napoli',
        description: 'Visione Vesuvio presenta: Suonne e Ammore, seconda edizione del cinema all\'aperto che accompagna l\'estate partenopea. Appuntamento ogni domenica da fine giugno per tutta l\'estate con grandi classici senza tempo, sospesi tra desiderio e sguardo.',
        lineup: '',
        ticketUrl: '',
    },
];

export function getCurrentRassegne() {
    return getVisibleItems(rassegneSeasons).filter((season) => season.status === 'current');
}

export function getPastRassegne() {
    return getVisibleItems(rassegneSeasons).filter((season) => season.status === 'past');
}
