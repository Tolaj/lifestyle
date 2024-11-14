import mongoose from 'mongoose';
import User from './User';

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


GroupSchema.pre('save', async function (next) {
  if(!this.isModified('_id')){
    this.$locals.wasNew = this.isNew
  } 
  return next();
});

GroupSchema.post('save', async function (doc) {
  if (this.$locals.wasNew) {
    this.$locals.wasNew = false;
    try {
      if (doc.name != "ISOLATED_GROUP") {
        await User.updateMany(
          { _id: { $in: doc.members } },  
          { $addToSet: { groups: doc._id } }  
        );
      }
    } catch (error) {
      console.error("Error creating group for user:", error);
    }
  }
});

GroupSchema.post('findOneAndDelete', async function (doc) {
  if (doc) { 
    try {
      await User.updateMany(
        { _id: { $in: doc.members } },
        { $pull: { groups: doc._id } } 
      );
    } catch (error) {
      console.error("Error removing group for user:", error);
    }
  }
});


export default mongoose.models.Group || mongoose.model('Group', GroupSchema);
