import Product from '../../models/Product';
import { createHandler } from '../../controllers/genericHandler';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default createHandler(Product,{populate: 'category',});