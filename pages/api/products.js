import {Product} from '../../models/index';
import { createHandler } from '../../controllers/genericHandler';
import Group from 'models/Group';

export const config = {
  api: {
    bodyParser: false,
  },
};

const customMiddleware = async (req, res) => {
  const { body } = req;
  const { method } = req;
  if(['POST'].includes(method)){

    const data = { ...body };

    const doc = new Product(data);
    let newProduct = await doc.save();
    await Group.updateOne(
      { _id: body.groupId },
      { $addToSet: { products: newProduct._id } }
    )

    res.status(200).json({"message":"product created"}); 
    return 'ok'
  }
};

export default createHandler(Product,{
  useAuth: false, 
  middleware: customMiddleware, 
  populate: ['category']});