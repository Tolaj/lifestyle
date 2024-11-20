import axios from 'axios';

const FetchAPI = async (api, method, data = null, config = {}) => {
  const id = data?._id ?? data?.id ?? null;
  const url = id && method !== 'POST' ? `${api}?id=${id}` : api;
  
  let payload = data;
  const isMultipart = data instanceof FormData;
  // If data is not already FormData, convert it for file uploads (POST/PUT)
  if (isMultipart && (method === 'POST' || method === 'PUT') && data && data.file) {
    payload = new FormData();
    isMultipart = payload instanceof FormData
    for (const key in data) {
      Array.isArray(data[key]) || data[key] instanceof Object? payload.append(key, JSON.stringify(data[key])) : payload.append(key, data[key])
    }
  }

  const options = {
    method,
    url,
    data: payload, // FormData for file uploads, or regular JSON data
    headers: {
      'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
    },
    ...config,
  };
  
  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    alert(JSON.stringify(error.response?.data.message || error.message));
    console.error(`Error during ${method} request to ${url}:`, error.response?.data || error.message);
    // throw error;
  }
};

export default FetchAPI;
