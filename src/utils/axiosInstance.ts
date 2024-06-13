import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'https://asp.aminokun.com/api',
  baseURL: "https://localhost:44365/api",
  withCredentials: true,
});

export default axiosInstance;