import mongoose from 'mongoose';

let isConnected = false;

export async function connectToDatabase() {
    if (isConnected) return;

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('Cannot connect to MongoDB');
    }
}
