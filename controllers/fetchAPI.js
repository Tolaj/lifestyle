// controllers/fetchAPI.js
import axios from 'axios';

const FetchAPI = async (api, method, data = null, config = {}) => {
  const id = data?._id ?? data?.id ?? null;
  const url = id && method !== 'POST' ? `${api}?id=${id}` : api;

  let payload = data;
  let isMultipart = false;

  // Convert to FormData if data has a file key (POST/PUT only)
  if (['POST', 'PUT'].includes(method) && data && data.file) {
    payload = new FormData();
    for (const key in data) {
      Array.isArray(data[key]) || data[key] instanceof Object
        ? payload.append(key, JSON.stringify(data[key]))
        : payload.append(key, data[key]);
    }
    isMultipart = true;
  } else if (data instanceof FormData) {
    isMultipart = true;
  }

  const options = {
    method,
    url,
    data: payload,
    withCredentials: true,
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
  }
};

export default FetchAPI;
