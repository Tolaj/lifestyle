import mongoose from 'mongoose';

const WishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GroceryItem' }]
}, {
  timestamps: true
});

export default mongoose.models.Wishlist || mongoose.model('Wishlist', WishlistSchema);
