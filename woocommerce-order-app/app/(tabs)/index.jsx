import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import api from '../../services/api';
import OrderCard from '../../components/OrderCard';

export default function OrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  const fetchOrders = async () => {
    try {
      setError(null);

      const params = {
        per_page: 50,
        orderby: 'date',
        order: 'desc',
      };

      if (filter !== 'all') {
        params.status = filter;
      }

      const response = await api.get('/orders', { params });
      setOrders(response.data);
    } catch (err) {
      setError(err?.message || 'Failed to load orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  const getOrderStats = () => ({
    total: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    completed: orders.filter((o) => o.status === 'completed').length,
  });

  const stats = getOrderStats();

  if (loading) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center">
        <ActivityIndicator size="large" color="#7c3aed" />
        <Text className="text-gray-600 mt-4 text-base">Loading orders...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-gray-50">
        <View className="bg-primary-600 pt-12 pb-6 px-4">
          <Text className="text-3xl font-bold text-white">Orders</Text>
        </View>
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-6xl mb-4">⚠️</Text>
          <Text className="text-xl font-bold text-gray-900 mb-2 text-center">
            Unable to Load Orders
          </Text>
          <Text className="text-gray-600 text-center mb-6">{error}</Text>
          <TouchableOpacity
            onPress={fetchOrders}
            className="bg-primary-600 px-6 py-3 rounded-xl active:bg-primary-700"
          >
            <Text className="text-white font-semibold">Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-primary-600 pb-6">
        <View className="px-4 pt-12">
          <Text className="text-3xl font-bold text-white mb-2">Orders</Text>
          <Text className="text-primary-100 text-base">{stats.total} total orders</Text>
        </View>

        {/* Stats */}
        <View className="flex-row px-4 mt-4 space-x-2">
          <View className="flex-1 bg-white/20 rounded-xl p-3">
            <Text className="text-white/80 text-xs font-medium">Pending</Text>
            <Text className="text-white text-2xl font-bold mt-1">{stats.pending}</Text>
          </View>
          <View className="flex-1 bg-white/20 rounded-xl p-3">
            <Text className="text-white/80 text-xs font-medium">Processing</Text>
            <Text className="text-white text-2xl font-bold mt-1">{stats.processing}</Text>
          </View>
          <View className="flex-1 bg-white/20 rounded-xl p-3">
            <Text className="text-white/80 text-xs font-medium">Completed</Text>
            <Text className="text-white text-2xl font-bold mt-1">{stats.completed}</Text>
          </View>
        </View>

        {/* Filters */}
        <View className="flex-row px-4 mt-4 space-x-2">
          {['all', 'pending', 'processing', 'completed'].map((status) => (
            <TouchableOpacity
              key={status}
              onPress={() => setFilter(status)}
              className={`px-4 py-2 rounded-full ${
                filter === status ? 'bg-white' : 'bg-white/20'
              }`}
            >
              <Text
                className={`text-sm font-semibold capitalize ${
                  filter === status ? 'text-primary-600' : 'text-white'
                }`}
              >
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* List */}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <OrderCard order={item} />}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#7c3aed"
            colors={['#7c3aed']}
          />
        }
        ListEmptyComponent={
          <View className="py-20 items-center">
            <Text className="text-6xl mb-4">📦</Text>
            <Text className="text-xl font-bold text-gray-900 mb-2">No Orders Found</Text>
            <Text className="text-gray-600 text-center">
              {filter !== 'all' ? `No ${filter} orders yet` : 'Orders will appear here'}
            </Text>
          </View>
        }
      />
    </View>
  );
}
