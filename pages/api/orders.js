// pages/api/orders.js
import Order from 'models/Order';
import { createHandler } from '../../controllers/genericHandler';
import Group from 'models/Group';
import { addToGroupAndSaveMiddleware } from 'utils/almostGenericMiddleware';
import Product from 'models/Product';
import User from 'models/User';

export const config = {
  api: {
    bodyParser: false,
  },
};


export default createHandler(Order, {
  useAuth: false,
  middleware: addToGroupAndSaveMiddleware('Order', 'Group', 'groupId', 'orders'),
  populate: ['items.product', 'paidBy', 'createdBy', 'items.splitAmong']
});