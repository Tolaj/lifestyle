import mongoose from 'mongoose';
import { deleteFromGroupPostDelete } from '../utils/modelPlugins';

const InventorySchema = new mongoose.Schema({
  
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  unit: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  splitAmong: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  quantityAvailable: { type: Number, required: true, default: 0 },
  lastUpdated: { type: Date, default: Date.now },

}, { timestamps: true });



InventorySchema.plugin(deleteFromGroupPostDelete('Group', 'inventories'));


export default mongoose.models.Inventory || mongoose.model('Inventory', InventorySchema);
