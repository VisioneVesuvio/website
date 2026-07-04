import fs from 'fs/promises';
import path from 'path';

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

async function walkImages(directory, publicPrefix = '') {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    const files = await Promise.all(entries.map(async (entry) => {
        const absolutePath = path.join(directory, entry.name);
        const publicPath = `${publicPrefix}/${entry.name}`.replaceAll('\\', '/');

        if (entry.isDirectory()) {
            return walkImages(absolutePath, publicPath);
        }

        if (IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
            return [publicPath];
        }

        return [];
    }));

    return files.flat();
}

export async function listPublicImages() {
    const publicDirectory = path.join(process.cwd(), 'public');
    return walkImages(publicDirectory);
}
