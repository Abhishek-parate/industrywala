import { View, FlatList, RefreshControl } from 'react-native'
import { useEffect, useState } from 'react'
import { fetchOrders } from '../../services/orders.service'
import OrderCard from '../../components/orders/OrderCard'
import Loader from '../../components/common/Loader'

export default function OrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [refreshing, setRefreshing] = useState(false)

  const loadOrders = async () => {
    setLoading(true)
    const res = await fetchOrders(page)
    setOrders(res.data)
    setLoading(false)
  }

  useEffect(() => {
    loadOrders()
  }, [])

  if (loading) return <Loader />

  return (
    <FlatList
      className="bg-gray-100"
      data={orders}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <OrderCard order={item} onPress={() => navigation.navigate('OrderDetails', { order: item })} />
      )}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadOrders} />}
    />
  )
}
