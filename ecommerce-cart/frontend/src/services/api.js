import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * API Service
 * Handles all HTTP requests to the backend
 */

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Store token from response if provided
api.interceptors.response.use((response) => {
  if (response.data.token) {
    localStorage.setItem('authToken', response.data.token);
  }
  return response;
});

/**
 * Product API
 */
export const productAPI = {
  // Get all products
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },

  // Get single product
  getById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  }
};

/**
 * Cart API
 */
export const cartAPI = {
  // Get user's cart
  get: async () => {
    const response = await api.get('/cart');
    return response.data;
  },

  // Add item to cart
  addItem: async (productId, quantity = 1) => {
    const response = await api.post('/cart', { productId, quantity });
    return response.data;
  },

  // Remove item from cart
  removeItem: async (productId) => {
    const response = await api.delete(`/cart/${productId}`);
    return response.data;
  }
};

/**
 * Checkout API
 */
export const checkoutAPI = {
  // Process payment
  processPayment: async (amount) => {
    const response = await api.post('/checkout/payment', { amount });
    return response.data;
  },

  // Complete checkout
  checkout: async (paymentId) => {
    const response = await api.post('/checkout', { paymentId });
    return response.data;
  },

  // Get order history
  getOrders: async () => {
    const response = await api.get('/checkout/orders');
    return response.data;
  }
};

export default api;
