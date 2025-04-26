import axios from 'axios';

// Kreiramo instancu axios-a sa osnovnom konfiguracijom
const axiosInstance = axios.create({
  baseURL: 'http://portfolio:8443/',  // Ovde postavite osnovni URL API-ja
  timeout: 10000,  // Tajmer za timeout (10 sekundi u ovom primeru)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ako treba dodati token za autentifikaciju u headerima
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');  // Primer uzimanja tokena iz localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Možete dodati obrada grešaka ovde, kao što su logovi ili poruke o grešci
    return Promise.reject(error);
  }
);

export default axiosInstance;
