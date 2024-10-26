import dbConnect from '../../utils/dbConnect';
import Category from '../../models/Category';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const categories = await Category.find();
        res.status(200).json(categories);
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    case 'POST':
      try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'PUT':
      try {
        const { id } = req.query;
        const category = await Category.findByIdAndUpdate(id, req.body, {
          new: true,  // Returns the updated document
          runValidators: true
        });
        if (!category) {
          return res.status(404).json({ success: false, message: 'Category not found' });
        }
        res.status(200).json(category);
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
          return res.status(404).json({ success: false, message: 'Category not found' });
        }
        res.status(200).json({ success: true, message: 'Category deleted successfully' });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}


// handles formData for nextjs

// import formidable from 'formidable';

// export const config = {
//   api: {
//     bodyParser: false, // Disable default body parsing to handle multipart/form-data
//   },
// };

// const handler = async (req, res) => {
//   if (req.method === 'POST') {
//     const form = formidable(); // No need for `new` in formidable 2.x and above

//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         res.status(500).json({ error: 'Error parsing form data' });
//         return;
//       }

//       // Access the form fields and files
//       console.log('Fields:', fields);  // Form fields like name, description
//       console.log('Files:', files);    // Uploaded files

//       res.status(200).json({ fields, files });
//     });
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// };

// export default handler;
