import { View, Text } from 'react-native';
import React from 'react';
import { STATUS_COLORS, STATUS_LABELS } from '../utils/constants';

export default function StatusBadge({ status }) {
  const colorClass = STATUS_COLORS[status] || 'bg-gray-100 text-gray-800';
  const label = STATUS_LABELS[status] || status;
  
  return (
    <View className={`px-3 py-1 rounded-full ${colorClass}`}>
      <Text className={`text-xs font-semibold uppercase ${colorClass.split(' ')[1]}`}>
        {label}
      </Text>
    </View>
  );
}
