import { isArray } from 'lodash';
import mongoose from 'mongoose';



/**
 * Generic middleware to handle document creation and updating reference fields.
 * @param {String} modelName - The name of the primary model (e.g., 'Order').
 * @param {String} refModelName - The name of the reference model (e.g., 'Group').
 * @param {String} refField - The field in the reference model to match (e.g., 'groupId').
 * @param {String} updateField - The field in the reference model to update (e.g., 'orders').
 */
export const addToGroupAndSaveMiddleware = (modelName, refModelName, refField, updateField) => {
  return async (req, res, next) => {
    const { body } = req;
    const { method } = req;

    if (method === 'POST') {
      try {
        // Dynamically resolve models
        const PrimaryModel = mongoose.model(modelName);
        const RefModel = mongoose.model(refModelName);
        let tempBody = JSON.parse(JSON.stringify(body))
        delete tempBody[refField]
        let newDoc;
        let savedDoc;
        let idList = [];

        // !!!!!!! careful this doesn't work properly with single item <<<<<<<<<<---------=-=-=
        // if(isArray(Object.values(tempBody)) && Object.values(tempBody).length == 1){
        //   savedDoc = await mongoose.model(modelName).insertMany(Object.values(tempBody)[0])
        //   savedDoc.map((object)=>{
        //     idList.push(object._id)
        //   })

        //   await RefModel.updateMany(
        //     { _id: body[refField] },  
        //     { $addToSet: { [updateField]: idList } } 
        //   );

        // }else{
        //   newDoc = new PrimaryModel(body);
        //   savedDoc = await newDoc.save();

        //   await RefModel.updateOne(
        //     { _id: body[refField] }, // Match the reference field
        //     { $addToSet: { [updateField]: savedDoc._id } } // Dynamically update the field
        //   );
        // }
        
        newDoc = new PrimaryModel(body);
        savedDoc = await newDoc.save();

        await RefModel.updateOne(
          { _id: body[refField] }, // Match the reference field
          { $addToSet: { [updateField]: savedDoc._id } } // Dynamically update the field
        );
        // Send a success response
        res.status(200).json({
          message: `${modelName} created successfully`,
          data: savedDoc,
        });
        return 'ok'
      } catch (error) {
        console.error(`Error in ${modelName} middleware:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } 
  };
};