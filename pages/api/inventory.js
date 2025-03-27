import { createHandler } from '../../controllers/genericHandler';
import Group from 'models/Group';
import { addToGroupAndSaveMiddleware } from 'utils/almostGenericMiddleware';
import Inventory from 'models/Inventory';


export const config = {
  api: {
    bodyParser: false,
  },
};

const customMiddleware = async (req, res) => {

      const { body } = req;
      const { method } = req;
      let newInventoryIds = [];
      

      if (method === 'POST') {
        let groupId = body.groupId
        try {

         
          for (const item of body.inventoryData) {

            const existingInventory = await Inventory.findOne({
              product: item.product,
              splitAmong: item.splitAmong,
            })

            if (existingInventory) {
              existingInventory.unit = item.unit;
              existingInventory.price = item.price;
              existingInventory.quantityAvailable = parseInt(existingInventory.quantityAvailable) + parseInt(item.quantityAvailable);
              existingInventory.lastUpdated = new Date();
              await existingInventory.save()
            }
            else{
              let newDoc = new Inventory(item);
              let savedDoc = await newDoc.save()
              await Group.updateOne(
                { _id: groupId },  
                { $addToSet: { inventories: savedDoc._id } } 
              )
            }
          }

        
          res.status(200).json({
            message: `inventory created successfully`,
          });

          return 'ok'
        } catch (error) {
          console.error(`Error in inventory api:`, error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
};


export default createHandler(Inventory, {
  useAuth: false, 
  middleware:customMiddleware,
  populate: ['product','splitAmong']
}); 