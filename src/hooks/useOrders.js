import { useState } from 'react'
import { fetchOrders } from '../services/orders.service'

export default function useOrders(status = '') {
  const [orders, setOrders] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loadOrders = async (reset = false) => {
    if (loading || !hasMore) return
    setLoading(true)

    const currentPage = reset ? 1 : page
    const res = await fetchOrders(currentPage, status)

    setOrders(reset ? res.data : [...orders, ...res.data])
    setHasMore(res.data.length > 0)
    setPage(currentPage + 1)
    setLoading(false)
  }

  return { orders, loadOrders, loading }
}
