import mongoose from 'mongoose';

const SiteBannerSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true, default: 'header-marquee' },
    items: [{ type: String, trim: true }],
}, {
    timestamps: true,
});

export default mongoose.models.SiteBanner || mongoose.model('SiteBanner', SiteBannerSchema);
