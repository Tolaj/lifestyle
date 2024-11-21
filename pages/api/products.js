import {Product} from '../../models/index';
import { createHandler } from '../../controllers/genericHandler';
import Group from 'models/Group';
import { addToGroupAndSaveMiddleware } from 'utils/almostGenericMiddleware';

export const config = {
  api: {
    bodyParser: false,
  },
};


export default createHandler(Product,{
  useAuth: false, 
  middleware:addToGroupAndSaveMiddleware('Product', 'Group', 'groupId', 'products'),
  populate: ['category']
});