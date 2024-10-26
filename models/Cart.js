import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    groceryItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'GroceryItem', required: true },
    quantity: { type: Number, required: true }
  }]
}, {
  timestamps: true
});

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);
