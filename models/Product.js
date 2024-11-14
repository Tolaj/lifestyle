import mongoose from 'mongoose';
import Group from './Group';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: String, required: true },
  quantity: { type: String, required: true },
  description: { type: String, optional: true },
  manufacturer: { type: String, optional: true },
  fileUrl: { type: String, optional: true }
}, {
  timestamps: true
});

ProductSchema.post('findOneAndDelete', async function (doc) {
  if (doc) { 
    try {
      await Group.updateOne(
        { products: doc._id },  // Find the group that contains doc._id in the categories array
        { $pull: { products: doc._id } }  // Remove doc._id from the categories array
      );
    } catch (error) {
      console.error("Error removing group for user:", error);
    }
  }
});

// Check if the model already exists; if not, create it
export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
