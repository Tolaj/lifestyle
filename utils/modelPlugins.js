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

