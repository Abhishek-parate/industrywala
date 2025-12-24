import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import StatusBadge from './StatusBadge';

export default function OrderCard({ order }) {
  const router = useRouter();
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return `₹${parseFloat(amount).toFixed(2)}`;
  };
  
  const handlePress = () => {
    router.push(`/order/${order.id}`);
  };
  
  return (
    <TouchableOpacity
      onPress={handlePress}
      className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100"
      activeOpacity={0.7}
    >
      {/* Header */}
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Text className="text-sm text-gray-500 mb-1">
            Order #{order.number}
          </Text>
          <Text className="text-base font-bold text-gray-800">
            {order.billing.first_name} {order.billing.last_name}
          </Text>
        </View>
        <StatusBadge status={order.status} />
      </View>
      
      {/* Order Details */}
      <View className="border-t border-gray-100 pt-3">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-sm text-gray-600">Total Amount</Text>
          <Text className="text-lg font-bold text-primary">
            {formatCurrency(order.total)}
          </Text>
        </View>
        
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-sm text-gray-600">Items</Text>
          <Text className="text-sm font-semibold text-gray-800">
            {order.line_items.length} product(s)
          </Text>
        </View>
        
        <View className="flex-row justify-between items-center">
          <Text className="text-sm text-gray-600">Payment Method</Text>
          <Text className="text-sm font-semibold text-gray-800 uppercase">
            {order.payment_method_title || order.payment_method}
          </Text>
        </View>
      </View>
      
      {/* Footer */}
      <View className="border-t border-gray-100 mt-3 pt-2">
        <Text className="text-xs text-gray-500">
          {formatDate(order.date_created)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
