import { connectToDatabase } from '@/app/lib/mongodb';
import SiteBanner from '@/app/models/SiteBanner';
import { headerMarqueeItems } from '@/app/content/site';

const HEADER_KEY = 'header-marquee';

export async function getHeaderMarqueeItems() {
    if (!process.env.MONGODB_URI) {
        return headerMarqueeItems;
    }

    try {
        await connectToDatabase();
        const banner = await SiteBanner.findOne({ key: HEADER_KEY }).lean();
        return banner?.items?.length ? banner.items : headerMarqueeItems;
    } catch (error) {
        console.error('Cannot load site banner:', error);
        return headerMarqueeItems;
    }
}

export async function getAdminHeaderMarquee() {
    await connectToDatabase();
    const banner = await SiteBanner.findOne({ key: HEADER_KEY }).lean();
    return { items: banner?.items?.length ? banner.items : headerMarqueeItems };
}

export async function updateAdminHeaderMarquee(items) {
    await connectToDatabase();
    const cleanItems = (items ?? []).map((item) => String(item).trim()).filter(Boolean);
    const banner = await SiteBanner.findOneAndUpdate(
        { key: HEADER_KEY },
        { key: HEADER_KEY, items: cleanItems },
        { new: true, upsert: true },
    ).lean();

    return { items: banner.items };
}
