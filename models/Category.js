import mongoose from 'mongoose';
import {deleteFromGroupPostDelete, preventDeleteIfReferenced} from '../utils/modelPlugins';
import Product from './Product';
import Group from './Group';

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, optional: true },
  icon: { type: String, optional: true },
  color: { type: String, optional: true }

}, {
  timestamps: true
});


CategorySchema.plugin(deleteFromGroupPostDelete('Group', 'categories'));

CategorySchema.plugin(preventDeleteIfReferenced('Product', 'category'));

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
