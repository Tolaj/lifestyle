import dbConnect from '../../utils/dbConnect';
import Review from '../../models/Review';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const { groceryItemId } = req.query;
    const reviews = await Review.find({ groceryItem: groceryItemId }).populate('user');
    res.status(200).json(reviews);
  } else if (req.method === 'POST') {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    await Review.findByIdAndDelete(id);
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
