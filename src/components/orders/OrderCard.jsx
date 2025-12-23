import { TouchableOpacity, View, Text } from 'react-native'
import StatusBadge from '../common/StatusBadge'

export default function OrderCard({ order, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white p-4 mb-2 mx-2 rounded-lg shadow"
    >
      <View className="flex-row justify-between items-center">
        <Text className="font-bold text-lg">#{order.id}</Text>
        <StatusBadge status={order.status} />
      </View>

      <Text className="text-gray-500 mt-1">
        {order.billing.first_name} {order.billing.last_name}
      </Text>

      <Text className="mt-2 font-semibold">
        ₹ {order.total}
      </Text>
    </TouchableOpacity>
  )
}
