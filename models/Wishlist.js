import mongoose from 'mongoose';
import { deleteFromGroupPostDelete } from '../utils/modelPlugins';

const WishListSchema = new mongoose.Schema({

  name: { type: String, required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    unit: { type: String, required: true },
    price: { type: String, required: true },
    splitType: { type: String , default: 'Equal',enum: ['equal', 'percentage', 'custom']},
	  splitAmong: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    count: { type: String, required: true },
  }],
  date: { type: String, required: true },
  totalPrice: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

}, { timestamps: true });


WishListSchema.plugin(deleteFromGroupPostDelete('Group', 'wishlists'));


export default mongoose.models.Wishlist || mongoose.model('Wishlist', WishListSchema);
