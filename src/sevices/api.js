import axios from 'axios';
import { csrftoken } from '../csrf/csrf_token';  // Import the CSRF token

const API_URL = 'http://localhost:8000/api';  // Your Django backend URL

// Set the CSRF token for all requests
axios.defaults.headers.common['X-CSRFToken'] = csrftoken;

// Get all articles
export const getArticles = () => {
    return axios.get(`${API_URL}/articles/`);
};

// Create a new article
export const createArticle = (articleData) => {
    return axios.post(`${API_URL}/articles/`, articleData);
};

// Add other API calls as needed
