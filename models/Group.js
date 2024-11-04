import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  budget: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Budget', default: 0 }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  Wishlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist' }],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  inventory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' }],
  finance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Finance' }],
  resourcePlans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ResourcePlan' }],
}, {
  timestamps: true
});

export default mongoose.models.Group || mongoose.model('Group', GroupSchema);
