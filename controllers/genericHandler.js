import dbConnect from '../utils/dbConnect';
import formidable,{IncomingForm} from 'formidable';



const parseFormData = (req) => {
  const form = formidable({
      multiples: true, // Allows multiple file uploads
  });
  return new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          // Convert fields to strings if they are arrays
          const formattedFields = Object.fromEntries(
              Object.entries(fields).map(([key, value]) => {
                  return [key, Array.isArray(value) ? value[0] : value];
              })
          );
          resolve({ fields: formattedFields, files });
      });
  });
};

// Function to handle GET requests
async function handleGet(req, res, model, options) {
  const data = options.populate
    ? await model.find().populate(options.populate)
    : await model.find();
  return res.status(200).json(data);
}

// Function to handle POST requests
async function handlePost(req, res, model, options) {
  const { fields, files } = await parseFormData(req);
  const data = { ...fields };

  if (options.fileField && files[options.fileField]) {
    data[options.fileField] = files[options.fileField].filepath;
  }

  const doc = new model(data);
  await doc.save();
  return res.status(201).json(doc);
}

// Function to handle PUT requests
async function handlePut(req, res, model, options) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ success: false, message: 'Missing id for PUT request' });
  }

  
  const { fields, files } = await parseFormData(req);
  const data = { ...fields };

  if (options.fileField && files[options.fileField]) {
    data[options.fileField] = files[options.fileField].filepath;
  }

  const doc = await model.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return res.status(404).json({ success: false, message: 'Document not found' });
  }
  return res.status(200).json(doc);
}

// Function to handle DELETE requests
async function handleDelete(req, res, model) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ success: false, message: 'Missing id for DELETE request' });
  }

  const deletedDoc = await model.findOneAndDelete({ _id: id });

  if (!deletedDoc) {
    return res.status(404).json({ success: false, message: 'Document not found' });
  }
  return res.status(200).json({ success: true, message: 'Document deleted successfully' });
}

// Main handler function
export function createHandler(model, options = {}) {
  return async (req, res) => {
    await dbConnect();

    const { method } = req;

    try {
      switch (method) {
        case 'GET':
          return await handleGet(req, res, model, options);

        case 'POST':
          return await handlePost(req, res, model, options);

        case 'PUT':
          return await handlePut(req, res, model, options);

        case 'DELETE':
          return await handleDelete(req, res, model);

        default:
          res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
          return res.status(405).end(`Method ${method} Not Allowed`);
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
}
