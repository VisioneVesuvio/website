import { getVisibleItems } from '@/app/content/utils';

export const navigationItems = [
    { id: 'rassegne', label: 'Rassegne', href: '/rassegne', order: 10, isVisible: true, isPrimaryHeaderItem: true },
    { id: 'about', label: 'Chi siamo', href: '/about', order: 20, isVisible: true, isPrimaryHeaderItem: true },
    { id: 'calendario', label: 'Programmazione', href: '/programmazione', order: 30, isVisible: true, isPrimaryHeaderItem: true },
    { id: 'store', label: 'Shop', href: '/store', order: 40, isVisible: true, isPrimaryHeaderItem: true },
    { id: 'contatti', label: 'Contatti', href: '/contatti', order: 50, isVisible: true, isPrimaryHeaderItem: false },
];

export const headerMarqueeItems = [
    'Mubi Fest',
    'Napoli',
    '03.07.26 - 05.07.26',
];

export const siteContact = {
    email: 'associazione.visionevesuvio@gmail.com',
};

export const socialLinks = [
    {
        id: 'x',
        platform: 'twitter',
        label: 'Seguici su X (ex Twitter)',
        href: 'https://x.com/chucknorris',
        order: 10,
        isVisible: true,
    },
    {
        id: 'facebook',
        platform: 'facebook',
        label: 'Seguici su Facebook',
        href: 'https://www.facebook.com/profile.php?id=61563987746027',
        order: 20,
        isVisible: true,
    },
    {
        id: 'instagram',
        platform: 'instagram',
        label: 'Seguici su Instagram',
        href: 'https://www.instagram.com/visionevesuvio/',
        order: 30,
        isVisible: true,
    },
];

export function getNavigationItems() {
    return getVisibleItems(navigationItems);
}

export function getSocialLinks() {
    return getVisibleItems(socialLinks);
}
