import bcrypt from 'bcrypt';
import { connectToDatabase } from '@/app/lib/mongodb';
import User from '@/app/models/User';

export async function hasUsers() {
    await connectToDatabase();
    return (await User.estimatedDocumentCount()) > 0;
}

export async function createFirstAdmin({ username, password }) {
    await connectToDatabase();

    if (await hasUsers()) {
        throw new Error('Il primo admin esiste gia');
    }

    if (!username || !password) {
        throw new Error('Nome utente e password sono obbligatori');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return User.create({
        username,
        email: `${username}@visione-vesuvio.local`,
        password: hashedPassword,
        approved: true,
        role: 'admin',
    });
}
