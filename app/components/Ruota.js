'use client';

import { useState, useEffect } from 'react';
import '@/app/styles/ruota.css';

/**
 * RuotaWidget
 * Componente a ruota interattiva con pulsanti circolari che ruotano.
 */
export default function RuotaWidget({
                                        menuItems = [],
                                        selectedCategory = '',
                                        centerContent = null,
                                        onSelect = () => {},
                                    }) {
    const initialIndex = menuItems.findIndex(item => item.value === selectedCategory);
    const [selectedIndex, setSelectedIndex] = useState(initialIndex >= 0 ? initialIndex : 0);

    useEffect(() => {
        const newIndex = menuItems.findIndex(item => item.value === selectedCategory);
        if (newIndex >= 0 && newIndex !== selectedIndex) {
            setSelectedIndex(newIndex);
        }
    }, [selectedCategory, menuItems]);

    const angleStep = 360 / (menuItems.length || 1);
    const radius = 45; // raggio percentuale

    const wrapperStyle = {
        transform: `rotate(${-angleStep * selectedIndex}deg)`,
    };

    const getButtonStyle = (index) => {
        const angle = ((angleStep * index) - 90) * (Math.PI / 180); // -90 = parte dall'alto
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        return {
            left: `${x}%`,
            top: `${y}%`,
            transform: `translate(-50%, -50%) rotate(${angleStep * selectedIndex}deg)`,
        };
    };

    return (
        <div className="ruota-container">
            <div className="ruota-wrapper" style={wrapperStyle}>
                {menuItems.map((item, i) => (
                    <button
                        key={item.value ?? i}
                        className={`ruota-button ${i === selectedIndex ? 'active' : ''}`}
                        style={getButtonStyle(i)}
                        onClick={() => {
                            setSelectedIndex(i);
                            onSelect(item, i);
                        }}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="ruota-center">
                {centerContent ?? 'SCHERMO'}
            </div>
        </div>
    );
}
