import User from 'models/User';
import { createHandler } from '../../controllers/genericHandler';
import { parse } from 'cookie';
import { verify } from 'jsonwebtoken';
import Group from 'models/Group';

export const config = {
  api: {
    bodyParser: false,
  },
};

const customMiddleware = async (req, res) => {
  if (req.method === 'GET') {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.auth;
    if (!token) {
      res.status(401).json({ message: 'Not authenticated' });
      return 'ok';
    }
    try {
      const decoded = verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id)
        .populate(['groups', 'friends.requester', 'groups.members']);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return 'ok';
      }
      res.status(200).json(user);
      return 'ok';
    } catch (e) {
      res.status(401).json({ message: 'Invalid token' });
      return 'ok';
    }
  }
};

export default createHandler(User, {
  useAuth: false,
  middleware: customMiddleware,
  populate: ['groups', 'friends.requester', 'groups.members']
});