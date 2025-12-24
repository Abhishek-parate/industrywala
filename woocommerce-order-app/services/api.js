import axios from 'axios';
import Constants from 'expo-constants';

// Get credentials from environment variables
const WOO_BASE_URL = Constants.expoConfig?.extra?.WOO_BASE_URL || process.env.WOO_BASE_URL;
const WOO_CONSUMER_KEY = Constants.expoConfig?.extra?.WOO_CONSUMER_KEY || process.env.WOO_CONSUMER_KEY;
const WOO_CONSUMER_SECRET = Constants.expoConfig?.extra?.WOO_CONSUMER_SECRET || process.env.WOO_CONSUMER_SECRET;

// Create axios instance with WooCommerce configuration
const api = axios.create({
  baseURL: WOO_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add authentication
api.interceptors.request.use(
  (config) => {
    // Add consumer key and secret as query parameters for HTTPS
    config.params = {
      ...config.params,
      consumer_key: WOO_CONSUMER_KEY,
      consumer_secret: WOO_CONSUMER_SECRET,
    };
    
    console.log('API Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          console.error('Authentication failed. Check API credentials.');
          break;
        case 403:
          console.error('Forbidden. Insufficient permissions.');
          break;
        case 404:
          console.error('Resource not found.');
          break;
        case 500:
          console.error('Server error. Try again later.');
          break;
        default:
          console.error(`API Error ${status}:`, data.message || 'Unknown error');
      }
      
      return Promise.reject({
        status,
        message: data.message || `Error ${status}: Request failed`,
        data,
      });
    } else if (error.request) {
      // Request made but no response
      console.error('Network Error: No response received');
      return Promise.reject({
        status: 0,
        message: 'Network error. Check your internet connection.',
      });
    } else {
      // Something else happened
      console.error('Request Error:', error.message);
      return Promise.reject({
        status: -1,
        message: error.message || 'Request failed',
      });
    }
  }
);

export default api;
