import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://portfolio:8443/api';

// Helper function to get cookie value
const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }
  return undefined;
};

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = getCookie('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.log('Authentication error:', error.response.data);
            // Only redirect if we're not already on the login page
            if (!window.location.pathname.includes('/login')) {
                // Handle unauthorized access
                document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;secure;samesite=strict';
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api; 