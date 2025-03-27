import mongoose from 'mongoose';
import { deleteFromGroupPostDelete } from '../utils/modelPlugins';

const ResourcePlanSchema= new mongoose.Schema({
  
    name: { type: String, required: true },
    type: { type: String, optional: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', optional: true },
    calories: { type: Number, optional: true },
    protin: { type: Number, optional: true },
    contents: [{
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantityUsed: { type: Number, required: true },
      }],
    duration: { type: Number, required: true }
  }, { timestamps: true });



ResourcePlanSchema.plugin(deleteFromGroupPostDelete('Group', 'resourcePlans'));


export default mongoose.models.Inventory || mongoose.model('ResourcePlan', ResourcePlanSchema);
