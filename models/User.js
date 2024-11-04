import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Group from './Group';
import IsNewDocument from 'utils/isNewDocument';
const UserSchema = new mongoose.Schema({
  // username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  friends: [
    {
      requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who sent the request
      status: { 
        type: String, 
        enum: ['PENDING', 'ACCEPTED', 'REJECTED'], 
        default: 'PENDING' 
      },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }]
}, {
  timestamps: true
});

// UserSchema.pre('find', async function(next) {
//   const query = this.getQuery();
//   if (!query.email) {
//     return next(new Error('Not allowed to query without setting userId'));
//   }
//   console.log(await bcrypt.compare(enteredPasswrod, this.password)
// )
//   next();
// });

UserSchema.pre('save', async function (next) {
  // Ensure email is saved in lowercase if present
  if (this.email) {
    this.email = this.email.toLowerCase();
  }
  
  // Check if password has been modified
  if (!this.isModified('password')) {
    return next(); // Skip hashing if password hasn't changed
  }
  
  if (!this.isModified('_id')) {
    this.$locals.wasNew = this.isNew
  }

  try { 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});


UserSchema.post('save', async function (doc) {
  if (this.$locals.wasNew) {
    this.$locals.wasNew = false;
    try {
      // Create a new group with the user as a member
      const newGroup = new Group({
        name: `ISOLATED_GROUP`,
        members: [doc._id],
      });
      
      const savedGroup = await newGroup.save();

      // Update the user's groups field to include the new group
      doc.groups.push(savedGroup._id);
      await doc.save();
      
      // console.log(`Group created for user ${doc.name} with group ID: ${savedGroup._id}`);
    } catch (error) {
      console.error("Error creating group for user:", error);
    }
  }
});



export default mongoose.models.User || mongoose.model('User', UserSchema);
