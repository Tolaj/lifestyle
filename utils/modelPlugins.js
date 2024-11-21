// plugins/index.js
import mongoose from 'mongoose';

/**
 * Prevents deletion if the document is referenced by another model.
 * @param {String} refModel - The model name of the referencing collection.
 * @param {String} refField - The field in the referencing collection that references this document.
 */
export const preventDeleteIfReferenced = (refModel, refField) => {
  return function (schema) {
    schema.pre('findOneAndDelete', async function (next) {
      const docId = this.getQuery()._id;

      try {
        const isReferenced = await mongoose
          .model(refModel)
          .exists({ [refField]: new mongoose.Types.ObjectId(docId) });
          
        if (isReferenced) {
          const error = new Error(`Cannot delete; document is referenced in ${refModel}.`);
          error.status = 400;
          return next(error);
        }
        
        next();
      } catch (error) {
        console.log("Error in preventDeleteIfReferenced:", error);
        next(error);
      }
    });
  };
};

export const deleteFromGroupPostDelete = (refModel, refField) => {
  return function (schema) {
    schema.post('findOneAndDelete', async function (doc) {
      if (doc) {
        try {
          // Check if the document has a reference in the specified refModel
          await mongoose.model(refModel).updateMany(
            { [refField]: doc._id },  // Find groups where the Order is referenced
            { $pull: { [refField]: doc._id } }  // Pull the reference to the deleted order
          );
          console.log(`Successfully removed order reference from ${refModel}`);
        } catch (error) {
          console.error("Error removing reference in group:", error);
        }
      }
    });
  };
};