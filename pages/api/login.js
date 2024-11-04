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
  const { fields } = await parseFormData(req);
  const { email, password } = fields;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

    res.setHeader('Set-Cookie', serialize('auth', token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
    }));
    return res.status(200).json({ message: 'Login successful' });
};

export default createHandler(User, {
  useAuth: false,
  middleware: loginMiddleware,
});
