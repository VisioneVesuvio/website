'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import CommonButton from '@/app/components/CommonButton';

const emptyProgram = {
    title: '',
    director: '',
    categories: '',
    duration: '',
    year: '',
    country: '',
    language: '',
    description: '',
    ticketUrl: '',
    posterSrc: '',
    posterAlt: '',
    date: '',
    startTime: '21:00',
    venue: 'Villa Floridiana, Napoli',
    voiceLabel: 'V.O.S.',
    guestLabel: 'REGISTA IN SALA',
    isVisible: true,
    isFeaturedOnHome: true,
    order: 0,
};

const emptyRassegna = {
    title: '',
    subtitle: '',
    description: '',
    tags: '',
    venue: 'Villa Floridiana, Napoli',
    ticketUrl: '',
    startDate: '',
    endDate: '',
    imageSources: [],
    filmIds: [],
    isVisible: true,
    order: 0,
};

async function fetchJson(url, options) {
    const response = await fetch(url, options);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.error ?? 'Errore richiesta');
    }

    return data;
}

function ImageArchive({ images, value, selectedValues = [], mode = 'select', onPick }) {
    return (
        <div className="admin-image-archive">
            <div className="admin-image-archive-head">
                <strong>Immagini nell'archivio</strong>
                <span>{images.length} file</span>
            </div>
            <div className="admin-image-strip" aria-label="Immagini nell'archivio">
                {images.map((image) => (
                    <button
                        key={image}
                        type="button"
                        className={`admin-image-choice ${value === image || selectedValues.includes(image) ? 'is-selected' : ''}`}
                        onClick={() => onPick(image)}
                    >
                        <img src={image} alt="" loading="lazy" />
                        <span>{image.split('/').pop()}</span>
                        {mode === 'append' && selectedValues.includes(image) && <em>Collegata</em>}
                    </button>
                ))}
            </div>
        </div>
    );
}

function RassegnaImageList({ images, onChange, onRemove, onAddEmpty }) {
    return (
        <div className="admin-linked-images">
            <div className="admin-image-archive-head">
                <strong>Immagini collegate alla rassegna</strong>
                <button type="button" className="admin-text-button" onClick={onAddEmpty}>Aggiungi URL</button>
            </div>
            {images.length === 0 && <p className="admin-muted">Scegli immagini dall'archivio o aggiungi un URL esterno.</p>}
            {images.map((src, index) => (
                <div key={`${src}-${index}`} className="admin-linked-image-row">
                    {src && <img src={src} alt="" loading="lazy" />}
                    <input value={src} placeholder="https://..." onChange={(event) => onChange(index, event.target.value)} />
                    <button type="button" className="admin-clear-button" onClick={() => onRemove(index)} aria-label={`Rimuovi immagine ${index + 1}`}>×</button>
                </div>
            ))}
        </div>
    );
}

function ShopImageList({ items, onChange, onRemove, onAddEmpty }) {
    return (
        <div className="admin-linked-images">
            <div className="admin-image-archive-head">
                <strong>Immagini scelte per lo shop</strong>
                <button type="button" className="admin-text-button" onClick={onAddEmpty}>Aggiungi slot</button>
            </div>
            {items.length === 0 && <p className="admin-muted">Scegli immagini dall'archivio. Se ne scegli poche, la home le ripetera automaticamente.</p>}
            {items.map((item, index) => (
                <div key={`${item.src}-${index}`} className="admin-linked-image-row admin-linked-image-row-shop">
                    {item.src && <img src={item.src} alt="" loading="lazy" />}
                    <input value={item.src} placeholder="https://..." onChange={(event) => onChange(index, { ...item, src: event.target.value })} />
                    <input value={item.alt} placeholder="Descrizione immagine" onChange={(event) => onChange(index, { ...item, alt: event.target.value })} />
                    <button type="button" className="admin-clear-button" onClick={() => onRemove(index)} aria-label={`Rimuovi immagine shop ${index + 1}`}>×</button>
                </div>
            ))}
        </div>
    );
}

function InfoTip({ text }) {
    return (
        <span className="admin-info-tip">
            <button type="button" aria-label="Informazioni">i</button>
            <span className="admin-info-popover">{text}</span>
        </span>
    );
}

function FieldLabel({ children, info }) {
    return (
        <span className="admin-field-label">
            {children}
            {info && <InfoTip text={info} />}
        </span>
    );
}

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const [bootstrap, setBootstrap] = useState(null);
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const [firstAdminForm, setFirstAdminForm] = useState({ username: '', password: '' });
    const [films, setFilms] = useState([]);
    const [events, setEvents] = useState([]);
    const [rassegne, setRassegne] = useState([]);
    const [images, setImages] = useState([]);
    const [bannerItems, setBannerItems] = useState('');
    const [shopItems, setShopItems] = useState([]);
    const [programForm, setProgramForm] = useState(emptyProgram);
    const [rassegnaForm, setRassegnaForm] = useState(emptyRassegna);
    const [editingEventId, setEditingEventId] = useState(null);
    const [editingRassegnaId, setEditingRassegnaId] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const isAdmin = session?.user?.role === 'admin';

    async function loadBootstrap() {
        try {
            setBootstrap(await fetchJson('/api/admin/bootstrap/status'));
        } catch (err) {
            setBootstrap({ hasUsers: true, error: err.message });
        }
    }

    async function loadAdminData() {
        const [filmsData, eventsData, imagesData, rassegneData, bannerData, shopData] = await Promise.all([
            fetchJson('/api/admin/films'),
            fetchJson('/api/admin/program-events'),
            fetchJson('/api/admin/public-images'),
            fetchJson('/api/admin/rassegne'),
            fetchJson('/api/admin/site-banner'),
            fetchJson('/api/admin/shop-showcase'),
        ]);

        setFilms(filmsData.films);
        setEvents(eventsData.events);
        setImages(imagesData.images);
        setRassegne(rassegneData.rassegne);
        setBannerItems((bannerData.items ?? []).join('\n'));
        setShopItems(shopData.items ?? []);
    }

    useEffect(() => {
        loadBootstrap();
    }, []);

    useEffect(() => {
        if (isAdmin) {
            loadAdminData().catch((err) => setError(err.message));
        }
    }, [isAdmin]);

    async function handleFirstAdminSubmit(event) {
        event.preventDefault();
        setError('');
        setMessage('');

        try {
            await fetchJson('/api/admin/bootstrap', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(firstAdminForm),
            });
            setMessage('Primo admin creato. Ora puoi entrare.');
            setLoginForm(firstAdminForm);
            await loadBootstrap();
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleLoginSubmit(event) {
        event.preventDefault();
        setError('');
        const result = await signIn('credentials', {
            redirect: false,
            email: loginForm.username,
            password: loginForm.password,
        });

        if (result?.error) {
            setError(result.error);
        }
    }

    async function handleProgramSubmit(event) {
        event.preventDefault();
        setError('');
        setMessage('');

        try {
            const url = editingEventId ? `/api/admin/program-items/${editingEventId}` : '/api/admin/program-items';
            await fetchJson(url, {
                method: editingEventId ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(programForm),
            });
            setProgramForm(emptyProgram);
            setEditingEventId(null);
            setMessage(editingEventId ? 'Programmazione aggiornata.' : 'Film aggiunto alla programmazione.');
            await loadAdminData();
        } catch (err) {
            setError(err.message);
        }
    }

    function editProgram(programEvent) {
        const film = films.find((item) => item.id === programEvent.filmId);
        setEditingEventId(programEvent.id);
        setProgramForm({
            title: film?.title ?? programEvent.title,
            director: film?.director ?? programEvent.director,
            categories: film?.categories?.join(', ') ?? '',
            duration: film?.duration ?? '',
            year: film?.year ?? '',
            country: film?.country ?? '',
            language: film?.language ?? '',
            description: film?.description ?? programEvent.description,
            ticketUrl: film?.ticketUrl ?? programEvent.ticketUrl,
            posterSrc: film?.poster?.src ?? programEvent.hero.src,
            posterAlt: film?.poster?.alt ?? programEvent.hero.alt,
            date: programEvent.dateValue,
            startTime: programEvent.startTime,
            venue: programEvent.venueValue,
            voiceLabel: programEvent.voiceLabel,
            guestLabel: programEvent.guestLabel,
            isVisible: programEvent.isVisible,
            isFeaturedOnHome: programEvent.isFeaturedOnHome,
            order: programEvent.order,
        });
    }

    async function handleRassegnaSubmit(event) {
        event.preventDefault();
        setError('');
        setMessage('');

        const imagesPayload = rassegnaForm.imageSources
            .filter(Boolean)
            .map((src) => ({ src, alt: rassegnaForm.title }));

        try {
            const url = editingRassegnaId ? `/api/admin/rassegne/${editingRassegnaId}` : '/api/admin/rassegne';
            await fetchJson(url, {
                method: editingRassegnaId ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...rassegnaForm, images: imagesPayload }),
            });
            setRassegnaForm(emptyRassegna);
            setEditingRassegnaId(null);
            setMessage(editingRassegnaId ? 'Rassegna aggiornata.' : 'Rassegna creata.');
            await loadAdminData();
        } catch (err) {
            setError(err.message);
        }
    }

    function editRassegna(rassegna) {
        setEditingRassegnaId(rassegna.id);
        setRassegnaForm({
            title: rassegna.title,
            subtitle: rassegna.subtitle,
            description: rassegna.description,
            tags: rassegna.tags.join(', '),
            venue: rassegna.venue,
            ticketUrl: rassegna.ticketUrl,
            startDate: rassegna.startDate,
            endDate: rassegna.endDate,
            imageSources: rassegna.images.map((image) => image.src),
            filmIds: rassegna.filmIds,
            isVisible: rassegna.isVisible,
            order: rassegna.order,
        });
    }

    async function handleBannerSubmit(event) {
        event.preventDefault();
        setError('');
        setMessage('');

        try {
            await fetchJson('/api/admin/site-banner', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: bannerItems.split('\n') }),
            });
            setMessage('Banner aggiornato.');
            await loadAdminData();
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleShopSubmit(event) {
        event.preventDefault();
        setError('');
        setMessage('');

        try {
            await fetchJson('/api/admin/shop-showcase', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: shopItems }),
            });
            setMessage('Shop aggiornato.');
            await loadAdminData();
        } catch (err) {
            setError(err.message);
        }
    }

    async function deleteResource(url, successMessage) {
        setError('');
        setMessage('');

        try {
            await fetchJson(url, { method: 'DELETE' });
            setMessage(successMessage);
            await loadAdminData();
        } catch (err) {
            setError(err.message);
        }
    }

    function appendRassegnaImage(src) {
        setRassegnaForm((current) => {
            if (current.imageSources.includes(src)) {
                return current;
            }

            return {
                ...current,
                imageSources: [...current.imageSources, src],
            };
        });
    }

    function updateRassegnaImage(index, src) {
        setRassegnaForm((current) => ({
            ...current,
            imageSources: current.imageSources.map((image, imageIndex) => imageIndex === index ? src : image),
        }));
    }

    function removeRassegnaImage(index) {
        setRassegnaForm((current) => ({
            ...current,
            imageSources: current.imageSources.filter((_, imageIndex) => imageIndex !== index),
        }));
    }

    function addEmptyRassegnaImage() {
        setRassegnaForm((current) => ({
            ...current,
            imageSources: [...current.imageSources, ''],
        }));
    }

    function appendShopImage(src) {
        setShopItems((current) => [
            ...current,
            {
                src,
                alt: src.split('/').pop() ?? 'Shop poster',
                width: 480,
                height: 720,
            },
        ]);
    }

    function updateShopImage(index, item) {
        setShopItems((current) => current.map((currentItem, itemIndex) => itemIndex === index ? item : currentItem));
    }

    function removeShopImage(index) {
        setShopItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
    }

    function addEmptyShopImage() {
        setShopItems((current) => [...current, { src: '', alt: '', width: 480, height: 720 }]);
    }

    if (status === 'loading' || !bootstrap) {
        return <section className="admin-page"><p>Caricamento...</p></section>;
    }

    if (bootstrap.error) {
        return (
            <section className="admin-page">
                <div className="admin-panel admin-panel-narrow">
                    <h1>Admin</h1>
                    <p>{bootstrap.error}</p>
                    <p className="admin-muted">Configura `MONGODB_URI` e `NEXTAUTH_SECRET`.</p>
                </div>
            </section>
        );
    }

    if (!bootstrap.hasUsers) {
        return (
            <section className="admin-page">
                <form className="admin-panel admin-panel-narrow" onSubmit={handleFirstAdminSubmit}>
                    <h1>Primo admin</h1>
                    <p>Nessun utente trovato. Crea il primo accesso amministratore.</p>
                    <label>Nome utente<input value={firstAdminForm.username} onChange={(event) => setFirstAdminForm((current) => ({ ...current, username: event.target.value }))} /></label>
                    <label>Password<input type="password" value={firstAdminForm.password} onChange={(event) => setFirstAdminForm((current) => ({ ...current, password: event.target.value }))} /></label>
                    {error && <p className="admin-error">{error}</p>}
                    {message && <p className="admin-message">{message}</p>}
                    <CommonButton type="submit">Crea admin</CommonButton>
                </form>
            </section>
        );
    }

    if (!isAdmin) {
        return (
            <section className="admin-page">
                <form className="admin-panel admin-panel-narrow" onSubmit={handleLoginSubmit}>
                    <h1>Admin</h1>
                    <label>Username<input value={loginForm.username} onChange={(event) => setLoginForm((current) => ({ ...current, username: event.target.value }))} /></label>
                    <label>Password<input type="password" value={loginForm.password} onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))} /></label>
                    {error && <p className="admin-error">{error}</p>}
                    <CommonButton type="submit">Entra</CommonButton>
                </form>
            </section>
        );
    }

    return (
        <section className="admin-page">
            <header className="admin-header">
                <div>
                    <h1>Admin</h1>
                    <p>Programmazione, rassegne e banner</p>
                </div>
                <button className="admin-text-button" type="button" onClick={() => signOut({ callbackUrl: '/admin' })}>Esci</button>
            </header>

            {(message || error) && (
                <div className="admin-status">
                    {message && <p className="admin-message">{message}</p>}
                    {error && <p className="admin-error">{error}</p>}
                </div>
            )}

            <form className="admin-panel admin-wide-panel" onSubmit={handleProgramSubmit}>
                <div className="admin-section-title">
                    <h2>{editingEventId ? 'Modifica programmazione' : 'Aggiungi film in programmazione'}</h2>
                    <InfoTip text="Compila qui il film e la sua proiezione. Se la data e l'orario sono futuri apparira automaticamente in home e in Programmazione." />
                </div>
                <div className="admin-form-grid">
                    <label><FieldLabel info="Il nome del film, come verra mostrato nelle schede e nella programmazione.">Titolo</FieldLabel><input value={programForm.title} onChange={(event) => setProgramForm((current) => ({ ...current, title: event.target.value }))} /></label>
                    <label><FieldLabel info="Scrivi il nome del regista. Se sono piu di uno, separali con una virgola.">Regista</FieldLabel><input value={programForm.director} onChange={(event) => setProgramForm((current) => ({ ...current, director: event.target.value }))} /></label>
                    <label><FieldLabel info="Giorno della proiezione. Se e passato, il film resta in admin ma sparisce dalla home.">Data</FieldLabel><input type="date" value={programForm.date} onChange={(event) => setProgramForm((current) => ({ ...current, date: event.target.value }))} /></label>
                    <label><FieldLabel info="Orario della proiezione. Serve anche per capire quando togliere il film dalla home.">Orario</FieldLabel><input type="time" value={programForm.startTime} onChange={(event) => setProgramForm((current) => ({ ...current, startTime: event.target.value }))} /></label>
                    <label><FieldLabel info="Luogo mostrato nella programmazione, per esempio Villa Floridiana, Napoli.">Luogo</FieldLabel><input value={programForm.venue} onChange={(event) => setProgramForm((current) => ({ ...current, venue: event.target.value }))} /></label>
                    <label><FieldLabel info="Etichette brevi separate da virgola, per esempio Drammatico, Cult.">Categorie</FieldLabel><input placeholder="Drammatico, Cult" value={programForm.categories} onChange={(event) => setProgramForm((current) => ({ ...current, categories: event.target.value }))} /></label>
                    <label><FieldLabel info="Durata del film, per esempio 147 min.">Durata</FieldLabel><input value={programForm.duration} onChange={(event) => setProgramForm((current) => ({ ...current, duration: event.target.value }))} /></label>
                    <label><FieldLabel info="Anno di uscita del film.">Anno</FieldLabel><input value={programForm.year} onChange={(event) => setProgramForm((current) => ({ ...current, year: event.target.value }))} /></label>
                    <label><FieldLabel info="Paese o paesi di produzione.">Paese</FieldLabel><input value={programForm.country} onChange={(event) => setProgramForm((current) => ({ ...current, country: event.target.value }))} /></label>
                    <label><FieldLabel info="Lingua o versione proiettata, per esempio Originale sottotitolata.">Lingua</FieldLabel><input value={programForm.language} onChange={(event) => setProgramForm((current) => ({ ...current, language: event.target.value }))} /></label>
                    <label><FieldLabel info="Primo bannerino sopra al film, di solito V.O.S. o simile. Puoi lasciarlo vuoto.">Banner voce</FieldLabel><input value={programForm.voiceLabel} onChange={(event) => setProgramForm((current) => ({ ...current, voiceLabel: event.target.value }))} /></label>
                    <label><FieldLabel info="Secondo bannerino, per esempio REGISTA IN SALA. Puoi lasciarlo vuoto.">Banner ospite</FieldLabel><input value={programForm.guestLabel} onChange={(event) => setProgramForm((current) => ({ ...current, guestLabel: event.target.value }))} /></label>
                </div>
                <ImageArchive images={images} value={programForm.posterSrc} onPick={(src) => setProgramForm((current) => ({ ...current, posterSrc: src }))} />
                <label><FieldLabel info="Usalo solo se l'immagine non e nell'archivio. Incolla un URL https completo.">Link immagine esterno</FieldLabel><input value={programForm.posterSrc} onChange={(event) => setProgramForm((current) => ({ ...current, posterSrc: event.target.value }))} /></label>
                <label><FieldLabel info="URL del sito biglietti. Tutti i pulsanti Biglietti di questo film porteranno qui.">Link biglietti</FieldLabel><input value={programForm.ticketUrl} onChange={(event) => setProgramForm((current) => ({ ...current, ticketUrl: event.target.value }))} /></label>
                <label><FieldLabel info="Testo della scheda film. Tienilo breve: 3-5 righe funzionano meglio.">Descrizione</FieldLabel><textarea rows="4" value={programForm.description} onChange={(event) => setProgramForm((current) => ({ ...current, description: event.target.value }))} /></label>
                <div className="admin-checks">
                    <label><input type="checkbox" checked={programForm.isVisible} onChange={(event) => setProgramForm((current) => ({ ...current, isVisible: event.target.checked }))} /> Pubblica</label>
                    <label><input type="checkbox" checked={programForm.isFeaturedOnHome} onChange={(event) => setProgramForm((current) => ({ ...current, isFeaturedOnHome: event.target.checked }))} /> Mostra in programmazione</label>
                </div>
                <div className="admin-actions">
                    <CommonButton type="submit">{editingEventId ? 'Salva' : 'Aggiungi'}</CommonButton>
                    {editingEventId && <button type="button" className="admin-text-button" onClick={() => { setEditingEventId(null); setProgramForm(emptyProgram); }}>Annulla</button>}
                </div>
            </form>

            <section className="admin-panel">
                <div className="admin-section-title">
                    <h2>Film in programmazione</h2>
                    <InfoTip text="Qui trovi quello che hai gia inserito. Usa Modifica per riaprire il form, oppure × per rimuovere la proiezione dalla programmazione." />
                </div>
                <div className="admin-list">
                    {events.map((programEvent) => (
                        <article key={programEvent.id} className="admin-list-row">
                            <div>
                                <strong className="admin-list-title">{programEvent.title}</strong>
                                <span>{programEvent.date} {programEvent.timeLabel}</span>
                                <span>{programEvent.venue}</span>
                            </div>
                            <div className="admin-row-actions">
                                <button type="button" className="admin-mini-button admin-mini-button-edit" onClick={() => editProgram(programEvent)}>Modifica</button>
                                <button type="button" className="admin-mini-button admin-mini-button-delete" aria-label={`Rimuovi ${programEvent.title}`} title="Rimuovi" onClick={() => deleteResource(`/api/admin/program-items/${programEvent.id}`, 'Rimosso dalla programmazione.')}>Elimina</button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <form className="admin-panel admin-wide-panel" onSubmit={handleRassegnaSubmit}>
                <div className="admin-section-title">
                    <h2>{editingRassegnaId ? 'Modifica rassegna' : 'Nuova rassegna'}</h2>
                    <InfoTip text="Una rassegna e un contenitore: periodo, immagini, descrizione e film collegati. Se oggi e dentro il periodo appare In corso; quando finisce va in Archivio." />
                </div>
                <div className="admin-form-grid">
                    <label><FieldLabel info="Nome della rassegna.">Titolo</FieldLabel><input value={rassegnaForm.title} onChange={(event) => setRassegnaForm((current) => ({ ...current, title: event.target.value }))} /></label>
                    <label><FieldLabel info="Sottotitolo sotto al titolo, per esempio con il Cinema Plaza.">Sottotitolo</FieldLabel><input value={rassegnaForm.subtitle} onChange={(event) => setRassegnaForm((current) => ({ ...current, subtitle: event.target.value }))} /></label>
                    <label><FieldLabel info="Primo giorno della rassegna.">Inizio</FieldLabel><input type="date" value={rassegnaForm.startDate} onChange={(event) => setRassegnaForm((current) => ({ ...current, startDate: event.target.value }))} /></label>
                    <label><FieldLabel info="Ultimo giorno della rassegna. Dopo questa data finisce in Archivio.">Fine</FieldLabel><input type="date" value={rassegnaForm.endDate} onChange={(event) => setRassegnaForm((current) => ({ ...current, endDate: event.target.value }))} /></label>
                    <label><FieldLabel info="Etichette separate da virgola, per esempio Cinema all'aperto, DJ set.">Tag</FieldLabel><input placeholder="Cinema all'aperto, DJ set" value={rassegnaForm.tags} onChange={(event) => setRassegnaForm((current) => ({ ...current, tags: event.target.value }))} /></label>
                    <label><FieldLabel info="Luogo generale della rassegna.">Luogo</FieldLabel><input value={rassegnaForm.venue} onChange={(event) => setRassegnaForm((current) => ({ ...current, venue: event.target.value }))} /></label>
                </div>
                <label><FieldLabel info="Tieni premuto Ctrl o Cmd per selezionare piu film. Questi compongono la lista film della rassegna.">Film collegati</FieldLabel>
                    <select multiple value={rassegnaForm.filmIds} onChange={(event) => setRassegnaForm((current) => ({ ...current, filmIds: Array.from(event.target.selectedOptions).map((option) => option.value) }))}>
                        {films.map((film) => <option key={film.id} value={film.id}>{film.title}</option>)}
                    </select>
                </label>
                <ImageArchive
                    images={images}
                    selectedValues={rassegnaForm.imageSources}
                    mode="append"
                    onPick={appendRassegnaImage}
                />
                <RassegnaImageList
                    images={rassegnaForm.imageSources}
                    onChange={updateRassegnaImage}
                    onRemove={removeRassegnaImage}
                    onAddEmpty={addEmptyRassegnaImage}
                />
                <div className="admin-form-grid">
                    <label><FieldLabel info="Opzionale. Se c'e un link biglietti generale della rassegna, mettilo qui.">Link biglietti</FieldLabel><input value={rassegnaForm.ticketUrl} onChange={(event) => setRassegnaForm((current) => ({ ...current, ticketUrl: event.target.value }))} /></label>
                </div>
                <label><FieldLabel info="Testo descrittivo della rassegna, mostrato in home se e in corso e nella pagina Rassegne.">Descrizione</FieldLabel><textarea rows="4" value={rassegnaForm.description} onChange={(event) => setRassegnaForm((current) => ({ ...current, description: event.target.value }))} /></label>
                <div className="admin-checks">
                    <label><input type="checkbox" checked={rassegnaForm.isVisible} onChange={(event) => setRassegnaForm((current) => ({ ...current, isVisible: event.target.checked }))} /> Pubblica</label>
                </div>
                <div className="admin-actions">
                    <CommonButton type="submit">{editingRassegnaId ? 'Salva rassegna' : 'Crea rassegna'}</CommonButton>
                    {editingRassegnaId && <button type="button" className="admin-text-button" onClick={() => { setEditingRassegnaId(null); setRassegnaForm(emptyRassegna); }}>Annulla</button>}
                </div>
            </form>

            <section className="admin-panel">
                <div className="admin-section-title">
                    <h2>Rassegne</h2>
                    <InfoTip text="Le rassegne in corso appaiono in home. Quelle finite restano visibili solo nell'archivio della pagina Rassegne." />
                </div>
                <div className="admin-list">
                    {rassegne.map((rassegna) => (
                        <article key={rassegna.id} className="admin-list-row">
                            <div><strong className="admin-list-title">{rassegna.title}</strong><span>{rassegna.startDate} - {rassegna.endDate} / {rassegna.status === 'past' ? 'Archivio' : 'In corso'}</span></div>
                            <div className="admin-row-actions">
                                <button type="button" className="admin-mini-button admin-mini-button-edit" onClick={() => editRassegna(rassegna)}>Modifica</button>
                                <button type="button" className="admin-mini-button admin-mini-button-delete" aria-label={`Elimina ${rassegna.title}`} title="Elimina" onClick={() => deleteResource(`/api/admin/rassegne/${rassegna.id}`, 'Rassegna eliminata.')}>Elimina</button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <form className="admin-panel admin-panel-narrow" onSubmit={handleBannerSubmit}>
                <div className="admin-section-title">
                    <h2>Bannerino a scorrimento</h2>
                    <InfoTip text="Scrivi una voce per riga. Il sito le ripetera automaticamente nel nastro in alto." />
                </div>
                <p>Una riga per ogni scritta. Se non salvi nulla resta quello standard.</p>
                <textarea rows="5" value={bannerItems} onChange={(event) => setBannerItems(event.target.value)} />
                <CommonButton type="submit">Salva banner</CommonButton>
            </form>

            <form className="admin-panel admin-wide-panel" onSubmit={handleShopSubmit}>
                <div className="admin-section-title">
                    <h2>Shop in home</h2>
                    <InfoTip text="Scegli le immagini che compongono lo stack Shop in home. Se sono meno del massimo visibile, il sito le ripete da solo." />
                </div>
                <ImageArchive
                    images={images}
                    selectedValues={shopItems.map((item) => item.src)}
                    mode="append"
                    onPick={appendShopImage}
                />
                <ShopImageList
                    items={shopItems}
                    onChange={updateShopImage}
                    onRemove={removeShopImage}
                    onAddEmpty={addEmptyShopImage}
                />
                <CommonButton type="submit">Salva shop</CommonButton>
            </form>
        </section>
    );
}
