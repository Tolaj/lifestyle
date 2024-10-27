import mongoose from 'mongoose';
import preventDeleteIfReferenced from '../utils/preventDeleteIfReferenced';
import Product from './Product';

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, optional: true },
  icon: { type: String, optional: true },
  color: { type: String, optional: true }

}, {
  timestamps: true
});

CategorySchema.plugin(preventDeleteIfReferenced('Product', 'categoryId'));

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
