'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import '@/app/styles/signin.css';

export default function SigninPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleSignin(e) {
        e.preventDefault();
        setError('');
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });
        if (!result.error) {
            router.push('/dashboard');   //QUI L'APP ROUTER TI MANDA DOVE VUOI TU - SE SUCCESSO OBV
        } else {
            setError(result.error);
        }
    }

    return (
        <section className="signin-wrapper">
            <div className="signin-box">
                <h1 className="signin-title">Accedi al tuo account</h1>
                {error && <p className="signin-error">{error}</p>}
                <form onSubmit={handleSignin} className="signin-form">
                    <label className="signin-label">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="signin-input"
                    />

                    <label className="signin-label">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="signin-input"
                    />

                    <button type="submit" className="signin-button">
                        Entra
                    </button>
                </form>
            </div>
        </section>
    );
}
