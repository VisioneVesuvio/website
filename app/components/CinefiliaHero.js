'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

const HERO_TEXT = 'CINEFILIA PARTENOPEA';
const LETTER_WIDTHS = {
    I: 0.28,
    L: 0.44,
    T: 0.54,
    F: 0.52,
    E: 0.54,
    A: 0.58,
    C: 0.62,
    O: 0.62,
    P: 0.58,
    R: 0.62,
    N: 0.64,
};
const LETTER_LENGTHS = {
    I: 46,
    L: 70,
    T: 78,
    F: 76,
    E: 78,
    A: 82,
    C: 82,
    O: 82,
    P: 80,
    R: 82,
    N: 82,
};

function HeroGlyph({ letter, textLength, isSpace, verticalAnchor }) {
    const [viewBox, setViewBox] = useState('0 0 100 100');

    useEffect(() => {
        if (isSpace) {
            return;
        }

        function updateMeasuredViewBox() {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            if (!context) {
                return;
            }

            context.font = "400 96px 'Arial Narrow', 'Helvetica Neue Condensed', 'Roboto Condensed', sans-serif";

            const metrics = context.measureText(letter);
            const ascent = metrics.actualBoundingBoxAscent || 76;
            const descent = metrics.actualBoundingBoxDescent || 0;
            const padTop = 0.35;
            const padBottom = 1.2;
            const y = 50 - ascent - padTop;
            const height = ascent + descent + padTop + padBottom;

            setViewBox(`0 ${Number(y.toFixed(2))} 100 ${Number(height.toFixed(2))}`);
        }

        updateMeasuredViewBox();
        document.fonts?.ready?.then(updateMeasuredViewBox);
    }, [isSpace, letter, textLength]);

    return (
        <svg
            className={`cinefilia-hero-glyph cinefilia-hero-glyph-${verticalAnchor}`}
            viewBox={viewBox}
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
        >
            <text x="50" y="50" textLength={textLength} lengthAdjust="spacingAndGlyphs">
                {isSpace ? '\u00a0' : letter}
            </text>
        </svg>
    );
}

export default function CinefiliaHero() {
    const heroRef = useRef(null);
    const wordRef = useRef(null);
    const mobileTopRef = useRef(null);
    const mobileBottomRef = useRef(null);
    const snapLockRef = useRef(false);
    const touchStartYRef = useRef(null);
    const mobileResetRef = useRef(null);
    const mobileRippleFrameRef = useRef(null);
    const letters = useMemo(
        () => Array.from(HERO_TEXT),
        [],
    );

    useEffect(() => {
        function fitElement(container, word) {
            if (!container || !word) {
                return;
            }

            word.style.setProperty('--hero-fit-x', '1');
            const availableWidth = container.clientWidth;
            const naturalWidth = word.scrollWidth;

            if (!availableWidth || !naturalWidth) {
                return;
            }

            word.style.setProperty('--hero-fit-x', (availableWidth / naturalWidth).toFixed(4));
        }

        function fitWord() {
            const hero = heroRef.current;
            const word = wordRef.current;

            fitElement(hero, word);
            fitElement(hero, mobileTopRef.current);
            fitElement(hero, mobileBottomRef.current);
        }

        fitWord();

        const resizeObserver = new ResizeObserver(fitWord);

        if (heroRef.current) {
            resizeObserver.observe(heroRef.current);
        }

        window.addEventListener('resize', fitWord);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', fitWord);
        };
    }, []);

    useEffect(() => () => {
        window.cancelAnimationFrame(mobileRippleFrameRef.current);
        window.clearTimeout(mobileResetRef.current);
    }, []);

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function scrollToNextSection() {
        const hero = heroRef.current;
        const nextSection = hero?.nextElementSibling;

        if (!hero || !nextSection || snapLockRef.current) {
            return;
        }

        const heroRect = hero.getBoundingClientRect();

        if (heroRect.bottom <= window.innerHeight * 0.4) {
            return;
        }

        snapLockRef.current = true;
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        window.setTimeout(() => {
            snapLockRef.current = false;
        }, 900);
    }

    function handleHeroWheel(event) {
        if (event.deltaY <= 4) {
            return;
        }

        event.preventDefault();
        scrollToNextSection();
    }

    function applyMobileHarmonicTouch(clientX, clientY) {
        const hero = heroRef.current;

        if (!hero || window.matchMedia('(min-width: 481px)').matches) {
            return;
        }

        const topPairs = Array.from(mobileTopRef.current?.querySelectorAll('.cinefilia-hero-mobile-pair') ?? []);
        const bottomPairs = Array.from(mobileBottomRef.current?.querySelectorAll('.cinefilia-hero-mobile-pair') ?? []);
        const samples = [
            ...topPairs.map((pair) => ({ pair, direction: 1 })),
            ...bottomPairs.map((pair) => ({ pair, direction: -1 })),
        ].map(({ pair, direction }) => {
            const rect = pair.getBoundingClientRect();

            return {
                pair,
                direction,
                distance: Math.hypot(
                    rect.left + (rect.width / 2) - clientX,
                    (rect.top + (rect.height / 2) - clientY) * 0.22,
                ),
            };
        });

        const duration = 5400;
        const wavelength = Math.max(hero.clientWidth * 0.9, 320);
        const frontWidth = Math.max(hero.clientWidth * 1.2, 430);
        const speed = Math.max(hero.clientWidth * 0.41, 150);
        const amplitude = 80;
        const startTime = performance.now();

        window.cancelAnimationFrame(mobileRippleFrameRef.current);
        window.clearTimeout(mobileResetRef.current);

        function animateRipple(now) {
            const elapsed = now - startTime;
            const progress = clamp(elapsed / duration, 0, 1);
            const timeFade = Math.exp(-progress * 1.38);
            const attack = 1 - Math.exp(-elapsed / 180);
            const travelled = elapsed / 1000 * speed;

            samples.forEach(({ pair, direction, distance }) => {
                const frontDistance = distance - travelled;
                const frontFade = Math.exp(-Math.abs(frontDistance) / frontWidth);
                const wave = Math.sin((frontDistance / wavelength) * Math.PI * 2);
                const delta = wave * frontFade * timeFade * attack * amplitude;
                const height = clamp(92 + (delta * direction), 52, 100);

                pair.style.setProperty('--mobile-height', `${height.toFixed(2)}%`);
                pair.classList.add('is-mobile-morphed');
            });

            if (elapsed < duration) {
                mobileRippleFrameRef.current = window.requestAnimationFrame(animateRipple);
                return;
            }

            samples.forEach(({ pair, direction }, sampleIndex) => {
                const randomOffset = (Math.random() - 0.5) * 26;
                const harmonicOffset = Math.sin(sampleIndex * 1.72) * 10;
                const settledHeight = clamp(86 + ((randomOffset + harmonicOffset) * direction), 58, 100);

                pair.style.setProperty('--mobile-height', `${settledHeight.toFixed(2)}%`);
            });
        }

        mobileRippleFrameRef.current = window.requestAnimationFrame(animateRipple);
    }

    function handleTouchStart(event) {
        const touch = event.touches[0];

        touchStartYRef.current = touch?.clientY ?? null;

        if (touch) {
            applyMobileHarmonicTouch(touch.clientX, touch.clientY);
        }
    }

    function handleTouchMove(event) {
        touchStartYRef.current = touchStartYRef.current ?? event.touches[0]?.clientY ?? null;
    }

    function handleTouchEnd(event) {
        const startY = touchStartYRef.current;
        const endY = event.changedTouches[0]?.clientY;

        touchStartYRef.current = null;

        if (startY === null || endY === undefined || startY - endY <= 8) {
            return;
        }

        scrollToNextSection();
    }

    function morphPair(event) {
        const pair = event.currentTarget;

        if (pair.dataset.space === 'true') {
            return;
        }

        const rect = pair.getBoundingClientRect();
        const split = clamp((event.clientY - rect.top) / rect.height, 0.08, 0.92);
        const topShare = split;
        const bottomShare = 1 - split;

        pair.style.setProperty('--top-size', `${(topShare * 100).toFixed(2)}%`);
        pair.style.setProperty('--bottom-size', `${(bottomShare * 100).toFixed(2)}%`);
        pair.classList.add('is-morphed');
    }

    function renderGlyphWord(text, className, ref) {
        return (
            <span ref={ref} className={className}>
                {Array.from(text).map((letter, letterIndex) => {
                    const width = LETTER_WIDTHS[letter] ?? 0.58;
                    const textLength = LETTER_LENGTHS[letter] ?? 66;

                    return (
                        <span
                            key={`${text}-${letter}-${letterIndex}`}
                            className="cinefilia-hero-pair cinefilia-hero-mobile-pair"
                            style={{ '--letter-width': width }}
                        >
                            <span className="cinefilia-hero-half cinefilia-hero-mobile-half">
                                <HeroGlyph
                                    letter={letter}
                                    textLength={textLength}
                                    isSpace={false}
                                    verticalAnchor="mobile"
                                />
                            </span>
                        </span>
                    );
                })}
            </span>
        );
    }

    return (
        <section
            ref={heroRef}
            className="cinefilia-hero"
            aria-label="Cinefilia Partenopea"
            onWheel={handleHeroWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <h1 className="cinefilia-hero-title">
                <span ref={wordRef} className="cinefilia-hero-word">
                    {letters.map((letter, letterIndex) => {
                        const isSpace = letter === ' ';
                        const wordIndex = letterIndex > HERO_TEXT.indexOf(' ') ? 1 : 0;
                        const width = isSpace ? 0.16 : LETTER_WIDTHS[letter] ?? 0.58;
                        const textLength = LETTER_LENGTHS[letter] ?? 66;

                        return (
                            <span
                                key={`${letter}-${letterIndex}`}
                                className={`cinefilia-hero-pair cinefilia-hero-pair-word-${wordIndex} ${isSpace ? 'cinefilia-hero-pair-space' : ''}`}
                                data-space={isSpace}
                                style={{ '--letter-width': width }}
                                onPointerEnter={morphPair}
                                onPointerMove={morphPair}
                            >
                                <span className="cinefilia-hero-half cinefilia-hero-half-top">
                                    <HeroGlyph
                                        letter={letter}
                                        textLength={textLength}
                                        isSpace={isSpace}
                                        verticalAnchor="top"
                                    />
                                </span>
                                <span className="cinefilia-hero-half cinefilia-hero-half-bottom">
                                    <HeroGlyph
                                        letter={letter}
                                        textLength={textLength}
                                        isSpace={isSpace}
                                        verticalAnchor="bottom"
                                    />
                                </span>
                            </span>
                        );
                    })}
                </span>
            </h1>
            <div className="cinefilia-hero-mobile-words" aria-hidden="true">
                {renderGlyphWord('CINEFILIA', 'cinefilia-hero-mobile-word cinefilia-hero-mobile-word-top', mobileTopRef)}
                {renderGlyphWord('PARTENOPEA', 'cinefilia-hero-mobile-word cinefilia-hero-mobile-word-bottom', mobileBottomRef)}
            </div>
            <div className="home-display-board-mobile-links">
                <Link href="/programmazione" className="home-display-board-mobile-link">
                    Programmazione
                </Link>
                <Link href="/store" className="home-display-board-mobile-link">
                    Shop
                </Link>
            </div>
        </section>
    );
}
