'use client';

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';

export default function ShopPosterStack({ items = [] }) {
    const [activeId, setActiveId] = useState(null);
    const lockedUntilRef = useRef(0);

    function activateItem(nextId) {
        const now = Date.now();

        if (nextId === activeId || now < lockedUntilRef.current) {
            return;
        }

        lockedUntilRef.current = now + 320;
        setActiveId(nextId);
    }

    const orderedItems = useMemo(() => {
        if (!activeId || !items.some((item) => item.id === activeId)) {
            return items;
        }

        const inactiveItems = items.filter((item) => item.id !== activeId);
        const activeItem = items.find((item) => item.id === activeId);
        return [...inactiveItems, activeItem];
    }, [activeId, items]);

    return (
        <div
            className="shop-poster-stack"
            onMouseLeave={() => setActiveId(null)}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setActiveId(null);
                }
            }}
        >
            {orderedItems.map((item, index) => {
                const isActive = item.id === activeId;

                return (
                    <button
                        key={item.id}
                        type="button"
                        className={`shop-poster-stack-item ${isActive ? 'is-active' : ''}`}
                        style={{
                            '--stack-index': index,
                            '--stack-z': index + 1,
                        }}
                        onMouseEnter={() => activateItem(item.id)}
                        onFocus={() => activateItem(item.id)}
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
