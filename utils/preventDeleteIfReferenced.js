import mongoose from 'mongoose';

const preventDeleteIfReferenced = (refModel, refField) => {

return function (schema) {
    schema.pre('findOneAndDelete', async function (next) {
      const docId = this.getQuery()._id;

      // Check if there's a reference to this document in the refModel
        try {
            const isReferenced = await mongoose.model(refModel).exists({ [refField]: new mongoose.Types.ObjectId(docId)  });
            if (isReferenced) {
                const error = new Error(`Cannot delete; document is referenced in ${refModel}.`);
                error.status = 400;
                return next(error);
            }
            next();
        } catch (error) {
            console.log("Error in preventDeleteRefrenced : ",error)
        }   
      
    });
  };
};

export default preventDeleteIfReferenced;
