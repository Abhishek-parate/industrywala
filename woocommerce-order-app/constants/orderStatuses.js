export const ORDER_STATUSES = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    ON_HOLD: 'on-hold',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
    FAILED: 'failed',
  };
  
  export const ORDER_STATUS_CONFIG = {
    [ORDER_STATUSES.PENDING]: {
      label: 'Pending',
      color: 'bg-yellow-100 text-yellow-800',
      borderColor: 'border-yellow-300',
    },
    [ORDER_STATUSES.PROCESSING]: {
      label: 'Processing',
      color: 'bg-blue-100 text-blue-800',
      borderColor: 'border-blue-300',
    },
    [ORDER_STATUSES.ON_HOLD]: {
      label: 'On Hold',
      color: 'bg-gray-100 text-gray-800',
      borderColor: 'border-gray-300',
    },
    [ORDER_STATUSES.COMPLETED]: {
      label: 'Completed',
      color: 'bg-green-100 text-green-800',
      borderColor: 'border-green-300',
    },
    [ORDER_STATUSES.CANCELLED]: {
      label: 'Cancelled',
      color: 'bg-red-100 text-red-800',
      borderColor: 'border-red-300',
    },
    [ORDER_STATUSES.REFUNDED]: {
      label: 'Refunded',
      color: 'bg-purple-100 text-purple-800',
      borderColor: 'border-purple-300',
    },
    [ORDER_STATUSES.FAILED]: {
      label: 'Failed',
      color: 'bg-red-100 text-red-800',
      borderColor: 'border-red-300',
    },
  };
  
  export const PAYMENT_METHODS = [
    { value: 'bacs', label: 'Direct Bank Transfer' },
    { value: 'cheque', label: 'Check Payment' },
    { value: 'cod', label: 'Cash on Delivery' },
    { value: 'paypal', label: 'PayPal' },
  ];
  