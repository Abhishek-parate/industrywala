import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import api from '../../../services/api';
import StatusBadge from '../../../components/StatusBadge';

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      const response = await api.get(`/orders/${id}`);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const makeCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };

  const sendEmail = (email) => {
    Linking.openURL(`mailto:${email}`);
  };

  if (loading) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center">
        <ActivityIndicator size="large" color="#7c3aed" />
        <Text className="text-gray-600 mt-4 font-medium">Loading order details...</Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View className="flex-1 bg-gray-50">
        {/* Purple header even when order missing */}
        <View className="bg-primary-600 pt-12 pb-2 px-4">
          <Text className="text-3xl font-bold text-white mb-2">Order Summary</Text>
        </View>

        <View className="flex-1 justify-center items-center px-6">
          <View className="w-20 h-20 bg-red-100 rounded-full items-center justify-center mb-4">
            <Ionicons name="alert-circle" size={48} color="#EF4444" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 mb-2">Order not found</Text>
          <Text className="text-gray-600 text-center">
            The order you&apos;re looking for doesn&apos;t exist
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* TOP PURPLE HEADER STRIP */}
      <View className="bg-primary-600 pt-12 pb-2 px-4">
        <Text className="text-3xl font-bold text-white mb-2">Order Summary</Text>
        <Text className="text-primary-100 text-sm">
          Order #{order.number} · {formatDate(order.date_created)}
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* WHITE SUMMARY CARD, OVERLAPPING HEADER SLIGHTLY */}
        <View className="bg-white mx-4 -mt-6 mb-4 rounded-2xl p-5 shadow-sm border border-gray-100">
          <View className="flex-row justify-between items-start mb-4">
            <View>
              <Text className="text-xl font-bold text-gray-900 mb-1">
                Order #{order.number}
              </Text>
              <Text className="text-xs text-gray-500">{formatDate(order.date_created)}</Text>
            </View>
            <StatusBadge status={order.status} />
          </View>

          {/* Order Summary */}
          <View className="bg-primary-50 rounded-xl p-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-700 font-medium">Subtotal</Text>
              <Text className="text-gray-900 font-semibold text-base">
                ₹{parseFloat(order.total - order.total_tax - order.shipping_total).toFixed(2)}
              </Text>
            </View>

            {parseFloat(order.shipping_total) > 0 && (
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center">
                  <Ionicons name="bicycle-outline" size={16} color="#6B7280" />
                  <Text className="text-gray-700 font-medium ml-2">Shipping</Text>
                </View>
                <Text className="text-gray-900 font-semibold text-base">
                  ₹{parseFloat(order.shipping_total).toFixed(2)}
                </Text>
              </View>
            )}

            {parseFloat(order.total_tax) > 0 && (
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center">
                  <Ionicons name="receipt-outline" size={16} color="#6B7280" />
                  <Text className="text-gray-700 font-medium ml-2">Tax</Text>
                </View>
                <Text className="text-gray-900 font-semibold text-base">
                  ₹{parseFloat(order.total_tax).toFixed(2)}
                </Text>
              </View>
            )}

            <View className="border-t border-primary-200 pt-3 mt-2 flex-row justify-between items-center">
              <Text className="text-lg font-bold text-gray-900">Total</Text>
              <Text className="text-2xl font-bold text-primary-600">
                ₹{parseFloat(order.total).toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Payment Method */}
          {order.payment_method_title && (
            <View className="mt-4 flex-row items-center bg-gray-50 rounded-xl p-3">
              <View className="w-10 h-10 bg-primary-100 rounded-lg items-center justify-center">
                <Ionicons name="card" size={20} color="#7C3AED" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-xs text-gray-500 font-medium">Payment Method</Text>
                <Text className="text-gray-900 font-semibold">{order.payment_method_title}</Text>
              </View>
            </View>
          )}
        </View>

        {/* CUSTOMER INFORMATION CARD */}
        <View className="bg-white mx-4 mb-4 rounded-2xl p-5 shadow-sm border border-gray-100">
          <View className="flex-row items-center mb-5">
            <View className="w-12 h-12 bg-primary-100 rounded-xl items-center justify-center">
              <Ionicons name="person" size={24} color="#7C3AED" />
            </View>
            <Text className="text-lg font-bold text-gray-900 ml-3">Customer Information</Text>
          </View>

          {/* Name */}
          <View className="mb-4">
            <Text className="text-xs text-gray-500 font-semibold uppercase mb-2">Full Name</Text>
            <Text className="text-base text-gray-900 font-semibold">
              {order.billing.first_name} {order.billing.last_name}
            </Text>
          </View>

          {/* Quick Action Buttons */}
          {(order.billing.email || order.billing.phone) && (
            <View className="flex-row mb-4 gap-3">
              {order.billing.phone && (
                <TouchableOpacity
                  onPress={() => makeCall(order.billing.phone)}
                  className="flex-1 bg-green-50 border border-green-200 rounded-xl p-4 flex-row items-center justify-center"
                  activeOpacity={0.7}
                >
                  <Ionicons name="call" size={20} color="#16A34A" />
                  <Text className="text-green-700 font-bold ml-2">Call</Text>
                </TouchableOpacity>
              )}

              {order.billing.email && (
                <TouchableOpacity
                  onPress={() => sendEmail(order.billing.email)}
                  className="flex-1 bg-blue-50 border border-blue-200 rounded-xl p-4 flex-row items-center justify-center"
                  activeOpacity={0.7}
                >
                  <Ionicons name="mail" size={20} color="#2563EB" />
                  <Text className="text-blue-700 font-bold ml-2">Email</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Email */}
          {order.billing.email && (
            <View className="mb-4">
              <Text className="text-xs text-gray-500 font-semibold uppercase mb-2">
                Email Address
              </Text>
              <View className="flex-row items-center">
                <Ionicons name="mail-outline" size={16} color="#6B7280" />
                <Text className="text-base text-gray-900 ml-2">{order.billing.email}</Text>
              </View>
            </View>
          )}

          {/* Phone */}
          {order.billing.phone && (
            <View className="mb-4">
              <Text className="text-xs text-gray-500 font-semibold uppercase mb-2">
                Phone Number
              </Text>
              <View className="flex-row items-center">
                <Ionicons name="call-outline" size={16} color="#6B7280" />
                <Text className="text-base text-gray-900 font-semibold ml-2">
                  {order.billing.phone}
                </Text>
              </View>
            </View>
          )}

          {/* Address */}
          {order.billing.address_1 && (
            <View>
              <Text className="text-xs text-gray-500 font-semibold uppercase mb-2">
                Delivery Address
              </Text>
              <View className="bg-gray-50 rounded-xl p-4 flex-row">
                <Ionicons name="location" size={20} color="#7C3AED" />
                <Text className="text-base text-gray-900 leading-6 ml-3 flex-1">
                  {order.billing.address_1}
                  {order.billing.address_2 && `, ${order.billing.address_2}`}
                  {'\n'}
                  {order.billing.city}, {order.billing.state} {order.billing.postcode}
                  {'\n'}
                  {order.billing.country}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* ORDER ITEMS CARD */}
        <View className="bg-white mx-4 mb-24 rounded-2xl p-5 shadow-sm border border-gray-100">
          <View className="flex-row items-center justify-between mb-5">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-primary-100 rounded-xl items-center justify-center">
                <Ionicons name="cart" size={24} color="#7C3AED" />
              </View>
              <Text className="text-lg font-bold text-gray-900 ml-3">Order Items</Text>
            </View>
            <View className="bg-primary-100 px-4 py-2 rounded-full">
              <Text className="text-primary-700 font-bold text-sm">
                {order.line_items.length}
              </Text>
            </View>
          </View>

          {order.line_items.map((item, index) => (
            <View
              key={item.id}
              className={`py-4 ${
                index !== order.line_items.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1 mr-4">
                  <Text className="text-base font-bold text-gray-900 mb-2">
                    {item.name}
                  </Text>
                  <View className="flex-row items-center">
                    <View className="bg-primary-50 px-3 py-1.5 rounded-lg mr-2">
                      <Text className="text-primary-700 text-xs font-bold">
                        Qty: {item.quantity}
                      </Text>
                    </View>
                    <View className="bg-gray-100 px-3 py-1.5 rounded-lg">
                      <Text className="text-gray-700 text-xs font-semibold">
                        ₹{parseFloat(item.price).toFixed(2)} each
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-xs text-gray-500 font-medium mb-1">Total</Text>
                  <Text className="text-xl font-bold text-primary-600">
                    ₹{parseFloat(item.total).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
