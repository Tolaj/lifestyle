import Group from 'models/Group';

import { createHandler } from '../../controllers/genericHandler';

export const config = {
  api: {
    bodyParser: false,
  },
};

const customMiddleware = async (req, res) => {
  console.log("Running custom middleware...");
  
};

export default createHandler(Group, {
  useAuth: false, 
  middleware: customMiddleware, 
  populate: 'members'
});