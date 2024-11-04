import dbConnect from '../utils/dbConnect';
import formidable,{IncomingForm} from 'formidable';
import verifyToken from '../utils/authMiddleware';
import parseFormData from 'utils/parseFormData';
import cookie from 'cookie';





async function handleGet(req, res, model, options) {
  try {
    const { id } = req.query; // Extract the ID from request parameters
    // If an ID is provided, fetch the specific document
    if (id) {
      const populateOptions = options.populate ? options.populate : []; // Ensure options.populate is an array

      const data = await model.findById(id).populate(populateOptions); // Use findById for single document retrieval

      // If no document is found, return a 404 status
      if (!data) {
        return res.status(404).json({ message: 'Document not found' });
      }

      return res.status(200).json(data); // Return the found document
    } else {
      // If no ID is provided, fetch all documents
      const populateOptions = options.populate ? options.populate : []; // Ensure options.populate is an array

      const data = await model.find().populate(populateOptions); // Use find to retrieve all documents

      return res.status(200).json(data); // Return all documents
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
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

    const needsAuth = options.useAuth;
    
    
        if (needsAuth && ['POST', 'PUT', 'DELETE'].includes(method)) {
          const cookies = cookie.parse(req.headers.cookie || '');
          const token = cookies.token;
          if (!token) {
            return res.status(401).json({ success: false, message: 'No authentication token found' });
          }
          await new Promise((resolve, reject) =>
            verifyToken(token, (err) => (err ? reject(err) : resolve()))
          );
        }

      if (options.middleware) {
        await options.middleware(req, res);
      }

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
