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

        // Create a new document in the primary model
        const newDoc = new PrimaryModel(body);
        const savedDoc = await newDoc.save();

        // Update the reference model's array field with the new document's ID
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