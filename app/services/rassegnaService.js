import { connectToDatabase } from '@/app/lib/mongodb';
import Rassegna from '@/app/models/Rassegna';
import { getCurrentRassegne as getStaticCurrent, getPastRassegne as getStaticPast } from '@/app/content/rassegne';

function normalizeDate(dateValue, endOfDay = false) {
    if (!dateValue) {
        return null;
    }

    return new Date(`${dateValue}T${endOfDay ? '23:59:59' : '00:00:00'}`);
}

function dateInputValue(date) {
    if (!date) {
        return '';
    }

    const value = new Date(date);
    return [
        value.getFullYear(),
        String(value.getMonth() + 1).padStart(2, '0'),
        String(value.getDate()).padStart(2, '0'),
    ].join('-');
}

function serializeRassegna(rassegna) {
    const data = rassegna.toObject ? rassegna.toObject() : rassegna;
    const films = (data.films ?? []).filter(Boolean);

    return {
        id: data._id?.toString?.() ?? data.id,
        title: data.title,
        subtitle: data.subtitle ?? '',
        description: data.description ?? '',
        tags: data.tags ?? [],
        venue: data.venue ?? '',
        ticketUrl: data.ticketUrl ?? '',
        startDate: dateInputValue(data.startDate),
        endDate: dateInputValue(data.endDate),
        images: (data.images?.length ? data.images : [data.poster]).filter(Boolean).map((image, index) => ({
            id: `${data._id ?? data.id}-image-${index}`,
            src: image.src,
            alt: image.alt || data.title,
            width: image.width ?? 1200,
            height: image.height ?? 800,
        })),
        films: films.map((film) => ({
            id: film._id?.toString?.() ?? film.id,
            title: film.title,
        })),
        filmIds: films.map((film) => film._id?.toString?.() ?? film.id),
        lineup: films.map((film) => film.title).join(' - '),
        isVisible: data.isVisible !== false,
        order: data.order ?? 0,
        status: data.endDate && new Date(data.endDate) < new Date() ? 'past' : 'current',
    };
}

function staticSeasonToRassegna(season) {
    return {
        ...season,
        images: season.images ?? [season.poster],
        filmIds: [],
        films: [],
        startDate: '',
        endDate: '',
    };
}

export async function getRassegneForPublic() {
    if (!process.env.MONGODB_URI) {
        return {
            current: getStaticCurrent().map(staticSeasonToRassegna),
            past: getStaticPast().map(staticSeasonToRassegna),
        };
    }

    try {
        await connectToDatabase();
        const rassegne = await Rassegna.find({ isVisible: true })
            .populate('films')
            .sort({ startDate: -1, order: 1 })
            .lean();

        if (!rassegne.length) {
            return {
                current: getStaticCurrent().map(staticSeasonToRassegna),
                past: getStaticPast().map(staticSeasonToRassegna),
            };
        }

        const now = new Date();
        const serialized = rassegne.map(serializeRassegna);

        return {
            current: serialized.filter((item) => new Date(`${item.startDate}T00:00:00`) <= now && new Date(`${item.endDate}T23:59:59`) >= now),
            past: serialized.filter((item) => new Date(`${item.endDate}T23:59:59`) < now),
        };
    } catch (error) {
        console.error('Cannot load rassegne from database:', error);
        return {
            current: getStaticCurrent().map(staticSeasonToRassegna),
            past: getStaticPast().map(staticSeasonToRassegna),
        };
    }
}

export async function getHomeRassegna() {
    const { current } = await getRassegneForPublic();
    return current[0] ?? null;
}

export async function listAdminRassegne() {
    await connectToDatabase();
    const rassegne = await Rassegna.find({}).populate('films').sort({ startDate: -1, order: 1 }).lean();
    return rassegne.map(serializeRassegna);
}

export async function createAdminRassegna(payload) {
    await connectToDatabase();
    const rassegna = await Rassegna.create({
        title: payload.title,
        subtitle: payload.subtitle ?? '',
        description: payload.description ?? '',
        tags: String(payload.tags ?? '').split(',').map((tag) => tag.trim()).filter(Boolean),
        venue: payload.venue ?? '',
        ticketUrl: payload.ticketUrl ?? '',
        startDate: normalizeDate(payload.startDate),
        endDate: normalizeDate(payload.endDate, true),
        images: (payload.images ?? []).filter((image) => image.src),
        films: payload.filmIds ?? [],
        isVisible: payload.isVisible !== false,
        order: Number(payload.order) || 0,
    });

    return serializeRassegna(await rassegna.populate('films'));
}

export async function updateAdminRassegna(id, payload) {
    await connectToDatabase();
    const rassegna = await Rassegna.findByIdAndUpdate(id, {
        title: payload.title,
        subtitle: payload.subtitle ?? '',
        description: payload.description ?? '',
        tags: String(payload.tags ?? '').split(',').map((tag) => tag.trim()).filter(Boolean),
        venue: payload.venue ?? '',
        ticketUrl: payload.ticketUrl ?? '',
        startDate: normalizeDate(payload.startDate),
        endDate: normalizeDate(payload.endDate, true),
        images: (payload.images ?? []).filter((image) => image.src),
        films: payload.filmIds ?? [],
        isVisible: payload.isVisible !== false,
        order: Number(payload.order) || 0,
    }, { new: true, runValidators: true }).populate('films');

    return rassegna ? serializeRassegna(rassegna) : null;
}

export async function deleteAdminRassegna(id) {
    await connectToDatabase();
    await Rassegna.findByIdAndDelete(id);
}
