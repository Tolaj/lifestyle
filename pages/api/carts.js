import dbConnect from '../../utils/dbConnect';
import Cart from '../../models/Cart';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const { userId } = req.query;
    const cart = await Cart.findOne({ user: userId }).populate('items.groceryItemId');
    res.status(200).json(cart);
  } else if (req.method === 'POST') {
    const { userId, items } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { items },
      { new: true, upsert: true }
    );
    res.status(201).json(cart);
  } else if (req.method === 'DELETE') {
    const { userId } = req.body;
    await Cart.findOneAndDelete({ user: userId });
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
