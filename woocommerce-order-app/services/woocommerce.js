import api from './api';

// WooCommerce API Service
const wooCommerceService = {
  // ============================================
  // ORDERS CRUD OPERATIONS
  // ============================================

  /**
   * Fetch all orders with pagination and filters
   * @param {Object} params - Query parameters
   * @returns {Promise} Orders array
   */
  async getOrders(params = {}) {
    const defaultParams = {
      page: 1,
      per_page: 20,
      orderby: 'date',
      order: 'desc',
      ...params,
    };

    const response = await api.get('/orders', { params: defaultParams });
    return response.data;
  },

  /**
   * Fetch single order by ID
   * @param {number} orderId - Order ID
   * @returns {Promise} Order object
   */
  async getOrderById(orderId) {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  /**
   * Create new order
   * @param {Object} orderData - Order data
   * @returns {Promise} Created order object
   */
  async createOrder(orderData) {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  /**
   * Update existing order
   * @param {number} orderId - Order ID
   * @param {Object} updateData - Data to update
   * @returns {Promise} Updated order object
   */
  async updateOrder(orderId, updateData) {
    const response = await api.put(`/orders/${orderId}`, updateData);
    return response.data;
  },

  /**
   * Update order status
   * @param {number} orderId - Order ID
   * @param {string} status - New status
   * @returns {Promise} Updated order object
   */
  async updateOrderStatus(orderId, status) {
    return this.updateOrder(orderId, { status });
  },

  /**
   * Delete order (move to trash)
   * @param {number} orderId - Order ID
   * @returns {Promise} Deleted order object
   */
  async deleteOrder(orderId) {
    const response = await api.delete(`/orders/${orderId}`);
    return response.data;
  },

  /**
   * Permanently delete order
   * @param {number} orderId - Order ID
   * @returns {Promise} Deleted order object
   */
  async deleteOrderPermanently(orderId) {
    const response = await api.delete(`/orders/${orderId}`, {
      params: { force: true },
    });
    return response.data;
  },

  // ============================================
  // PRODUCTS (for order creation)
  // ============================================

  /**
   * Fetch all products
   * @param {Object} params - Query parameters
   * @returns {Promise} Products array
   */
  async getProducts(params = {}) {
    const defaultParams = {
      page: 1,
      per_page: 50,
      orderby: 'title',
      order: 'asc',
      ...params,
    };

    const response = await api.get('/products', { params: defaultParams });
    return response.data;
  },

  /**
   * Search products by name
   * @param {string} search - Search query
   * @returns {Promise} Products array
   */
  async searchProducts(search) {
    return this.getProducts({ search });
  },

  // ============================================
  // CUSTOMERS (for order creation)
  // ============================================

  /**
   * Fetch all customers
   * @param {Object} params - Query parameters
   * @returns {Promise} Customers array
   */
  async getCustomers(params = {}) {
    const defaultParams = {
      page: 1,
      per_page: 50,
      orderby: 'registered_date',
      order: 'desc',
      ...params,
    };

    const response = await api.get('/customers', { params: defaultParams });
    return response.data;
  },

  /**
   * Search customers by email or name
   * @param {string} search - Search query
   * @returns {Promise} Customers array
   */
  async searchCustomers(search) {
    return this.getCustomers({ search });
  },

  // ============================================
  // REPORTS & STATS
  // ============================================

  /**
   * Get order stats
   * @returns {Promise} Order statistics
   */
  async getOrderStats() {
    const [pending, processing, completed] = await Promise.all([
      this.getOrders({ status: 'pending', per_page: 1 }),
      this.getOrders({ status: 'processing', per_page: 1 }),
      this.getOrders({ status: 'completed', per_page: 1 }),
    ]);

    return {
      pending: pending.length,
      processing: processing.length,
      completed: completed.length,
    };
  },
};

export default wooCommerceService;
