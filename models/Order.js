import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({

  name: { type: String, required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    unit: { type: String, required: true },
    price: { type: String, required: true },
    splitType: { type: String , default: 'Equal',enum: ['equal', 'percentage', 'custom']},
	  splitAmong: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    count: { type: String, required: true },
  }],
  TotalPrice: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
