import api from './apiClient'

export const fetchOrders = (page = 1, status = '') => {
  return api.get('/orders', {
    params: { page, per_page: 10, status }
  })
}

export const deleteOrder = (id) => api.delete(`/orders/${id}`, { params: { force: true } })
export const updateOrderStatus = (id, status) =>
  api.put(`/orders/${id}`, { status })
