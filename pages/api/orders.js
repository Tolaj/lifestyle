import dbConnect from '../../utils/dbConnect';
import Order from '../../models/Order';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const { userId } = req.query;
    const orders = await Order.find({ user: userId });
    res.status(200).json(orders);
  } else if (req.method === 'POST') {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    await Order.findByIdAndDelete(id);
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
