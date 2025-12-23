export const ORDER_STATUSES = [
    { key: 'pending', label: 'Pending' },
    { key: 'processing', label: 'Processing' },
    { key: 'completed', label: 'Completed' },
    { key: 'cancelled', label: 'Cancelled' },
  ]
  
  export const ORDER_STATUS_COLORS = {
    pending: 'bg-yellow-500',
    processing: 'bg-blue-500',
    completed: 'bg-green-600',
    cancelled: 'bg-red-600',
    refunded: 'bg-purple-600',
    failed: 'bg-gray-600',
  }
  
  export const PAGINATION = {
    PER_PAGE: 10,
    INITIAL_PAGE: 1,
  }
  
  export const API_TIMEOUT = 15000
  
  export const APP_NAME = 'Woo Admin'
  