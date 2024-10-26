import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, optional: true },
  icon: { type: String, optional: true },
  color: { type: String, optional: true }

}, {
  timestamps: true
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
