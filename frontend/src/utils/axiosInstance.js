// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,  // Set base URL from .env
    headers: {
        'Content-Type': 'application/json', // Default content type
        'Authorization': 'Bearer YOUR_TOKEN',  // Example of adding a token to headers
    }, withCredentials: true,
});

export default axiosInstance;
