import { View, Text, FlatList, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import wooCommerceService from '../../services/woocommerce';
import OrderCard from '../../components/OrderCard';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';
import { ORDER_STATUSES } from '../../utils/constants';

export default function OrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Fetch orders
  const fetchOrders = async (pageNum = 1, status = 'all', refresh = false) => {
    try {
      if (refresh) {
        setRefreshing(true);
      } else if (pageNum === 1) {
        setLoading(true);
      }
      
      const params = {
        page: pageNum,
        per_page: 20,
      };
      
      if (status !== 'all') {
        params.status = status;
      }
      
      const data = await wooCommerceService.getOrders(params);
      
      if (refresh || pageNum === 1) {
        setOrders(data);
      } else {
        setOrders(prev => [...prev, ...data]);
      }
      
      setHasMore(data.length === 20);
      setPage(pageNum);
      
    } catch (error) {
      Alert.alert(
        'Error',
        error.message || 'Failed to fetch orders',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  // Initial load
  useEffect(() => {
    fetchOrders(1, selectedStatus);
  }, [selectedStatus]);
  
  // Pull to refresh
  const onRefresh = useCallback(() => {
    fetchOrders(1, selectedStatus, true);
  }, [selectedStatus]);
  
  // Load more (pagination)
  const loadMore = () => {
    if (!loading && hasMore) {
      fetchOrders(page + 1, selectedStatus);
    }
  };
  
  // Filter buttons
  const FilterButton = ({ status, label }) => (
    <TouchableOpacity
      onPress={() => setSelectedStatus(status)}
      className={`px-4 py-2 rounded-full mr-2 ${
        selectedStatus === status
          ? 'bg-primary'
          : 'bg-gray-200'
      }`}
    >
      <Text
        className={`text-sm font-semibold ${
          selectedStatus === status
            ? 'text-white'
            : 'text-gray-700'
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
  
  // Render order item
  const renderOrderItem = ({ item }) => (
    <OrderCard order={item} />
  );
  
  // Empty component
  const renderEmpty = () => {
    if (loading) return null;
    return (
      <EmptyState
        title="No Orders Found"
        message={
          selectedStatus === 'all'
            ? 'No orders available in your store'
            : `No ${selectedStatus} orders found`
        }
        icon="📦"
      />
    );
  };
  
  // Footer (loading more)
  const renderFooter = () => {
    if (!loading || page === 1) return null;
    return (
      <View className="py-4">
        <Loader size="small" text="" />
      </View>
    );
  };
  
  if (loading && page === 1) {
    return <Loader text="Loading orders..." />;
  }
  
  return (
    <View className="flex-1 bg-gray-50">
      {/* Filter Bar */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[
            { status: 'all', label: 'All' },
            { status: ORDER_STATUSES.PENDING, label: 'Pending' },
            { status: ORDER_STATUSES.PROCESSING, label: 'Processing' },
            { status: ORDER_STATUSES.COMPLETED, label: 'Completed' },
            { status: ORDER_STATUSES.CANCELLED, label: 'Cancelled' },
          ]}
          renderItem={({ item }) => (
            <FilterButton status={item.status} label={item.label} />
          )}
          keyExtractor={(item) => item.status}
        />
      </View>
      
      {/* Orders List */}
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#7c3aed']}
            tintColor="#7c3aed"
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}
