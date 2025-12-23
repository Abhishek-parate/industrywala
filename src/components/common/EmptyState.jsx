import { View, Text, TouchableOpacity } from 'react-native'

export default function EmptyState({
  title = 'No Data Found',
  description = 'There is nothing to show here.',
  actionLabel,
  onAction,
}) {
  return (
    <View className="flex-1 items-center justify-center px-6 bg-white">
      <Text className="text-xl font-bold text-gray-800 mb-2 text-center">
        {title}
      </Text>

      <Text className="text-gray-500 text-center mb-6">
        {description}
      </Text>

      {actionLabel && onAction && (
        <TouchableOpacity
          onPress={onAction}
          className="bg-primary px-6 py-3 rounded-lg"
        >
          <Text className="text-white font-semibold">
            {actionLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
