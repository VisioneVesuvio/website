'use client';

import { useSession } from 'next-auth/react';

export default function DashboardPage() {
    const { data: session } = useSession();
    const username = session?.user?.name || session?.user?.email || 'utente';

    return (
        <section className="dashboard-page">
            <h1>Ciao {username}</h1>
            <p>QUESTA NON È UNA DASHBOARD</p>

            <div className="dashboard-description">
                <p>
                    ciò che vedi qui non
                    corrisponde a quello che sembra. Non stai osservando una vera interfaccia di gestione, ma un luogo
                    concettuale, costruito per testare, esplorare e riflettere.
                </p>

                <p>
                    Ogni componente che potrai selezionare dalla navigazione — una card, un bottone, una tabella — è un
                    frammento di linguaggio. Non è messo lì per servire, ma per dichiararsi. Per mostrarsi fuori dal contesto
                    e rendersi disponibile all’interazione pura. È una collezione, un museo delle intenzioni.
                </p>

                <p>
                    Questo spazio nasce per collaudare. Per staccare ogni elemento dalla sua funzione apparente e
                    farlo respirare da solo, come modulo indipendente. Potrai accedere a ogni parte dell'interfaccia, non
                    per usarla, ma per capirla. Questa non è una dashboard. È un laboratorio concettuale per componenti in cerca di significato.
                </p>
            </div>
        </section>
    );
}
