'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/styles/signup.css'; // CSS dedicato

export default function SignupPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    async function handleSignup(e) {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess('Registrazione avvenuta con successo!');
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } else {
                setError(data.error || 'Errore durante la registrazione');
            }
        } catch (err) {
            console.error(err);
            setError('Errore di rete o del server');
        }
    }

    return (
        <section className="signup-wrapper">
            <div className="signup-box">
                <h1 className="signup-title">Crea un account</h1>

                {error && <p className="signup-error">{error}</p>}
                {success && <p className="signup-success">{success}</p>}

                <form onSubmit={handleSignup} className="signup-form">
                    <label className="signup-label">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="signup-input"
                    />

                    <label className="signup-label">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="signup-input"
                    />

                    <button type="submit" className="signup-button">
                        Crea account
                    </button>
                </form>
            </div>
        </section>
    );
}
