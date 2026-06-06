// models/Template.js
import mongoose from 'mongoose';

const TemplateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    emoji: { type: String, default: '📦' },
    description: { type: String },
    isSystem: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    categories: [
        {
            name: { type: String, required: true },
            icon: { type: String },
            color: { type: String },
        }
    ],
    products: [
        {
            name: { type: String, required: true },
            category: { type: String }, // category name string, matched on apply
            price: { type: String, default: '0' },
            unit: { type: String, default: 'unit' },
            description: { type: String },
        }
    ],
}, { timestamps: true });

export default mongoose.models.Template || mongoose.model('Template', TemplateSchema);