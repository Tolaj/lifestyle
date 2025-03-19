// pages/api/auth/login.js

import User from 'models/User';
import { createHandler } from '../../controllers/genericHandler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import parseFormData from 'utils/parseFormData';
import { serialize } from 'cookie';

export const config = {
  api: {
    bodyParser: false,
  },
};

const loginMiddleware = async (req, res) => {
  const  fields  = req.body
  const { email, password } = fields;

  if (!email || !password) {
     res.status(400).json({ success: false, message: 'Username and password are required' });
     return 'ok'
  }

  // Find user
  const user = await User.findOne({ email }).populate('groups');
  if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return 'ok'
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
     res.status(401).json({ success: false, message: 'Invalid credentials' });
     return 'ok'
  }
  // Generate JWT token
  const token = jwt.sign({ id: user._id, email: user.email, groupId: user.groups.find(group => group.name === "ISOLATED_GROUP")?._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

    res.setHeader('Set-Cookie', serialize('auth', token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
    }));
     res.status(200).json({ message: 'Login successful' });
     return 'ok'
};

export default createHandler(User, {
  useAuth: false,
  middleware: loginMiddleware,
});
