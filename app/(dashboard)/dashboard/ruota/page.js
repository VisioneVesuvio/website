'use client';

import { useState } from 'react';
import RuotaWidget from '@/app/components/Ruota';

const menuItems = [
    { label: 'Chat', value: 'chat' },
    { label: 'News', value: 'news' },
    { label: 'Eventi', value: 'eventi' },
    { label: 'AI', value: 'ai' },
    { label: '3D', value: 'stampa3d' },
    { label: 'Archivio', value: 'archivio' },
];

export default function RuotaPage() {
    const [selected, setSelected] = useState(menuItems[0]);

    return (
        <section className="dashboard-ruota-page" style={{ padding: '2rem', textAlign: 'center' }}>
            <h1 style={{ marginBottom: '2rem' }}>Navigazione Circolare</h1>

            <RuotaWidget
                menuItems={menuItems}
                selectedCategory={selected.value}
                onSelect={(item) => setSelected(item)}
                centerContent={
                    <div>
                        <h2>{selected.label}</h2>
                        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                            Hai selezionato <strong>{selected.value}</strong>
                        </p>
                    </div>
                }
            />
        </section>
    );
}
