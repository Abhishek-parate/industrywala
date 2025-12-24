import { useState, useEffect, useCallback } from 'react';
import { fetchOrders } from '../services/orderService';

export const useOrders = (initialFilters = {}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    per_page: 20,
    orderby: 'date',
    order: 'desc',
    ...initialFilters,
  });

  const loadOrders = useCallback(async (pageNum = 1, isRefreshing = false) => {
    if (isRefreshing) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    
    setError(null);

    const result = await fetchOrders({ ...filters, page: pageNum });

    if (result.success) {
      if (isRefreshing || pageNum === 1) {
        setOrders(result.data);
      } else {
        setOrders(prev => [...prev, ...result.data]);
      }
      setTotalPages(result.totalPages);
      setPage(pageNum);
    } else {
      setError(result.error);
    }

    setLoading(false);
    setRefreshing(false);
  }, [filters]);

  const refresh = useCallback(() => {
    loadOrders(1, true);
  }, [loadOrders]);

  const loadMore = useCallback(() => {
    if (page < totalPages && !loading) {
      loadOrders(page + 1);
    }
  }, [page, totalPages, loading, loadOrders]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPage(1);
  }, []);

  useEffect(() => {
    loadOrders(1);
  }, [filters]);

  return {
    orders,
    loading,
    refreshing,
    error,
    page,
    totalPages,
    refresh,
    loadMore,
    updateFilters,
    hasMore: page < totalPages,
  };
};
