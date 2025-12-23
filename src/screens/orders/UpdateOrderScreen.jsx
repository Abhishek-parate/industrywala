import { View, Text } from 'react-native'
import Button from '../../components/common/Button'
import { updateOrderStatus } from '../../services/orders.service'

const STATUSES = ['processing', 'completed', 'cancelled']

export default function UpdateOrderScreen({ route, navigation }) {
  const { order } = route.params

  const updateStatus = async (status) => {
    await updateOrderStatus(order.id, status)
    navigation.goBack()
  }

  return (
    <View className="p-4 bg-white flex-1">
      <Text className="text-lg font-bold mb-4">
        Update Order #{order.id}
      </Text>

      {STATUSES.map(status => (
        <View key={status} className="mb-3">
          <Button
            title={status.toUpperCase()}
            onPress={() => updateStatus(status)}
          />
        </View>
      ))}
    </View>
  )
}
