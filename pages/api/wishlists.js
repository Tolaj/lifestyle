import Wishlist from 'models/Wishlist';
import { createHandler } from '../../controllers/genericHandler';
import Group from 'models/Group';
import { addToGroupAndSaveMiddleware } from 'utils/almostGenericMiddleware';


export const config = {
  api: {
    bodyParser: false,
  },
};


export default createHandler(Wishlist, {
  useAuth: false, 
  middleware:addToGroupAndSaveMiddleware('Wishlist', 'Group', 'groupId', 'wishlists'),
  populate: ['items.product','paidBy','createdBy','items.splitAmong']
});