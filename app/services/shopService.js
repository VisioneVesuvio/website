import { homePageContent } from '@/app/content/home';
import { connectToDatabase } from '@/app/lib/mongodb';
import ShopShowcase from '@/app/models/ShopShowcase';

const SHOP_KEY = 'home-shop';
const DEFAULT_ITEMS = homePageContent.shopShowcase.items;

function normalizeShopItems(items = []) {
    return items
        .filter((item) => item?.src)
        .map((item, index) => ({
            id: item.id ?? `shop-image-${index}`,
            src: item.src,
            alt: item.alt || `Shop poster ${index + 1}`,
            width: Number(item.width) || 480,
            height: Number(item.height) || 720,
        }));
}

export function repeatShopItems(items, targetCount = 18) {
    if (!items?.length) {
        return [];
    }

    return Array.from({ length: Math.max(items.length, targetCount) }, (_, index) => {
        const item = items[index % items.length];
        return {
            ...item,
            id: `${item.id}-${index}`,
        };
    });
}

export async function getHomeShopItems() {
    if (!process.env.MONGODB_URI) {
        return DEFAULT_ITEMS;
    }

    try {
        await connectToDatabase();
        const showcase = await ShopShowcase.findOne({ key: SHOP_KEY }).lean();
        const items = normalizeShopItems(showcase?.items);
        return items.length ? items : DEFAULT_ITEMS;
    } catch (error) {
        console.error('Cannot load shop showcase:', error);
        return DEFAULT_ITEMS;
    }
}

export async function getAdminShopItems() {
    await connectToDatabase();
    const showcase = await ShopShowcase.findOne({ key: SHOP_KEY }).lean();
    return { items: normalizeShopItems(showcase?.items) };
}

export async function updateAdminShopItems(items) {
    await connectToDatabase();
    const normalizedItems = normalizeShopItems(items);
    const showcase = await ShopShowcase.findOneAndUpdate(
        { key: SHOP_KEY },
        { key: SHOP_KEY, items: normalizedItems },
        { new: true, upsert: true },
    ).lean();

    return { items: normalizeShopItems(showcase.items) };
}
