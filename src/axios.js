import axios from 'axios';
import { csrftoken } from './csrf/csrf_token'

const axiosInstance = axios.create({
    baseURL: 'https://blog-backend-91ld.onrender.com/', // Replace with your API's base URL
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken, // Replace with your CSRF token key if you're using CSRF protection
    },
});

// Add a request interceptor (optional)
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Replace with your token key if you're using JWT or similar
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add a response interceptor (optional)
axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // Handle errors here
    return Promise.reject(error);
});

export default axiosInstance;
