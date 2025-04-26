// app/api/auth/[...nextauth]/route.js

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '@/app/lib/mongodb';
import User from '@/app/models/User';
import bcrypt from 'bcrypt';

/**
 * Configurazione per NextAuth:
 * - Usa JWT per gestire la sessione (stateless)
 * - Utilizza un provider custom con email/password (Credentials)
 * - Collega il login al database MongoDB per validazione
 */
export const authOptions = {
    // 🔐 Secret per firmare JWT e sessioni
    secret: process.env.NEXTAUTH_SECRET,

    // 🛡️ Tipo di sessione: JWT (stateless, scalabile)
    session: { strategy: 'jwt' },

    // 🔑 Provider di autenticazione
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },

            // 🔍 Logica di validazione dell’utente al login
            async authorize(credentials) {
                await connectToDatabase();

                // Trova l'utente tramite email
                const user = await User.findOne({ email: credentials.email });

                // Valida utente e password
                const passwordCorrect = user && await bcrypt.compare(credentials.password, user.password);

                if (!user || !passwordCorrect) {
                    throw new Error('Credenziali non valide');
                }

                // Controllo approvazione account, una cosa addizionale che ho messo che uso tipo per la conferma mail etc.
                if (!user.approved) {
                    throw new Error('Utente non approvato');
                }

                // ✅ Utente valido: ritorna info essenziali per il token
                return {
                    id: user._id.toString(),
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],

    // 🔁 Callback per token e sessione (JWT strategy)
    callbacks: {
        /**
         * Aggiunge `id` e `role` al JWT al momento della login
         */
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },

        /**
         * Propaga `id` e `role` alla sessione client-side
         */
        async session({ session, token }) {
            if (token?.id) session.user.id = token.id;
            if (token?.role) session.user.role = token.role;
            return session;
        },
    },

    // 📄 Pagina personalizzata di login
    pages: {
        signIn: '/login',
    },
};

// 🔁 Esportazione dell’handler come GET e POST — richiesto da Next.js App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
