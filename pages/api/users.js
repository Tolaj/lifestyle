import User from 'models/User';

import { createHandler } from '../../controllers/genericHandler';

export const config = {
  api: {
    bodyParser: false,
  },
};

const customMiddleware = async (req, res) => {
  console.log("Running custom middleware...");
  
};

export default createHandler(User, {
  useAuth: false, 
  middleware: customMiddleware, 
  populate: ['groups','friends.requester','groups.members']
});