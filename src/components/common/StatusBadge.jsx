import { View, Text } from 'react-native'

const STATUS_COLORS = {
  pending: 'bg-yellow-500',
  processing: 'bg-blue-500',
  completed: 'bg-green-600',
  cancelled: 'bg-red-600',
}

export default function StatusBadge({ status }) {
  return (
    <View className={`px-2 py-1 rounded ${STATUS_COLORS[status] || 'bg-gray-500'}`}>
      <Text className="text-white text-xs capitalize">{status}</Text>
    </View>
  )
}
