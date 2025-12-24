import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import wooCommerceService from '../../services/woocommerce';
import Loader from '../../components/Loader';
import StatusBadge from '../../components/StatusBadge';
import Button from '../../components/Button';
import { ORDER_STATUSES, STATUS_LABELS } from '../../utils/constants';

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  useEffect(() => {
    fetchOrderDetails();
  }, [id]);
  
  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const data = await wooCommerceService.getOrderById(id);
      setOrder(data);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to fetch order details');
      router.back();
    } finally {
      setLoading(false);
    }
  };
  
  const updateStatus = async (newStatus) => {
    Alert.alert(
      'Update Status',
      `Change order status to ${STATUS_LABELS[newStatus]}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Update',
          onPress: async () => {
            try {
              setUpdating(true);
              const updated = await wooCommerceService.updateOrderStatus(id, newStatus);
              setOrder(updated);
              Alert.alert('Success', 'Order status updated successfully');
            } catch (error) {
              Alert.alert('Error', error.message || 'Failed to update status');
            } finally {
              setUpdating(false);
            }
          },
        },
      ]
    );
  };
  
  const deleteOrder = async () => {
    Alert.alert(
      'Delete Order',
      'Are you sure you want to delete this order? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setUpdating(true);
              await wooCommerceService.deleteOrder(id);
              Alert.alert('Success', 'Order deleted successfully', [
                { text: 'OK', onPress: () => router.back() },
              ]);
            } catch (error) {
              Alert.alert('Error', error.message || 'Failed to delete order');
              setUpdating(false);
            }
          },
        },
      ]
    );
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const formatCurrency = (amount) => {
    return `₹${parseFloat(amount).toFixed(2)}`;
  };
  
  if (loading) {
    return <Loader text="Loading order details..." />;
  }
  
  if (!order) {
    return null;
  }
  
  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header Card */}
      <View className="bg-white p-4 mb-3 shadow-sm">
        <View className="flex-row justify-between items-start mb-3">
          <View>
            <Text className="text-sm text-gray-500 mb-1">Order Number</Text>
            <Text className="text-2xl font-bold text-gray-800">
              #{order.number}
            </Text>
          </View>
          <StatusBadge status={order.status} />
        </View>
        
        <Text className="text-sm text-gray-500">
          {formatDate(order.date_created)}
        </Text>
      </View>
      
      {/* Customer Information */}
      <View className="bg-white p-4 mb-3 shadow-sm">
        <Text className="text-lg font-bold text-gray-800 mb-3">
          Customer Information
        </Text>
        
        <View className="space-y-2">
          <InfoRow
            label="Name"
            value={`${order.billing.first_name} ${order.billing.last_name}`}
          />
          <InfoRow label="Email" value={order.billing.email} />
          <InfoRow label="Phone" value={order.billing.phone} />
        </View>
      </View>
      
      {/* Billing Address */}
      <View className="bg-white p-4 mb-3 shadow-sm">
        <Text className="text-lg font-bold text-gray-800 mb-3">
          Billing Address
        </Text>
        
        <Text className="text-base text-gray-700 leading-6">
          {order.billing.address_1}
          {order.billing.address_2 && `, ${order.billing.address_2}`}
          {'\n'}
          {order.billing.city}, {order.billing.state} {order.billing.postcode}
          {'\n'}
          {order.billing.country}
        </Text>
      </View>
      
      {/* Shipping Address */}
      {order.shipping.address_1 && (
        <View className="bg-white p-4 mb-3 shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-3">
            Shipping Address
          </Text>
          
          <Text className="text-base text-gray-700 leading-6">
            {order.shipping.first_name} {order.shipping.last_name}
            {'\n'}
            {order.shipping.address_1}
            {order.shipping.address_2 && `, ${order.shipping.address_2}`}
            {'\n'}
            {order.shipping.city}, {order.shipping.state} {order.shipping.postcode}
            {'\n'}
            {order.shipping.country}
          </Text>
        </View>
      )}
      
      {/* Order Items */}
      <View className="bg-white p-4 mb-3 shadow-sm">
        <Text className="text-lg font-bold text-gray-800 mb-3">
          Order Items
        </Text>
        
        {order.line_items.map((item, index) => (
          <View
            key={index}
            className={`py-3 ${
              index !== order.line_items.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <View className="flex-row justify-between items-start mb-1">
              <Text className="flex-1 text-base font-semibold text-gray-800">
                {item.name}
              </Text>
              <Text className="text-base font-bold text-primary ml-2">
                {formatCurrency(item.total)}
              </Text>
            </View>
            
            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-gray-500">
                {formatCurrency(item.price)} × {item.quantity}
              </Text>
              {item.sku && (
                <Text className="text-xs text-gray-400">SKU: {item.sku}</Text>
              )}
            </View>
          </View>
        ))}
      </View>
      
      {/* Order Summary */}
      <View className="bg-white p-4 mb-3 shadow-sm">
        <Text className="text-lg font-bold text-gray-800 mb-3">
          Order Summary
        </Text>
        
        <View className="space-y-2">
          <SummaryRow label="Subtotal" value={formatCurrency(order.subtotal)} />
          
          {parseFloat(order.discount_total) > 0 && (
            <SummaryRow
              label="Discount"
              value={`-${formatCurrency(order.discount_total)}`}
              valueColor="text-green-600"
            />
          )}
          
          {parseFloat(order.shipping_total) > 0 && (
            <SummaryRow label="Shipping" value={formatCurrency(order.shipping_total)} />
          )}
          
          {parseFloat(order.total_tax) > 0 && (
            <SummaryRow label="Tax" value={formatCurrency(order.total_tax)} />
          )}
          
          <View className="border-t border-gray-200 pt-2 mt-2">
            <SummaryRow
              label="Total"
              value={formatCurrency(order.total)}
              labelBold
              valueBold
              valueColor="text-primary"
              valueSize="text-xl"
            />
          </View>
        </View>
      </View>
      
      {/* Payment Information */}
      <View className="bg-white p-4 mb-3 shadow-sm">
        <Text className="text-lg font-bold text-gray-800 mb-3">
          Payment Information
        </Text>
        
        <InfoRow
          label="Payment Method"
          value={order.payment_method_title || order.payment_method}
        />
        <InfoRow
          label="Payment Status"
          value={order.date_paid ? 'Paid' : 'Not Paid'}
        />
        {order.transaction_id && (
          <InfoRow label="Transaction ID" value={order.transaction_id} />
        )}
      </View>
      
      {/* Status Actions */}
      <View className="bg-white p-4 mb-3 shadow-sm">
        <Text className="text-lg font-bold text-gray-800 mb-3">
          Update Status
        </Text>
        
        <View className="flex-row flex-wrap gap-2">
          {Object.entries(ORDER_STATUSES).map(([key, status]) => {
            if (status === order.status) return null;
            
            return (
              <TouchableOpacity
                key={status}
                onPress={() => updateStatus(status)}
                disabled={updating}
                className="bg-gray-100 px-4 py-2 rounded-lg"
              >
                <Text className="text-sm font-semibold text-gray-700">
                  {STATUS_LABELS[status]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      
      {/* Delete Button */}
      <View className="p-4">
        <Button
          title="Delete Order"
          variant="danger"
          onPress={deleteOrder}
          loading={updating}
        />
      </View>
      
      <View className="h-6" />
    </ScrollView>
  );
}

// Helper Components
function InfoRow({ label, value }) {
  return (
    <View className="flex-row justify-between items-center py-2">
      <Text className="text-sm text-gray-500">{label}</Text>
      <Text className="text-base font-semibold text-gray-800 text-right flex-1 ml-4">
        {value || 'N/A'}
      </Text>
    </View>
  );
}

function SummaryRow({
  label,
  value,
  labelBold = false,
  valueBold = false,
  valueColor = 'text-gray-800',
  valueSize = 'text-base',
}) {
  return (
    <View className="flex-row justify-between items-center py-1">
      <Text className={`text-base text-gray-600 ${labelBold ? 'font-bold' : ''}`}>
        {label}
      </Text>
      <Text className={`${valueSize} ${valueColor} ${valueBold ? 'font-bold' : 'font-semibold'}`}>
        {value}
      </Text>
    </View>
  );
}
