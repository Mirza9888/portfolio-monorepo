import axios from 'axios';

const api = axios.create({
    baseURL: 'http://portfolio:8443/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default api;