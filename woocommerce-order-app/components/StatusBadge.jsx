import { View, Text } from 'react-native';

export default function StatusBadge({ status }) {
  const getStatusClasses = (status) => {
    const styles = {
      pending: 'bg-yellow-100 border-yellow-500 text-yellow-700',
      processing: 'bg-blue-100 border-blue-500 text-blue-700',
      completed: 'bg-green-100 border-green-500 text-green-700',
      cancelled: 'bg-red-100 border-red-500 text-red-700',
      refunded: 'bg-gray-100 border-gray-500 text-gray-700',
      failed: 'bg-red-100 border-red-500 text-red-700',
      'on-hold': 'bg-orange-100 border-orange-500 text-orange-700',
    };
    return styles[status] || styles.pending;
  };

  const classes = getStatusClasses(status);

  return (
    <View className={`px-3 py-1.5 rounded-full border ${classes}`}>
      <Text className={`text-xs font-semibold capitalize ${classes}`}>
        {status.replace('-', ' ')}
      </Text>
    </View>
  );
}
