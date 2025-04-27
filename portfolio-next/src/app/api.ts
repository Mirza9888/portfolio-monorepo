import axios from 'axios';

const api = axios.create({
    baseURL: 'https://mirzaredzic.hopto.org',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default api;