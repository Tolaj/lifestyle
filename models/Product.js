import mongoose from 'mongoose';
import Group from './Group';
import { deleteFromGroupPostDelete } from '../utils/modelPlugins';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: String, required: true },
  unit: { type: String, required: true },
  description: { type: String, optional: true },
  manufacturer: { type: String, optional: true },
  fileUrl: { type: String, optional: true }
}, {
  timestamps: true
});

ProductSchema.plugin(deleteFromGroupPostDelete('Group', 'products'));


// Check if the model already exists; if not, create it
export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
