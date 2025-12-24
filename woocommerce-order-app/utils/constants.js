// Order status configurations
export const ORDER_STATUSES = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    ON_HOLD: 'on-hold',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
    FAILED: 'failed',
  };
  
  export const STATUS_COLORS = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    'on-hold': 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    refunded: 'bg-gray-100 text-gray-800',
    failed: 'bg-red-100 text-red-800',
  };
  
  export const STATUS_LABELS = {
    pending: 'Pending',
    processing: 'Processing',
    'on-hold': 'On Hold',
    completed: 'Completed',
    cancelled: 'Cancelled',
    refunded: 'Refunded',
    failed: 'Failed',
  };
  
  export const PAYMENT_METHODS = [
    { label: 'Cash on Delivery', value: 'cod' },
    { label: 'Bank Transfer', value: 'bacs' },
    { label: 'Check Payment', value: 'cheque' },
    { label: 'PayPal', value: 'paypal' },
    { label: 'Razorpay', value: 'razorpay' },
  ];
  