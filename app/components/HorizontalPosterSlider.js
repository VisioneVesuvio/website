'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef } from 'react';

export default function HorizontalPosterSlider({
    items = [],
    ariaLabel,
    className = '',
    repeatCount = 3,
}) {
    const sliderRef = useRef(null);
    const isWrappingRef = useRef(false);
    const repeatedItems = useMemo(
        () => Array.from({ length: repeatCount }, (_, repeatIndex) =>
            items.map((item) => ({ ...item, renderKey: `${item.id}-${repeatIndex}` })),
        ).flat(),
        [items, repeatCount],
    );

    const getLoopWidth = useCallback(() => {
        const slider = sliderRef.current;

        if (!slider || repeatCount < 2 || !items.length) {
            return 0;
        }

        const firstItem = slider.querySelector('.home-horizontal-slider-item');
        const firstRepeatedItem = slider.querySelectorAll('.home-horizontal-slider-item')[items.length];

        if (!firstItem || !firstRepeatedItem) {
            return 0;
        }

        return firstRepeatedItem.offsetLeft - firstItem.offsetLeft;
    }, [items.length, repeatCount]);

    useEffect(() => {
        const slider = sliderRef.current;
        const loopWidth = getLoopWidth();

        if (!slider || !loopWidth) {
            return;
        }

        slider.scrollLeft = loopWidth;
    }, [getLoopWidth, repeatedItems.length]);

    function handleScroll() {
        const slider = sliderRef.current;
        const loopWidth = getLoopWidth();

        if (!slider || !loopWidth || isWrappingRef.current) {
            return;
        }

        if (slider.scrollLeft < loopWidth * 0.5) {
            isWrappingRef.current = true;
            slider.scrollLeft += loopWidth;
            requestAnimationFrame(() => {
                isWrappingRef.current = false;
            });
        }

        if (slider.scrollLeft > loopWidth * 1.5) {
            isWrappingRef.current = true;
            slider.scrollLeft -= loopWidth;
            requestAnimationFrame(() => {
                isWrappingRef.current = false;
            });
        }
    }

    return (
        <div
            ref={sliderRef}
            className={`home-horizontal-slider ${className}`.trim()}
            aria-label={ariaLabel}
            onScroll={handleScroll}
        >
            <div className="home-horizontal-slider-track">
                {repeatedItems.map((item) => (
                    <div key={item.renderKey} className="home-horizontal-slider-item">
                        <Image
                            src={item.src}
                            alt={item.alt}
                            width={item.width}
                            height={item.height}
                            className="home-horizontal-slider-image"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
