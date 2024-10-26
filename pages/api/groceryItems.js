import dbConnect from '../../utils/dbConnect';
import GroceryItem from '../../models/GroceryItem';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const groceryItems = await GroceryItem.find().populate('category');
    res.status(200).json(groceryItems);
  } else if (req.method === 'POST') {
    const groceryItem = new GroceryItem(req.body);
    await groceryItem.save();
    res.status(201).json(groceryItem);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
