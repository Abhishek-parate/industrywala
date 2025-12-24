import createApiInstance from './api';

/**
 * Fetch all orders
 */
export const fetchOrders = async (params = {}) => {
  try {
    const api = await createApiInstance();
    const response = await api.get('/orders', { params });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Fetch single order by ID
 */
export const fetchOrderById = async (orderId) => {
  try {
    const api = await createApiInstance();
    const response = await api.get(`/orders/${orderId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Create new order
 */
export const createOrder = async (orderData) => {
  try {
    const api = await createApiInstance();
    const response = await api.post('/orders', orderData);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Update order
 */
export const updateOrder = async (orderId, updateData) => {
  try {
    const api = await createApiInstance();
    const response = await api.put(`/orders/${orderId}`, updateData);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Delete order
 */
export const deleteOrder = async (orderId, force = false) => {
  try {
    const api = await createApiInstance();
    const response = await api.delete(`/orders/${orderId}`, {
      params: { force },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Fetch products
 */
export const fetchProducts = async (params = {}) => {
  try {
    const api = await createApiInstance();
    const response = await api.get('/products', { params });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
