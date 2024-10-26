import axios from 'axios';

const FetchAPI = async (api, method, data = null, config = {}) => {
  // Determine the id from data if provided, otherwise set it to null
  const id = data ? data._id : null;

  // Construct the URL based on the presence of an id
  const url = id ? `${api}?id=${id}` : `${api}`;

  // Set the configuration for the request
  const options = {
    method,
    url,
    data: method !== 'GET' ? data : undefined, // Assign data only for non-GET requests
    headers: {
      'Content-Type': 'application/json',
      ...config.headers, // Spread any additional headers from config
    },
    ...config, // Spread additional config options
  };

  try {
    // Make the API request using axios
    const response = await axios(options);

    return response.data; // Return the response data
  } catch (error) {
    alert("Rukh bc error aya Fetch API controller maybe bcz of the way dbConnect is defined")
    console.error(`Error during ${method} request:`, error);
    throw error; // Re-throw the error for further handling if needed
  }
};

export default FetchAPI;
