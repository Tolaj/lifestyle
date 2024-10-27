import {Product} from '../../models/index';
import { createHandler } from '../../controllers/genericHandler';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default createHandler(Product,{populate: 'category'});