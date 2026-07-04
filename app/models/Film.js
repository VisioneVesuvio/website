import mongoose from 'mongoose';

const PosterSchema = new mongoose.Schema({
    src: { type: String, required: true },
    alt: { type: String, default: '' },
    width: { type: Number, default: 1200 },
    height: { type: Number, default: 1800 },
}, { _id: false });

const FilmSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    director: { type: String, required: true, trim: true },
    categories: [{ type: String, trim: true }],
    duration: { type: String, default: '' },
    year: { type: String, default: '' },
    country: { type: String, default: '' },
    language: { type: String, default: '' },
    description: { type: String, default: '' },
    ticketUrl: { type: String, default: '' },
    poster: { type: PosterSchema, required: true },
}, {
    timestamps: true,
});

export default mongoose.models.Film || mongoose.model('Film', FilmSchema);
