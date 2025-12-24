import { View, ActivityIndicator, Text } from 'react-native';
import React from 'react';

export default function Loader({ size = 'large', text = 'Loading...' }) {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size={size} color="#7c3aed" />
      {text && <Text className="mt-4 text-gray-600 text-base">{text}</Text>}
    </View>
  );
}
