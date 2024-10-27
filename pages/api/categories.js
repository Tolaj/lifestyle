import {Category} from '../../models/index';
import { createHandler } from '../../controllers/genericHandler';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default createHandler(Category);

// export default createHandler(Product, {
//   populate: 'category', // Populate category field if it’s a reference in Product model
//   fileField: 'image',   // Assuming Product has an 'image' field for file uploads
// }
