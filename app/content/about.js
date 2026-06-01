import { getVisibleItems } from '@/app/content/utils';

export const aboutPageContent = {
    heroImage: {
        src: '/poster.png',
        alt: 'Immagine hero Visione Vesuvio',
        width: 1920,
        height: 800,
    },
    mapImage: {
        src: '/mappa.png',
        alt: 'Mappa di Napoli stilizzata',
        width: 1920,
        height: 800,
    },
    mapCaption: {
        primary: 'citta',
        secondary: 'DEL CINEMA',
    },
};

export const aboutSections = [
    {
        id: 'idea',
        title: 'L\'IDEA',
        order: 10,
        isVisible: true,
        paragraphs: [
            'Il risveglio turistico degli ultimi anni sta rendendo il centro di Napoli un luogo quasi ostile ai locali, le attivita commerciali sembrano in gran parte indirizzate a soddisfare il frenetico viavai di turisti.',
            'In questo scenario quasi distopico, la nostra idea e quella di creare offerta culturale per i cittadini partenopei. Dopo aver organizzato una rassegna di cinema all\'aperto, Cinema Streetview presso Villa Floridiana, la nostra intenzione come associazione e quella di restituire ai cinefili napoletani un luogo di incontro e dialogo.',
        ],
    },
    {
        id: 'nuova-realta',
        title: 'UNA NUOVA REALTA PER CINEFILI',
        order: 20,
        isVisible: true,
        paragraphs: [
            'Napoli e sempre piu protagonista delle produzioni cinematografiche e gli addetti ai lavori partenopei si distaccano per talento. Tuttavia, la citta non sembra essere il polo creativo che i dati dimostrano.',
            'Organizzare proiezioni a Napoli, oltre a valorizzare luoghi della citta poco sfruttati, e l\'occasione per creare un evento culturale, riunendo persone di diverse eta e background in un ambiente informale e accogliente. I film diventeranno un punto di partenza per discussioni e nuove amicizie, ma anche un modo per guardare, e soprattutto vivere, i luoghi della nostra citta in maniera sempre diversa.',
        ],
    },
    {
        id: 'community',
        title: 'COMMUNITY',
        order: 30,
        isVisible: true,
        paragraphs: [
            'Il nostro progetto e rivolto principalmente ai giovani napoletani. L\'idea e quella di creare uno spazio culturale vibrante, dove i ragazzi possano vivere in maniera nuova il parco e sviluppare nuove idee. Con le proiezioni, intendiamo stimolare la creativita, il dialogo, fortificando il legame tra i giovani e la citta, raccogliendo e ispirando le nuove generazioni.',
        ],
    },
];

export function getAboutSections() {
    return getVisibleItems(aboutSections);
}
