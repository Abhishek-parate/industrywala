import { View, Text } from 'react-native';
import React from 'react';

export default function EmptyState({ 
  title = 'No Data Found', 
  message = 'There are no items to display',
  icon = '📭'
}) {
  return (
    <View className="flex-1 justify-center items-center px-6 py-12">
      <Text className="text-6xl mb-4">{icon}</Text>
      <Text className="text-xl font-bold text-gray-800 mb-2 text-center">
        {title}
      </Text>
      <Text className="text-base text-gray-500 text-center">
        {message}
      </Text>
    </View>
  );
}
