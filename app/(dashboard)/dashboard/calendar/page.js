'use client';

import Calendar from '@/app/components/Calendar'; // Assicurati che sia già modularizzato
import '@/app/styles/calendar.css';

export default function CalendarPage() {
    return (
        <section className="dashboard-calendar-page">
            <h1 className="calendar-title">Calendario Eventi</h1>
            <div className="calendar-center">
                <Calendar />
            </div>
        </section>
    );
}
