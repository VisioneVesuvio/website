import mongoose from 'mongoose';

const ProgramEventSchema = new mongoose.Schema({
    film: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Film',
        required: true,
    },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    venue: { type: String, required: true, trim: true },
    voiceLabel: { type: String, default: 'V.O.S.', trim: true },
    guestLabel: { type: String, default: '', trim: true },
    isVisible: { type: Boolean, default: true },
    isFeaturedOnHome: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
}, {
    timestamps: true,
});

export default mongoose.models.ProgramEvent || mongoose.model('ProgramEvent', ProgramEventSchema);
