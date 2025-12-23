import { View, Text, ScrollView, Alert } from 'react-native'
import Button from '../../components/common/Button'
import StatusBadge from '../../components/common/StatusBadge'
import { deleteOrder } from '../../services/orders.service'

export default function OrderDetailsScreen({ route, navigation }) {
  const { order } = route.params

  const handleDelete = () => {
    Alert.alert(
      'Delete Order',
      'Are you sure you want to delete this order?',
      [
        { text: 'Cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteOrder(order.id)
            navigation.goBack()
          }
        }
      ]
    )
  }

  return (
    <ScrollView className="bg-white p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold">Order #{order.id}</Text>
        <StatusBadge status={order.status} />
      </View>

      <Text className="font-semibold mb-1">Customer</Text>
      <Text className="mb-3">
        {order.billing.first_name} {order.billing.last_name}
      </Text>

      <Text className="font-semibold mb-1">Items</Text>
      {order.line_items.map(item => (
        <Text key={item.id}>
          {item.name} x {item.quantity}
        </Text>
      ))}

      <Text className="mt-4 font-bold">Total: ₹{order.total}</Text>

      <View className="mt-6 space-y-3">
        <Button
          title="Update Status"
          onPress={() => navigation.navigate('UpdateOrder', { order })}
        />
        <Button
          title="Delete Order"
          variant="danger"
          onPress={handleDelete}
        />
      </View>
    </ScrollView>
  )
}
