import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50 p-8">
      <Text className="text-6xl mb-4">🤷‍♂️</Text>
      <Text className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</Text>
      <Text className="text-gray-600 text-center mb-6">
        The page you're looking for doesn't exist.
      </Text>
      <Link href="/" className="bg-blue-600 px-6 py-3 rounded-lg">
        <Text className="text-white font-semibold">Go to Orders</Text>
      </Link>
    </View>
  );
}
