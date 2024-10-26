import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const users = await User.find();
    res.status(200).json(users);
  } else if (req.method === 'POST') {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
