import mongoose from 'mongoose';
import { deleteFromGroupPostDelete } from '../utils/modelPlugins';
import Product from './Product';

const OrderSchema = new mongoose.Schema({

  name: { type: String, required: true },
  items: [{
    product:{ type: Object, required: true },
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



OrderSchema.pre('save', async function (next) {
  try {
    if (this.items && Array.isArray(this.items)) {
      // Loop through items and replace product ID with product object
      const populatedItems = await Promise.all(this.items.map(async (item) => {
        if (item.product && mongoose.Types.ObjectId.isValid(item.product)) {
          const productData = await Product.findById(item.product).lean();
          if (productData) {
            item.product = productData; // Replace ID with product document
          }
        }
        return item;
      }));

      this.items = populatedItems;
    }

    next();
  } catch (error) {
    console.error('Error in UserSchema pre-save hook:', error);
    next(error);
  }
});


OrderSchema.plugin(deleteFromGroupPostDelete('Group', 'orders'));


export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
