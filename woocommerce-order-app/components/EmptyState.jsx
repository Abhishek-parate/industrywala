import { View, Text } from 'react-native';

export default function EmptyState({ emoji, title, message }) {
  return (
    <View className="py-20 items-center px-6">
      <Text className="text-6xl mb-4">{emoji}</Text>
      <Text className="text-xl font-bold text-gray-900 mb-2 text-center">{title}</Text>
      <Text className="text-gray-600 text-center text-base">{message}</Text>
    </View>
  );
}
