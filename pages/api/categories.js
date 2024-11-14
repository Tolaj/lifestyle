import {Category} from '../../models/index';
import { createHandler } from '../../controllers/genericHandler';
import Group from 'models/Group';
import { message } from 'antd';

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

    const doc = new Category(data);
    let newCategory = await doc.save();
    console.log(await Group.updateOne(
      { _id: body.groupId },
      { $addToSet: { categories: newCategory._id } }
    ))

    res.status(200).json({"message":"category created"}); 
    return 'ok'
  }
};

export default createHandler(Category, {
  useAuth: false, 
  middleware: customMiddleware, 
});

// export default createHandler(Product, {
//   populate: 'category', // Populate category field if it’s a reference in Product model
//   fileField: 'image',   // Assuming Product has an 'image' field for file uploads
// }
