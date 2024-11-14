import mongoose from 'mongoose';
import {preventDeleteIfReferenced} from '../utils/modelPlugins';
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

CategorySchema.post('findOneAndDelete', async function (doc) {
  if (doc) { 
    try {
      await Group.updateOne(
        { categories: doc._id },  // Find the group that contains doc._id in the categories array
        { $pull: { categories: doc._id } }  // Remove doc._id from the categories array
      );
    } catch (error) {
      console.error("Error removing group for user:", error);
    }
  }
});


CategorySchema.plugin(preventDeleteIfReferenced('Product', 'category'));

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
