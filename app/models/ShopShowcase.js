import mongoose from 'mongoose';

const ShopImageSchema = new mongoose.Schema({
    src: { type: String, required: true },
    alt: { type: String, default: '' },
    width: { type: Number, default: 480 },
    height: { type: Number, default: 720 },
}, { _id: false });

const ShopShowcaseSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true, default: 'home-shop' },
    items: [ShopImageSchema],
}, {
    timestamps: true,
});

export default mongoose.models.ShopShowcase || mongoose.model('ShopShowcase', ShopShowcaseSchema);
