import { View, Text, ActivityIndicator } from 'react-native';

export default function LoadingScreen({ message = 'Loading...' }) {
  return (
    <View className="flex-1 bg-gray-50 justify-center items-center">
      <ActivityIndicator size="large" color="#7c3aed" />
      <Text className="text-gray-600 mt-4 text-base">{message}</Text>
    </View>
  );
}
