import { connectToDatabase } from '@/app/lib/mongodb';
import Film from '@/app/models/Film';
import ProgramEvent from '@/app/models/ProgramEvent';
import { programEvents as staticProgramEvents } from '@/app/content/program';
import { formatProgramDate, formatTimeLabel, normalizeVenue, parseItalianShortDate, slugify, titleCase } from '@/app/services/formatters';

function serializeFilmDocument(film) {
    const data = film.toObject ? film.toObject() : film;

    return {
        id: data._id?.toString?.() ?? data.id,
        title: data.title,
        slug: data.slug,
        director: data.director,
        categories: data.categories ?? [],
        duration: data.duration ?? '',
        year: data.year ?? '',
        country: data.country ?? '',
        language: data.language ?? '',
        description: data.description ?? '',
        ticketUrl: data.ticketUrl ?? '',
        poster: {
            src: data.poster?.src ?? '',
            alt: data.poster?.alt ?? `Locandina ${data.title}`,
            width: data.poster?.width ?? 1200,
            height: data.poster?.height ?? 1800,
        },
    };
}

function serializeEventDocument(event) {
    const data = event.toObject ? event.toObject() : event;
    const film = serializeFilmDocument(data.film);
    const eventDate = data.date ? new Date(data.date) : null;

    return {
        id: data._id?.toString?.() ?? data.id,
        filmId: film.id,
        slug: film.slug,
        date: formatProgramDate(eventDate),
        dateValue: eventDate ? [
            eventDate.getFullYear(),
            String(eventDate.getMonth() + 1).padStart(2, '0'),
            String(eventDate.getDate()).padStart(2, '0'),
        ].join('-') : '',
        timeLabel: formatTimeLabel(data.startTime),
        startTime: data.startTime,
        voiceLabel: data.voiceLabel ?? '',
        guestLabel: data.guestLabel ?? '',
        isVisible: data.isVisible !== false,
        isFeaturedOnHome: data.isFeaturedOnHome !== false,
        order: data.order ?? 0,
        title: titleCase(film.title),
        originalTitle: '',
        director: film.director,
        venue: normalizeVenue(data.venue),
        venueValue: data.venue,
        ticketUrl: film.ticketUrl,
        categories: film.categories,
        hero: {
            src: film.poster.src,
            alt: film.poster.alt,
            width: film.poster.width,
            height: film.poster.height,
        },
        description: film.description,
        details: [
            { label: 'Durata', value: film.duration },
            { label: 'Anno', value: film.year },
            { label: 'Paese', value: film.country },
            { label: 'Lingua', value: film.language },
        ].filter((detail) => detail.value),
    };
}

function normalizeAdminDate(dateValue) {
    return dateValue ? new Date(`${dateValue}T12:00:00`) : null;
}

function getEventDateTime(dateValue, startTime = '00:00') {
    const date = dateValue ? new Date(dateValue) : null;

    if (!date || Number.isNaN(date.getTime())) {
        return null;
    }

    const [hours = '0', minutes = '0'] = String(startTime).split(':');
    date.setHours(Number(hours), Number(minutes), 0, 0);
    return date;
}

function isFutureEvent(event, now = new Date()) {
    const eventDateTime = getEventDateTime(event.date, event.startTime);
    return eventDateTime ? eventDateTime >= now : false;
}

function staticEventToFilm(event) {
    return {
        id: event.id,
        title: titleCase(event.title),
        slug: event.slug,
        director: event.directors.join(', '),
        categories: event.categories ?? [],
        duration: event.duration ?? '',
        year: event.year ?? '',
        country: event.country ?? '',
        language: event.language ?? '',
        description: event.description,
        ticketUrl: event.ticketUrl,
        poster: {
            src: event.poster.src,
            alt: event.poster.alt,
            width: 1200,
            height: 1800,
        },
    };
}

function staticEventToFeatured(event) {
    const film = staticEventToFilm(event);
    const parsedDate = parseItalianShortDate(event.fullDateLabel);
    const timeMatch = event.startTime?.match(/(\d{1,2}:\d{2})/);

    return {
        id: event.id,
        filmId: event.id,
        slug: film.slug,
        date: parsedDate ? formatProgramDate(parsedDate) : event.fullDateLabel,
        dateValue: parsedDate ? parsedDate.toISOString().slice(0, 10) : '',
        timeLabel: timeMatch ? `ORE ${timeMatch[1]}` : event.startTime,
        startTime: timeMatch?.[1] ?? '',
        voiceLabel: event.voiceLabel ?? 'V.O.S.',
        guestLabel: event.guestLabel ?? 'REGISTA IN SALA',
        title: film.title,
        originalTitle: event.originalTitle ?? '',
        director: film.director,
        venue: normalizeVenue(event.venue),
        venueValue: event.venue,
        ticketUrl: film.ticketUrl,
        categories: film.categories,
        hero: film.poster,
        description: film.description,
        details: [
            { label: 'Durata', value: film.duration },
            { label: 'Anno', value: film.year },
            { label: 'Paese', value: film.country },
            { label: 'Lingua', value: film.language },
        ].filter((detail) => detail.value),
    };
}

export function getStaticFeaturedProgramEvents() {
    return staticProgramEvents
        .filter((event) => event.isVisible && event.isFeaturedOnHome)
        .filter((event) => {
            const parsedDate = parseItalianShortDate(event.fullDateLabel);
            const timeMatch = event.startTime?.match(/(\d{1,2}:\d{2})/);
            return isFutureEvent({
                date: parsedDate,
                startTime: timeMatch?.[1] ?? '00:00',
            });
        })
        .sort((a, b) => a.order - b.order)
        .map(staticEventToFeatured);
}

export function getStaticFilmBySlug(slug) {
    const event = staticProgramEvents.find((item) => item.slug === slug);
    return event ? staticEventToFeatured(event) : null;
}

export async function getFeaturedProgramEvents() {
    if (!process.env.MONGODB_URI) {
        return getStaticFeaturedProgramEvents();
    }

    try {
        await connectToDatabase();
        const now = new Date();
        const startOfToday = new Date(now);
        startOfToday.setHours(0, 0, 0, 0);

        const events = await ProgramEvent.find({
            isVisible: true,
            isFeaturedOnHome: true,
            date: { $gte: startOfToday },
        })
            .populate('film')
            .sort({ date: 1, order: 1 })
            .lean();

        const hydratedEvents = events
            .filter((event) => event.film)
            .filter((event) => isFutureEvent(event, now))
            .map(serializeEventDocument);
        return hydratedEvents.length > 0 ? hydratedEvents : getStaticFeaturedProgramEvents();
    } catch (error) {
        console.error('Cannot load program events from database:', error);
        return getStaticFeaturedProgramEvents();
    }
}

export async function getFeaturedProgramEventBySlug(slug) {
    if (!process.env.MONGODB_URI) {
        return getStaticFilmBySlug(slug);
    }

    try {
        await connectToDatabase();
        const film = await Film.findOne({ slug }).lean();

        if (!film) {
            return getStaticFilmBySlug(slug);
        }

        const event = await ProgramEvent.findOne({ film: film._id, isVisible: true })
            .populate('film')
            .sort({ date: 1, order: 1 })
            .lean();

        if (event) {
            return serializeEventDocument(event);
        }

        const serializedFilm = serializeFilmDocument(film);
        return {
            ...serializedFilm,
            filmId: serializedFilm.id,
            hero: serializedFilm.poster,
            details: [
                { label: 'Durata', value: serializedFilm.duration },
                { label: 'Anno', value: serializedFilm.year },
                { label: 'Paese', value: serializedFilm.country },
                { label: 'Lingua', value: serializedFilm.language },
            ].filter((detail) => detail.value),
        };
    } catch (error) {
        console.error('Cannot load film from database:', error);
        return getStaticFilmBySlug(slug);
    }
}

export async function listAdminFilms() {
    await connectToDatabase();
    const films = await Film.find({}).sort({ title: 1 }).lean();
    return films.map(serializeFilmDocument);
}

export async function createAdminFilm(payload) {
    await connectToDatabase();
    const title = payload.title?.trim();
    const director = payload.director?.trim();
    const posterSrc = payload.posterSrc?.trim();

    if (!title || !director || !posterSrc) {
        throw new Error('Titolo, regista e immagine sono obbligatori');
    }

    const film = await Film.create({
        title,
        slug: payload.slug?.trim() || slugify(title),
        director,
        categories: String(payload.categories ?? '')
            .split(',')
            .map((category) => category.trim())
            .filter(Boolean),
        duration: payload.duration?.trim() ?? '',
        year: payload.year?.trim() ?? '',
        country: payload.country?.trim() ?? '',
        language: payload.language?.trim() ?? '',
        description: payload.description?.trim() ?? '',
        ticketUrl: payload.ticketUrl?.trim() ?? '',
        poster: {
            src: posterSrc,
            alt: payload.posterAlt?.trim() || `Locandina ${title}`,
            width: Number(payload.posterWidth) || 1200,
            height: Number(payload.posterHeight) || 1800,
        },
    });

    return serializeFilmDocument(film);
}

export async function updateAdminFilm(id, payload) {
    await connectToDatabase();
    const update = {
        title: payload.title?.trim(),
        slug: payload.slug?.trim() || slugify(payload.title),
        director: payload.director?.trim(),
        categories: String(payload.categories ?? '')
            .split(',')
            .map((category) => category.trim())
            .filter(Boolean),
        duration: payload.duration?.trim() ?? '',
        year: payload.year?.trim() ?? '',
        country: payload.country?.trim() ?? '',
        language: payload.language?.trim() ?? '',
        description: payload.description?.trim() ?? '',
        ticketUrl: payload.ticketUrl?.trim() ?? '',
        poster: {
            src: payload.posterSrc?.trim(),
            alt: payload.posterAlt?.trim() || `Locandina ${payload.title}`,
            width: Number(payload.posterWidth) || 1200,
            height: Number(payload.posterHeight) || 1800,
        },
    };

    const film = await Film.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    return film ? serializeFilmDocument(film) : null;
}

export async function deleteAdminFilm(id) {
    await connectToDatabase();
    await ProgramEvent.deleteMany({ film: id });
    await Film.findByIdAndDelete(id);
}

export async function listAdminProgramEvents() {
    await connectToDatabase();
    const events = await ProgramEvent.find({}).populate('film').sort({ date: 1, order: 1 }).lean();
    return events.filter((event) => event.film).map(serializeEventDocument);
}

export async function createAdminProgramEvent(payload) {
    await connectToDatabase();
    const event = await ProgramEvent.create({
        film: payload.filmId,
        date: normalizeAdminDate(payload.date),
        startTime: payload.startTime,
        venue: payload.venue,
        voiceLabel: payload.voiceLabel ?? '',
        guestLabel: payload.guestLabel ?? '',
        isVisible: payload.isVisible !== false,
        isFeaturedOnHome: payload.isFeaturedOnHome !== false,
        order: Number(payload.order) || 0,
    });

    const populated = await event.populate('film');
    return serializeEventDocument(populated);
}

export async function updateAdminProgramEvent(id, payload) {
    await connectToDatabase();
    const event = await ProgramEvent.findByIdAndUpdate(id, {
        film: payload.filmId,
        date: normalizeAdminDate(payload.date),
        startTime: payload.startTime,
        venue: payload.venue,
        voiceLabel: payload.voiceLabel ?? '',
        guestLabel: payload.guestLabel ?? '',
        isVisible: payload.isVisible !== false,
        isFeaturedOnHome: payload.isFeaturedOnHome !== false,
        order: Number(payload.order) || 0,
    }, { new: true, runValidators: true }).populate('film');

    return event ? serializeEventDocument(event) : null;
}

export async function deleteAdminProgramEvent(id) {
    await connectToDatabase();
    await ProgramEvent.findByIdAndDelete(id);
}

export async function createAdminProgramItem(payload) {
    const film = await createAdminFilm(payload);
    const event = await createAdminProgramEvent({
        ...payload,
        filmId: film.id,
    });

    return event;
}

export async function updateAdminProgramItem(id, payload) {
    await connectToDatabase();
    const existingEvent = await ProgramEvent.findById(id).lean();

    if (!existingEvent) {
        return null;
    }

    await updateAdminFilm(existingEvent.film.toString(), payload);
    return updateAdminProgramEvent(id, {
        ...payload,
        filmId: existingEvent.film.toString(),
    });
}
