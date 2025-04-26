'use client';

import { useEffect, useState } from 'react';

const themes = ['theme-pastel', 'theme-mint', 'theme-neon'];

export default function ThemeSwitcher() {
    const [themeIndex, setThemeIndex] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved && themes.includes(saved)) {
            setThemeIndex(themes.indexOf(saved));
            document.body.dataset.theme = saved;
        } else {
            document.body.dataset.theme = themes[0];
        }
    }, []);

    const switchTheme = () => {
        const nextIndex = (themeIndex + 1) % themes.length;
        const nextTheme = themes[nextIndex];
        setThemeIndex(nextIndex);
        document.body.dataset.theme = nextTheme;
        localStorage.setItem('theme', nextTheme);
    };

    return (
        <button onClick={switchTheme} className="theme-switcher-btn">
            Cambia Tema
        </button>
    );
}
