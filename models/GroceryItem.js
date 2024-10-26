import mongoose from 'mongoose';

const GroceryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, optional: true },
  fileUrl: { type: String, optional: true }
}, {
  timestamps: true
});

export default mongoose.models.GroceryItem || mongoose.model('GroceryItem', GroceryItemSchema);
