import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
    src: { type: String, required: true },
    alt: { type: String, default: '' },
    width: { type: Number, default: 1200 },
    height: { type: Number, default: 800 },
}, { _id: false });

const RassegnaSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: '', trim: true },
    description: { type: String, default: '' },
    tags: [{ type: String, trim: true }],
    venue: { type: String, default: '', trim: true },
    ticketUrl: { type: String, default: '' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    images: [ImageSchema],
    films: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Film' }],
    isVisible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
}, {
    timestamps: true,
});

export default mongoose.models.Rassegna || mongoose.model('Rassegna', RassegnaSchema);
