const dayMonthFormatter = new Intl.DateTimeFormat('it-IT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
});

export function slugify(value) {
    return String(value ?? '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export function titleCase(value) {
    return String(value ?? '')
        .toLocaleLowerCase('it-IT')
        .replace(/(^|\s|\(|\/)([a-zàèéìòù])/g, (match) => match.toLocaleUpperCase('it-IT'));
}

export function formatProgramDate(date) {
    if (!date) {
        return '';
    }

    return dayMonthFormatter.format(new Date(date)).toLocaleUpperCase('it-IT');
}

export function parseItalianShortDate(dateLabel) {
    const match = String(dateLabel ?? '').match(/(\d{2})\/(\d{2})\/(\d{2})/);

    if (!match) {
        return null;
    }

    const [, day, month, year] = match;
    return new Date(Number(`20${year}`), Number(month) - 1, Number(day));
}

export function formatTimeLabel(startTime) {
    return startTime ? `ORE ${startTime}` : '';
}

export function normalizeVenue(venue) {
    if (!venue) {
        return '';
    }

    if (venue.toLowerCase() === 'to be defined.') {
        return 'LUOGO DA DEFINIRE';
    }

    return venue.toLocaleUpperCase('it-IT');
}
