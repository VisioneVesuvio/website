import { getVisibleItems } from '@/app/content/utils';
import { siteContact, socialLinks } from '@/app/content/site';
import { homePageContent } from '@/app/content/home';

export const contactPageContent = {
    title: 'Contatti',
    intro: 'Visione Vesuvio vive tra programmazione, collaborazioni e comunita. Per proposte, partnership o informazioni, scrivici qui.',
    sliderAriaLabel: 'Momenti Visione Vesuvio',
    sliderItems: homePageContent.horizontalSlider.items,
    logo: {
        src: '/logo_visione_vesuvio.png',
        alt: 'Logo Associazione Visione Vesuvio',
        width: 420,
        height: 94,
    },
};

export const contactBlocks = [
    {
        id: 'associazione',
        type: 'association',
        title: 'Associazione',
        order: 10,
        isVisible: true,
        pIva: '10621671212',
    },
    {
        id: 'email',
        type: 'email',
        title: 'Email',
        order: 20,
        isVisible: true,
        value: siteContact.email,
    },
];

export function getContactBlocks() {
    return getVisibleItems(contactBlocks);
}

export function getContactSocialLinks() {
    return getVisibleItems(socialLinks);
}
