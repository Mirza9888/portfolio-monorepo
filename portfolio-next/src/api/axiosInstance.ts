// src/api/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://mirzaredzic.hopto.org',
  headers: {
    'Accept': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
});

export default axiosInstance;
