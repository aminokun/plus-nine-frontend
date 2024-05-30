import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://asp.aminokun.com/api',
  withCredentials: true,
});

export default axiosInstance;