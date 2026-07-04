'use client';

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';

export default function ShopPosterStack({ items = [], targetCount = 18 }) {
    const [activeId, setActiveId] = useState(null);
    const lockedUntilRef = useRef(0);
    const displayItems = useMemo(() => {
        if (!items.length) {
            return [];
        }

        return Array.from({ length: Math.max(items.length, targetCount) }, (_, index) => {
            const item = items[index % items.length];

            return {
                ...item,
                renderId: `${item.id}-${index}`,
            };
        });
    }, [items, targetCount]);

    function activateItem(nextId) {
        const now = Date.now();

        if (nextId === activeId || now < lockedUntilRef.current) {
            return;
        }

        lockedUntilRef.current = now + 320;
        setActiveId(nextId);
    }

    const orderedItems = useMemo(() => {
        if (!activeId || !displayItems.some((item) => item.renderId === activeId)) {
            return displayItems;
        }

        const inactiveItems = displayItems.filter((item) => item.renderId !== activeId);
        const activeItem = displayItems.find((item) => item.renderId === activeId);
        return [...inactiveItems, activeItem];
    }, [activeId, displayItems]);

    return (
        <div
            className="shop-poster-stack"
            style={{ '--stack-count': orderedItems.length }}
            onMouseLeave={() => setActiveId(null)}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setActiveId(null);
                }
            }}
        >
            {orderedItems.map((item, index) => {
                const isActive = item.renderId === activeId;
                const stackRatio = orderedItems.length > 1 ? index / (orderedItems.length - 1) : 0;

                return (
                    <button
                        key={item.renderId}
                        type="button"
                        className={`shop-poster-stack-item ${isActive ? 'is-active' : ''}`}
                        style={{
                            '--stack-index': index,
                            '--stack-ratio': stackRatio,
                            '--stack-z': index + 1,
                        }}
                        onMouseEnter={() => activateItem(item.renderId)}
                        onFocus={() => activateItem(item.renderId)}
                    >
                        <Image
                            src={item.src}
                            alt={item.alt}
                            width={item.width}
                            height={item.height}
                            className="shop-poster-stack-image"
                        />
                    </button>
                );
            })}
        </div>
    );
}
