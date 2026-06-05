// pages/api/groups.js
import Group from 'models/Group';
import { createHandler } from '../../controllers/genericHandler';


export const config = {
  api: {
    bodyParser: false,
  },
};

const customMiddleware = async (req, res) => {
  const { body, method } = req;
  if (['POST', 'PUT'].includes(method)) {
    Array.isArray(body.members) ? null : body.members = [body.members];
    body.members.push(body.userId);
    delete body.userId;
  }
  // return nothing — fall through to default CRUD handler
};

export default createHandler(Group, {
  useAuth: false,
  middleware: customMiddleware,
  populate: 'members'
});