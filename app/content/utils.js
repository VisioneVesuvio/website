export function getVisibleItems(items = []) {
    return [...items]
        .filter((item) => item?.isVisible !== false)
        .sort((left, right) => (left?.order ?? 0) - (right?.order ?? 0));
}

export function findFirstVisibleItem(items = []) {
    return getVisibleItems(items)[0] ?? null;
}
