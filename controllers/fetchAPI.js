import axios from 'axios';

const FetchAPI = async (api, method, data = null, config = {}) => {
  const id = data?._id ?? data?.id ?? null;
  const url = id && method !== 'POST' ? `${api}?id=${id}` : api;

  let payload = data;
  const isMultipart = data instanceof FormData;

  // If data is not already FormData, convert it for file uploads (POST/PUT)
  if (!isMultipart && (method === 'POST' || method === 'PUT') && data) {
    payload = new FormData();
    for (const key in data) {
      payload.append(key, data[key]);
    }
    config.headers = {
      ...config.headers,
      'Content-Type': 'multipart/form-data',
    };
  }

  const options = {
    method,
    url,
    data: payload, // FormData for file uploads, or regular JSON data
    headers: {
      'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
      ...config.headers,
    },
    ...config,
  };

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    alert("Error from FetchAPI : " + JSON.stringify(error.response?.data.message || error.message));
    console.error(`Error during ${method} request to ${url}:`, error.response?.data || error.message);
    // throw error;
  }
};

export default FetchAPI;
