export const featuredProgramSection = {
    title: 'Programmazione',
    featuredVisual: {
        src: '/film/blue_velvet.png',
        alt: 'Visual programmazione',
        width: 1000,
        height: 1400,
    },
    events: [
        {
            id: 'planete-sauvage',
            slug: 'il-pianeta-selvaggio',
            date: 'Giovedi 7 maggio',
            timeLabel: 'Ore 18:00',
            voiceLabel: 'V.O.S.',
            title: 'Il pianeta selvaggio',
            originalTitle: 'La planete sauvage',
            director: 'Rene Laloux',
            venue: 'Villa Floridiana, Napoli',
            ticketUrl: 'https://floridiana.plazanapoli.18tickets.it/film/20921',
            categories: ['Animazione', 'Fantascienza'],
            hero: {
                src: '/film/end_of_the_world.png',
                alt: 'Artwork Il pianeta selvaggio',
                width: 1600,
                height: 1000,
            },
            description: 'Tratto dal romanzo breve di fantascienza Homo Domesticus (Oms en serie, 1957) di Stefan Wul, il film e noto per le immagini surreali di ambientazione e creature. Viene considerato uno dei primi esempi di film in cui viene introdotto il tema dell\'antispecismo, rovesciando la classica prospettiva secondo la quale la specie umana sarebbe la piu evoluta, e quindi la piu importante, di tutte le specie.',
        },
        {
            id: 'blue-velvet-home',
            slug: 'velluto-blu',
            date: 'Martedi 7 maggio',
            timeLabel: 'Ore 18:00',
            voiceLabel: 'V.O.S.',
            title: 'Velluto Blu',
            originalTitle: 'Blue Velvet',
            director: 'David Lynch',
            venue: 'Villa Floridiana, Napoli',
            ticketUrl: 'https://floridiana.plazanapoli.18tickets.it/film/20923',
            categories: ['Noir', 'Cult'],
            hero: {
                src: '/film/blue_velvet.png',
                alt: 'Locandina Blue Velvet',
                width: 1200,
                height: 1800,
            },
            description: 'Una discesa ipnotica nel lato oscuro della provincia americana, tra mistero, desiderio e violenza. Lynch costruisce un film magnetico e perturbante che trasforma l\'ordinario in incubo.',
        },
        {
            id: 'annie-hall-home',
            slug: 'io-e-annie',
            date: 'Martedi 7 maggio',
            timeLabel: 'Ore 18:00',
            voiceLabel: 'V.O.S.',
            title: 'Io e Annie',
            originalTitle: 'Annie Hall',
            director: 'Woody Allen',
            venue: 'Villa Floridiana, Napoli',
            ticketUrl: 'https://floridiana.plazanapoli.18tickets.it/',
            categories: ['Commedia', 'Romantico'],
            hero: {
                src: '/film/hannie_hall.png',
                alt: 'Locandina Annie Hall',
                width: 1200,
                height: 1800,
            },
            description: 'Una storia d\'amore nervosa, brillante e disarmante, raccontata con l\'ironia e il ritmo che hanno reso Annie Hall un classico assoluto della commedia sentimentale.',
        },
        {
            id: 'otto-e-mezzo-home',
            slug: 'otto-e-mezzo',
            date: 'Martedi 7 maggio',
            timeLabel: 'Ore 18:00',
            voiceLabel: '',
            title: 'Otto e mezzo',
            originalTitle: '',
            director: 'Federico Fellini',
            venue: 'Villa Floridiana, Napoli',
            ticketUrl: 'https://floridiana.plazanapoli.18tickets.it/',
            categories: ['Autore', 'Visionario'],
            hero: {
                src: '/film/8_1_2.png',
                alt: 'Locandina Otto e mezzo',
                width: 1200,
                height: 1800,
            },
            description: 'Il capolavoro di Fellini sulla crisi creativa, sul ricordo e sulla messa in scena del proprio caos interiore. Un film che si muove tra autobiografia, sogno e invenzione pura.',
        },
    ],
};

export function getFeaturedProgramEvents() {
    return featuredProgramSection.events;
}

export function getFeaturedProgramEventBySlug(slug) {
    return featuredProgramSection.events.find((event) => event.slug === slug) ?? null;
}
