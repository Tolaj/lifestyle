import dbConnect from '../../utils/dbConnect';
import Wishlist from '../../models/Wishlist';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const { userId } = req.query;
    const wishlist = await Wishlist.findOne({ user: userId }).populate('items');
    res.status(200).json(wishlist);
  } else if (req.method === 'POST') {
    const { userId, items } = req.body;
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { items },
      { new: true, upsert: true }
    );
    res.status(201).json(wishlist);
  } else if (req.method === 'DELETE') {
    const { userId } = req.body;
    await Wishlist.findOneAndDelete({ user: userId });
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
