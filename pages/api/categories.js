import {Category} from '../../models/index';
import { createHandler } from '../../controllers/genericHandler';
import Group from 'models/Group';
import { message } from 'antd';
import { addToGroupAndSaveMiddleware } from 'utils/almostGenericMiddleware';

export const config = {
  api: {
    bodyParser: false,
  },
};


export default createHandler(Category, {
  useAuth: false, 
  middleware: addToGroupAndSaveMiddleware('Category', 'Group', 'groupId', 'categories'), 
});

// export default createHandler(Product, {
//   populate: 'category', // Populate category field if it’s a reference in Product model
//   fileField: 'image',   // Assuming Product has an 'image' field for file uploads
// }
