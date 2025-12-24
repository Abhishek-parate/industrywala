import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import StatusBadge from './StatusBadge';

export default function OrderCard({ order }) {
  const router = useRouter();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <TouchableOpacity
      onPress={() => router.push(`/order/${order.id}`)}
      className="bg-white rounded-2xl p-4 mb-3 border border-gray-100"
      activeOpacity={0.7}
    >
      {/* Header */}
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Text className="text-base font-bold text-gray-900 mb-1">
            Order #{order.number}
          </Text>
          <Text className="text-xs text-gray-500">
            {formatDate(order.date_created)}
          </Text>
        </View>
        <StatusBadge status={order.status} />
      </View>

      {/* Customer Info */}
      <View className="bg-gray-50 rounded-xl p-3 mb-3">
        <Text className="text-sm text-gray-700 font-medium mb-1">
          👤 {order.billing.first_name} {order.billing.last_name}
        </Text>
        {order.billing.phone && (
          <Text className="text-sm text-gray-600">
            📱 {order.billing.phone}
          </Text>
        )}
      </View>

      {/* Footer */}
      <View className="border-t border-gray-100 pt-3 flex-row justify-between items-center">
        <Text className="text-sm text-gray-600">{order.line_items.length} items</Text>
        <Text className="text-xl font-bold text-primary-600">
          ₹{parseFloat(order.total).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
