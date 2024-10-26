import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  groceryItem: { type: mongoose.Schema.Types.ObjectId, ref: 'GroceryItem', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, optional: true }
}, {
  timestamps: true
});

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
